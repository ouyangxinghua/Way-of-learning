import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import { connect, ConnectedProps } from 'react-redux'
import {RootState} from "../../redux-store/reducers";
import SidePopupComponent from "./side-popup/SidePopupComponent";
import CouponApplierPopupComponent from "./ApplyPopupComponent";

const mapState = (state: RootState) => {
    return {
    };
};
const mapDispatch = {
};
const connector = connect(
    mapState,
    mapDispatch
);

export namespace App {
    export type Props = RouteComponentProps & ConnectedProps<typeof connector> & {
    }
}

class App extends React.Component<App.Props, {
}> {

    constructor(props: App.Props) {
        super(props);
    }

    // don't render anything until init finished
    render() {
        return (
            <div id="app-container">
                <SidePopupComponent key="sidebar" />
                <CouponApplierPopupComponent key="coupon-applier-popup" />
            </div>
        );
    }
}

export default connector(withRouter(App));
