import React from 'react';
import Cards from './components/admin/common/Cards';
import Encards from './components/admin/common/Encarts';


function App() {
  return (
    <div className="App">
      <h1 className='col-md-12 col-md-offset-5'>Hello ici le front Jule et Lily</h1>
      <Encards>
        <Cards />
        <Cards />
        <Cards />
      </Encards>
    </div>
  );
}

export default App;
