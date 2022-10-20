const session = require("express-session");

function ConfigSession(app) {
  const oneDay = 1000 * 60 * 60 * 24;
  app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: oneDay }
  }));
}

module.exports = {ConfigSession}