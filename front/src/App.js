import React from "react";
import { LoginBar, Navbar, ReturnButton } from "./components/admin/common/";
import {Dashboard, Orders, Products, Clients, Promo, Collections} from "./components/admin/pages/";
import FrontCustom from "./components/admin/pages/frontcustom/FrontCustom";
import Profile from './containers/admin/pages/Profile'
import { Switch, Route } from 'react-router-dom';
import "../src/assets/css/admin/sb-admin-2.min.css";
import "../src/assets/css/admin/buttons-actions.css";
import "../src/assets/css/admin/global.css";
import "../src/assets/css/admin/FrontCustom.css";

export default () => {

  return (
    <div>
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
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/clients" component={Clients} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/collections" component={Collections} />
                <Route exact path="/promo" component={Promo} />
                {/* <Route exact path="/frontcustom" component={FrontCustom} /> */}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};