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
db.raw("SELECT 1").then(() => {
  console.log("Success connected");
})
.catch((e) => {
  console.log("cuccess not connected");
  console.error(e);
});

module.exports = {db}