import {
  ADD_TAB,
  AppActionTypes,
  AppPhase,
  AppState,
  REMOVE_TAB,
  SET_TAB_COUPONS_AMOUNT,
  SET_TAB_CUR_COUPON_INDEX, SET_TAB_DISCOUNT,
  SET_TAB_PHASE,
  TabState,
} from "./AppTypes";
import update from "immutability-helper";

const initialState: AppState = {
  tabs: []
};

const initialTabState: TabState = {
  storeId: null,
  storeName: null,

  phase: AppPhase.INACTIVE,

  couponsAmount: 0,

  sidePopup: {
    visible: false
  },

  applyPopup: {
    visible: false,
    curCouponIndex: -1,
    discount: 0
  }
};

export default function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
  switch (action.type) {
    case ADD_TAB:
      return update(state, {
        tabs: {
          $set: update(state.tabs, {
            [action.payload.tabId]: {
              $set: update(initialTabState, {
                storeId: { $set: action.payload.storeId },
                storeName: { $set: action.payload.storeName }
              })
            }
          })
        }
      });
    case REMOVE_TAB:
      return update(state, {
        tabs: {
          $splice: [[action.payload.tabId, 1]]
        }
      });
    case SET_TAB_PHASE:
      let tabState = {
        ...state.tabs[action.payload.tabId]
      };
      switch (action.payload.phase) {
        case AppPhase.INACTIVE:
          tabState = update(tabState, {
            sidePopup: {
              visible: { $set: false }
            },
            applyPopup: {
              visible: { $set: false }
            }
          });
          break;
        case AppPhase.SIDEBAR_SHOWN:
          tabState = update(tabState, {
            sidePopup: {
              visible: { $set: true }
            },
            applyPopup: {
              visible: { $set: false }
            }
          });
          break;
        case AppPhase.BEFORE_APPLYING_COUPONS:
          tabState = update(tabState, {
            sidePopup: {
              visible: { $set: false }
            },
            applyPopup: {
              visible: { $set: true }
            }
          });
          break;
        case AppPhase.APPLYING_COUPONS:
          tabState = update(tabState, {
            sidePopup: {
              visible: { $set: false }
            },
            applyPopup: {
              visible: { $set: true },
              curCouponIndex: { $set: 0 }
            }
          });
          break;
      }
      return update(state, {
        tabs: {
          [action.payload.tabId]: {
            $set: update(tabState, {
              phase: { $set: action.payload.phase }
            })
          }
        }
      });
    case SET_TAB_CUR_COUPON_INDEX:
      return update(state, {
        tabs: {
          [action.payload.tabId]: {
            applyPopup: {
              curCouponIndex: { $set: action.payload.index }
            }
          }
        }
      });
    case SET_TAB_COUPONS_AMOUNT:
      return update(state, {
        tabs: {
          [action.payload.tabId]: {
            couponsAmount: { $set: action.payload.amount }
          }
        }
      });
    case SET_TAB_DISCOUNT:
      return update(state, {
        tabs: {
          [action.payload.tabId]: {
            applyPopup: {
              discount: { $set: action.payload.discount }
            }
          }
        }
      });
    default:
      return state;
  }
}
