const db = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    port     : '5001',
    user     : 'root',
    password : 'password',
    database : 'webneeder'
  }
});

module.exports = {db}