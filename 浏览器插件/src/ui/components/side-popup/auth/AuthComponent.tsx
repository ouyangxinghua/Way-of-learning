import * as React from "react";
import {BaseComponent, BaseComponentProps, BaseComponentState,} from "../../BaseComponentWrapper";
import RegistrationView from "./RegistrationView";
import LoginView from "./LoginView";
import reduxConnector from "../../../ReduxConnector";
import {withRouter} from "react-router";

export enum AuthView {
    Login,
    Registration,
    RegistrationCheckCode
}
type State = {
    mode: AuthView;
};
class AuthComponent extends BaseComponent<{}, State> {

    constructor(params: any) {
        super(params, {
            mode: AuthView.Login
        });
    }

    setMode(mode: AuthView) {
        this.setState({
            mode: mode
        });
    }

    render() {
        let content: any;
        switch (this.state.mode) {
            case AuthView.Login:
                content = <LoginView
                    setMode={this.setMode.bind(this)}
                />;
                break;
            case AuthView.Registration:
                content = <RegistrationView
                    setMode={this.setMode.bind(this)}
                />;
                break;
            case AuthView.RegistrationCheckCode:
                content = "register check code";
                break;
        }
        return (
            <div className="auth">
                {content}
            </div>
        );
    }
}
export default reduxConnector(withRouter(AuthComponent));
