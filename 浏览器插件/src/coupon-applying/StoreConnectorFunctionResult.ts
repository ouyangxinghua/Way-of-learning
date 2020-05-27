export type SteppedContext = {
    context?: {
        step: number
    }
}

type CollectAndClearAppliedCoupons = string[] | SteppedContext;
type GetCartTotal = number | SteppedContext;
type BeforeApplyingCoupon = void | SteppedContext
type ApplyCoupon = {
    discount?: number;
    cartTotalAfterApply?: number;
    context?: {
        step: number
    }
};
type AfterApplyingCoupon = void | SteppedContext;

export const StoreConnectorFunctionResult: {
    CollectAndClearAppliedCoupons?: CollectAndClearAppliedCoupons,
    GetCartTotal?: GetCartTotal,
    BeforeApplyingCoupon?: BeforeApplyingCoupon,
    ApplyCoupon?: ApplyCoupon,
    AfterApplyingCoupon?: AfterApplyingCoupon
} = {};
