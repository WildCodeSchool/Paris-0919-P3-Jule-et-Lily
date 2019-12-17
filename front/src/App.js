import React from 'react';
import Tables from '../../front/src/components/admin/common/Tables'
import Pagination from './components/admin/common/Pagination';
import ReturnButton from './components/admin/common/ReturnButton';

function App() {
  return (
    <div className="App">
      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <Tables/>
      <Pagination />
      <ReturnButton returnPage="commandes"/>
    </div>
  );
}

export default App;
