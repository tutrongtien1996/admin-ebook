
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {BookModel} = require('../../model/book');
const { Helper } = require('../../helper/checkParams');
const {CategoryController} = require('./category');
const { FileService } = require('../../helper/fileAWS');
const fetch = require("node-fetch");


const BookController = {
  index: async function(request, response) {
    const query_filter = Helper.setFilter(request.query);
    const data = await  BookModel.list(query_filter);
    data.pages = Helper.pages(query_filter.limit, data.count);
    let accessToken = request.session.user.accessToken;
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
    let file_name = input.name.replace(/ /g, "-") +"-"+ new Date().getTime();
    if(request.file){
      const imagePath = request.file.path
      const blob = fs.readFileSync(imagePath);
      input.image = await FileService.save(file_name, blob);
    }
    if(!request.file && (input.image_link.length > 0)){
      const res = await fetch(input.image_link)
      const blob = await res.buffer()
      input.image = await FileService.save(file_name, blob);
    } 
    input.id = uuidv4();
    delete input.image_link;
    input.image = input.image.Location
    const results = await BookModel.create(input);
    if(!results && input.image.length > 0){
      let file_name = input.image.slice(input.image.lastIndexOf('/'))
      await FileService.delete(file_name)
    }
    return  response.redirect('/books');
  },

  delete: async function(request, response){
    let input = {id: request.params.id}
    const data = await  BookModel.detail(input);
    if(!data){
      return  response.redirect('/books');
    }
    let file_name = data.image.slice(data.image.lastIndexOf('/'))
    const results = await  BookModel.delete(input);
    if(results){
      await FileService.delete(file_name)
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
      let file_name = input.data.name.replace(/ /g, "-") +"-"+ new Date().getTime();
      if(request.file){
        const imagePath = request.file.path
        const blob = fs.readFileSync(imagePath);
        input.image = await FileService.save(file_name, blob);
        fs.unlinkSync(request.file.path);
      }
      if(!request.file && (input.data.image_link.length > 0)){
        const res = await fetch(input.data.image_link)
        const blob = await res.buffer()
        input.image = await FileService.save(file_name, blob);
      } 
      input.data.image = input.image.Location
      delete input.data.image_link;
      let results = await  BookModel.update(input);
      if(results && data_get){
        let file_name = data_get.image.slice(data_get.image.lastIndexOf('/'))
        await FileService.delete(file_name)
      }
      if(!results && input.data.image.length > 0){
        let file_name = input.data.image.slice(input.data.image.lastIndexOf('/'))
        await FileService.delete(file_name)
      }
    return  response.redirect('/books');
  }

}
module.exports = {BookController}