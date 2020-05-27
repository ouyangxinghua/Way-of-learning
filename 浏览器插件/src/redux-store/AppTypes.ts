export interface AppState {
    tabs: TabState[];
}

export interface TabState {
    storeId: string;
    storeName: string;

    phase: AppPhase;

    couponsAmount: number;

    sidePopup: {
        visible: boolean;
    }

    applyPopup: {
        visible: boolean;
        curCouponIndex: number;
        discount: number;
    }
}

export enum AppPhase {
    INACTIVE,
    SIDEBAR_SHOWN,
    BEFORE_APPLYING_COUPONS,
    APPLYING_COUPONS,
    AFTER_APPLYING_COUPONS,
    COUPON_NOT_FOUND,
    COUPON_FOUND
}

export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_TAB_PHASE = 'SET_TAB_PHASE';
export const SET_TAB_CUR_COUPON_INDEX = 'SET_TAB_CUR_COUPON_INDEX';
export const SET_TAB_COUPONS_AMOUNT = 'SET_TAB_COUPONS_AMOUNT';
export const SET_TAB_DISCOUNT = 'SET_TAB_DISCOUNT';

interface AddTabAction {
    type: typeof ADD_TAB
    payload: {
        tabId: number;
        storeId: string;
        storeName: string;
    }
}
interface RemoveTabAction {
    type: typeof REMOVE_TAB
    payload: {
        tabId: number;
    }
}
interface SetTabPhaseAction {
    type: typeof SET_TAB_PHASE
    payload: {
        tabId: number;
        phase: AppPhase;
    }
}
interface SetTabCurCouponIndexAction {
    type: typeof SET_TAB_CUR_COUPON_INDEX
    payload: {
        tabId: number;
        index: number;
    }
}
interface SetTabCouponsAmountAction {
    type: typeof SET_TAB_COUPONS_AMOUNT
    payload: {
        tabId: number;
        amount: number;
    }
}
interface SetTabDiscountAction {
    type: typeof SET_TAB_DISCOUNT
    payload: {
        tabId: number;
        discount: number;
    }
}

export type AppActionTypes =
    AddTabAction |
    RemoveTabAction |
    SetTabPhaseAction |
    SetTabCurCouponIndexAction |
    SetTabCouponsAmountAction |
    SetTabDiscountAction;
