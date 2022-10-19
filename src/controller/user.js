

const UserController = {
  index: function(request, response) {
    response.send("User Dashboard")
  }
}

module.exports = {UserController}