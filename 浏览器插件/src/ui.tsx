import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import Helpers from "./helpers/Helpers";
import AppRouter from "./ui/AppRouter";
import { Provider } from 'react-redux'
import {Store} from 'webext-redux';
import "./lib/fontawesome.min"
import Logger from "./helpers/Logger";
import retargetEvents from 'react-shadow-dom-retarget-events';
import Settings from "./helpers/Settings";

const css = require("./ui/components/css/shared.scss");

export default class Ui {
    static async init() {
        try {
            let reduxStore = await this.initStore();
            this.injectUI(reduxStore);
        } catch (e) {
            Logger.error(e);
        }
    }

    static async initStore() {
        // connect to background redux store
        let store = new Store({
            portName: Settings.REDUX_PORT_NAME
        });
        // wait for the store to connect to the background page
        await store.ready();
        return store;
    }

    static async injectUI(reduxStore: Store) {
        // wait while body tag appear (because we will append root tag after body)
        await Helpers.waitFor("body");

        // append root to <html>, not <body> to reduce dependencies
        $(`<fatcoupon-root style="all: initial; font-size: 16px !important;"></fatcoupon-root>`).insertAfter(document.body);

        // wait for root
        let rootElem = (await Helpers.waitFor("fatcoupon-root"))[0];

        const shadowRoot = rootElem.attachShadow({ mode: 'open' });

        // replace chrome CSS variables here
        // it not being replaced automatically when injecting this way
        let fixedCSS = css.replace(/__MSG_@@extension_id__/g, chrome.runtime.id);

        let stylesElem = document.createElement('style');
        stylesElem.type = 'text/css';
        stylesElem.innerHTML = fixedCSS;

        let contentElem = document.createElement('fatcoupon-content');

        shadowRoot.appendChild(stylesElem);
        shadowRoot.appendChild(contentElem);

        // Retarget events from shadow-root to React
        // https://www.npmjs.com/package/react-shadow-dom-retarget-events
        retargetEvents(shadowRoot);

        // render app inside root
        ReactDOM.render(
            <Provider store={reduxStore}>
                <AppRouter />
            </Provider>
            , contentElem);

        // this allow put our interface over all other
        let observer = new MutationObserver((mutationsList, observer) => {
            let curTry = 0;
            while (rootElem.nextSibling) {
                if (curTry++ > 10) break;
                rootElem.nextSibling.after(rootElem);
            }
        });
        observer.observe(document.querySelector("html"), {
            childList: true,
            attributes: false
        });
    }
}

Ui.init();
