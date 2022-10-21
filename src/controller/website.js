const { WebsiteModel } = require("../model/website");


const WebsiteController = {
  index: async function(request, response) {
    var items = await WebsiteModel.list(null)
    response.render('website', {items: items});
  }
}

module.exports = {WebsiteController}