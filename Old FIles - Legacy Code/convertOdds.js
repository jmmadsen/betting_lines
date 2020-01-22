const convertOdds = (betsObject) => {

  for (let sport in betsObject) {
    for (let game of betsObject[sport]) {
      if (game.homeML !== 'N/A' && game.awayML !== 'N/A') {
        let newHomeML;
        if (parseFloat(game.homeML) >= 2) {
          newHomeML = '+' + Math.round(((parseFloat(game.homeML) -1) * 100)).toString();
        } else {
          newHomeML = Math.round(((-100)/(parseFloat(game.homeML) - 1))).toString();
        }
        game.homeML = newHomeML;
        let newAwayML;
        if (parseFloat(game.awayML) >= 2) {
          newAwayML = '+' + Math.round(((parseFloat(game.awayML) -1) * 100)).toString();
        } else {
          newAwayML = Math.round(((-100)/(parseFloat(game.awayML) - 1))).toString();
        }
        game.awayML = newAwayML;
      }
    }
  }
  return betsObject;
}

exports.convertOdds = convertOdds;