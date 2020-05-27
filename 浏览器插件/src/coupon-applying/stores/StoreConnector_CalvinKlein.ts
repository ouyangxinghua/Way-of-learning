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

    class StoreConnector_CalvinKlein extends StoreConnector {

        metadata = {
            pageSelector: "#PromotionCodeForm",
            cartTotalSelector: ".order_total_figures",
            timeouts: {
                collectAndClearAppliedCoupons: 10000,
                getCartTotal: 5000,
                beforeApplyingCoupon: 5000,
                applyCoupon: 10000,
                afterApplyingCoupon: 5000,
            }
        };

        functions = {
            getPromocodeField: () => {
                return $('#promoCode') as JQuery<HTMLInputElement>;
            }
        };

        context = {};

        async collectAndClearAppliedCoupons(): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
            let appliedCoupons = [];

            let appliedCouponElems = $(".currentPromoCode");
            for (let appliedCouponElem of appliedCouponElems) {
                appliedCoupons.push($(appliedCouponElem).find(".bold").text());
                await UIHelpers.simulateClick($(appliedCouponElem).find("a"));
                await Helpers.waitForDisappear(appliedCouponElem);
                await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
            }

            return appliedCoupons;
        }

        async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
            return await StoreConnectorHelpers.getCartTotalBySelector(this.metadata.cartTotalSelector);
        }

        async beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
            let promoField = this.functions.getPromocodeField();
            if (!promoField.is(":visible")) {
                await UIHelpers.simulateClick(promoField.closest(".checkoutContainer").find("> .checkoutHeader"));
            }
            await UIHelpers.clearInput(promoField);
        }

        async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
            await UIHelpers.sendKeys(code, this.functions.getPromocodeField());
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
            await UIHelpers.simulateClick(this.functions.getPromocodeField().siblings("button"));
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);

            let applyResult = await Promise.race([
                Helpers
                    .waitFor(".currentPromoCode")
                    .then(() => true),
                Helpers
                    .waitFor("#fieldErrorMessage")
                    .then(() => false)
            ]);
            return applyResult ? {
                cartTotalAfterApply: Helpers.parseUsdString($(this.metadata.cartTotalSelector).text())
            } : {
                discount: 0
            };
        }

        async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
            // if coupon was applied - remove it
            await this.collectAndClearAppliedCoupons();
        }
    }

    window.Fatcoupon.StoreConnector = new MultipageStoreConnectorWrapper(
        // @ts-ignore
        new StoreConnector_CalvinKlein(false)
    );
})();
