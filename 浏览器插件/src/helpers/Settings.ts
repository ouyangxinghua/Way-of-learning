export enum AppTarget {
    EXTENSION = "extension",
    MOBILE = "mobile"
}

export enum AppMode {
    DEV = "development",
    PROD = "production"
}

let apiBaseUrl = "";
switch(process.env.mode) {
    case AppMode.DEV:
        apiBaseUrl = "http://47.101.69.249:8370";
        break;
    case AppMode.PROD:
        apiBaseUrl = "https://apis.fatcoupon.com";
        break;
    default:
        throw "AppMode not specified!"
}
let scriptBaseUrl = "";
switch(process.env.script) {
    case "local":
        scriptBaseUrl = process.env.target === AppTarget.EXTENSION
            ? chrome.runtime.getURL("stores")
            : "";
        break;
    case "cdn":
        scriptBaseUrl = process.env.mode === AppMode.DEV
            ? "https://dpmgitk7lw7ve.cloudfront.net/scripts"
            : "https://d3itvsmwj0r86k.cloudfront.net/scripts";
        break;
    default:
        throw "AppMode not specified!"
}
const Settings = {
    MODE: process.env.mode,

    APP_TARGET: process.env.target,

    BASE_URI: "https://www.fatcoupon.com",
    BASE_API_URI: apiBaseUrl,
    BASE_SCRIPT_URI: scriptBaseUrl,

    REDUX_PORT_NAME: "FATCOUPON",

    SUPPORTED_STORES_UPDATE_TIME: 10,  // min
    STORE_METADATA_AND_COUPONS_UPDATE_TIME: 30,  // min

    COUPON_APPLYING: {
        DELAY_INSIDE_ACTION: 250,
        DELAY_BETWEEN_ACTIONS: 250
    },

    AFFILIATE: {
        SKIM_KEY: "41807X1085706"
    },

    SHOW_LOG: process.env.mode === AppMode.DEV
};

export default Settings;
