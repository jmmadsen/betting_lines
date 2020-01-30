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
        rank: parseInt(team[0], 10),
        team: team[1],
        conference: team[2],
        winLoss: team[3],
        adjEM: parseFloat(team[4]),
        adjO: parseFloat(team[5]),
        adjORank: parseInt(team[6], 10),
        adjD: parseFloat(team[7]),
        adjDRank: parseInt(team[8], 10),
        adjT: parseFloat(team[9]),
        adjTRank: parseInt(team[10], 10),
        adjLuck: parseFloat(team[11]),
        adjLuckRank: parseInt(team[12], 10),
        strengthAdjEM: parseFloat(team[13]),
        strengthAdjEMRank: parseInt(team[14], 10),
        strengthOppO: parseFloat(team[15]),
        strengthOppORank: parseInt(team[16], 10),
        strengthOppD: parseFloat(team[17]),
        strengthOppDRank: parseInt(team[18], 10),
        ncsosAdjEM: parseFloat(team[19]),
        ncsosAdjEMRank: parseInt(team[20], 10)
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