import {Response} from "./Response";
import Coupon from "./Coupon";
import Store from "./Store";
import Settings from "../helpers/Settings";
import Helpers from "../helpers/Helpers";
import {StoreConnectorMetadata} from "../coupon-applying/StoreConnector";
import jqXHR = JQuery.jqXHR;

const BASE_API_URL = Settings.BASE_API_URI + "/api/extension";

function fetchAny<TResponse>(request: {
     method: "GET" | "POST" | "PUT" | "DELETE"
     endpoint: string
     params?: any
     data?: any
     transform?: (apiResponse: any) => any
     tries?: number
     rawText?: boolean
 }
): Promise<TResponse> {
    if (typeof request.tries === "undefined") {
        request.tries = 3;
    }
    let url = new URL(`${request.endpoint}`);
    Object.keys(request.params || {})
        .forEach(key => url.searchParams.append(key, request.params[key]));
    let settings: any = {
        method: request.method,
        headers: {
            'Content-Type': request.rawText ? 'text/plain' : 'application/json'
        },
        timeout: 15000,
        cache: false
    };
    if (request.data) {
        settings.body = JSON.stringify(request.data);
    }

    return new Promise<TResponse>((resolve) => {
        $.ajax({
            url: url.toString(),
            ...settings,
            success: (response: any) => {
                if (request.rawText) {
                    if (request.transform) {
                        response = request.transform(response);
                    }
                    return resolve(response);
                }
                if (!!response.data.data) {
                    response.data = response.data.data;
                }
                if (request.transform) {
                    response.data = request.transform(response.data);
                }
                return resolve(response);
            },
            error: (jqXHR: jqXHR) => {
                if (request.tries <= 1) {
                    // @ts-ignore
                    return resolve(new Error(jqXHR.toString()));
                }
                return Helpers.wait(1000).then(() => {
                    request.tries--;
                    return resolve(fetchAny(request));
                });
            }
        });
    });
}

export const ApiWrapper = {
    stores: {
        getList: async () => fetchAny<Response<Store[]>>({
            method: "GET",
            endpoint: chrome.runtime.getURL(`api-files/stores_getList.json`),
            transform: (apiResponse: {
                id: string;
                name: string;
                domain: string;
                urls: string[];
            }[]) => {
                return apiResponse.map((store) => new Store(store.id, store.name, store.urls));
            },
            tries: 10
        }),
        getStoreConnector: (storeId: string) => fetchAny<Response<string>>({
            method: "GET",
            endpoint: `/stores/${storeId}/scripts/extension`,
            transform: (apiResponse: string) => {
                return {
                    data: apiResponse
                };
            },
            rawText: true,
            tries: 3
        }),
        getStore: (storeId: string) => fetchAny<Response<Store>>({
            method: "GET",
            endpoint: chrome.runtime.getURL(`api-files/stores_getStore_${storeId}.json`),
            transform: (apiResponse: {
                coupons: Coupon[];
                localScript: string;
            }) => {
                let store = new Store();
                store.coupons = apiResponse.coupons;
                store.localScript = apiResponse.localScript;
                return store;
            },
            tries: 3
        })
    },

    affiliate: {
        getTrip: (storeId: string) => fetchAny<Response<string>>({
            method: "POST",
            endpoint: `/trips`,
            data:{
                storeId: storeId
            },
            transform: (apiResponse: {
                id: string;
            }) => {
                return apiResponse.id;
            },
            tries: 3
        })
    },
    scripts: {
        getUIScript: () => fetchAny<Response<string>>({
            method: "GET",
            endpoint: `/scripts/ui`,
            transform: (apiResponse: string) => {
                return {
                    data: apiResponse
                };
            },
            rawText: true,
            tries: 3
        })
    }
};
