export default class MobileNativeMsgWrapper {

    static Messages = {
        CHECKOUT_PAGE_INDEX_CHANGED: "CHECKOUT_PAGE_INDEX_CHANGED"
    };

    /**
     * Call JS -> Native
     * @param action
     * @param payload
     */
    static callNative(action: string, payload?: any) {
        window.callNative(action, payload);
    }
}
