import {IDictionary} from "./IDictionary";

export default class Cookies {

    static readDocumentCookies():IDictionary<string> {
        let cookies: IDictionary<string> = new IDictionary<string>();
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            let name = c.split("=")[0];
            cookies[name] = c.substring(name.length + 1);
        }
        return cookies;
    }

    static readDocumentCookie(name: string):string {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

if (!window.Fatcoupon) window.Fatcoupon = { Modules: {} };
(window.Fatcoupon).Modules.Cookies = Cookies;
