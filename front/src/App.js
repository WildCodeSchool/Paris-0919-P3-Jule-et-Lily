import React from "react";
import {
  ButtonAdd,
  ButtonConfirm,
  ButtonDelete,
  ButtonModify,
  ButtonSee,
  ButtonCancel,
  Cards,
  Encarts,
  LoginBar,
  Navbar,
  Pagination,
  ReturnButton,
  SearchBar,
  Tables
} from "./components/admin/common/";
import "../src/assets/css/admin/sb-admin-2.min.css";
import "../src/assets/css/admin/buttons-actions.css";

export default () => {
  return (
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
            <Encarts>
              <div className="row">
                <Cards title="Ventes de la semaine" benefits="6,740€" />
                <Cards title="Ventes du mois" benefits="25,542€" />
                <Cards title="Ventes du trimestre" benefits="40,690€" />
                <Cards title="Ventes de l'année" benefits="98,121€" />
              </div>
            </Encarts>
            <ButtonCancel />
            <ButtonConfirm />
            <Encarts>
              <div className="tableActions border-gray">
                <SearchBar />
                <div className="addDiv">Ajouter <ButtonAdd /></div>
              </div>
              <Tables />
              <Pagination />
            </Encarts>
          </div>
        </div>
      </div>
    </div>
  );
};
