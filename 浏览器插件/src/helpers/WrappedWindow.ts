import StoreConnector from "../coupon-applying/StoreConnector";
import Helpers from "./Helpers";
import Logger from "./Logger";
import MobileNativeMsgWrapper from "./MobileNativeMsgWrapper";

declare global {
    interface Window {
        Fatcoupon: {
            StoreConnector?: StoreConnector, // only derived classes, not base class, populated by store connector itself
            Helpers?: typeof Helpers,
            Logger?: typeof Logger,
            $?: JQueryStatic,
            MobileNativeMsgWrapper?: typeof MobileNativeMsgWrapper,
            ModulesImporter?: any,
            Modules?: any,
        }

        callNative: (action: string, payload: string) => void
    }
}
