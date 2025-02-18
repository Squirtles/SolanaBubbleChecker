const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// API endpoint to fetch token holders
app.get('/api/holders', async (req, res) => {
  try {
    const tokenAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC token on Solana
    const url = `https://api.solscan.io/token/holders?token=${tokenAddress}&offset=0&limit=100`;

    const response = await axios.get(url);
    const holders = response.data.data.map(holder => ({
      address: holder.owner,
      balance: holder.amount,
    }));

    res.json(holders);
  } catch (error) {
    console.error('Error fetching token holders:', error);
    res.status(500).json({ error: 'Failed to fetch token holders' });
  }
});

// Serve static files from the public folder
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
