import Settings, {AppMode} from "./Settings";
import Logger from "./Logger";
import {ApiWrapper} from "../api/ApiWrapper";
import WebNavigationFramedCallbackDetails = chrome.webNavigation.WebNavigationFramedCallbackDetails;

export default class Affiliate {

    static tabs: number[] = [];
    static appliedStoreIds: string[] = [];

    static processIfAffiliateTab(tabId: number) {
        let index = this.tabs.indexOf(tabId);
        if (index === -1) {
            return false;
        }
        Logger.log(`affiliate tab #${tabId} loaded, closing`);
        chrome.tabs.remove(tabId);
        return true;
    }

    static isStoreProcessed(storeId: string) {
        return this.appliedStoreIds.indexOf(storeId) > -1;
    }

    static async processSupportedStore(storeId: string, url: string, force: boolean = false) {

    }
}
