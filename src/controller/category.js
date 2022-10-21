const { CategoryModel } = require("../model/category");


const CategoryController = {
  index: async function(request, response) {
    var items = await CategoryModel.list(null)
    response.render('category', {items: items});
  }
}

module.exports = {CategoryController}