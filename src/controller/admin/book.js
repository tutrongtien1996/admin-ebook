
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {BookModel} = require('../../model/book');
const { Helper } = require('../../helper/checkParams');
const {CategoryController} = require('./category')



const BookController = {
  index: async function(request, response) {
    const query_filter = Helper.setFilter(request.query);
    const data = await  BookModel.list(query_filter);
    data.results.forEach(element => {
      if(element.description){
        element.description = element.description.slice(0, 150) + "..."
      }
    });
    data.pages = Helper.pages(query_filter.limit, data.count);
    let accessToken = request.session.user.accessToken
    response.render('book/index', {accessToken, items: data});
  },
  one: async function(request, response) {
    const input = {id: request.params.id}
    let result = await BookModel.detail(input)
    response.render('book/viewBook', {item: result});
  },
  formCreate: async function(request, response) {
    request.url_create_book = "formCreateBook";
    let categories = await CategoryController.index(request, response)
    response.render('book/formCreateBook', {categories});
  },

  store: async function(request, response){
    var input =  request.body;
    if(!request.body.name && request.file){
      fs.unlinkSync(request.file.path);
    }
    if(!request.body.name){return   response.redirect('/books');}

    delete input.user_display;
    request.file ? (input.image = request.file.path) : (input.image = input.image_link)
    input.id = uuidv4();
    delete input.image_link;
    const results = await BookModel.create(input);
    if(!results && request.file){
      fs.unlinkSync(request.file.path);
    }
    return  response.redirect('/books');
  },

  delete: async function(request, response){
    let input = {id: request.params.id}
    const data = await  BookModel.detail(input);
    if(!data){
      return  response.redirect('/books');
    }
    const results = await  BookModel.delete(input);
    if(results && data[0].image){
      if(fs.existsSync( data[0].image )){
        fs.unlinkSync(data[0].image);
        } 
    }
    return  response.redirect('/books');
  },

  formEdit: async function(request, response) {
    request.url_create_book = "formCreateBook"
    let categories = await CategoryController.index(request, response)
    const input = {id: request.params.id}
    let book_data = await BookModel.detail(input)
    response.render('book/formCreateBook', {categories, book: book_data});
  },

  update: async function(request, response) {
    delete request.body.user_display;
    if(!request.body.name && request.file){
      fs.unlinkSync(request.file.path);
    }
    if(!request.body.name){return   response.redirect('/books/form');}
    let input = {id: request.params.id,
      data: JSON.parse(JSON.stringify(request.body))}
      const data_get = await BookModel.detail(input);
      if(!data_get){
        return  response.redirect('/books');
      }
      request.file ? (input.data.image = request.file.path) : (input.data.image = input.data.image_link)
      delete input.data.image_link;
      let results = await  BookModel.update(input);
      
      if(!results && request.file){
        fs.unlinkSync(request.file.path);
      }
      if(results && data_get[0].image && request.file){
          if(fs.existsSync( data_get[0].image )){
          fs.unlinkSync(data_get[0].image);
          }  
      }
    return  response.redirect('/books');
  }

}
module.exports = {BookController}