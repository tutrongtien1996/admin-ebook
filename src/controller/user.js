const { UserModel } = require("../model/user");


const UserController = {
  index: async function(request, response) {
    var items = await UserModel.list(null)
    response.render('user', {users: items});
  }
}

module.exports = {UserController}