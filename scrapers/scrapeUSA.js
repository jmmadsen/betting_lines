const axios = require('axios');
const cheerio = require('cheerio');
const chunk = require('lodash/chunk');

const scrapeUSA = async () => {

  try {

    // scrape usa
    const url = 'https://www.usatoday.com/sports/ncaab/sagarin/#Predictions_with_Totals';
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);

    // pull raw data from html
    let rawData = [];
    $('font').each((i, elem) => {
      rawData.push($(elem).text());
    })

    // selects long strings that contain all the data
    let tempHolder = rawData.filter(item => item.length > 100);
    
    // more cleansing
    let tempHolder2 = [];
    for (let string of tempHolder) {
      let newItem = '';
      for (let x = 0; x < string.length; x++) {
        if (string[x] !== ' ') {
          newItem += string[x];
        } else if (string[x + 1] !== ' ') {
          newItem += string[x];
        }
      }
      tempHolder2.push(newItem);
    }

    tempHolder3 = tempHolder2.filter(item => item.length > 200);
    console.log(tempHolder3)

  } catch(err) {
    console.error(err);
  }
 
} 

scrapeUSA();
exports.scrapeUSA = scrapeUSA;