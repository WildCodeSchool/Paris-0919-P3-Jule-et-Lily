import React from 'react';
import ReturnButton from './components/admin/common/ReturnButton';

function App() {
  return (
    <div className="App">
      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <ReturnButton returnPage="produits"/>
    </div>
  );
}

export default App;
