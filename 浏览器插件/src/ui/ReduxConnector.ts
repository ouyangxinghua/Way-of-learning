import {RootState} from "../redux-store/reducers";
import * as AppAction from "../redux-store/AppActions";
import {connect} from "react-redux";

const mapState = (state: RootState) => state;
const mapDispatch = {
    ...AppAction
};
const reduxConnector = connect(
    mapState,
    mapDispatch
);

export default reduxConnector;
