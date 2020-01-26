const { knex } = require('./knexfile');
const { scrapeLines } = require('./scrapers/scrapeLines');
const { scrapeKenPom } = require('./scrapers/scrapeKenPom');
const { scrapeSonny } = require('./scrapers/scrapeSonny');
const { createExcel } = require('./processes/createExcel');
const { sendEmail } = require('./processes/sendEmail');


const emailProcess = async (isTest) => {

  try {
    let mailList;
    if (isTest) {
      mailList = ['jmmadsen16@gmail.com'];
    } else {
      // fetch emails from DB
      mailList = await knex('emails_list').select().map(row => row.email);
    }

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

    // xlsx data holder
    let excelData = [];

    // scrapes ncaam stat sites for xlsx
    if (sportsInSeason.includes('ncaam')) {
      const kenPom = await scrapeKenPom();
      excelData.push(kenPom);
      const sonny = await(scrapeSonny());
      excelData.push(sonny);
    }

    // creates csv file
    await createExcel(excelData);
    
    // sends email
    sendEmail(betsObject, mailList);
  } catch(err) {
    console.error(err);
  }

}

exports.emailProcess = emailProcess;