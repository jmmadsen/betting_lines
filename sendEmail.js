var nodemailer = require('nodemailer');
const { password } = require('./password');
const { data } = require('./data');


// login to email account created for sending daily lines
var transporter = nodemailer.createTransport({
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
      border: 1px solid black;
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

for (const sport in data) {

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
  }

  html = html + 
  `
  <h3>${sportName}</h3>
  <table>
    <tr>
      <th>Time</th>
      <th>Home Team</th>
      <th>ML</th>
      <th>Spread</th>
      <th>Away Team</th>
      <th>ML</th>
      <th>Spread</th>
      <th>Over/Under</th>
    </tr>
  `
  for (const game of data[sport]) {
    html = html + 
    `
      <tr>
        <td>${game.time.slice(0, game.time.indexOf(':', 3)) + game.time.slice(game.time.indexOf('M') - 2)}</td>
        <td>${game.homeTeam}</td>
        <td>${game.homeML}</td>
        <td ${game.homeSpread ? game.homeSpread.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.homeSpread ? game.homeSpread.includes('-') ? game.homeSpread : '+' + game.homeSpread : 'N/A'}</td>
        <td>${game.awayTeam}</td>
        <td>${game.awayML}</td>
        <td ${game.awaySpread ? game.awaySpread.includes('-') ? `class="negative"` : `class="positive"` : null}>${game.awaySpread ? game.awaySpread.includes('-') ? game.awaySpread : '+' + game.awaySpread : 'N/A'}</td>
        <td>${game.overUnder}</td>
      </tr>
    `
  }
  html = html + 
  `
  </table>
  </br>
  </body>
  `

}

var mailOptions = {
  from: 'hammer.the.over.2020@gmail.com',
  to: 'jmmadsen16@gmail.com',
  subject: `Bets for ${new Date().toLocaleDateString()}`,
  text: 'That was easy!',
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});