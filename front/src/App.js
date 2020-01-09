import React, {useState, useEffect} from "react";
import {
  LoginBar,
  Navbar,
  ReturnButton,
} from "./components/admin/common/";
import {Dashboard, Orders, Products, Clients, Promo, Collections} from "./components/admin/pages/";
import FrontCustom from "./components/admin/pages/frontcustom/FrontCustom";
import {Switch, NavLink, Route} from 'react-router-dom';
import "../src/assets/css/admin/sb-admin-2.min.css";
import "../src/assets/css/admin/buttons-actions.css";
import "../src/assets/css/admin/global.css";
import "../src/assets/css/admin/FrontCustom.css";

export default () => {

  return (
    <div id="wrapper">
      {/* mettre la navbar/sidebar ici */}
      <Navbar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          {/* Mettre la login bar ici  */}
          <LoginBar
            // children={}
          ></LoginBar>
          <div className="container-fluid">
 
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
  );
};
