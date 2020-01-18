const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const key = require('./apiKey');
const apiKey = key.apiKey;


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/sports', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.the-odds-api.com/v3/sports', {
      params: {
        api_key: apiKey
      }
    });
    res.send(data.data);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.get('/nfl_moneyline', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.the-odds-api.com/v3/odds', {
      params: {
          api_key: apiKey,
          sport: 'americanfootball_nfl',
          region: 'us',
          mkt: 'h2h'
      }
    })
    res.send(data.data)
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.listen(port, () => console.log(`Betting lines listening on port ${port}!`));