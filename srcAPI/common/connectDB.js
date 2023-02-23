const dotenv = require('dotenv').config();

const db = require('knex')({
  client: 'mysql',
  connection: {
    host: dotenv.parsed.MY_HOST,
    port: dotenv.parsed.MY_PORT,
    user: dotenv.parsed.MY_USER,
    password: dotenv.parsed.MY_PASSWORD,
    database: dotenv.parsed.MY_DATABASE
  }
});

module.exports = {db}