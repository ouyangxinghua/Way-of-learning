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

    class StoreConnector_Adidas_Reebok extends StoreConnector {

        metadata = {
            pageSelector: "[class^='checkout_page']",
            reloadPageAfterApplying: true,
            timeouts: {
                collectAndClearAppliedCoupons: 10000,
                getCartTotal: 5000,
                beforeApplyingCoupon: 5000,
                applyCoupon: 5000,
                afterApplyingCoupon: 10000,
            }
        };

        functions = {
            getToken: () => {
                let token = window.localStorage.getItem('jwtToken');
                if (!token) {
                    throw Error("ERROR: token not found");
                }
                return token;
            },
            getBasketId: () => {
                let basketId = window.localStorage.getItem('basketId');
                if (!basketId) {
                    throw Error("ERROR: basketId not found");
                }
                return basketId;
            }
        };

        context = {
            basketData: null as any
        };

        async collectAndClearAppliedCoupons(useContext: boolean = false): Promise<typeof StoreConnectorFunctionResult.CollectAndClearAppliedCoupons> {
            debugger;
            if (!useContext || !this.context.basketData) {
                let basketDataRequest = await Helpers.ajax(
                    'GET',
                    `https://${location.hostname}/api/checkout/customer/baskets?sitePath=us`,
                    true,
                    {
                        headers: {
                            "checkout-authorization": this.functions.getToken()
                        }
                    });
                if (basketDataRequest.error) {
                    throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | cannot fetch basket data | ${basketDataRequest.error}`);
                }
                this.context.basketData = basketDataRequest.response;
                await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
            }

            let appliedCoupons = [];

            // cancelling coupons one by one from the last till there are no coupons in list
            // usually need to cancel only last one
            while (this.context.basketData.couponList && this.context.basketData.couponList.length > 0) {
                let lastCoupon = this.context.basketData.couponList[this.context.basketData.couponList.length - 1];
                appliedCoupons.push(lastCoupon.couponCode);
                let basketDataRequest = await Helpers.ajax(
                    'DELETE',
                    `https://${location.hostname}/api/checkout/baskets/${this.functions.getBasketId()}/coupons/${lastCoupon.id}?sitePath=us`,
                    true,
                    {
                        headers: {
                            "checkout-authorization": this.functions.getToken()
                        }
                    });
                if (basketDataRequest.error) {
                    throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | cannot fetch basket data | ${basketDataRequest.error}`);
                }
                this.context.basketData = basketDataRequest.response;
                await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION);
            }

            return appliedCoupons;
        }

        async getCartTotal(): Promise<typeof StoreConnectorFunctionResult.GetCartTotal> {
            let basketDataRequest = await Helpers.ajax(
                'GET',
                `https://${location.hostname}/api/checkout/customer/baskets?sitePath=us`,
                true,
                {
                    headers: {
                        "checkout-authorization": this.functions.getToken()
                    }
                });
            if (basketDataRequest.error) {
                throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | cannot fetch basket data | ${basketDataRequest.error}`);
            }
            this.context.basketData = basketDataRequest.response;
            return basketDataRequest.response.pricing.total || 0;
        }

        beforeApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.BeforeApplyingCoupon> {
            return;
        }

        async applyCoupon(code: string): Promise<typeof StoreConnectorFunctionResult.ApplyCoupon> {
            let basketDataRequest = await Helpers.ajax(
                'POST',
                `https://${location.hostname}/api/checkout/baskets/${this.functions.getBasketId()}/coupons/?sitePath=us`,
                true,
                {
                    data: JSON.stringify({
                        couponCode: code
                    }),
                    headers: {
                        "checkout-authorization": this.functions.getToken()
                    }
                });
            if (basketDataRequest.error) {
                if (basketDataRequest.error.jqXHR.status === 400 &&
                    basketDataRequest.error.jqXHR.responseJSON.errorCode === "InvalidCouponCodeException"
                ) {
                    this.context.basketData = basketDataRequest.response;
                    return {
                        discount: 0
                    };
                }
                throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | cannot fetch basket data | ${basketDataRequest.error}`);
            }
            this.context.basketData = basketDataRequest.response;
            return {
                cartTotalAfterApply: basketDataRequest.response.pricing.total || 0
            };
        }

        async afterApplyingCoupon(): Promise<typeof StoreConnectorFunctionResult.AfterApplyingCoupon> {
            // applying additional delay while otherwise store cannot apply next coupons (more than 3)
            await Helpers.wait(Settings.COUPON_APPLYING.DELAY_INSIDE_ACTION * 10);
            // if coupon was applied - remove it
            if (this.context.basketData && this.context.basketData.couponList) {
                await this.collectAndClearAppliedCoupons(true);
            }
        }
    }

    window.Fatcoupon.StoreConnector = new MultipageStoreConnectorWrapper(
        // @ts-ignore
        new StoreConnector_Adidas_Reebok(false)
    );
})();
