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

    class StoreConnector_Dockers extends StoreConnector {

        metadata = {
            pageSelector: "#divPromoArea",
            cartTotalSelector: "#grandTotalRight",
            timeouts: {
                collectAndClearAppliedCoupons: 10000,
                getCartTotal: 5000,
                beforeApplyingCoupon: 5000,
                applyCoupon: 10000,
                afterApplyingCoupon: 5000,
            }
        };

        functions = {};

        context = {};

        async collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
            let appliedCoupons: string[] = [];
            let couponElems = $("#divPromoInfo > #spanPromoName:visible");

            for (let couponElem of couponElems) {
                appliedCoupons.push(couponElem.innerText);
            }

            if (couponElems.length > 0) {
                await Helpers.runCodeAtPageContext(`
                    fnRemovePromoCode();
                    callback();
                `);

                // wait while request processed by page
                await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
                await Helpers.waitForFilter(() => {
                    return $(".loading:not(:visible)").length > 0;
                });
            }

            return appliedCoupons;
        }

        async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
            return StoreConnectorHelpers.getCartTotalBySelector(this.metadata.cartTotalSelector);
        }

        beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
            return;
        }

        async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
            $("#txt_promoCode").val(code);

            await Helpers.runCodeAtPageContext(`
                fnApplyPromoCode();
                callback();
            `);

            // wait while request processed by page
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
            await Helpers.waitForFilter(() => {
                return $(".loading:not(:visible)").length > 0;
            });

            let result = await this.getCartTotal();
            return {
                cartTotalAfterApply: result
            };
        }

        async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
            return;
        }
    }

    window.Fatcoupon.StoreConnector = new MultipageStoreConnectorWrapper(
        // @ts-ignore
        new StoreConnector_Forever21(false)
    );
})();
