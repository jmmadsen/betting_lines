let nodemailer = require('nodemailer');


// gets heroku env variable
const password = process.env.password;

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

      body {
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; 
      }

      table {
        border: 1px solid gray;
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top; 
      }

      th, td {
        border: 1px solid gray;
      }

      #negative {
        color: green;
      }
      #positive {
        color: red;
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #f6f6f6;
        width: 100%; 
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px; 
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px; 
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%; 
      }

      .wrapper {
        box-sizing: border-box;
        padding: 7.5px; 
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      h1, h2, h3 {
        text-align: center;
      }

      a {
        color: #3498db;
        text-decoration: underline; 
      }

      .align-center {
        text-align: center; 
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important; 
        }
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important; 
        }
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important; 
        }
        table[class=body] .content {
          padding: 0 !important; 
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important; 
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important; 
        }
        table[class=body] .btn table {
          width: 100% !important; 
        }
        table[class=body] .btn a {
          width: 100% !important; 
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important; 
        }
      }

      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%; 
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%; 
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important; 
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        .btn-primary table td:hover {
          background-color: #34495e !important; 
        }
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important; 
        } 
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
    <h1 class="align-center">${sportName}</h1>
    <table role="presentation" class="main">
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
          <td class="wrapper" >${game.time.slice(0, game.time.indexOf('M') + 1)}</td>
          <td class="wrapper" >${game.awayTeam}</td>
          <td class="wrapper"  ${game.awaySpread !== 'N/A' ? game.awaySpread.includes('-') ? `id="negative"` : `id="positive"` : null}>${game.awaySpread ? game.awaySpread.includes('-') || game.homeSpread.includes('N/A') ? game.awaySpread : '' + game.awaySpread : 'N/A'}</td>
          <td class="wrapper"  ${game.awayML !== 'N/A' ? game.awayML.includes('-') ? `id="negative"` : `id="positive"` : null}>${game.awayML}</td>
          <td class="wrapper"  ${game.awayML !== 'N/A' ? game.awayML.includes('-') ? `id="negative"` : `id="positive"` : null}>${game.awayML === 'N/A' ? 'N/A' : parseFloat(game.awayML) < 0 ? (((-1 * parseFloat(game.awayML)) / (-1 * parseFloat(game.awayML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' : ((100 / (parseFloat(game.awayML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' }</td>
          <td class="wrapper" >${game.homeTeam}</td>
          <td class="wrapper"  ${game.homeSpread !== 'N/A' ? game.homeSpread.includes('-') ? `id="negative"` : `id="positive"` : null}>${game.homeSpread ? game.homeSpread.includes('-') || game.homeSpread.includes('N/A') ? game.homeSpread : '' + game.homeSpread : 'N/A'}</td>
          <td class="wrapper"  ${game.homeML !== 'N/A' ? game.homeML.includes('-') ? `id="negative"` : `id="positive"` : null}>${game.homeML}</td>
          <td class="wrapper"  ${game.homeML !== 'N/A' ? game.homeML.includes('-') ? `id="negative"` : `id="positive"` : null}>${game.homeML === 'N/A' ? 'N/A' : parseFloat(game.homeML) < 0 ? (((-1 * parseFloat(game.homeML)) / (-1 * parseFloat(game.homeML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' : ((100 / (parseFloat(game.homeML) + 100)).toFixed(2) * 100).toString().slice(0, 2) + '%' }</td>
          <td class="wrapper" >${game.overUnder}</td>
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