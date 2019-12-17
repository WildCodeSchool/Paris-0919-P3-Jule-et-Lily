import React from 'react';
import Tables from '../../front/src/components/admin/common/Tables'
import Pagination from './components/admin/common/Pagination';
import ReturnButton from './components/admin/common/ReturnButton';
import ButtonAdd  from  './components/admin/common/ButtonAdd'
import ButtonModify  from  './components/admin/common/ButtonModify'
import ButtonSee  from  './components/admin/common/ButtonSee'
import ButtonDelete  from  './components/admin/common/ButtonDelete'


const App = () => {
  return (
    <div className="App">
      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <Tables/>
      <Pagination />
      <ReturnButton returnPage="commandes"/>
      <ButtonAdd/>
      <ButtonModify/>
      <ButtonSee/>
      <ButtonDelete/>
    </div>
  );
}

export default App;
