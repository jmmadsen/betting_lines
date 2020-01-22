const axios = require('axios');
const cheerio = require('cheerio');


const scrapeLines = async (sportsArr) => {

  // fetches html from url
  getHTML = async (url) => {

    try {
      const result = await axios.get(url);
      return result.data;
    } catch(err) {
      console.error(err);
    }
  
  }
  
  // uses cheerio and data cleansing to read in daily data
  getInfo = async (html) => {
  
    const $ = cheerio.load(html);

    let teams = [];
    // gets teams for each game
    $('.game-info__team--desktop').each((i, elem) => {
      if (!teams.includes($(elem).text())) {
        teams.push($(elem).text());
      }
    })

    // couples teams into game object with home and away teams
    let games = [];
    let awayCount = 0;
    let homeCount = 1;
    while (homeCount <= teams.length - 1) {
      let gameObj = {
        awayTeam: teams[awayCount],
        homeTeam: teams[homeCount]
      }
      awayCount += 2;
      homeCount += 2;
      games.push(gameObj);
    }

    // used in time scraping to convert scraped date string to EST time
    tzConversion = (time) => {

      let newTime;
      newTime = parseInt(time.slice(0, time.indexOf(':'))) - 5;
      if (time.includes('AM')) {
        if (newTime === 7) {
          return [newTime.toString(), 'PM'];
        }
        if (newTime > 0) {
          return [newTime.toString(), 'AM'];
        } else if (newTime === 0) {
          return ['12', 'AM'];
        } else {
          return[(12 + newTime).toString(), 'PM']
        }
      } else {
        if (newTime > 0) {
          return [newTime.toString(), 'PM'];
        } else if (newTime === 0) {
          return ['12', 'PM'];
        } else {
          return[(12 + newTime).toString(), 'AM']
        }
      }

    }

    // scrapes game times and convert from UTC to EST
    let timesHolder = [];
    $('.game-status-bar__gametime--positioned').each((i, elem) => {

      let time;
      if (!$(elem).text().includes('on')) {
        if ($(elem).text().includes('in')) {
          time = 'N/A';
        } else {
          let text = $(elem).text()
          text = text.slice(text.indexOf(',') + 2, text.indexOf('M') + 1);
          time = text;
          time = tzConversion(time)[0] + time.slice(time.indexOf(':'), time.indexOf(' ')) + tzConversion(time)[1];
        }
      } else if ($(elem).text().slice(0, $(elem).text().indexOf('on') - 1).length > 10) {
        let temp = $(elem).text().slice(0, $(elem).text().indexOf('on') - 1);
        temp = temp.slice(temp.indexOf(', ') + 2) + ' (' + temp.slice(temp.indexOf(' ') + 1, temp.indexOf(',')) + ')';
        time = temp;
        time = tzConversion(time)[0] + time.slice(time.indexOf(':'), time.indexOf(' ')) + tzConversion(time)[1] + ' ' + time.slice(time.indexOf('('));
      } else {
        time = $(elem).text().slice(0, $(elem).text().indexOf('on') - 1);
        time = tzConversion(time)[0] + time.slice(time.indexOf(':'), time.indexOf(' ')) + tzConversion(time)[1];
      }
      timesHolder.push(time);

    })

    // merge game times
    let timeCount = 0;
    for (let game of games) {
      game.time = timesHolder[timeCount];
      timeCount += 1;
    }

    // scrapes all odds off page
    let oddsHolder = []
    $('.book-cell__odds').each((i, elem) => {
      oddsHolder.push($(elem).text());
    })

    // orders odds together
    let gameCount = 0;
    for (let game of games) {
      game.awaySpread = oddsHolder[gameCount];
      game.homeSpread = oddsHolder[gameCount + 1];
      game.awayML = oddsHolder[gameCount + 2];
      game.homeML = oddsHolder[gameCount + 3];
      game.overUnder = oddsHolder[gameCount + 4];
      gameCount += 6;
    }

    // tidy up 
    for (let game of games) {
      game.awaySpread = game.awaySpread !== 'N/A' ? game.awaySpread.slice(0, game.awaySpread.indexOf('-', 1)) : 'N/A';
      game.homeSpread = game.homeSpread !== 'N/A' ? game.homeSpread.slice(0, game.homeSpread.indexOf('-', 1)) : 'N/A';
      game.overUnder = game.overUnder !== 'N/A' ? game.overUnder.slice(1, game.overUnder.indexOf('-')) : 'N/A';
    }

    return games;

  }

  let betsObj = {};

  // loops through arr passed into function, and scrapes page for each sport
  for (const sport of sportsArr) {
    let url;
    switch(sport) {
      case 'americanfootball_nfl':
        url = 'https://www.actionnetwork.com/nfl/best-lines';
        break;
      case 'basketball_nba':
        url = 'https://www.actionnetwork.com/nba/best-lines';
        break;
      case 'basketball_ncaab':
        url = 'https://www.actionnetwork.com/ncaab/best-lines';
        break;
      case 'icehockey_nhl':
        url = 'https://www.actionnetwork.com/nhl/best-lines';
        break;
    }

    const html = await getHTML(url);
    betsObj[sport] = await getInfo(html);

  }

  return betsObj;

}

exports.scrapeLines = scrapeLines;