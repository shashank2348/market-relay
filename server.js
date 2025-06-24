// E:\market-relay\server.js
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const PORT = 3000;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Binance price relay endpoint
app.get('/price', async (req, res) => {
  try {
    const symbol = (req.query.symbol || 'BTCUSDT').toUpperCase();
    const apiUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    const r = await fetch(apiUrl);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Binance fetch failed.' });
  }
});

app.listen(PORT, () => console.log(`Relay server running at http://localhost:${PORT}`));
