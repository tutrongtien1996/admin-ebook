const { v4: uuidv4 } = require('uuid');
const { BookModel } = require('../../model/book');
const {CategoryModel} = require("../../model/category");

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
      name: request.body.name,
      image: request.body.image
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
    let input = {
      category_id: id,
      limit: -1
    }
    let dataBook = await BookModel.list(input);
    return response.render('book/index', {items: dataBook});
  },

  delete: async function(request, response){
    var {id} = request.params;
    let input = {id}
    await CategoryModel.delete(input);
    return  response.redirect('/categories');
  },

  formEdit: async function(request, response) {
    let {id} = request.params;
    let input = {id}
    let results = await CategoryModel.one(input);
    response.render('category/formCategory', {data: results[0]})
  },

  update: async function(request, response) {
    let input = {id: request.params.id,
      name: request.body.name,
      image: request.body.image}
      await  CategoryModel.update(input);
    return  response.redirect('/categories');
  }

}
module.exports = {CategoryController}