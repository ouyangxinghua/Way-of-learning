import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {RootState} from "../../redux-store/reducers";
import {setPhase} from "../../redux-store/AppActions";
import {connect, ConnectedProps} from "react-redux";
import {AppPhase} from "../../redux-store/AppTypes";
import {
    GetCurrentTabMessage,
    StartApplyCouponsProcessMessage,
    StopApplyCouponsProcessMessage
} from "../../helpers/ExtensionMessage";
import Settings from "../../helpers/Settings";

const mapState = (state: RootState) => ({
    tabs: state.tabs
});
const mapDispatch = {
    setPhase
};
const connector = connect(
    mapState,
    mapDispatch
);

export namespace ApplyPopupComponent {
    export type Props = RouteComponentProps<any> & ConnectedProps<typeof connector> & {
    }
}

class ApplyPopupComponent extends React.Component<ApplyPopupComponent.Props, {
    tabId: number;
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            tabId: null
        };
    }

    get tabState() {
        return this.props.tabs[this.state.tabId];
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        let tab = await new GetCurrentTabMessage().sendToBackend();
        this.setState({
            tabId: tab.id
        });
    }

    startApplying() {
        new StartApplyCouponsProcessMessage().sendToBackend();
    }

    async stopApplying() {
        await new StopApplyCouponsProcessMessage().sendToBackend();
    }

    async hide() {
        await this.stopApplying();
        this.props.setPhase(this.state.tabId, AppPhase.INACTIVE);
    }

    renderProgressbar(percent: number) {
        return (
            <div className="progress">
                <div className="progress-bar" style={{width: percent + "%"}} />
            </div>
        );
    }

    renderBtn(label: string, func: () => void) {
        return (
            <div className="button">
                <button onClick={func.bind(this)}>
                    {label}
                </button>
            </div>
        );
    }

    render() {
        let content: any = "";
        switch (this.tabState?.phase) {
            case AppPhase.INACTIVE:
            case AppPhase.SIDEBAR_SHOWN:
                break;
            case AppPhase.BEFORE_APPLYING_COUPONS:
            case AppPhase.APPLYING_COUPONS:
            case AppPhase.AFTER_APPLYING_COUPONS:
                let progress = Math.floor(95 / this.tabState.couponsAmount * (this.tabState.applyPopup.curCouponIndex + 1) + 5);
                content = (
                    <div className="body">
                        <div className="text">
                            {chrome.runtime.getManifest().name} is automatically trying the best coupon codes for you.
                        </div>
                        <div className="description">Testing codes...</div>
                        {this.renderProgressbar(progress)}
                        {this.renderBtn("Stop", this.stopApplying)}
                    </div>
                );
                break;
            case AppPhase.COUPON_NOT_FOUND:
                content = (
                    <div className="body finished">
                        <div className="text">
                            You already have the best price. There aren't any discount codes available right now.
                        </div>
                        {this.renderBtn("Reapply coupons", this.startApplying)}
                    </div>
                );
                break;
            case AppPhase.COUPON_FOUND:
                let discount = this.tabState.applyPopup.discount.toFixed(2);
                if (discount.indexOf(".") === -1) {
                    discount += ".00";
                } else if (discount.indexOf(".") === discount.length - 2) {
                    discount += "0";
                }
                content = (
                    <div className="body finished">
                        <div className="icon-money" />
                        <div className="text">
                            You saved&nbsp;
                            <span className="discount">
                                ${discount}
                            </span>
                        </div>
                        {this.renderBtn("Continue to Checkout", this.hide)}
                    </div>
                );
                break;
        }
        let show = this.tabState?.applyPopup.visible;
        return (
            <div id="apply-popup-container" className={show ? "show" : ""}>
                <div className="popup">
                    <div className="header">
                        <a className="icon-logo" href={Settings.BASE_URI}  target="_blank" />
                        <div className="icon-close" onClick={this.hide.bind(this)} />
                    </div>
                    {content}
                </div>
            </div>
        );
    }
}

export default connector(withRouter(ApplyPopupComponent));
