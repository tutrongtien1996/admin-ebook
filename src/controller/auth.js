

const AuthController = {
  login: function(request, response) {
    response.render('login', {layout: false});
  }
}

module.exports = {AuthController}