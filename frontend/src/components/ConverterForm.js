import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConverterForm() {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('bitcoin');
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState('usd');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch the list of source cryptocurrencies
    axios.get('/api/currencies')
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleConvert = () => {
    // Perform currency conversion
    axios.get('/api/convert', {
      params: {
        sourceCurrency,
        amount,
        targetCurrency,
      },
    })
    .then(response => {
      setConvertedAmount(response.data.convertedAmount);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="App">
      {/* <h1>Crypto Currency Converter</h1> */}
      <form>
        <label>
          Source Currency:
          <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
            {currencies.map(currency => (
              <option key={currency.id} value={currency.id}>{currency.name} ({currency.symbol})</option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Target Currency:
          <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            {/* Add other currencies as needed */}
          </select>
        </label>
        <button type="button" onClick={handleConvert}>Convert</button>
      </form>
      {convertedAmount !== null && (
        <div>
          <h2>Converted Amount:</h2>
          <p>{convertedAmount} {targetCurrency.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
}

export default ConverterForm;
