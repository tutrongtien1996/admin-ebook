

const UserController = {
  index: function(request, response) {
    response.render('user');
  }
}

module.exports = {UserController}