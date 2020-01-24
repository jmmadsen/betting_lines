const express = require('express');
const cron = require('node-cron');
const app = express();
const { knex } = require('./knexfile');
const { scrapeLines } = require('./scrapeLines');
const { sendEmail } = require('./sendEmail');


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

// send all from sports_seasons table
app.get('/sports_in_season', async (req, res) => res.send(await knex('sports_seasons').select()));

// adds sport to sports_seasons table
app.post('/add_sport_in_season', async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    await knex('sports_seasons').insert({ sport: req.query.sport, startDate, endDate });
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// update the season dates for a sport
app.put('/update_sport_season_dates', async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    await knex('sports_seasons').where('sport', req.query.sport).update({ startDate, endDate });
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// remove a sport from sports_seasons table
app.delete('/remove_sport_in_season', async (req, res) => {
  try {
    await knex('sports_seasons').delete().where('sport', req.query.sport);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// sends current mailList array
app.get('/mail_list', async (req, res) => {
  try {
    const result = await knex('emails_list').select();
    res.send(result);
  } catch(err) {
    res.send(err);
  }
})

// adds email to emailList array
app.post('/add_email', async (req, res) => {
  try {
    await knex('emails_list').insert({email: req.query.email});
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// remove an email from mailList array
app.delete('/remove_email', async (req, res) => {
  try {
    await knex('emails_list').delete().where('email', req.query.email);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// route to manually trigger testing while hosted in heroku
app.post('/test_email', async (req, res) => {
  try {
    // fetch emails from DB
    const mailList = await knex('emails_list').select().map(row => row.email);

    // fetch sports in season from DB
    let sportsInSeason = await knex('sports_seasons')
      .select('sport')
      .where('startDate', '<=', new Date())
      .andWhere('endDate', '>=', new Date())
      .map(row => row.sport);

    // order of precedence which they appear in email
    const sportsOrder = ['nfl', 'ncaaf', 'nba', 'ncaam', 'mlb', 'nhl'];
    sportsInSeason.sort((a, b) => {
      return sportsOrder.indexOf(a) - sportsOrder.indexOf(b);
    });

    // scrapes daily odds from website
    let betsObject = await scrapeLines(sportsInSeason);
    
    // sends email
    sendEmail(betsObject, mailList);

    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
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