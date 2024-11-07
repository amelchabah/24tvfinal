// App.js
import React from 'react';
import Model from './Modeltest.js'; // Assurez-vous que le chemin est correct
import './globals.scss';

const App = () => {
  return (
    <div className='frame'>
      {/* <div className='progress-bar'>
        <div className='progress' />
      </div> */}
      <Model />
    </div>
  );
};

export default App;
