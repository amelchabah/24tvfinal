import React from 'react';
import Model from './Model.js';
import Loader from './Loader.js';
import './globals.scss';

const App = () => {

  return (
    <>
      <Loader />
      <div className='frame'>

        <img src='/giphy.webp' alt='giphy' className='giphy' />
        <Model />
      </div>
    </>
  );
};

export default App;
