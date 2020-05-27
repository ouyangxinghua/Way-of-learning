import Helpers from "../helpers/Helpers";
import {Store as ReduxStore} from "redux";
import Logger from "../helpers/Logger";
import {RootState} from "../redux-store/reducers";
import {
    setPhase, setTabCurCouponIndex, setTabDiscount,
} from "../redux-store/AppActions";
import {AppPhase, TabState} from "../redux-store/AppTypes";
import {ApiWrapper} from "../api/ApiWrapper";
import Coupon from "../api/Coupon";
import Settings from "../helpers/Settings";
import "../helpers/chrome-extension-async/execute-async-function";
import StoreConnector from "./StoreConnector";
import Affiliate from "../helpers/Affiliate";
import StoreConnectorBackgroundWrapper from "./StoreConnectorBackgroundWrapper";
import MessageSender = chrome.runtime.MessageSender;
import BackgroundController from "../background";
import Store from "../api/Store";
import {SteppedContext} from "./StoreConnectorFunctionResult";

export class CouponApplier {
    private readonly tabId: number;

    public storeId: string;
    private store: Store;

    private reduxStore: ReduxStore<RootState>;
    get state(): TabState {
        return this.reduxStore.getState().tabs[this.tabId];
    }

    /**
     * Store connector script as string, loaded from CDN
     */
    private storeConnectorScript: string;
    /**
     * ui.js as string, loaded from CDN
     */
    private uiScript: string;

    /**
     * Store connector wrapper for calling functions the same way as caller was in on-page context
     */
    private storeConnector: StoreConnector = null;

    private cartTotal = {
        beforeApplying: null as number,
        afterApplying: null as number
    };

    private workingCoupon: Coupon;
    private couponApplied: boolean;

    isActive: boolean = false;
    isDisposed: boolean = false;

    onTabLoadedHandlers: (() => void)[] = [];
    onStorePageChange = (pageIndex: number) => {
        let prevIndex = this.storeConnector.currentStoreConnectorIndex;
        this.storeConnector.currentStoreConnectorIndex = pageIndex;
        if (this.storeConnector.currentStoreConnectorIndex === null) {
            this.onStorePageGone(prevIndex);
        } else {
            this.onStorePageFound();
        }
    };
    removeOnStorePageChange: () => void;

