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
      zip_url: input.zip_url,
      category_id: input.category_id,
      description: input.description,
      thumbnail_url: input.thumbnail_url
    })
    return  response.redirect('/templates');
  },

  delete: async function(request, response){
    var {id} = request.params
    WebNeederAdapter.DeleteTemplate(id)
    return  response.redirect('/templates');
  },

  formEdit: async function(request, response) {
    var  categories = await CategoryModel.list()
    var item = await TemplateModel.one(request.params.id)
    if (!item) {
      response.redirect('/templates')
      return
    }
    categories = Object.values(JSON.parse(JSON.stringify(categories)));
    for (let index = 0; index < categories.length; index++) {
      if (categories[index].id == item.category_id) {
        categories[index].is_active = true;
      }
    }
    response.render('editTemplate', {item, categories})
  },

  update: async function(request, response) {
    var input = {
      name: request.body.name.trim(),
      category_id: request.body.category_id.trim(),
      user_id: request.body.user_id.trim(),
      description: request.body.description.trim()
    }
    WebNeederAdapter.UpdateTemplate(request.params.id, input);
    return  response.redirect('/templates');
  }

}
module.exports = {TemplateController}