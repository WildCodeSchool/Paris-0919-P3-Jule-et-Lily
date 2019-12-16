import React from 'react';
import ButtonsAdd  from  './components/admin/common/ButtonsAdd'
import ButtonsModify  from  './components/admin/common/ButtonsModify'
import ButtonsSee  from  './components/admin/common/ButtonsSee'
import ButtonsDelete  from  './components/admin/common/ButtonsDelete'


const App = () => {
  return (
    <div className="App">

      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <ButtonsAdd/>
      <ButtonsModify/>
      <ButtonsSee/>
      <ButtonsDelete/>
    </div>
  );
}

export default App;
