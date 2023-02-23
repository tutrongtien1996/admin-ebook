
const {UserModel} = require("../../srcAPI/model/user")
const { v4: uuidv4 } = require('uuid');


const AuthorController = {
  index: async function(request, response) {
    const results = await  UserModel.list();
    return request.url_create_book ? results : response.render('author/author', {items: results});
  },
  one: async function(request, response) {
    var id = "";
    request.id ? (id = request.id) : (id = request.params.id)
    let input = {id}
    const results = await  UserModel.one(input);
    return results[0]
  },

  formCreate: async function(request, response) {
    response.render('author/formCreateAuthor')
  },

  store: async function(request, response){
    let input = request.body;
        input.id = uuidv4();
      await UserModel.create(input);
    return  response.redirect('/authors');
  },

  delete: async function(request, response){
    var {id} = request.params;
    let input = {id}
     await  UserModel.delete(input);
    return  response.redirect('/authors');
  },

  formEdit: async function(request, response) {
    request.id = request.params.id;
    let item = await AuthorController.one(request, response);
    response.render('author/formCreateAuthor', {item, item})
  },

  update: async function(request, response) {
    let input = {id: request.params.id,
      data: request.body}
      await  UserModel.update(input);
    return  response.redirect('/authors');
  }

}
module.exports = {AuthorController}