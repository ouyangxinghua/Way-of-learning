import {
    ADD_TAB,
    AppActionTypes,
    AppPhase,
    REMOVE_TAB,
    SET_TAB_COUPONS_AMOUNT,
    SET_TAB_CUR_COUPON_INDEX,
    SET_TAB_DISCOUNT,
    SET_TAB_PHASE
} from "./AppTypes";

export function addTab(tabId: number, storeId: string, storeName: string): AppActionTypes {
    return {
        type: ADD_TAB,
        payload: {
            tabId: tabId,
            storeId: storeId,
            storeName: storeName
        }
    }
}
export function removeTab(tabId: number): AppActionTypes {
    return {
        type: REMOVE_TAB,
        payload: {
            tabId: tabId
        }
    }
}
export function setPhase(tabId: number, phase: AppPhase): AppActionTypes {
    return {
        type: SET_TAB_PHASE,
        payload: {
            tabId: tabId,
            phase: phase
        }
    }
}
export function setTabCurCouponIndex(tabId: number, index: number): AppActionTypes {
    return {
        type: SET_TAB_CUR_COUPON_INDEX,
        payload: {
            tabId: tabId,
            index: index
        }
    }
}
export function setTabCouponsAmount(tabId: number, amount: number): AppActionTypes {
    return {
        type: SET_TAB_COUPONS_AMOUNT,
        payload: {
            tabId: tabId,
            amount: amount
        }
    }
}
export function setTabDiscount(tabId: number, discount: number): AppActionTypes {
    return {
        type: SET_TAB_DISCOUNT,
        payload: {
            tabId: tabId,
            discount: discount
        }
    }
}
