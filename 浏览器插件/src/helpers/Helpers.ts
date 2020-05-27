import * as $ from "jquery";
import ErrorTextStatus = JQuery.Ajax.ErrorTextStatus;
import { v4 as uuidv4 } from 'uuid';
import {IDictionary} from "./IDictionary";

export default class Helpers {
    //private only used in this class, static using Helpers._generatedIds, no this.
    private static _generatedIds: any = [];

    static generateId(length: number = 7): string {
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            out = '';
        for (let i = 0, clen = chars.length; i < length; i++) {
            out += chars.substr(0 | Math.random() * clen, 1);
        }
        return Helpers._generatedIds[out] ? Helpers.generateId(length) : (Helpers._generatedIds[out] = out);
    }

    static generateUUIDv4() {
        return uuidv4().toString();
    }

    static wait(minTime: number, maxTime?: number) {
        return new Promise((resolve) => {
            maxTime = maxTime || minTime;
            setTimeout(resolve, Helpers.randomIntFromInterval(minTime, maxTime));
        });
    }

    static waitFor(selectors: string | string[]): Promise<JQuery<HTMLElement>> {
        return new Promise((resolve) => {
            let resolved = false;

            let selector = "";
            if (typeof selectors === 'object') {
                selector = selectors.join(", ");
            } else {
                selector = selectors;
            }

            let elements = $(selector, document);

            if (elements.length > 0) {
                resolve(elements);  //pass obj back.
            } else {
                let observer = new MutationObserver(function () {
                    if (resolved === false) {
                        elements = $(selector, document);
                        if (elements.length > 0) {
                            resolve(elements);
                            observer.disconnect();
                            resolved = true;
                        }
                    }
                });

                observer.observe(document, {
                    childList: true,
                    subtree: true,
                });
            }
        });
    };

    static waitForDisappear(target: HTMLElement | string | string[]) {
        let selector = "";
        if (target instanceof Array) {
            selector = target.join(", ");
        } else if (typeof target === "string") {
            selector = target;
        }
        return Helpers.waitForFilter(() => {
            if (target instanceof HTMLElement) {
                return !target.isConnected;
            } else {
                return $(selector).length === 0;
            }
        });
    }

    static waitForFilter(filter: () => boolean): Promise<void> {
        return new Promise((resolve) => {
            let resolved = false;

            if (filter()) {
                resolve();
            } else {
                let observer = new MutationObserver(function () {
                    if (resolved === false) {
                        if (filter()) {
                            resolve();
                            observer.disconnect();
                            resolved = true;
                        }
                    }
                });

                observer.observe(document, {
                    childList: true,
                    subtree: true,
                });
            }
        });
    };

    static observe(selectors: string | string[], root: HTMLElement | HTMLDocument, callback: (elem: HTMLElement) => void) {
        let selector = "";
        if (typeof selectors === 'object') {
            selector = selectors.join(", ");
        } else {
            selector = selectors;
        }

        let element = $(selector, root).get(0);
        if (element) {
            callback(element);
        }

        let observer = new MutationObserver(function () {
            element = $(selector, root).get(0);
            if (element) {
                callback(element);
            }
        });

        observer.observe(root, {
            childList: true,
            subtree: true,
        });

        return observer;
    };

    static randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * "$2,087.09" => 2087.09
     * @param str
     */
    static parseUsdString(str: string): number {
        try {
            str = str.replace(/[^\d.-]/g, "");
            if (str) {
                return Math.round(parseFloat(str) * 100) / 100;
            } else {
                throw Error;
            }
        } catch (e) {
            console.warn(`Helpers.parseUsdString("${str}") not working`);
        }
        return 0;
    }

    static async ajax(
        type: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", // add methods if will be needed
        url: string,
        isJSON: boolean = false,
        moreSettings?: any,
        retry?: {
            amount: number,
            wait: number
        }
    ): Promise<{
        response: any
        error: {
            jqXHR: any,
            textStatus: ErrorTextStatus,
            errorThrown: string
        }
    }> {
        return new Promise((resolve) => {
            let settings: any = {
                type: type,
                url: url,
                success: (response: any) => {
                    resolve({
                        response,
                        error: null
                    });
                },
                error: async (jqXHR: any, textStatus: ErrorTextStatus, errorThrown: string) => {
                    if (retry && retry.amount > 0) {
                        await Helpers.wait(retry.wait);
                        console.warn(`${type} ${url} request failed. Have ${retry.amount} tries...`);
                        retry.amount--;
                        resolve(this.ajax(type, url, isJSON, moreSettings, retry))
                    }
                    resolve({
                        response: null,
                        error: {
                            jqXHR,
                            textStatus,
                            errorThrown
                        }
                    });
                }
            };
            if (isJSON) {
                settings.dataType = 'JSON';
                settings.contentType = 'application/json';
            }
            if (moreSettings) {
                settings = {
                    ...settings,
                    ...moreSettings,
                };
            }
            $.ajax(settings);
        });
    }

