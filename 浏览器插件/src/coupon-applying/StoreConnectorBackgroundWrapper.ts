import Helpers from "../helpers/Helpers";
import MultipageStoreConnectorWrapper from "./MultipageStoreConnectorWrapper";
import {SteppedContext, StoreConnectorFunctionResult} from "./StoreConnectorFunctionResult";

export default class StoreConnectorBackgroundWrapper extends MultipageStoreConnectorWrapper {

    readonly runOnPageContext: (code: string) => Promise<any>;
    readonly onTabLoadedHandlers: (() => void)[];

    constructor(runOnPageContext: (code: string) => Promise<any>, onTabLoadedHandlers: (() => void)[]) {
        super();
        this.runOnPageContext = runOnPageContext;
        this.onTabLoadedHandlers = onTabLoadedHandlers;
    }

    async init() {
        await this.runOnPageContext(`
            resolve(window.Fatcoupon.StoreConnector.init());
        `);
    }

    async collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
        return await Promise.race([
            this.runOnPageContext(`
                resolve(await window.Fatcoupon.StoreConnector.collectAndClearAppliedCoupons());
            `),
            Helpers.wait(this.metadata.timeouts.collectAndClearAppliedCoupons)
               .then(() => Promise.reject("collectAndClearAppliedCoupons() timeout"))
        ]);
    }

    async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
        return await Promise.race([
            this.runOnPageContext(`
                resolve(await window.Fatcoupon.StoreConnector.getCartTotal());
            `),
            Helpers.wait(this.metadata.timeouts.getCartTotal)
                .then(() => Promise.reject("getCartTotal() timeout"))
        ]);
    }

    async beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
        return await Promise.race([
            this.runOnPageContext(`
                resolve(await window.Fatcoupon.StoreConnector.beforeApplyingCoupon());
            `),
            Helpers.wait(this.metadata.timeouts.beforeApplyingCoupon)
                .then(() => Promise.reject("beforeApplyingCoupon() timeout"))
        ]);
    }

    async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
        return await Promise.race([
            new Promise(async (resolve) => {
                let result: SteppedContext = {
                    context: {
                        step: 0
                    }
                };
                while (!!result.context) {
                    result = await this.runOnPageContext(`
                        Object.assign(window.Fatcoupon.StoreConnector.context, ${JSON.stringify(result.context)});
                        resolve(await window.Fatcoupon.StoreConnector.applyCoupon("${code}"));
                    `);
                    if (result instanceof Error) {
                        throw result;
                    }
                    if (!result.context) break;
                    // wait until page is reloaded
                    await new Promise((resolve) => {
                        this.onTabLoadedHandlers.push(resolve);
                    });
                }
                resolve(result);
            }),
            Helpers.wait(this.metadata.timeouts.applyCoupon)
                .then(() => Promise.reject("applyCoupon() timeout"))
        ]);
    }

    async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
        return await Promise.race([
            this.runOnPageContext(`
                resolve(await window.Fatcoupon.StoreConnector.afterApplyingCoupon());
            `),
            Helpers.wait(this.metadata.timeouts.afterApplyingCoupon)
                .then(() => Promise.reject("afterApplyingCoupon() timeout"))
        ]);
    }
}
