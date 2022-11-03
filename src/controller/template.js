const { TemplateModel } = require("../model/template");


const TemplateController = {
  index: async function(request, response) {
    var items = await TemplateModel.list(null)
    response.render('template', {items: items});
  },

  getCategories: async function(request, response) {
    var  items = await TemplateModel.listCategory()
    response.render('formTemplate', {items: items})
  },

  createTemplate: async function(request, response){
    var input = request.body
    await TemplateModel.createTemplate(input)
    return  response.redirect('http://localhost:3003/templates');
  }

}
module.exports = {TemplateController}