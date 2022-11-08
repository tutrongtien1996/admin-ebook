const { UserModel } = require("../model/user");


const UserController = {
  index: async function(request, response) {
    var items = await UserModel.list(null)
    items.forEach(item => {
      let created_at = new Date(item['created_at']);
      item["created_at"] = created_at.toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    });
    response.render('user', {users: items, serverKey: process.env.WEBNEEDER_SERVER_KEY});
  }
}

module.exports = {UserController}