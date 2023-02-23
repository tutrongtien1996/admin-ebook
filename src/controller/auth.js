
const { AuthAPIController } = require("../../srcAPI/controller/auth");



const AuthController = {
  login: function(request, response) {
    return response.render('login', {layout: false});
  },
  DoLogin: async function(request, response) {
    request.isServer = true
    const result = await AuthAPIController.login(request, response);
    if(result.value){request.session.user = {id: result.user.id, name: result.user.name, accessToken: result.accessToken}}
    return !result.value ? response.redirect('/auth/login') : response.redirect('/books')
  }
}

module.exports = {AuthController}