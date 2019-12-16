import React from 'react';
import { Cards, Encarts, ButtonAdd, ButtonSuppr } from './components/admin/common/';

export default () => {
  return (
    <div className="App">
      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <Encarts>
        <Cards title="Ventes de la semaine" benefits="6,740€"/>
        <Cards title="Ventes du mois" benefits="25,542€"/>
        <Cards title="Ventes du trimestre" benefits="40,690€"/>
        <Cards title="Ventes de l'année" benefits="98,121€"/>
      </Encarts>
      <ButtonSuppr />
      <ButtonAdd />
    </div>
  );
}
