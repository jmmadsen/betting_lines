const data = 
// {
//   americanfootball_nfl: [
//     {
//       time: '3:05:00 PM',
//       homeTeam: 'Kansas City Chiefs',
//       homeML: '1.29',
//       homeSpread: '-7.5',
//       awayTeam: 'Tennessee Titans',
//       awayML: '3.81',
//       awaySpread: '7.5',
//       overUnder: '52'
//     },
//     {
//       time: '6:40:00 PM',
//       homeTeam: 'San Francisco 49ers',
//       homeML: '1.27',
//       homeSpread: '-7.5',
//       awayTeam: 'Green Bay Packers',
//       awayML: '3.99',
//       awaySpread: '7.5',
//       overUnder: '46.5'
//     }
//   ],
//   basketball_nba: [
//     {
//       time: '7:40:46 PM',
//       homeTeam: 'Atlanta Hawks',
//       homeML: '9.91',
//       homeSpread: '25.5',
//       awayTeam: 'Detroit Pistons',
//       awayML: '1.05',
//       awaySpread: '-25.5',
//       overUnder: '234.5'
//     },
//     {
//       time: '7:41:55 PM',
//       homeTeam: 'New York Knicks',
//       homeML: '3.55',
//       homeSpread: '4.5',
//       awayTeam: 'Philadelphia 76ers',
//       awayML: '1.36',
//       awaySpread: '-4.5',
//       overUnder: '193.5'
//     },
//     {
//       time: '8:10:00 PM',
//       homeTeam: 'Minnesota Timberwolves',
//       homeML: '3.2',
//       homeSpread: '-5.0',
//       awayTeam: 'Toronto Raptors',
//       awayML: '1.41',
//       awaySpread: '5.0',
//       overUnder: '2'
//     },
//     {
//       time: '8:11:25 PM',
//       homeTeam: 'Chicago Bulls',
//       homeML: '3.3',
//       homeSpread: '8.5',
//       awayTeam: 'Cleveland Cavaliers',
//       awayML: '1.24',
//       awaySpread: '-8.5',
//       overUnder: '2'
//     },
//     {
//       time: '8:40:00 PM',
//       homeTeam: 'Golden State Warriors',
//       homeML: '1.43',
//       homeSpread: '-5.0',
//       awayTeam: 'Orlando Magic',
//       awayML: '2.7',
//       awaySpread: '5.0',
//       overUnder: '2'
//     },
//     {
//       time: '8:40:00 PM',
//       homeTeam: 'Houston Rockets',
//       homeML: '1.49',
//       homeSpread: '-6.5',
//       awayTeam: 'Los Angeles Lakers',
//       awayML: '2.78',
//       awaySpread: '6.5',
//       overUnder: '232.5'
//     },
//     {
//       time: '9:10:00 PM',
//       homeTeam: 'Utah Jazz',
//       homeML: '1.21',
//       homeSpread: '-15.5',
//       awayTeam: 'Sacramento Kings',
//       awayML: '4.74',
//       awaySpread: '15.5',
//       overUnder: '223'
//     },
//     {
//       time: '9:10:51 PM',
//       homeTeam: 'Oklahoma City Thunder',
//       homeML: '1.18',
//       homeSpread: '-9.5',
//       awayTeam: 'Portland Trail Blazers',
//       awayML: '5',
//       awaySpread: '9.5',
//       overUnder: '214.5'
//     },
//     {
//       time: '3:10:00 PM',
//       homeTeam: 'San Antonio Spurs',
//       homeML: '1.95',
//       homeSpread: '1',
//       awayTeam: 'Miami Heat',
//       awayML: '1.87',
//       awaySpread: '-1',
//       overUnder: '221'
//     },
//     {
//       time: '8:10:00 PM',
//       homeTeam: 'Denver Nuggets',
//       homeML: '1.83',
//       homeSpread: '-1.5',
//       awayTeam: 'Indiana Pacers',
//       awayML: '2',
//       awaySpread: '1.5',
//       overUnder: '211.5'
//     }
//   ],
//   basketball_ncaab: [
//     {
//       time: '7:30:00 PM',
//       homeTeam: 'Long Beach St 49ers',
//       awayTeam: 'CSU Fullerton Titans',
//       odds: 'N/A'
//     },
//     {
//       time: '8:00:00 PM',
//       homeTeam: 'SMU Mustangs',
//       homeML: '1.27',
//       homeSpread: '-4.5',
//       awayTeam: 'Temple Owls',
//       awayML: '2.85',
//       awaySpread: '4.5',
//       overUnder: '127.5'
//     },
//     {
//       time: '8:00:00 PM',
//       homeTeam: 'Houston Baptist Huskies',
//       awayTeam: 'Sam Houston St Bearkats',
//       odds: 'N/A'
//     },
//     {
//       time: '8:00:00 PM',
//       homeTeam: 'San Diego St Aztecs',
//       awayTeam: 'Nevada Wolf Pack',
//       odds: 'N/A'
//     },
//     {
//       time: '9:00:00 PM',
//       homeTeam: 'Santa Clara Broncos',
//       homeML: '1.58',
//       homeSpread: '-6.5',
//       awayTeam: 'Pacific Tigers',
//       awayML: '2.5',
//       awaySpread: '6.5',
//       overUnder: '132.5'
//     },
//     {
//       time: '9:00:00 PM',
//       homeTeam: 'Arizona St Sun Devils',
//       homeML: '1.3',
//       homeSpread: '-6.5',
//       awayTeam: 'Utah Utes',
//       awayML: '3.04',
//       awaySpread: '6.5',
//       overUnder: '143.5'
//     },
//     {
//       time: '10:00:00 PM',
//       homeTeam: 'Portland Pilots',
//       awayTeam: 'San Diego Toreros',
//       odds: 'N/A'
//     },
//     {
//       time: '10:00:00 PM',
//       homeTeam: 'Gonzaga Bulldogs',
//       homeML: '1.1',
//       homeSpread: '-13',
//       awayTeam: 'BYU Cougars',
//       awayML: '7.7',
//       awaySpread: '13',
//       overUnder: '158'
//     },
//     {
//       time: '10:00:00 PM',
//       homeTeam: 'Boise State Broncos',
//       homeML: '2.15',
//       homeSpread: '2',
//       awayTeam: 'Utah State Aggies',
//       awayML: '1.74',
//       awaySpread: '-2',
//       overUnder: '143'
//     },
//     {
//       time: '10:05:00 PM',
//       homeTeam: 'Portland St Vikings',
//       homeML: '1.28',
//       homeSpread: '-7.5',
//       awayTeam: 'Idaho State Bengals',
//       awayML: '3.8',
//       awaySpread: '7.5',
//       overUnder: '142.5'
//     },
//     {
//       time: '1:00:00 AM',
//       homeTeam: "Hawai'i Rainbow Warriors",
//       homeML: '1.74',
//       homeSpread: '-2',
//       awayTeam: 'UC Santa Barbara Gauchos',
//       awayML: '2.15',
//       awaySpread: '2',
//       overUnder: '134.5'
//     },
//     {
//       time: '12:00:00 PM',
//       homeTeam: 'Fordham Rams',
//       homeML: '1.91',
//       homeSpread: '7.5',
//       awayTeam: 'Davidson Wildcats',
//       awayML: '1.91',
//       awaySpread: '-7.5',
//       overUnder: '121.5'
//     },
//     {
//       time: '1:00:00 PM',
//       homeTeam: 'Rutgers Scarlet Knights',
//       awayTeam: 'Minnesota Golden Gophers',
//       odds: 'N/A'
//     },
//     {
//       time: '1:00:00 PM',
//       homeTeam: 'Niagara Purple Eagles',
//       homeML: '1.91',
//       homeSpread: '3',
//       awayTeam: 'Siena Saints',
//       awayML: '1.91',
//       awaySpread: '-3',
//       overUnder: '144'
//     },
//     {
//       time: '2:00:00 PM',
//       homeTeam: 'North Dakota St Bison',
//       awayTeam: 'North Dakota Fighting Hawks',
//       odds: 'N/A'
//     },
//     {
//       time: '2:00:00 PM',
//       homeTeam: 'Canisius Golden Griffins',
//       awayTeam: 'Rider Broncs',
//       odds: 'N/A'
//     },
//     {
//       time: '2:00:00 PM',
//       homeTeam: 'Marist Red Foxes',
//       homeML: '1.91',
//       homeSpread: '5',
//       awayTeam: 'Iona Gaels',
//       awayML: '1.91',
//       awaySpread: '-5',
//       overUnder: '127.5'
//     },
//     {
//       time: '2:00:00 PM',
//       homeTeam: 'Maine Black Bears',
//       awayTeam: 'Binghamton Bearcats',
//       odds: 'N/A'
//     },
//     {
//       time: '4:00:00 PM',
//       homeTeam: 'Southern Illinois Salukis',
//       homeML: '1.91',
//       homeSpread: '-1.5',
//       awayTeam: 'Drake Bulldogs',
//       awayML: '1.91',
//       awaySpread: '1.5',
//       overUnder: '123.5'
//     },
//     {
//       time: '4:00:00 PM',
//       homeTeam: 'Illinois St Redbirds',
//       homeML: '1.91',
//       homeSpread: '3.5',
//       awayTeam: 'Loyola (Chi) Ramblers',
//       awayML: '1.91',
//       awaySpread: '-3.5',
//       overUnder: '131'
//     },
//     {
//       time: '6:00:00 PM',
//       homeTeam: 'Cincinnati Bearcats',
//       homeML: '1.91',
//       homeSpread: '-17',
//       awayTeam: 'East Carolina Pirates',
//       awayML: '1.91',
//       awaySpread: '17',
//       overUnder: '137.5'
//     },
//     {
//       time: '6:00:00 PM',
//       homeTeam: 'Wake Forest Demon Deacons',
//       homeML: '1.91',
//       homeSpread: '-6.5',
//       awayTeam: 'Boston College Eagles',
//       awayML: '1.91',
//       awaySpread: '6.5',
//       overUnder: '139'
//     },
//     {
//       time: '8:00:00 PM',
//       homeTeam: 'UCLA Bruins',
//       homeML: '1.91',
//       homeSpread: '-8',
//       awayTeam: 'California Golden Bears',
//       awayML: '1.91',
//       awaySpread: '8',
//       overUnder: '130.5'
//     }
//   ]
// };

