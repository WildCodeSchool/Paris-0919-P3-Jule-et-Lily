import React from 'react';
import { Cards, Encarts, ButtonAdd, ButtonSuppr } from './components/admin/common/';

export default () => {
  return (
    <div className="App">
      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <Encarts>
        <Cards />
        <Cards />
        <Cards />
      </Encarts>
      <ButtonAdd />
      <ButtonSuppr />
    </div>
  );
}
