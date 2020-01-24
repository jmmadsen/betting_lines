let nodemailer = require('nodemailer');


// gets heroku env variable
const password = process.env.PASSWORD;

const sendEmail = (betsObject, mailList) => {

  // login to email account created for sending daily lines
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'daily.bets.2020@gmail.com',
      pass: password
    }
  });

  // creates html for email by looping through all the teams in the data object
  let html = 
  `
    <head>
      <style>
      table, th, td {
        border: 1px solid gray;
        margin: auto;
      }
      h3 {
        text-align: center;
      }
      td.negative {
        color: green;
      }
      td.positive {
        color: red;
      }
      </style>
    </head>
    <body>
    `;

  for (const sport in betsObject) {

    let sportName;
    switch(sport) {
      case 'americanfootball_nfl':
        sportName = 'NFL';
        break;
      case 'basketball_nba':
        sportName = 'NBA';
        break;
      case 'basketball_ncaab':
        sportName = 'NCAAM';
        break;
      case 'icehockey_nhl':
        sportName = 'NHL';
        break;
    }

    html = html + 
    `
    <h3>${sportName}</h3>
    <table>
      <tr>
        <th>Time</th>
        <th>Away Team</th>
        <th>Spread</th>
        <th>ML</th>
        <th>Probability</th>
        <th>Home Team</th>
        <th>Spread</th>
        <th>ML</th>
        <th>Probability</th>
        <th>Over/Under</th>
      </tr>
    `
    for (const game of betsObject[sport]) {
      html = html + 
      `
        <tr>
          <td>${game.time.slice(0, game.time.indexOf('M') + 1)}</td>
          <td>${game.awayTeam}</td>
          <td ${game.awaySpread !== 'N/A' ? game.awaySpread.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.awaySpread ? game.awaySpread.includes('-') || game.homeSpread.includes('N/A') ? game.awaySpread : '' + game.awaySpread : 'N/A'}</td>
          <td ${game.awayML !== 'N/A' ? game.awayML.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.awayML}</td>
          <td ${game.awayML !== 'N/A' ? game.awayML.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.awayML === 'N/A' ? 'N/A' : parseFloat(game.awayML) < 0 ? (((-1 * parseFloat(game.awayML)) / (-1 * parseFloat(game.awayML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' : ((100 / (parseFloat(game.awayML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' }</td>
          <td>${game.homeTeam}</td>
          <td ${game.homeSpread !== 'N/A' ? game.homeSpread.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.homeSpread ? game.homeSpread.includes('-') || game.homeSpread.includes('N/A') ? game.homeSpread : '' + game.homeSpread : 'N/A'}</td>
          <td ${game.homeML !== 'N/A' ? game.homeML.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.homeML}</td>
          <td ${game.homeML !== 'N/A' ? game.homeML.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.homeML === 'N/A' ? 'N/A' : parseFloat(game.homeML) < 0 ? (((-1 * parseFloat(game.homeML)) / (-1 * parseFloat(game.homeML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' : ((100 / (parseFloat(game.homeML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' }</td>
          <td>${game.overUnder}</td>
        </tr>
      `
    }
    html = html + 
    `
    </table>
    `

  }

  html = html + 
  `
    <br>
    <center>
      <h4>Email jmmadsen16@gmail.com to request features, and to add or remove people from this email list</h4>
      <h5>Coming Soon: Excel attachment with analytics for day's games (i.e. KenPom, etc.)</h5>
      <a href="https://github.com/jmmadsen/betting_lines">Click here to see the code for this application</a>
    </center>
    </body>
  `

  var mailOptions = {
    from: 'daily.bets.2020@gmail.com',
    bcc: mailList.join(', '),
    subject: `Bets for ${new Date().toLocaleDateString()}`,
    text: `Bets for ${new Date().toLocaleDateString()}`,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

exports.sendEmail = sendEmail;