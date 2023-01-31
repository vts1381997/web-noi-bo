import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import rootReducer from '@reducers/rootReducer';

import {loadState, saveState} from '@redux/localStorage'
//import { save } from 'react-cookies';
const innitialState  = loadState();
const middlewares = [thunk];
// if (__DEV__) react native check dev
middlewares.push(logger);

const store = createStore(
  rootReducer,
  innitialState,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f 
  )
);
store.subscribe(() => {
  saveState({
    todoCommmon: store.getState().todoCommmon
  })
})

export default  store ;