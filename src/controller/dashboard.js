

const DashboardController = {
  index: function(request, response) {
    response.render('dashboard', {data: request.session.user});
  }
}

module.exports = {DashboardController}