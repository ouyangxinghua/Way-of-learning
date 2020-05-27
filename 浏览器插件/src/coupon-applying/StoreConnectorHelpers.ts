import Helpers from "../helpers/Helpers";
import * as $ from "jquery";
import {StoreConnectorFunctionResult} from "./StoreConnectorFunctionResult";

export default class StoreConnectorHelpers {

    static async getCartTotalBySelector(cartTotalSelector: string) {
        return new Promise<typeof StoreConnectorFunctionResult.GetCartTotal>( async (resolve) => {
            try {
                resolve(Helpers.parseUsdString($(cartTotalSelector).text()));
            } catch (error) {
                throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | ${error}`);
            }
        });
    }

    static async getCartTotalBySelectorLoadPage(cartTotalSelector: string) {
        return new Promise<typeof StoreConnectorFunctionResult.GetCartTotal>( async (resolve) => {
            let getCartPageRequest = await Helpers.ajax(
                'GET',
                document.location.href,
                false
            );
            if (getCartPageRequest.error) {
                throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | cannot fetch basket data | ${getCartPageRequest.error}`);
            }

            let cartTotalElem = $(getCartPageRequest.response).find(cartTotalSelector);
            if (cartTotalElem.length === 0) {
                throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | cart total element not found on cart page`);
            }
            resolve(Helpers.parseUsdString(cartTotalElem[0].innerText));
        });
    }
}

if (!window.Fatcoupon) window.Fatcoupon = { Modules: {} };
(window.Fatcoupon).Modules.StoreConnectorHelpers = StoreConnectorHelpers;
