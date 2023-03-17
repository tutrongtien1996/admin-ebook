const dotenv = require('dotenv').config();

const db = require('knex')({
  client: 'mysql',
  connection: {
    host: dotenv.parsed.MYSQL_HOST,
    port: dotenv.parsed.MYSQL_PORT,
    user: dotenv.parsed.MYSQL_USER,
    password: dotenv.parsed.MYSQL_PASSWORD,
    database: dotenv.parsed.MYSQL_DATABASE
  }
});
db.raw("SELECT 1").then(() => {
})
.catch((e) => {
  console.log("cuccess not connected");
  console.error(e);
});

module.exports = {db}