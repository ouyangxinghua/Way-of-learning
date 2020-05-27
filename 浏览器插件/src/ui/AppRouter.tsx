import App from "./components/App";
import {Redirect, Route, RouteComponentProps, Router, Switch, withRouter} from "react-router";
import * as React from "react";
import { createHashHistory, createMemoryHistory } from 'history';

const history = createMemoryHistory();

class AppRouter extends React.Component<{}, {
}> {
    render() {
        return (
            <Router history={history}>
                <App />
            </Router>
        );
    }
}

export default AppRouter;
