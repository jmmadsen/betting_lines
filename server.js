const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const key = require('./apiKey');
const apiKey = key.apiKey;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/test', async(req, res, next) => {
  res.send('dumbass');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));