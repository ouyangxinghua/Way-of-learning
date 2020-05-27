(async () => {
    // @ts-ignore
    await import(/* webpackIgnore: true */'chrome-extension://nefpialbilfbjkjcgmgbpmnhlikdoana/stores/modules.js');
    let importer = await window.Fatcoupon.ModulesImporter();
    const {
        StoreConnector,
        StoreConnectorHelpers,
        StoreConnectorFunctionResult,
        MultipageStoreConnectorWrapper,
        Helpers,
        UIHelpers,
        Settings,
        Cookies,
    } = importer;

    class StoreConnector_Journeys extends StoreConnector {

        metadata = {
            pageSelector: ".bag-summary-panel",
            cartTotalSelector: "#orderamount",
            reloadPageAfterApplying: true,
            timeouts: {
                collectAndClearAppliedCoupons: 10000,
                getCartTotal: 5000,
                beforeApplyingCoupon: 5000,
                applyCoupon: 5000,
                afterApplyingCoupon: 5000,
            }
        };

        functions = {};

        context = {};

        async collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
            let appliedCoupons: string[] = [];

            let resetCouponRequest = await Helpers.ajax(
                'POST',
                "https://www.journeys.com/api/cart/",
                false,
                {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    data: {
                        Mode: "removecoupon"
                    }
                });
            if (resetCouponRequest.error) {
                throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${resetCouponRequest.error}`);
            }

            return appliedCoupons;
        }

        async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
            let cartTotalRequest = await Helpers.ajax(
                'GET',
                "https://www.journeys.com/api/cart/",
                false
            );
            if (cartTotalRequest.error) {
                throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | cannot fetch basket data | ${cartTotalRequest.error}`);
            }
            return JSON.parse(cartTotalRequest.response).Total;
        }

        beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
            return;
        }

        async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
            let applyCouponRequest = await Helpers.ajax(
                'POST',
                "https://www.journeys.com/api/cart/",
                false,
                {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    data: {
                        Mode: "addcoupon",
                        couponcode: code
                    }
                });
            if (applyCouponRequest.error) {
                throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${applyCouponRequest.error}`);
            }
            return {
                cartTotalAfterApply: JSON.parse(applyCouponRequest.response).Total
            }
        }

        async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
            // if coupon was applied - remove it
            await this.collectAndClearAppliedCoupons();
        }
    }

    // @ts-ignore
    window.Fatcoupon.StoreConnector = new MultipageStoreConnectorWrapper(
        // @ts-ignore
        new StoreConnector_Journeys(false)
    );
})();
