// src/App.js

import React from 'react';
import ConverterForm from './components/ConverterForm';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="container">
      <h1>Crypto Currency Converter</h1>
      <ConverterForm />
    </div>
  );
};

export default App;
