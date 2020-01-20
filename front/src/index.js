import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers/index.js";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import requireAuth from "./hoc/requireAuth.js";
import requireNotAuth from './hoc/requireNotAuth'
import Login from './containers/admin/pages/Login'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import throttle from 'lodash/throttle';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
  const peristedState = loadState();
  
  const store = createStore(allReducers,
    peristedState
    );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));
  


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={requireNotAuth(Login)} />
        <Route path="/" component={requireAuth(App)} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();