    constructor(tabId: number, storeId: string, reduxStore: ReduxStore<RootState>, store: Store, backgroundController: BackgroundController) {
        this.tabId = tabId;
        this.storeId = storeId;
        this.store = store;
        this.reduxStore = reduxStore;

        const onStorePageChangeListener = (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => {
            if (sender.tab.id === this.tabId && message.action === "onStorePageChange") {
                this.onStorePageChange(message.data);
            }
        };
        chrome.runtime.onMessage.addListener(onStorePageChangeListener);
        this.removeOnStorePageChange = () => {
            chrome.runtime.onMessage.removeListener(onStorePageChangeListener);
        }
    }

    async preparePage() {
        // 1. Injecting store connector
        // 2. Injecting ui.js
        await Promise.all([
            new Promise(async (resolve, reject) => {
                if (!this.storeConnectorScript) {
                    // don't load remote script in "local" mode
                    if (process.env.script !== "local") {
                        let getStoreConnectorURLResult = await ApiWrapper.stores.getStoreConnector(this.storeId);
                        if (getStoreConnectorURLResult instanceof Error) {
                            Logger.error(getStoreConnectorURLResult);
                            return reject();
                        }
                        if (!!getStoreConnectorURLResult.errmsg) {
                            Logger.error(getStoreConnectorURLResult.errmsg);
                            return reject();
                        }
                        this.storeConnectorScript = getStoreConnectorURLResult.data;
                    } else {
                        // fallback to local script
                        let localConnectorScriptResult = await Helpers.ajax(
                            "GET",
                            `${Settings.BASE_SCRIPT_URI}/${this.store.localScript}`,
                            false,
                            {
                                dataType: "text"
                            }
                        );
                        if (localConnectorScriptResult instanceof Error) {
                            Logger.error(`CouponApplier[${this.tabId}]\n -> preparePage()\n fetching local connector failed`, localConnectorScriptResult);
                            return reject();
                        }
                        this.storeConnectorScript = localConnectorScriptResult.response;
                    }
                }

                let storeConnectorInjectResult = await this.executeScript(`
                    ${this.storeConnectorScript}
                    resolve();
                `);
                if (storeConnectorInjectResult instanceof Error) {
                    Logger.error(`CouponApplier[${this.tabId}]\n -> preparePage()\n error when injecting store connector`, storeConnectorInjectResult);
                    throw storeConnectorInjectResult;
                }
                resolve();
            }),
            new Promise(async (resolve, reject) => {
                if (!this.uiScript) {
                    // don't load remote script in "local" mode
                    if (process.env.script !== "local") {
                        // trying to fetch remote "ui.js"
                        let remoteUiScriptResult = await ApiWrapper.scripts.getUIScript();
                        if (remoteUiScriptResult instanceof Error || !!remoteUiScriptResult.errmsg) {
                            Logger.warning(`CouponApplier[${this.tabId}]\n -> preparePage()\n remote fetching "ui.js" failed, using local script`, remoteUiScriptResult);
                        } else {
                            this.uiScript = remoteUiScriptResult.data;
                        }
                    }
                    if (!this.uiScript) {
                        // fallback to local script
                        let localUiScriptResult = await Helpers.ajax(
                            "GET",
                            chrome.runtime.getURL("js/ui.js"),
                            false,
                            {
                                dataType: "text"
                            }
                        );
                        if (localUiScriptResult instanceof Error) {
                            Logger.error(`CouponApplier[${this.tabId}]\n -> preparePage()\n fetching local "ui.js" failed`, localUiScriptResult);
                            return reject();
                        }
                        this.uiScript = localUiScriptResult.response;
                    }
                }
                let injectResult = await this.executeScript(`
                    ${this.uiScript}
                    resolve();
                `);
                if (injectResult instanceof Error) {
                    Logger.error(`CouponApplier[${this.tabId}]\n -> preparePage()\n error when injecting "ui.js"`, injectResult);
                    reject();
                }
                resolve();
            })
        ]);

        let tryNum = 0;
        let storeConnectorJson: any;
        while (true) {
            storeConnectorJson = await this.executeScript(`
                resolve(!!window.Fatcoupon && window.Fatcoupon.StoreConnector);
            `);
            if (!!storeConnectorJson) {
                break;
            }
            await Helpers.wait(100);
            if (tryNum++ > 50) {
                throw Error("Store connector not set: timeout");
            }
        }
        this.storeConnector = new StoreConnectorBackgroundWrapper(this.executeScript.bind(this), this.onTabLoadedHandlers);
        this.storeConnector.storeConnectors = storeConnectorJson.storeConnectors;

        await this.storeConnector.init();
    }

    async onTabLoaded() {
        await this.preparePage();
        for (let i = 0; i < this.onTabLoadedHandlers.length; i++) {
            this.onTabLoadedHandlers[i]();
            this.onTabLoadedHandlers.splice(i--, 1);
        }
    }

    async executeScript(code: string): Promise<any> {
        let resolved = false;
        try {
            let port = chrome.tabs.connect(this.tabId, {name: "fatcoupon"});
            let result = await new Promise<any>((resolve) => {
                port.onMessage.addListener((res) => {
                    resolve(res);
                });
                port.postMessage({
                    "action": "evalJS",
                    "code": code
                });
                Helpers.wait(30000).then(() => { if (!resolved) throw Error("executeScript() timeout")});
            });
            resolved = true;
            port.disconnect();
            if (result?.error) {
                let error = new Error();
                error.message = result.error.message;
                error.name = result.error.name;
                error.stack = result.error.stack;
                return error;
            }
            return result;
        } catch (e) {
            resolved = true;
            if (e.message.indexOf("Cannot access contents of the page") > -1) {
                Logger.warning(`CouponApplier[${this.tabId}]\n -> runOnPageContext()\n access to page denied\n`, e);
                this.dispose();
                return;
            }
            return e;
        }
    }

    onStorePageFound() {
        let pageName = this.storeConnector.metadata.pageName
            ? `"${this.storeConnector.metadata.pageName}" `
            : "";
        Logger.log(`CouponApplier[${this.tabId}] store page ${pageName}found`);

        // page loaded in inactive phase
        if (this.state.phase === AppPhase.INACTIVE) {
            this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.SIDEBAR_SHOWN));
        }
    }

    onStorePageGone(prevIndex: number) {
        if (this.onTabLoadedHandlers.length === 0 && this.state.phase !== AppPhase.INACTIVE) {
            Logger.log(`CouponApplier[${this.tabId}] store page gone`);
            this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.INACTIVE));
        }
    }

    reset() {
        this.workingCoupon = null;
        this.couponApplied = false;
        this.cartTotal = {
            beforeApplying: null,
            afterApplying: null
        };
        this.reduxStore.dispatch(setTabCurCouponIndex(this.tabId, -1));
        this.reduxStore.dispatch(setTabDiscount(this.tabId, 0));
    }

    async startApplyingProcess() {
        if (this.isActive) {
            return Logger.warning(`CouponApplier[${this.tabId}]\n -> startApplyingProcess()\n already active`);
        }

        this.isActive = true;
        Logger.log(`CouponApplier[${this.tabId}] start applying coupons...`);

        this.reset();

        try {
            let result = await Promise.resolve()
                .then(async () => { return await this.beforeApplying(); })
                .then(async (res) => { return !res ? res : await this.applying(); })
                .then(async (res) => { return !res ? res : await this.afterApplying(); });
            if (!result) {
                Logger.warning(`CouponApplier[${this.tabId}]\n -> startApplyingProcess()\n applying process stopped`);
            }
        } catch (e) {
            if (this.isDisposed) return;
            Logger.error(`CouponApplier[${this.tabId}]\n applying process failed`, e);

            // if process was working - show "Coupon not found"
            if (this.state.phase > AppPhase.SIDEBAR_SHOWN) {
                this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.COUPON_NOT_FOUND));
            }
        } finally {
            this.isActive = false;
        }
    }

    async beforeApplying(): Promise<boolean> {
        if (!this.isActive) {
            Logger.warning(`CouponApplier[${this.tabId}]\n -> beforeApplying()\n applying process was stopped`);
            return false;
        }

        this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.BEFORE_APPLYING_COUPONS));

        // get current tab url and open affiliate link, don't await for result
        let tab = await chromep.tabs.get(this.tabId);

        Affiliate.processSupportedStore(this.state.storeId, tab.url, true);

        /**
         * 1.1 Collect and clear coupons
         */
        if (!this.isActive) {
            Logger.warning(`CouponApplier[${this.tabId}]\n -> beforeApplying()\n step 1.1 - applying process was stopped`);
            return false;
        }
        let collectAndClearAppliedCouponsResult = await this.storeConnector.collectAndClearAppliedCoupons();
        await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS);
        if (collectAndClearAppliedCouponsResult instanceof Error) {
            Logger.error(`CouponApplier[${this.tabId}]\n -> beforeApplying()\n -> StoreConnector.collectAndClearAppliedCoupons()\n step 1.1 failed`, collectAndClearAppliedCouponsResult);
            throw collectAndClearAppliedCouponsResult;
        }

        /**
         * 1.2 Fetch cart total BEFORE applying
         */
        if (!this.isActive) {
            Logger.warning(`CouponApplier[${this.tabId}]\n -> beforeApplying()\n step 1.2 - applying process was stopped`);
            return false;
        }
        let cartTotalBeforeCheckingResult = await this.storeConnector.getCartTotal();
        await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS);
        if (cartTotalBeforeCheckingResult instanceof Error) {
            Logger.error(`CouponApplier[${this.tabId}]\n -> beforeApplying()\n -> StoreConnector.getCartTotal()\n step 1.2 failed`, cartTotalBeforeCheckingResult);
            throw cartTotalBeforeCheckingResult;
        }
        if (typeof cartTotalBeforeCheckingResult !== "number") {
            throw Logger.error(`DEV ERROR:\nCouponApplier[${this.tabId}]\n -> beforeApplying()\n -> StoreConnector.getCartTotal()\n getCartTotal() always should return "number" on last step but returned `, cartTotalBeforeCheckingResult);
        }
        this.cartTotal.beforeApplying = cartTotalBeforeCheckingResult;
        Logger.log(`CouponApplier[${this.tabId}] cart total BEFORE applying = $${cartTotalBeforeCheckingResult}`);

        return true;
    }

    async applying() {
        if (!this.isActive) {
            Logger.warning(`CouponApplier[${this.tabId}]\n -> applying()\n applying process was stopped`);
            return false;
        }

        this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.APPLYING_COUPONS));

        /**
         * 2.0 Try coupons one by one
         */
        for (let i = 0; i < this.store.coupons.length; i++) {
            if (!this.isActive) {
                Logger.warning(`CouponApplier[${this.tabId}]\n -> applying()\n step 2.1 - applying process was stopped`);
                return false;
            }
            this.reduxStore.dispatch(setTabCurCouponIndex(this.tabId, i));

            /**
             * 2.1 Before applying coupon
             */
            let beforeApplyingCouponResult = await this.storeConnector.beforeApplyingCoupon();
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS);
            if (beforeApplyingCouponResult instanceof Error) {
                Logger.error(`CouponApplier[${this.tabId}]\n -> applying()\n -> StoreConnector.beforeApplyingCoupon()\n step 2.1 failed`, beforeApplyingCouponResult);
                throw beforeApplyingCouponResult;
            }

            /**
             * 2.2 Apply coupon and get discount
             */
            if (!this.isActive) {
                Logger.warning(`CouponApplier[${this.tabId}]\n -> applying()\n step 2.2 - applying process was stopped`);
                return false;
            }
            Logger.log(`CouponApplier[${this.tabId}] applying coupon "${this.store.coupons[i].code}"...`);
            let applyCouponResult = await this.storeConnector.applyCoupon(this.store.coupons[i].code);
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS);
            if (applyCouponResult instanceof Error) {
                Logger.warning(`CouponApplier[${this.tabId}]\n -> applying()\n -> StoreConnector.applyCoupon()\n step 2.2 failed`, applyCouponResult);
            } else {
                if (applyCouponResult.context) {
                    throw Logger.error(`DEV ERROR:\nCouponApplier[${this.tabId}]\n -> applying()\n -> StoreConnector.applyCoupon()\n applyCoupon() always should return JSON of type "{ discount?: number; cartTotalAfterApply?: number; }" on last step but returned`, applyCouponResult);
                }
                // calculating coupon discount
                let discount = 0;
                if (applyCouponResult.discount) {
                    discount = applyCouponResult.discount;
                }
                if (applyCouponResult.cartTotalAfterApply) {
                    discount = this.cartTotal.beforeApplying - applyCouponResult.cartTotalAfterApply;
                }
                Logger.log(`CouponApplier[${this.tabId}] coupon "${this.store.coupons[i].code}" have discount $${discount.toFixed(2)}`);

                // if we found coupon with discount - don't try others
                if (discount > 0.01) {
                    this.workingCoupon = this.store.coupons[i];
                    break;
                }
            }

            /**
             * 2.3 After applying coupon (WARNING: not firing if coupon found!)
             */
            if (!this.isActive) {
                Logger.warning(`CouponApplier[${this.tabId}]\n -> applying()\n step 2.3 - applying process was stopped`);
                return false;
            }
            let afterApplyingCouponResult = await this.storeConnector.afterApplyingCoupon();
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS);
            if (afterApplyingCouponResult instanceof Error) {
                Logger.error(`CouponApplier[${this.tabId}]\n -> applying()\n -> StoreConnector.afterApplyingCouponResult()\n step 2.1 failed`, afterApplyingCouponResult);
                throw afterApplyingCouponResult;
            }
        }
        return true;
    }

    async afterApplying() {
        if (!this.isActive) {
            Logger.warning(`CouponApplier[${this.tabId}]\n -> afterApplying()\n applying process was stopped`);
            return false;
        }

        if (!this.workingCoupon) {
            this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.COUPON_NOT_FOUND));
            return true;
        }

        this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.AFTER_APPLYING_COUPONS));

        /**
         * 3.1 Fetch cart total AFTER applying
         */
        let cartTotalAfterCheckingResult = await this.storeConnector.getCartTotal();
        await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS);
        if (cartTotalAfterCheckingResult instanceof Error) {
            Logger.error(`CouponApplier[${this.tabId}]\n -> afterApplying()\n -> StoreConnector.getCartTotal()\n step 3.1 failed`, cartTotalAfterCheckingResult);
            throw cartTotalAfterCheckingResult;
        }
        if (typeof cartTotalAfterCheckingResult !== "number") {
            throw Logger.error(`DEV ERROR:\nCouponApplier[${this.tabId}]\n -> afterApplying()\n -> StoreConnector.getCartTotal()\n getCartTotal() always should return "number" on last step but returned `, cartTotalAfterCheckingResult);
        }
        this.cartTotal.afterApplying = cartTotalAfterCheckingResult;
        Logger.log(`CouponApplier[${this.tabId}] cart total AFTER applying = $${cartTotalAfterCheckingResult}`);

        if (!this.isActive) {
            Logger.warning(`CouponApplier[${this.tabId}]\n -> afterApplying()\n applying process was stopped`);
            return false;
        }

        // reload tab and wait until it's ready
        if (this.storeConnector.storeConnectors[this.storeConnector.currentStoreConnectorIndex].metadata.reloadPageAfterApplying) {
            await Promise.all([
                new Promise((resolve) => {
                    this.onTabLoadedHandlers.push(resolve);
                }),
                chromep.tabs.reload(this.tabId).finally(() => Promise.resolve())
            ]);
            // this will let previous view don't blink too fast
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS * 4);
        } else if (!!this.storeConnector.storeConnectors[this.storeConnector.currentStoreConnectorIndex].metadata.redirectToPageAfterApplying) {
            await Promise.all([
                new Promise((resolve) => {
                    this.onTabLoadedHandlers.push(resolve);
                }),
                new Promise((resolve) => {
                    chrome.tabs.update(this.tabId, {
                        url: this.storeConnector.storeConnectors[this.storeConnector.currentStoreConnectorIndex].metadata.redirectToPageAfterApplying
                    }, resolve)
                })
            ]);
            // this will let previous view don't blink too fast
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_BETWEEN_ACTIONS * 4);
        }

        this.reduxStore.dispatch(setTabDiscount(this.tabId, this.cartTotal.beforeApplying - this.cartTotal.afterApplying));
        this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.COUPON_FOUND));

        return true;
    }

    /**
     * Stopping process
     */
    stopApplyingProcess() {
        if (this.isActive) {
            this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.COUPON_NOT_FOUND));
            this.isActive = false;
        }
    }

    async dispose() {
        if (!!this.reduxStore) {
            this.reduxStore.dispatch(setPhase(this.tabId, AppPhase.INACTIVE));
        }
        this.reduxStore = null;
        this.storeConnector = null;
        this.storeConnectorScript = null;
        this.isActive = false;
        this.onTabLoadedHandlers = [];
        this.removeOnStorePageChange();
        this.isDisposed = true;
    }

    async handleTimeout(time: number) {
        await Helpers.wait(time);
        return Error(`CouponApplier[${this.tabId}] timeout`);
    }
}
