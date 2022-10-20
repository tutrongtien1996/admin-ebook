function IsLogged(request) {
  if (request.session.user) {
    return true;
  }
  return false;
}

function CheckLoggedIn(req, res, next) {
  if (!IsLogged(req)) {
    return res.redirect("/auth/login")
  }
  return next()
}

module.exports = {CheckLoggedIn}