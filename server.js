const express = require('express');
const cron = require('node-cron');
const app = express();
const port = 3000;
const { getLines } = require('./getLines');
const { convertOdds } = require('./convertOdds');
const { sendEmail } = require('./sendEmail');


// gets heroku env variable and uses that, else if local uses local file
const apiKey = process.env.apiKey;


let mailList = ['jmmadsen16@gmail.com'];
let sportsInSeason = ['americanfootball_nfl', 'basketball_nba', 'basketball_ncaab'];




// cron job to control when email is sent
cron.schedule('00 00 8 * * *', async () => {

  let betsObject = {};

  for (const sport of sportsInSeason) {
    betsObject[sport] = await getLines(apiKey, sport);
  }

  // converts ML odds to traditional US ML figures
  betsObject = convertOdds(betsObject);
  
  // sends email
  sendEmail(betsObject, mailList);

},{
  timezone: "America/New_York"
});



// middleware to apply password protection to routes
app.use((req, res, next) => {
  if (!req.query.password || req.query.password !== process.env.ROUTE_PASSWORD) {
    res.end('Incorrect password');
  } else {
    next();
  }
})

// below is routing for express.js
app.get('/', (req, res) => res.send('Betting lines is live!'));

// sends current sportsInSeason array
app.get('/sports_in_season', (req, res) => res.send(sportsInSeason));

// adds sports to sportsInSeason array
app.post('/add_sport_in_season', (req, res) => {
  try {
    sportsInSeason.push(req.query.sport);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// remove a sport from sportsInSeason array
app.delete('/remove_sport_in_season', (req, res) => {
  try {
    sportsInSeason = sportsInSeason.filter(sport => sport !== req.query.sport);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// sends current mailList array
app.get('/mail_list', (req, res) => res.send(mailList));

// adds email to emailList array
app.post('/add_email', (req, res) => {
  try {
    mailList.push(req.query.email);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// remove a email from mailList array
app.delete('/remove_email', (req, res) => {
  try {
    mailList = mailList.filter(email => email !== req.query.email);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

app.listen(process.env.PORT || port, () => console.log(`Betting lines listening on port ${process.env.PORT ? process.env.PORT : port}!`));