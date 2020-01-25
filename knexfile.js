const config = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'user',
      password: 'password',
      database: 'db'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB
    }
  }
};

const knex = require('knex')(config[process.env.NODE_ENV]);

exports.knex = knex;