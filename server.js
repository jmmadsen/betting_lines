const express = require('express');
const cron = require('node-cron');
const app = express();
const { knex } = require('./knexfile');
const { router } = require('./router');
const { scrapeLines } = require('./scrapeLines');
const { sendEmail } = require('./sendEmail');


// called when server first starts
(async function main() {

  app.listen(process.env.PORT, () => console.log(`Betting lines listening on port ${process.env.PORT}!`));

})();

// cron job to control when email is sent
cron.schedule('00 00 10 * * *', async () => {

  try {
    console.log("Running cron job");
    // fetch emails from DB
    const mailList = await knex('emails_list').select().map(row => row.email);

    // fetch sports in season from DB
    let sportsInSeason = await knex('sports_seasons')
      .select('sport')
      .where('startDate', '<=', new Date())
      .andWhere('endDate', '>=', new Date())
      .map(row => row.sport);

    // order of precedence which they routerear in email
    const sportsOrder = ['nfl', 'ncaaf', 'nba', 'ncaam', 'mlb', 'nhl'];
    sportsInSeason.sort((a, b) => {
      return sportsOrder.indexOf(a) - sportsOrder.indexOf(b);
    });

    // scrapes daily odds from website
    let betsObject = await scrapeLines(sportsInSeason);
    
    // sends email
    sendEmail(betsObject, mailList);
  } catch(err) {
    res.send(err);
  }

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

// redirect express routes to another file
app.use('/router', router);

// below terminates processes and connections
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