import express from "express";
import axios from 'axios';
import  cors from 'cors';
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// API endpoint to fetch the top 100 cryptocurrencies and supported currencies
app.get('/api/currencies', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    const currencies = response.data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
    }));
    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for currency conversion
app.get('/api/convert', async (req, res) => {
  const { sourceCurrency, amount, targetCurrency } = req.query;

  try {
    // Call the public API to get real-time exchange rates
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: sourceCurrency,
        vs_currencies: targetCurrency,
      },
    });

    const exchangeRate = response.data[sourceCurrency][targetCurrency];
    const convertedAmount = amount * exchangeRate;

    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
