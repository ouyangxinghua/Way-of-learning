import * as React from "react";
import {StartApplyCouponsProcessMessage} from "../../../../helpers/ExtensionMessage";
import {BaseComponent, BaseComponentProps,} from "../../BaseComponentWrapper";
import reduxConnector from "../../../ReduxConnector";
import {withRouter} from "react-router";
import {AppPhase} from "../../../../redux-store/AppTypes";

class HaveCouponsView extends BaseComponent<BaseComponentProps, {}> {

    applyAllCoupons() {
        new StartApplyCouponsProcessMessage().sendToBackend();
    }

    render() {
        return (
            <div className="coupons">
                <div className="icon-logo" />
                <div className="awesome">Awesome!</div>
                <div className="coupon-codes">
                    <label className="label">Coupon codes</label>
                    <label className="amount">{this.tabState?.couponsAmount}</label>
                </div>
                <div className="apply-coupon">
                    <button className="btn shadow-none" onClick={this.applyAllCoupons.bind(this)}>
                        Apply Coupons
                    </button>
                </div>
            </div>
        );
    }
}
export default reduxConnector(withRouter(HaveCouponsView));
