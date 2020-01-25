const axios = require('axios');
const cheerio = require('cheerio');
const chunk = require('lodash/chunk');


const scrapeKenPom = async () => {

  try {

    // scrape kenpom
    const url = 'https://kenpom.com/';
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);

    // pull raw data from html
    let statsHolder = [];
    $('tr td').each((i, elem) => {
      statsHolder.push($(elem).text());
    })
    
    // group array data by team
    const chunkedStats = chunk(statsHolder, 21);

    // create kenpom array
    const kenPomArr = chunkedStats.map(team => {
      return {
        rank: team[0],
        team: team[1],
        conference: team[2],
        winLoss: team[3],
        adjEM: team[4],
        adjO: team[5],
        adjORank: team[6],
        adjD: team[7],
        adjDRank: team[8],
        adjT: team[9],
        adjTRank: team[10],
        adjLuck: team[11],
        adjLuckRank: team[12],
        strengthAdjEM: team[13],
        strengthAdjEMRank: team[14],
        strengthOppO: team[15],
        strengthOppORank: team[16],
        strengthOppD: team[17],
        strengthOppDRank: team[18],
        ncsosAdjEM: team[19],
        ncsosAdjEMRank: team[20]
      }
    })

    return kenPomArr;

  } catch(err) {

    console.error(err);

  }  

}

exports.scrapeKenPom = scrapeKenPom;