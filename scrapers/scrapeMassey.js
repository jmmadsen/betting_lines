const axios = require('axios');
const cheerio = require('cheerio');
const chunk = require('lodash/chunk');

const scrapeMassey = async () => {

  try {

    // scrape massey
    const url = 'https://www.masseyratings.com/cb/ncaa-d1/games';
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);

    // pull raw data from html
    let statsHolder = [];
    $('.divcont').each((i, elem) => {
      console.log($(elem).text());
      statsHolder.push($(elem).text());
    })

  } catch(err) {
    console.error(err);
  }
 
} 

scrapeMassey();
exports.scrapeMassey = scrapeMassey;