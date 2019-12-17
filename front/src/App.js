import React from 'react';
import { ButtonAdd, ButtonConfirm, ButtonDelete, ButtonModify, ButtonSee, ButtonCancel, Cards, Encarts, LoginBar, Navbar, Pagination, ReturnButton, SearchBar, Tables } from './components/admin/common/';
// import '../src/assets/css/admin/sb-admin-2.min.css'

export default () => {
  return (
    <div id="wrapper">
      {/* mettre la navbar/sidebar ici */}
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          {/* Mettre la login bar ici  */}
          <div id="container-fluid">
            <h1 className="col-md-12 col-md-offset-5">
              Hello ici le front Jule et Lily
        </h1>
            {/* Mettre les routes vers les autres composants ici  */}
            <Tables />
            <Pagination />
            <ReturnButton returnPage="commandes" />
            <ButtonAdd />
            <ButtonModify />
            <ButtonSee />
            <ButtonDelete />
            <Navbar />
            <LoginBar />
            <SearchBar />
            <Encarts>
              <Cards title="Ventes de la semaine" benefits="6,740€" />
              <Cards title="Ventes du mois" benefits="25,542€" />
              <Cards title="Ventes du trimestre" benefits="40,690€" />
              <Cards title="Ventes de l'année" benefits="98,121€" />
            </Encarts>
            <ButtonCancel />
            <ButtonConfirm />
          </div>
        </div>
      </div>
    </div>
  )
}
