import StoreConnector from "./StoreConnector";
import Settings from "../helpers/Settings";
import MultipageStoreConnectorWrapper from "./MultipageStoreConnectorWrapper";
import {StoreConnectorFunctionResult} from "./StoreConnectorFunctionResult";

// hack, if you have idea to export in this case - let me know. Mike
window.Fatcoupon.ModulesImporter = async () => {
    if (!window.Fatcoupon) {
        window.Fatcoupon = {};
    }

    let modules: {
        StoreConnector: typeof StoreConnector,
        MultipageStoreConnectorWrapper: typeof MultipageStoreConnectorWrapper,
        Settings: typeof Settings,
        StoreConnectorFunctionResult?: typeof StoreConnectorFunctionResult, // here we passing only types so not needed value
    } = {
        StoreConnector: StoreConnector,
        MultipageStoreConnectorWrapper: MultipageStoreConnectorWrapper,
        Settings: Settings
    };

    (<any>window.Fatcoupon).Modules = modules;

    // @ts-ignore
    await import(/* webpackIgnore: true */'chrome-extension://nefpialbilfbjkjcgmgbpmnhlikdoana/non-obfuscated-modules/Helpers.js');
    // @ts-ignore
    await import(/* webpackIgnore: true */'chrome-extension://nefpialbilfbjkjcgmgbpmnhlikdoana/non-obfuscated-modules/UIHelpers.js');
    // @ts-ignore
    await import(/* webpackIgnore: true */'chrome-extension://nefpialbilfbjkjcgmgbpmnhlikdoana/non-obfuscated-modules/Cookies.js');
    // @ts-ignore
    await import(/* webpackIgnore: true */'chrome-extension://nefpialbilfbjkjcgmgbpmnhlikdoana/non-obfuscated-modules/StoreConnectorHelpers.js');

    return (<any>window.Fatcoupon).Modules;
};
