import Settings, {AppTarget} from "./Settings";
import MobileNativeMsgWrapper from "./MobileNativeMsgWrapper";
import {BrowserStorage} from "./BrowserStorage";

export default class Logger {

    static isShow: boolean = Settings.SHOW_LOG;

    static log(message: string | number, ...args: any[]) {
        let stacktrace = new Error().stack.split("\n");
        if (typeof message === "string" && message.length > 0) {
            message = message[0].toUpperCase() + message.substr(1);
        }
        let isBackgroundPage = !!window["chrome"] && !!chrome.permissions;
        let logArgs: any[] = [];
        if (isBackgroundPage) {
            logArgs = [
                `%c${message}`,
                "font-size: 14px; font-weight: 600;",
                ...args,
                "\n" + stacktrace[2]
            ];
        } else {
            logArgs = [
                `%cFatcoupon: %c${message}`,
                "font-size: 14px; font-weight: 700;",
                "font-size: 14px; font-weight: 600;",
                ...args,
                "\n" + stacktrace[2]
            ];
        }
        if (this.isShow) {
            console.log(...logArgs);
            this.save(LogEntryType.Log, logArgs);
        }
        if (Settings.APP_TARGET !== AppTarget.EXTENSION) {
            this.mobileLog("JS_CONSOLE_LOG", [ message.toString(), ...args])
        }
    }

    static group(message: any) {
        console.group(message);
    }

    static ungroup() {
        console.groupEnd();
    }

    static warning(...args: any[]) {
        if (this.isShow) {
            console.warn(...args);
            this.save(LogEntryType.Warning, args);
        }
        if (Settings.APP_TARGET !== AppTarget.EXTENSION) {
            this.mobileLog("JS_CONSOLE_WARNING", args)
        }
    }

    static error(...args: any[]) {
        if (this.isShow) {
            console.error(...args);
            this.save(LogEntryType.Error, args);
        }
        if (Settings.APP_TARGET !== AppTarget.EXTENSION) {
            this.mobileLog("JS_CONSOLE_ERROR", args)
        }
    }

    private static mobileLog(type: string, ...args: any[]) {
        MobileNativeMsgWrapper.callNative(type, args);
    }

    private static async save(type: LogEntryType, ...args: any[]) {
        let log = (await BrowserStorage.load<LogEntry[]>("LOG") || []);
        log.push(new LogEntry(type, ...args));
        BrowserStorage.save("LOG", log);
    }

    static show() {
        this.setShow(true);
    }

    static hide() {
        this.setShow(false);
    }

    private static setShow(show: boolean) {
        BrowserStorage.save("SETTINGS__SHOW_LOG", show);
    }
}

enum LogEntryType {
    Log,
    Warning,
    Error
}

class LogEntry {
    datetime: number;
    type: LogEntryType;
    args: any[] = [];

    constructor(type: LogEntryType, ...args: any[]) {
        this.datetime = Date.now();
        this.type = type;
        this.args = args;
    }
}

(async() => {
    let show = await BrowserStorage.load<boolean>("SETTINGS__SHOW_LOG");
    if (show === true || show === false) {
        Logger.isShow = show;
    }
    // hack to prevent double notify (from UI script and connector)
    if (!(window as any).loggerNotified) {
        Logger.log(`logs ${Logger.isShow ? "shown" : "hidden"}`);
        (window as any).loggerNotified = true;
    }
    BrowserStorage.observe<boolean>("SETTINGS__SHOW_LOG", (show) => {
        Logger.isShow = show;
        Logger.log(`logs ${show ? "shown" : "hidden"}`);
    });
})();
