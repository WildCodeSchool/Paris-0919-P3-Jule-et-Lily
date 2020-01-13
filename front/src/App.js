import React, { useState, useEffect } from "react";
import {
  LoginBar,
  Navbar,
  ReturnButton,
} from "./components/admin/common/";
import Login from './containers/admin/pages/Login'
import requireAuth from './hoc/requireAuth'
import requireNotAuth from './hoc/requireNotAuth'
import { Dashboard, Orders, Products, Clients, Promo, Collections, FrontCustom } from "./components/admin/pages/";
import Profile from './containers/admin/pages/Profile'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import "../src/assets/css/admin/sb-admin-2.min.css";
import "../src/assets/css/admin/buttons-actions.css";
import "../src/assets/css/admin/global.css";

export default () => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <div id="wrapper">
            {/* mettre la navbar/sidebar ici */}
            <Navbar />
            <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                {/* Mettre la login bar ici  */}
                <LoginBar
                  children={<ReturnButton returnPage="commandes" />}
                ></LoginBar>
                <div className="container-fluid">
                  <h1 className="col-md-12 col-md-offset-5">
                    Hello ici le front Jule et Lily
                  </h1>
                  {/* Mettre les routes vers les autres composants ici  */}
                  <Switch >
                    {/* <Route exact from="/" to='/dashboard' />  */}
                    <Route exact path="/profile" component={requireAuth(Profile)} />
                    <Route exact path="/login" component={requireNotAuth(Login)} />
                    <Route path="/orders" component={requireAuth(Orders)} />
                    <Route path="/clients" component={requireAuth(Clients)} />
                    <Route path="/products" component={requireAuth(Products)} />
                    <Route path="/collections" component={requireAuth(Collections)} />
                    <Route path="/promo" component={requireAuth(Promo)} />
                    <Route path="/frontcustom" component={requireAuth(FrontCustom)} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
