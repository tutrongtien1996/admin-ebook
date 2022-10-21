const { TemplateModel } = require("../model/template");


const TemplateController = {
  index: async function(request, response) {
    var items = await TemplateModel.list(null)
    response.render('template', {items: items});
  }
}

module.exports = {TemplateController}