{
  americanfootball_nfl: [
    {
      time: '3:05:18 PM',
      homeTeam: 'Kansas City Chiefs',
      homeML: '-141',
      homeSpread: '-1.5',
      awayTeam: 'Tennessee Titans',
      awayML: '+128',
      awaySpread: '1.5',
      overUnder: '54.5'
    },
    {
      time: '6:40:00 PM',
      homeTeam: 'San Francisco 49ers',
      homeML: '-357',
      homeSpread: '-7.5',
      awayTeam: 'Green Bay Packers',
      awayML: '+288',
      awaySpread: '7.5',
      overUnder: '46.5'
    }
  ],
  basketball_nba: [
    {
      time: '3:11:08 PM',
      homeTeam: 'San Antonio Spurs',
      homeML: '-278',
      homeSpread: '-5.5',
      awayTeam: 'Miami Heat',
      awayML: '+260',
      awaySpread: '5.5',
      overUnder: '226.5'
    },
    {
      time: '8:10:00 PM',
      homeTeam: 'Denver Nuggets',
      homeML: '-102',
      homeSpread: '1',
      awayTeam: 'Indiana Pacers',
      awayML: '-118',
      awaySpread: '-1',
      overUnder: '213.5'
    }
  ],
  basketball_ncaab: [
    {
      time: '4:00:00 PM',
      homeTeam: 'Southern Illinois Salukis',
      homeML: '+106',
      homeSpread: '1',
      awayTeam: 'Drake Bulldogs',
      awayML: '-127',
      awaySpread: '-1',
      overUnder: '123'
    },
    {
      time: '4:00:00 PM',
      homeTeam: 'Illinois St Redbirds',
      homeML: '+172',
      homeSpread: '4.5',
      awayTeam: 'Loyola (Chi) Ramblers',
      awayML: '-196',
      awaySpread: '-4.5',
      overUnder: '129'
    },
    {
      time: '4:30:00 PM',
      homeTeam: 'South Dakota Coyotes',
      homeML: 'N/A',
      homeSpread: 'N/A',
      awayTeam: 'South Dakota St Jackrabbits',
      awayML: 'N/A',
      awaySpread: 'N/A',
      overUnder: 'N/A'
    },
    {
      time: '5:00:00 PM',
      homeTeam: 'UMKC Kangaroos',
      homeML: '-141',
      homeSpread: '-2.5',
      awayTeam: 'Grand Canyon Antelopes',
      awayML: '+120',
      awaySpread: '2.5',
      overUnder: '133.5'
    },
    {
      time: '6:00:00 PM',
      homeTeam: 'Cincinnati Bearcats',
      homeML: '-2000',
      homeSpread: '-16',
      awayTeam: 'East Carolina Pirates',
      awayML: '+750',
      awaySpread: '16',
      overUnder: '137.5'
    },
    {
      time: '6:00:00 PM',
      homeTeam: 'Wake Forest Demon Deacons',
      homeML: '-233',
      homeSpread: '-5',
      awayTeam: 'Boston College Eagles',
      awayML: '+193',
      awaySpread: '5',
      overUnder: '140'
    },
    {
      time: '6:30:00 PM',
      homeTeam: 'UCF Knights',
      homeML: 'N/A',
      homeSpread: 'N/A',
      awayTeam: 'Pacific Tigers',
      awayML: 'N/A',
      awaySpread: 'N/A',
      overUnder: 'N/A'
    },
    {
      time: '8:00:00 PM',
      homeTeam: 'UCLA Bruins',
      homeML: '-435',
      homeSpread: '-8.5',
      awayTeam: 'California Golden Bears',
      awayML: '+350',
      awaySpread: '8.5',
      overUnder: '131'
    }
  ]
}

exports.data = data;