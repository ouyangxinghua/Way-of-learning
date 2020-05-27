import * as React from "react";
import {BaseComponent, BaseComponentProps} from "../../BaseComponentWrapper";
import reduxConnector from "../../../ReduxConnector";
import {withRouter} from "react-router";

class NoCouponsView extends BaseComponent<BaseComponentProps, {}> {

    render() {
        return (
            <div className="no-coupons">
                <div className="icon-sale" />
                <div className="title">
                    Oops, no coupon found on this store!
                </div>
                <div className="description">
                    FatCoupon searched our database, and it looks like this store does not have active coupon for this order at this time. Please check back later.
                </div>
            </div>
        )
    }
}
export default reduxConnector(withRouter(NoCouponsView));
