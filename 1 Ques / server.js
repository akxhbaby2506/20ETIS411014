const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.use(express.json());

async function fetchNumbersFromURL(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error.message}`);
    return [];
  }
}

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  const mergedNumbers = [];

  for (const url of urls) {
    const numbers = await fetchNumbersFromURL(url);
    mergedNumbers.push(...numbers);
  }

  const uniqueSortedNumbers = Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);
  res.json({ numbers: uniqueSortedNumbers });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
