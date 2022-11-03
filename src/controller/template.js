const { TemplateModel } = require("../model/template");
const { CategoryModel } = require("../model/category");
const { WebNeederAdapter } = require("../adapter/webneeder");


const TemplateController = {
  index: async function(request, response) {
    var items = await TemplateModel.list(null)
    response.render('template', {items: items});
  },

  formCreate: async function(request, response) {
    var  items = await CategoryModel.list()
    response.render('formTemplate', {items: items})
  },

  store: async function(request, response){
    var input = request.body
    WebNeederAdapter.ImportTemplate({
      name: input.name,
      url: input.zip_url,
      category_id: input.category
    })
    return  response.redirect('/templates');
  }

}
module.exports = {TemplateController}