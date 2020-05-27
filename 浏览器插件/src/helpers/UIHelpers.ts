import Helpers from "./Helpers";

// @ts-ignore
import sendkeys from "../lib/jquery.sendkeys"
// @ts-ignore
import simulateClick from "../lib/jquery.simulate-keys"

export default class UIHelpers {

    static async simulateClick(target: JQuery<HTMLElement>) {
        if (!target || target.length === 0) {
            throw Error("ERROR: Helpers.simulateClick() | target not exist");
        }
        await simulateClick(target);
        await Helpers.wait(Helpers.randomIntFromInterval(20, 60));
        target.blur();
    }

    static async clearInput(target: JQuery<HTMLInputElement | HTMLTextAreaElement> | string | string[]) {
        if (!target || target.length === 0) {
            throw Error("ERROR: Helpers.clearInput() | target not exist");
        }
        if (target instanceof Array) {
            target = $(target.join(", "));
        } else if (typeof target === "string") {
            target = $(target);
        }
        let maxCounter = 0;
        target.focus();
        while ((target.val() as []).length >= 0) {
            await sendkeys(target, "{backspace}");
            await Helpers.wait(Helpers.randomIntFromInterval(10, 30));
            await sendkeys(target, "{del}");
            await Helpers.wait(Helpers.randomIntFromInterval(10, 30));
            // handle non-empty fields
            if (++maxCounter > 30) {
                break;
            }
        }
        target.blur();
    }

    static async sendKeys(keys: string, target: JQuery<HTMLInputElement | HTMLTextAreaElement>, focusAndBlur: boolean = true) {
        if (!target || target.length === 0) {
            throw Error("ERROR: Helpers.sendKeys() | target not exist");
        }
        if (focusAndBlur) {
            target.focus();
        }
        for (let i = 0; i < keys.length; i++) {
            await sendkeys(target, keys[i]);
            await Helpers.wait(Helpers.randomIntFromInterval(20, 60));
        }
        if (focusAndBlur) {
            target.blur();
        }
    }

    static async sendKeysTogether(keys: string, target: JQuery<HTMLInputElement | HTMLTextAreaElement>, focusAndBlur: boolean = true) {
        if (!target || target.length === 0) {
            throw Error("ERROR: Helpers.sendKeys() | target not exist");
        }
        if (focusAndBlur) {
            target.focus();
        }
        await sendkeys(target, keys);
        await Helpers.wait(Helpers.randomIntFromInterval(20, 60));
        if (focusAndBlur) {
            target.blur();
        }
    }
}

if (!window.Fatcoupon) window.Fatcoupon = { Modules: {} };
(window.Fatcoupon).Modules.UIHelpers = UIHelpers;
