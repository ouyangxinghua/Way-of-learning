import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import Settings from "../helpers/Settings";

export default function configureStore() {
  const logger = createLogger();
  const store = createStore(
      rootReducer,
      Settings.SHOW_LOG
        ? applyMiddleware(thunk, logger)
        : applyMiddleware(thunk)
  );
  return store;
}
