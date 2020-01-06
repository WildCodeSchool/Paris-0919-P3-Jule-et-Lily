import React, { useState, useEffect } from "react";
import {
  LoginBar,
  Navbar,
  ReturnButton,
} from "./components/admin/common/";
import { Dashboard, Orders, Products, Clients, Promo, Collections, FrontCustom } from "./components/admin/pages/";
import Login from './components/admin/pages/Login'
import { Switch, NavLink, Route } from 'react-router-dom';
import "../src/assets/css/admin/sb-admin-2.min.css";
import "../src/assets/css/admin/buttons-actions.css";
import "../src/assets/css/admin/global.css";

export default () => {

  return (
    <div>
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
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/clients" component={Clients} />
                  <Route path="/products" component={Products} />
                  <Route path="/collections" component={Collections} />
                  <Route path="/promo" component={Promo} />
                  <Route path="/frontcustom" component={FrontCustom} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Switch>
    </div>
  );
};
