const axios = require('axios');


const getLines = async (apiKey, sport) => {

  const ML = await axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
        api_key: apiKey,
        sport: sport,
        region: 'us',
        mkt: 'h2h'
    }
  });

  const spreads = await axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
        api_key: apiKey,
        sport: sport,
        region: 'us',
        mkt: 'spreads'
    }
  });

  const totals = await axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
        api_key: apiKey,
        sport: sport,
        region: 'us',
        mkt: 'totals'
    }
  });

  const possibleBets = ML.data.data.map(game => {

    try {
      if (game.sites.length === 0) {
        return {
          time: new Date(game.commence_time * 1000).toLocaleString('en', { timeZone: 'America/New_York' }).slice(new Date(game.commence_time * 1000).toLocaleString().indexOf(',') + 2).toString() + ' (' + new Date(game.commence_time * 1000).toLocaleDateString().slice(0, new Date(game.commence_time * 1000).toLocaleDateString().indexOf('2020') - 1).toString() + ')',
          homeTeam: game.home_team,
          homeML: 'N/A',
          homeSpread: 'N/A',
          awayTeam: game.teams.filter(team => team !== game.home_team)[0],
          awayML: 'N/A',
          awaySpread: 'N/A',
          overUnder: 'N/A'
        }
      }
  
      return {
        time: new Date(game.commence_time * 1000).toLocaleString('en', { timeZone: 'America/New_York' }).slice(new Date(game.commence_time * 1000).toLocaleString().indexOf(',') + 2).toString() + ' (' + new Date(game.commence_time * 1000).toLocaleDateString().slice(0, new Date(game.commence_time * 1000).toLocaleDateString().indexOf('2020') - 1).toString() + ')',
        homeTeam: game.home_team,
        homeML: game.sites.length ? game.sites[0].odds.h2h[game.teams.findIndex(team => team === game.home_team)].toString() : 'N/A',
        homeSpread: spreads.data.data.filter(spreadsGame => spreadsGame.home_team === game.home_team)[0].sites.length ? spreads.data.data.filter(spreadsGame => spreadsGame.home_team === game.home_team)[0].sites[0].odds.spreads.points[game.teams.findIndex(team => team === game.home_team)] : 'N/A',
        awayTeam: game.teams.filter(team => team !== game.home_team)[0],
        awayML: game.sites.length ? game.sites[0].odds.h2h[game.teams.findIndex(team => team === game.home_team) === 0 ? 1 : 0].toString() : 'N/A',
        awaySpread: spreads.data.data.filter(spreadsGame => spreadsGame.home_team === game.home_team)[0].sites.length ? spreads.data.data.filter(spreadsGame => spreadsGame.home_team === game.home_team)[0].sites[0].odds.spreads.points[game.teams.findIndex(team => team !== game.home_team)] : 'N/A',
        overUnder: totals.data.data.filter(ouGame => ouGame.home_team === game.home_team)[0].sites.length ?  totals.data.data.filter(ouGame => ouGame.home_team === game.home_team)[0].sites[0].odds.totals.points[0].toString() : 'N/A'
      }

    } catch(err) {

      return {
        time: new Date(game.commence_time * 1000).toLocaleString('en', { timeZone: 'America/New_York' }).slice(new Date(game.commence_time * 1000).toLocaleString().indexOf(',') + 2).toString() + ' (' + new Date(game.commence_time * 1000).toLocaleDateString().slice(0, new Date(game.commence_time * 1000).toLocaleDateString().indexOf('2020') - 1).toString() + ')',
        homeTeam: game.home_team,
        homeML: 'N/A',
        homeSpread: 'N/A',
        awayTeam: game.teams.filter(team => team !== game.home_team)[0],
        awayML: 'N/A',
        awaySpread: 'N/A',
        overUnder: 'N/A'
      }

    }

  });

  return possibleBets;

}

exports.getLines = getLines;