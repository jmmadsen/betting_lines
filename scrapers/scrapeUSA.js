const axios = require('axios');
const cheerio = require('cheerio');
const chunk = require('lodash/chunk');

const scrapeUSA = async () => {

  try {

    // scrape massey
    const url = 'https://www.https://https://www.usatoday.com/sports/ncaab/sagarin/#Predictions_with_Totals.com/m-basket.htm.com/cb/ncaa-d1/games';
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);

    // pull raw data from html
    let statsHolder = [];
    // $('font').each((i, elem) => {
    //   console.log($(elem).text());
    //   statsHolder.push($(elem).text());
    // })
    $('b').text()

  } catch(err) {
    console.error(err);
  }
 
} 

scrapeUSA();
exports.scrapeUSA = scrapeUSA;