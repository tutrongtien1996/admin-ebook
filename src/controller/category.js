const { v4: uuidv4 } = require('uuid');
const { BookModel } = require('../../srcAPI/model/book');
const {CategoryModel} = require("../../srcAPI/model/category");
const { Helper } = require('../helper/checkParams');

const CategoryController = {
  index: async function(request, response) {
    let results = await CategoryModel.list();
    return request.url_create_book ? results : response.render('category/category', {items: results});
  },

  formCreate: async function(request, response) {
    response.render('category/formCategory')
  },

  store: async function(request, response){
    let input = {
      id: uuidv4(),
      name: request.body.name
  }
    await CategoryModel.create(input);
    return  response.redirect('/categories');
  },

  one: async function(request, response) {
    var id = "";
    request.id ? (id = request.id) : (id = request.params.id);
    let input = {id}
    let results = await CategoryModel.one(input);
    return results[0]
  },
  detail: async function(request, response) {
    var id = "";
    request.id ? (id = request.id) : (id = request.params.id);
    let input = {id}
    let results = await BookModel.detail(input);
    let items = {
      results
    }
    if(results.length > 0){
      items.category = results[0].category_name
    }
    return response.render('category/listBookOfCategory', {items: items});
  },

  delete: async function(request, response){
    var {id} = request.params;
    let input = {id}
    await CategoryModel.delete(input);
    return  response.redirect('/categories');
  },

  formEdit: async function(request, response) {
    let {id} = request.params
    response.render('category/formCategory', {id})
  },

  update: async function(request, response) {
    let input = {id: request.params.id,
      name: request.body.name}
      await  CategoryModel.update(input);
    return  response.redirect('/categories');
  }

}
module.exports = {CategoryController}