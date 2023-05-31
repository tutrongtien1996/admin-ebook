

const DashboardController = {
  index: function(request, response) {
    response.render('admin/pages/dashboard', {data: request.session.user});
  }
}

module.exports = {DashboardController}