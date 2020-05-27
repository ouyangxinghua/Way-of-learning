import {
    StoreConnectorFunctionResult
} from "./StoreConnectorFunctionResult";
import StoreConnector from "./StoreConnector";

export default class MultipageStoreConnectorWrapper extends StoreConnector {

    constructor(...storeConnectors: StoreConnector[]) {
        super(true, storeConnectors);
    }

    get context() {
        return this.storeConnectors[this.currentStoreConnectorIndex].context;
    }

    set context(value: any) {
        this.storeConnectors[this.currentStoreConnectorIndex].context = value;
    }

    get functions() {
        return this.storeConnectors[this.currentStoreConnectorIndex].functions;
    }

    get metadata() {
        return this.storeConnectors[this.currentStoreConnectorIndex].metadata;
    }

    async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
        return await this.storeConnectors[this.currentStoreConnectorIndex].afterApplyingCoupon();
    }

    async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
        return await this.storeConnectors[this.currentStoreConnectorIndex].applyCoupon(code);
    }

    async beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
        return await this.storeConnectors[this.currentStoreConnectorIndex].beforeApplyingCoupon();
    }

    async collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
        return await this.storeConnectors[this.currentStoreConnectorIndex].collectAndClearAppliedCoupons();
    }

    async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
        return await this.storeConnectors[this.currentStoreConnectorIndex].getCartTotal();
    }
}
