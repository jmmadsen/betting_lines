let knex;

if (process.env.NODE_ENV === `production`) {
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB
    }
  })
} else {
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'user',
      password: 'password',
      database: 'db'
    }
  })
}

exports.knex = knex;