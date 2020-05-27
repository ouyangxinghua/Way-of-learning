import reduxConnector from "../ReduxConnector";
import {RouteComponentProps, withRouter} from "react-router";
import {ConnectedProps} from "react-redux";
import * as React from "react";
import {GetCurrentTabMessage} from "../../helpers/ExtensionMessage";
import {TabState} from "../../redux-store/AppTypes";
import {BrowserStorage} from "../../helpers/BrowserStorage";
import AuthState from "../../helpers/AuthState";
import {ErrorInfo} from "react";
import Logger from "../../helpers/Logger";

export class BaseComponent<TProps, TState> extends React.Component<BaseComponentProps & TProps, BaseComponentState & TState> {

    constructor(props: BaseComponentProps & TProps, state: TState) {
        super(props);
        this.state = {
            ...state,
            tabId: null,
            auth: null,
            tabState: null,
        }
    }

    async componentDidMount() {
        let tab = await new GetCurrentTabMessage().sendToBackend();
        let auth = {}; //await BrowserStorage.load<AuthState>("auth");
        this.setState(prevState => {
            return {
                ...prevState,
                tabId: tab.id,
                auth: auth
            }
        });
        /*BrowserStorage.observe<AuthState>("auth", (newState) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    auth: newState
                }
            });
        });*/
    }

    get tabState() {
        let tabId = this.state.tabId;
        return tabId
            ? this.props.tabs[tabId]
            : null;
    }
}

export type BaseComponentProps = RouteComponentProps<any> & ConnectedProps<typeof reduxConnector>;

export type BaseComponentState = {
    tabId?: number;
    auth?: AuthState;
};
