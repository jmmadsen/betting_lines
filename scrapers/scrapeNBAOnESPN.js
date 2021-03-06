const axios = require('axios');
const cheerio = require('cheerio');
const chunk = require('lodash/chunk');


const scrapeNBAOnESPN = async () => {

  try {

    // // scrapeNBAOnESPN
    const url = 'https://www.espn.com/nba/stats/team';
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);

    // pull raw data from html
    let rawData = [];
    $('tr td').each((i, elem) => {
      rawData.push($(elem).text());
    })

    // holds team names and ranks
    const teamsAndRanks = rawData.slice(0, 60);
    // holds team stats
    const teamStats = chunk(rawData.slice(60), 19);

    // create espn nba arr
    let espnNBAArr = [];
    let firstArrIncrementor = 0;
    for (let x = 0; x < teamStats.length; x++) {
      espnNBAArr.push({
        rank: parseInt(teamsAndRanks[firstArrIncrementor], 10),
        team: teamsAndRanks[firstArrIncrementor + 1],
        gp: parseInt(teamStats[x][0], 10),
        pts: parseFloat(teamStats[x][1]),
        fgm: parseFloat(teamStats[x][2]),
        fga: parseFloat(teamStats[x][3]),
        fgpct: parseFloat(teamStats[x][4]),
        threepm: parseFloat(teamStats[x][5]),
        threepa: parseFloat(teamStats[x][6]),
        threepct: parseFloat(teamStats[x][7]),
        ftm: parseFloat(teamStats[x][8]),
        fta: parseFloat(teamStats[x][9]),
        ftpct: parseFloat(teamStats[x][10]),
        or: parseFloat(teamStats[x][11]),
        dr: parseFloat(teamStats[x][12]),
        reb: parseFloat(teamStats[x][13]),
        ast: parseFloat(teamStats[x][14]),
        stl: parseFloat(teamStats[x][15]),
        blk: parseFloat(teamStats[x][16]),
        to: parseFloat(teamStats[x][17]),
        pf: parseFloat(teamStats[x][18]),
      });
      firstArrIncrementor += 2;
    }

    const espnNBAObj = {
      name: 'ESPN NBA Stats',
      columns: [
        // { header: 'Rank', key: 'rank', width: 5 },
        { header: 'Team', key: 'team', width: 15 },
        { header: 'Games Played', key: 'gp', width: 15 },
        { header: 'Points', key: 'pts', width: 10 },
        { header: 'FG Made', key: 'fgm', width: 15 },
        { header: 'FG Attmpt.', key: 'fga', width: 10 },
        { header: 'FG %', key: 'fgpct', width: 10 },
        { header: '3pt Made', key: 'threepm', width: 8 },
        { header: '3pt Attmpt.', key: 'threepa', width: 10 },
        { header: '3pt %', key: 'threepct', width: 8 },
        { header: 'FT Made', key: 'ftm', width: 8 },
        { header: 'FT Attmpt.', key: 'fta', width: 8 },
        { header: 'FT %', key: 'ftpct', width: 5 },
        { header: 'Off. Rbnds.', key: 'or', width: 12 },
        { header: 'Def. Rbnds.', key: 'dr', width: 12 },
        { header: 'Rebounds', key: 'reb', width: 10 },
        { header: 'Assists', key: 'ast', width: 10 },
        { header: 'Steals', key: 'stl', width: 8 },
        { header: 'Blocks', key: 'blk', width: 8 },
        { header: 'Turnovers', key: 'to', width: 12 },
        { header: 'Fouls Per Gm.', key: 'pf', width: 15 }
      ],
      data: espnNBAArr
    };

    return espnNBAObj;

  } catch(err) {

    console.error(err);

  }

}

exports.scrapeNBAOnESPN = scrapeNBAOnESPN;