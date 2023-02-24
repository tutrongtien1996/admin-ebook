
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {BookModel} = require('../../srcAPI/model/book');
const { Helper } = require('../helper/checkParams');
const {CategoryController} = require('./category')



const BookController = {
  index: async function(request, response) {
    const query_filter = Helper.setFilter(request.query);
    const data = await  BookModel.list(query_filter);
    data.pages = Helper.pages(data.count);
    response.render('book/book', {items: data});
  },
  one: async function(request, response) {
    const input = {id: request.params.id}
    let result = await BookModel.one(input)
    response.render('book/viewBook', {item: result[0]});
  },
  formCreate: async function(request, response) {
    request.url_create_book = "formCreateBook";
    let categories = await CategoryController.index(request, response)
    response.render('book/formCreateBook', {categories});
  },

  store: async function(request, response){
    var input =  request.body;
    delete input.user_display;
    request.file ? (input.image = request.file.path) : (input.image = "")
    input.id = uuidv4();
    const results = await BookModel.create(input);
    if(!results && request.file){
      fs.unlinkSync(request.file.path);
    }
    return  response.redirect('/books');
  },

  delete: async function(request, response){
    let input = {id: request.params.id}
    const data = await  BookModel.one(input);
    const results = await  BookModel.delete(input);
    if(results && data[0].image){
      fs.unlinkSync(data[0].image);
    }
    return  response.redirect('/books');
  },

  formEdit: async function(request, response) {
    request.url_create_book = "formCreateBook"
    let categories = await CategoryController.index(request, response)
    const input = {id: request.params.id}
    let book_data = await BookModel.one(input)
    response.render('book/formCreateBook', {categories, book: book_data[0]});
  },

  update: async function(request, response) {
    delete request.body.user_display;
    request.file ? (request.body.image = request.file.path) : (request.body.image = "")
    let input = {id: request.params.id,
      data: request.body}
      const results = await  BookModel.update(input);
      if(results && request.file){
        fs.unlinkSync(request.file.path);
      }
    return  response.redirect('/books');
  }

}
module.exports = {BookController}