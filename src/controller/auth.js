const { AdminModel } = require("../model/admin");
const bcrypt = require('bcrypt');


const AuthController = {
  login: function(request, response) {
    response.render('login', {layout: false});
  },
  DoLogin: async function(request, response) {
    var user = await AdminModel.find({
      "email": request.body.email,
    })
    if (user == null || user == undefined) {
      response.redirect("/auth/login")
      return
    }
    bcrypt.compare(request.body.password, user.password, function(err, match) {
      if (err != undefined || !match) {
        response.redirect("/auth/login")
        return
      }
    });
    request.session.user = {id: user.id, name: user.name, email: user.email}
    response.redirect("/")
  }
}

module.exports = {AuthController}