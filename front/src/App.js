import React from 'react';
import ButtonAdd  from  './components/admin/common/ButtonAdd'
import ButtonModify  from  './components/admin/common/ButtonModify'
import ButtonSee  from  './components/admin/common/ButtonSee'
import ButtonDelete  from  './components/admin/common/ButtonDelete'


const App = () => {
  return (
    <div className="App">

      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <ButtonAdd/>
      <ButtonModify/>
      <ButtonSee/>
      <ButtonDelete/>
    </div>
  );
}

export default App;
