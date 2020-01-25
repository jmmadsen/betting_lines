const { knex } = require('./knexfile');
const express = require('express');
const router = express.Router();
const { emailProcess } = require('./emailProcess');


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
    await emailProcess(false);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

// route only send email to myself for testing
router.post('/send_email_myself', async (req, res) => {
  try {
    await emailProcess(true);
    res.sendStatus(200);
  } catch(err) {
    res.send(err);
  }
})

exports.router = router;