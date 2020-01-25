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

    // creates kenpom object for excel
    let kenPomObj = {
      name: 'KenPom Ratings',
      columns: [
        { header: 'Rank', key: 'rank', width: 5 },
        { header: 'Team', key: 'team', width: 15 },
        { header: 'Conference', key: 'conference', width: 10 },
        { header: 'Win/Loss', key: 'winLoss', width: 10 },
        { header: 'Adj. EM', key: 'adjEM', width: 10 },
        { header: 'Adj. O', key: 'adjO', width: 10 },
        { header: 'Adj. O Rank', key: 'adjORank', width: 12 },
        { header: 'Adj. D', key: 'adjD', width: 10 },
        { header: 'Adj. D Rank', key: 'adjDRank', width: 12 },
        { header: 'Adj. T', key: 'adjT', width: 10 },
        { header: 'Adj. T Rank', key: 'adjTRank', width: 12 },
        { header: 'Adj. Luck', key: 'adjLuck', width: 10 },
        { header: 'Adj. Luck Rank', key: 'adjLuckRank', width: 12 },
        { header: 'SoS Adj. EM', key: 'strengthAdjEM', width: 12 },
        { header: 'SoS Adj. EM Rank', key: 'strengthAdjEMRank', width: 15 },
        { header: 'SoS Opp. O', key: 'strengthOppO', width: 12 },
        { header: 'SoS Opp. O Rank', key: 'strengthOppORank', width: 15 },
        { header: 'SoS Opp. D', key: 'strengthOppD', width: 12 },
        { header: 'SoS Opp. D Rank', key: 'strengthOppDRank', width: 15 },
        { header: 'NCSOS Adj. EM', key: 'ncsosAdjEM', width: 12 },
        { header: 'NCSOS Adj. EM Rank', key: 'ncsosAdjEMRank', width: 15 }
      ],
      data: kenPomArr
    };

    return kenPomObj;

  } catch(err) {

    console.error(err);

  }  

}

exports.scrapeKenPom = scrapeKenPom;