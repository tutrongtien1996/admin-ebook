const session = require("express-session");

function ConfigSession(app) {
  const oneDay = 1000 * 60 * 60 * 24;
  app.use(session({
    secret: "09897867576bhjghgfhfhgfhjfhf",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
  }));
}

module.exports = {ConfigSession}