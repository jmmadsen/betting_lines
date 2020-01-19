const express = require('express');
const cron = require('node-cron');
const app = express();
const port = 3000;
const key = require('./apiKey');
const { getLines } = require('./getLines');
const { convertOdds } = require('./convertOdds');
const apiKey = key.apiKey;


let sportsInSeason = ['americanfootball_nfl', 'basketball_nba', 'basketball_ncaab'];


app.get('/', (req, res) => res.send('Betting lines is live!'));

app.listen(port, () => console.log(`Betting lines listening on port ${port}!`));

//cron job to control when email is sent
cron.schedule('* * * * *', async () => {

  let betsObject = {};

  for (const sport of sportsInSeason) {
    betsObject[sport] = await getLines(apiKey, sport);
  }

  betsObject = convertOdds(betsObject);
  console.log(betsObject);

});