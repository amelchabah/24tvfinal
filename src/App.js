import React from 'react';
import Model from './Model.js';
import Loader from './Loader.js';
import './globals.scss';

const App = () => {

  return (
    <>
      <Loader />
      <div className='frame'>

        <Model />
      </div>
    </>
  );
};

export default App;
