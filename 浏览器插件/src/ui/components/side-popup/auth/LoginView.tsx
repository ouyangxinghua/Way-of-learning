import * as React from "react";
import {BaseComponent} from "../../BaseComponentWrapper";
import {AuthView} from "./AuthComponent";
import reduxConnector from "../../../ReduxConnector";
import {withRouter} from "react-router";
import Button, {ButtonType} from "../../shared/Button";

type Props = {
    setMode: (mode: AuthView) => void;
};

class LoginView extends BaseComponent<Props, {}> {

    oauthGoogle() {
        alert("google not implemented yet");
    }

    oauthFacebook() {
        alert("facebook not implemented yet");
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <p className="title">Log in to {chrome.runtime.getManifest().name}</p>
                    <Button type={ButtonType.Social} icon="" onClick={this.oauthGoogle.bind(this)}>
                        Log in with Google
                    </Button>
                    <Button type={ButtonType.Social} icon="" onClick={this.oauthFacebook.bind(this)}>
                        Log in with Facebook
                    </Button>
                    <div className="or">
                        <span>or</span>
                    </div>
                    <Button type={ButtonType.Primary} onClick={this.oauthFacebook.bind(this)}>
                        Log in with Email
                    </Button>
                    <div className="terms">
                        By logging in, I agree to {chrome.runtime.getManifest().name}'s <a href="#" target="_blank">terms</a> and <a href="#" target="_blank">conditions</a>.
                    </div>
                </div>
                <div className="footer">
                    Not a member?
                    <a href="#" className="pl-1" onClick={() => { this.props.setMode(AuthView.Registration) }}>Join</a>
                </div>
            </React.Fragment>
        );
    }
}
export default reduxConnector(withRouter(LoginView));
