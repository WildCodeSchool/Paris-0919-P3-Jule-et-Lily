import React from "react";
import { LoginBar, Navbar, ReturnButton } from "./components/admin/common/";
import {Dashboard, Orders, Products, Users, Promo} from "./components/admin/pages/";
import Collections from "./components/admin/pages/collections/Collections";
import FrontCustom from "./components/admin/pages/frontcustom/FrontCustom";
import Profile from './containers/admin/pages/Profile'
import { Switch, Route, Redirect } from 'react-router-dom';
import "../src/assets/css/admin/sb-admin-2.min.css";
import "../src/assets/css/admin/buttons-actions.css";
import "../src/assets/css/admin/global.css";
import "../src/assets/css/admin/FrontCustom.css";


export default (props) => {

  return (
    <div>
      <div id="wrapper">
        {/* mettre la navbar/sidebar ici */}
        <Navbar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* Mettre la login bar ici  */}
            <LoginBar dispatch={props.dispatch}
              
            ></LoginBar>
            <div className="container-fluid">
              {/* Mettre les routes vers les autres composants ici  */}
              <Switch >
                <Route exact path ="/" component={Dashboard} />
                <Route  path="/profile" component={Profile} />
                <Route  path="/orders" component={Orders} />
                <Route  path="/users" component={Users} />
                <Route  path="/products" component={Products} />
                <Route  path="/collections" component={Collections} />
                <Route  path="/promo" component={Promo} />
                <Route  path="/frontcustom" component={FrontCustom} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};