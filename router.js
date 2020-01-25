const { knex } = require('./knexfile');
const express = require('express');
const router = express.Router();
const { scrapeLines } = require('./scrapeLines');
const { scrapeKenPom } = require('./scrapeKenPom');
const { createExcel } = require('./createExcel');
const { sendEmail } = require('./sendEmail');


// send all from sports_seasons table
router.get('/sports_in_season', async (req, res) => res.send(await knex('sports_seasons').select()));

// adds sport to sports_seasons table
router.post('/add_sport_in_season', async (req, res) => { 
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
router.put('/update_sport_season_dates', async (req, res) => {
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
router.delete('/remove_sport_in_season', async (req, res) => {
  try {
    await knex('sports_seasons').delete().where('sport', req.query.sport);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// sends current mailList array
router.get('/mail_list', async (req, res) => {
  try {
    const result = await knex('emails_list').select();
    res.send(result);
  } catch(err) {
    res.send(err);
  }
})

// adds email to emailList array
router.post('/add_email', async (req, res) => {
  try {
    await knex('emails_list').insert({email: req.query.email});
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// remove an email from mailList array
router.delete('/remove_email', async (req, res) => {
  try {
    await knex('emails_list').delete().where('email', req.query.email);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// route to manually trigger email
router.post('/send_email', async (req, res) => {
  try {
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

    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// route only send email to myself for production testing
router.post('/send_email_myself', async (req, res) => {
  try {
    const mailList = ['jmmadsen16@gmail.com'];

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
    const betsObject = await scrapeLines(sportsInSeason);

    // scrapes knepom
    const kenPom = await scrapeKenPom();

    // creates csv file
    await createExcel([kenPom]);
    
    // sends email
    sendEmail(betsObject, mailList);

    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

exports.router = router;