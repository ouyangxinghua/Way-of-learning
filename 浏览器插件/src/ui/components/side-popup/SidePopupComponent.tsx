import * as React from "react";
import {AppPhase} from "../../../redux-store/AppTypes";
import HaveCouponsComponent from "./cart-page-found/HaveCouponsView";
import NoCouponsComponent from "./cart-page-found/NoCouponsView";
import {BaseComponent} from "../BaseComponentWrapper";
import AuthComponent from "./auth/AuthComponent";
import CSSTransitionGroup from 'react-transition-group';
import reduxConnector from "../../ReduxConnector";
import {withRouter} from "react-router";

class SidePopupComponent extends BaseComponent<{}, {}> {

    constructor(params: any) {
        super(params, {});
    }

    hide() {
        this.props.setPhase(this.state.tabId, AppPhase.INACTIVE);
    }

    render() {
        let content: any;
        if (false/*!this.state.auth*/) {
            content = <AuthComponent />;
        } else {
            if (this.tabState?.couponsAmount > 0) {
                content = <HaveCouponsComponent />;
            } else {
                content = <NoCouponsComponent />;
            }
        }
        return (
            <div id="sidebar-container" className={this.tabState?.sidePopup.visible ? "show" : ""}>
                <div className="header">
                    <div className="title">{this.tabState?.storeName}</div>
                    <div className="icon-close" onClick={this.hide.bind(this)} />
                </div>
                <div className="body">
                    {content}
                </div>
            </div>
        );
    }
}
export default reduxConnector(withRouter(SidePopupComponent));
