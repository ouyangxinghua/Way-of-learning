import Logger from "../helpers/Logger";
import Helpers from "../helpers/Helpers";
import {
    StoreConnectorFunctionResult
} from "./StoreConnectorFunctionResult";
import Settings, {AppTarget} from "../helpers/Settings";
import MobileNativeMsgWrapper from "../helpers/MobileNativeMsgWrapper";
import * as $ from "jquery";

export type StoreConnectorMetadata = {
    pageSelector: string;
    cartTotalSelector?: string;
    reloadPageAfterApplying?: boolean;
    redirectToPageAfterApplying?: string;

    timeouts: {
        collectAndClearAppliedCoupons: number;
        getCartTotal: number;
        beforeApplyingCoupon: number;
        applyCoupon: number;
        afterApplyingCoupon: number;
    }

    [key: string]: any;  // any other necessary fields
};

export default abstract class StoreConnector {

    storeConnectors: StoreConnector[];
    public currentStoreConnectorIndex: number = null;

    constructor(isRoot: boolean = true, storeConnectors: StoreConnector[] = null) {
        if (storeConnectors) {
            this.storeConnectors = storeConnectors;
        } else {
            if (isRoot) {
                this.storeConnectors = [ this ];
            }
        }
    }

    init() {
        Logger.log(`window.Fatcoupon.StoreConnector = ${this.constructor.name} [ ${this.storeConnectors.map((sc) => sc.constructor.name).join(", ")} ]`);
        this.monitorStorePageChanges();
    }

    abstract metadata: StoreConnectorMetadata;

    /**
     * Shared data which may be helpful between functions
     */
    abstract context: any;

    abstract functions: any;

    abstract collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons>

    abstract getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal>

    abstract beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon>

    abstract applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon>

    abstract afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon>

    async handleTimeout(time: number) {
        await Helpers.wait(time);
        return Error("timeout");
    }

    async monitorStorePageChanges(pagePersist: boolean = false) {
        let resolved = false;
        if (Settings.APP_TARGET === AppTarget.EXTENSION) {
            chrome.runtime.sendMessage({
                action: "onStorePageChange",
                data: this.currentStoreConnectorIndex
            });
        } else {
            MobileNativeMsgWrapper.callNative(MobileNativeMsgWrapper.Messages.CHECKOUT_PAGE_INDEX_CHANGED, this.currentStoreConnectorIndex);
        }
        pagePersist = await new Promise<boolean>(async (resolve) => {
            for (let i = 0; i < this.storeConnectors.length; i++) {
                if (pagePersist || this.currentStoreConnectorIndex !== i) {
                    Helpers.waitFor(this.storeConnectors[i].metadata.pageSelector)
                        .then(async () => {
                            if (resolved) return;
                            resolved = true;
                            this.currentStoreConnectorIndex = i;
                            resolve(true);
                        });
                }
            }
            if (!pagePersist && this.currentStoreConnectorIndex !== null) {
                Helpers.waitForDisappear(this.storeConnectors[this.currentStoreConnectorIndex].metadata.pageSelector)
                    .then(async () => {
                        if (resolved) return;
                        resolved = true;
                        this.currentStoreConnectorIndex = null;
                        resolve(false);
                    });
            }
        });
        if (pagePersist) {
            let pageName = this.metadata.pageName
                ? `"${this.metadata.pageName}" `
                : "";
            Logger.log(`store page ${pageName}found`);
        } else {
            Logger.log(`store page gone`);
        }
        this.monitorStorePageChanges(!pagePersist);
    }
}
