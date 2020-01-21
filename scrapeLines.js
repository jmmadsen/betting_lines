const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.actionnetwork.com/ncaab/best-lines';
// const url = 'https://www.actionnetwork.com/nba/best-lines'


scrapeWebData = async () => {

  getHTML = async (url) => {

    try {
      const result = await axios.get(url);
      return result.data;
    } catch(err) {
      console.error(err);
    }
  
  }
  
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

    // scrapes game times
    let timesHolder = [];
    $('.game-status-bar__gametime--positioned').each((i, elem) => {
      timesHolder.push($(elem).text().slice(0, $(elem).text().indexOf(',')))
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
      game.time = game.time.slice(game.time.indexOf(' ') + 1);
      game.awaySpread = game.awaySpread !== 'N/A' ? game.awaySpread.slice(0, game.awaySpread.indexOf('-', 1)) : 'N/A';
      game.homeSpread = game.homeSpread !== 'N/A' ? game.homeSpread.slice(0, game.homeSpread.indexOf('-', 1)) : 'N/A';
      game.overUnder = game.overUnder !== 'N/A' ? game.overUnder.slice(1, game.overUnder.indexOf('-')) : 'N/A';
    }

    console.log(games)

  }
  
  const html = await getHTML(url);
  getInfo(html);

}

scrapeWebData();