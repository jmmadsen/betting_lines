const express = require('express');
const cron = require('node-cron');
const app = express();
const { knex } = require('./knexfile');
const { scrapeLines } = require('./scrapeLines');
const { sendEmail } = require('./sendEmail');


let mailList = ['jmmadsen16@gmail.com'];
let sportsInSeason = ['americanfootball_nfl', 'basketball_nba', 'basketball_ncaab'];


// called when server first starts
(async function main() {

  app.listen(process.env.PORT, () => console.log(`Betting lines listening on port ${process.env.PORT}!`));

})();

// cron job to control when email is sent
cron.schedule('00 00 10 * * *', async () => {

  // scrapes daily odds from website
  let betsObject = await scrapeLines(sportsInSeason);
  
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

app.get('/mail_list_2', async (req, res) => {
  try {
    const result = await knex('emails_list').select();
    console.log(result);
    res.send(result);
  } catch(err) {
    console.error(err);
  }
})

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

// route to manually trigger testing while hosted in heroku
app.post('/test_email', async (req, res) => {

  // scrapes daily odds from website
  let betsObject = await scrapeLines(sportsInSeason);
  
  // sends email
  sendEmail(betsObject, mailList);

  res.sendStatus(200);
})


// below terminate processes and connections
process.on('uncaughtException', err => {
  console.error(err);
  process.exit();
})

process.on('SIGINT', async () => {
  try {
    await knex.destroy();
    process.exit();
  } catch(err) {
    console.error(err);
  }
})