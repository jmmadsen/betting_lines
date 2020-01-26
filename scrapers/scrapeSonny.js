const axios = require('axios');
const cheerio = require('cheerio');
const chunk = require('lodash/chunk');

const scrapeSonny = async () => {

  try {

    // scrape massey
    const url = 'https://sonnymoorepowerratings.com/m-basket.htm';
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);

    // pull raw data from html
    let rawData = [];
    $('b').each((i, elem) => {
      rawData.push($(elem).text());
    });

    // split raw data by blank spaces
    let tempHolder = [];
    for (let x of rawData[1]) {
      if (x.length > 0) {
        tempHolder.push(x);
      } else (
        tempHolder.push('break')
      );
    }

    // sanitizing blanks
    tempHolder= tempHolder.slice(3);
    
    // remove \n
    tempHolder2 = [];
    for (let x of tempHolder) {
      if (x !== "\n") {
        tempHolder2.push(x);
      }
    }

    // more cleansing
    let tempHolder3 = [];
    for (let x = 0; x <tempHolder2.length; x++) {
      if (tempHolder2[x] !== ' ') {
        tempHolder3.push(tempHolder2[x]);
      } else {
        if (tempHolder2[x + 1] !== ' ') {
          tempHolder3.push(tempHolder2[x]);
        }
      }
    }

    // array of all the full strings
    let tempHolder4 = [];
    let string;
    for (let x of tempHolder3) {
      if (x !== ' ') {
        string += x;
      } else {
        tempHolder4.push(string);
        string = '';
      }
    }
    tempHolder4.unshift('1')

    // combine team names
    let tempHolder5 = [];
    for (let x = 0; x < tempHolder4.length; x++) {
      if (isNaN(parseFloat(tempHolder4[x]))) {
        if (isNaN(parseFloat(tempHolder4[x + 1]))) {
          if (isNaN(parseFloat(tempHolder4[x + 2]))) {
            if (isNaN(parseFloat(tempHolder4[x + 3]))) {
              const string = tempHolder4[x] + ' ' + tempHolder4[x + 1] + ' ' + tempHolder4[x + 2] + ' ' + tempHolder4[x + 3];
              tempHolder5.push(string);
              x += 3;
            } else {
              const string = tempHolder4[x] + ' ' + tempHolder4[x + 1] + ' ' + tempHolder4[x + 2];
              tempHolder5.push(string);
              x += 2;
            }
          } else {
            const string = tempHolder4[x] + ' ' + tempHolder4[x + 1];
            tempHolder5.push(string);
            x += 1;
          }
        } else {
          tempHolder5.push(tempHolder4[x]);
        }
      } else {
        tempHolder5.push(tempHolder4[x]);
      }
    }

    // deals with weird error after 100 strings are combined
    let tempHolder6 = [];
    for (let x of tempHolder5) {
      if (isNaN(parseFloat(x))) {
        tempHolder6.push(x);
      } else {
        if (x.length > 5) {
          const first = x.slice(0, 5);
          const second = x.slice(5);
          tempHolder6.push(first);
          tempHolder6.push(second);
        } else {
          tempHolder6.push(x);
        }
      }
    }

    tempHolder7 = chunk(tempHolder6, 7);

    // removes extraneous at end, data cleansed
    let finalData = tempHolder7.slice(0, tempHolder7.length - 1);
    finalData[0][1] = finalData[0][1].slice(finalData[0][1].indexOf(' ') + 1);
    
    // create sonny array
    const sonnArr = finalData.map(team => {
      return {
        rank: team[0],
        team: team[1],
        wins: team[2],
        loss: team[3],
        ties: team[4],
        sos: team[5],
        pr: team[6]
      }
    });

    const sonnyObj = {
      name :'Sonny Power Ratings',
      columns: [
        { header: 'Rank', key: 'rank', width: 5 },
        { header: 'Team', key: 'team', width: 15 },
        { header: 'Wins', key: 'wins', width: 5 },
        { header: 'Losses', key: 'loss', width: 5 },
        { header: 'Ties', key: 'tie', width: 5 },
        { header: 'Strength of Schedule', key: 'sos', width: 15 },
        { header: 'Power Ranking', key: 'pr', width: 10 }
      ],
      data: sonnArr
    }

    return sonnyObj;

  } catch(err) {
    console.error(err);
  }
 
} 

exports.scrapeSonny = scrapeSonny;