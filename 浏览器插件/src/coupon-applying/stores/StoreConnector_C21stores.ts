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

    class StoreConnector_C21Stores extends StoreConnector {

        metadata = {
            pageSelector: ".promo-code-form",
            cartTotalSelector: '.grand-total-sum',
            reloadPageAfterApplying: true,
            timeouts: {
                collectAndClearAppliedCoupons: 10000,
                getCartTotal: 5000,
                beforeApplyingCoupon: 5000,
                applyCoupon: 5000,
                afterApplyingCoupon: 5000,
            }
        };

        functions = {
            getToken: () => {
                let csrfToken = $("[name='csrf_token']");
                if (csrfToken.length === 0) {
                    throw Error("ERROR: csrfToken not found");
                }
                return csrfToken.val().toString();
            }
        };

        context = {};

        async collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
            let appliedCoupons: string[] = [];

            let appliedCouponElems = $(".coupons-and-promos [data-code]");

            for (let appliedCouponElem of appliedCouponElems) {
                let appliedCoupon = $(appliedCouponElem).attr("data-code");

                if (appliedCoupons.indexOf(appliedCoupon) > -1) {
                    continue;
                }

                let appliedCouponUUID = $(appliedCouponElem).attr("data-uuid");

                let url = new URL("https://www.c21stores.com/on/demandware.store/Sites-C21-Site/default/Cart-RemoveCouponLineItem");
                url.searchParams.set("code", appliedCoupon);
                url.searchParams.set("uuid", appliedCouponUUID);

                let removeCouponRequest = await Helpers.ajax(
                    "GET",
                    url.toString(),
                    true
                );
                if (removeCouponRequest.error) {
                    throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon remove request error | ${removeCouponRequest.error}`);
                }

                await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
            }

            return appliedCoupons;
        }

        async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
            return StoreConnectorHelpers.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector);
        }

        beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
            return;
        }

        async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
            let url = new URL("https://www.c21stores.com/on/demandware.store/Sites-C21-Site/default/Cart-AddCoupon");
            url.searchParams.set("csrf_token", this.functions.getToken());
            url.searchParams.set("couponCode", code);

            let applyCouponRequest = await Helpers.ajax(
                'GET',
                url.toString(),
                true
            );
            if (applyCouponRequest.error) {
                throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${applyCouponRequest.error}`);
            }
            if (applyCouponRequest.response.error) {
                return {
                    discount: 0
                }
            }
            return {
                cartTotalAfterApply: Helpers.parseUsdString(applyCouponRequest.response.totals.grandTotal)
            };
        }

        async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
            return;
        }
    }

    // @ts-ignore
    window.Fatcoupon.StoreConnector = new MultipageStoreConnectorWrapper(
        // @ts-ignore
        new StoreConnector_C21Stores(false)
    );
})();
