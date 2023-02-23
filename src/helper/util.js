function IsLogged(request) {
  if (request.session.user) {
    return true;
  }
  return false;
}

function CheckLoggedIn(req, res, next) {

  if (!IsLogged(req)) {
    res.redirect("/auth/login");
    return;
  } else {
    return next()
  }
}

function getTokenSession(request){
  return {headers: { authorization: request.session.user.accessToken}}
}

module.exports = {CheckLoggedIn, getTokenSession}