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

const store = createStore(allReducers);

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