    /**
     * Let run custom code in on-page context
     * and return some data in callback
     *
     * Example of code:
     *
     * 1. Sync code
     * let cartId = window.cartId;  // window.cartId exists only in on-page context
     * callback(cartId);            // return data by callback
     *
     * 2. Async code
     * async onPageFunction() {
     *     // some async code
     *     return data;
     * }
     * onPageFunction().then(callback);
     *
     */
    static async runCodeAtPageContext(code: string) {
        return new Promise<any>((resolve) => {
            let id = Helpers.generateId().toString();

            // appending on-page callback function
            code += `\n
                function callback(data) {
                    window.postMessage({
                        id: "${id}",
                        details: data
                    }, "*");
                }
            `;

            // add one-time listener to wait while
            // on-page callback function will be called
            window.addEventListener("message", (event: any) => {
                // verify event origin
                if (event.source != window) return;
                // verify event id000
                if (event.data.id !== id) return;
                resolve(event.data.details);
            }, { once: true });

            let scriptElem = document.createElement('script');
            scriptElem.textContent = code.toString();
            scriptElem.id = id;
            $("fatcoupon-root").append(scriptElem);
            scriptElem.remove();
        });
    }

    static getAllFormData(Element?: String | JQuery<HTMLElement>) {
        Element = Element || 'body';
        var All_Page_Data: any = {};
        var All_Forms_Data_Temp: any = {};
        var rootElement: JQuery<HTMLElement>;
        if (typeof Element === 'string') {
            rootElement = $(Element);
        } else {
            rootElement = Element as JQuery<HTMLElement>
        }

        rootElement.find('input,select,textarea').each(function (i) {
            All_Forms_Data_Temp[i] = $(this);
        });

        $.each(All_Forms_Data_Temp, function () {
            var input = $(this);
            var Element_Name;
            var Element_Value: any;

            if ((input.attr('type') == 'submit') || (input.attr('type') == 'button')) {
                return true;
            }

            if ((input.attr('name') !== undefined) && (input.attr('name') != '')) {
                Element_Name = input.attr('name').trim();
            }
            else if ((input.attr('id') !== undefined) && (input.attr('id') != '')) {
                Element_Name = input.attr('id').trim();
            }
            else if ((input.attr('class') !== undefined) && (input.attr('class') != '')) {
                Element_Name = input.attr('class').trim();
            }

            if (input.val() !== undefined) {
                if (input.attr('type') == 'checkbox') {
                    Element_Value = input.parent().find('input[name="' + Element_Name + '"]:checked').val();
                }
                else if ((input.attr('type') == 'radio')) {
                    //   Element_Value = $('input[name="'+Element_Name+'"]:checked',Element).val();
                    Element_Value = $('input[name="' + Element_Name + '"]:checked').val();
                }
                else {
                    Element_Value = input.val();
                }
            }
            else if (input.text() != undefined) {
                Element_Value = input.text();
            }

            if (Element_Value === undefined) {
                Element_Value = '';
            }

            if (Element_Name !== undefined) {
                var Element_Array = new Array();
                if (Element_Name.indexOf(' ') !== -1) {
                    Element_Array = Element_Name.split(/(\s+)/);
                }
                else {
                    Element_Array.push(Element_Name);
                }

                $.each(Element_Array, function (index, Name) {
                    Name = Name.trim();
                    if (Name != '') {
                        All_Page_Data[Name] = Element_Value;
                    }
                });
            }
        });
        return All_Page_Data;
    }

    static replaceContent(NC: string) {
        document.open();
        document.write(NC);
        document.close();
    }

    static applyURLParams(url: string, params: {
        [index: string]: string
    }) {
        let urlBuilder = new URL(url);
        for (let key in params as IDictionary<string>) {
            urlBuilder.searchParams.set(key, params[key]);
        }
        return urlBuilder.toString();
    }

    static isValidDomainRegex = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
    static isValidDomain(hostname: string) {
        return this.isValidDomainRegex.test(hostname);
    }

    static substringBetween (s: string, a:string, b:string)  {
        var p = s.indexOf(a) + a.length;
        return s.substring(p, s.indexOf(b, p));
    }
}

if (!window.Fatcoupon) window.Fatcoupon = { Modules: {} };
(window.Fatcoupon).Modules.Helpers = Helpers;
