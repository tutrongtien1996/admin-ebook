const { v4: uuidv4 } = require('uuid');
const { MessageModel } = require('../../model/message');
const { Helper } = require('../../helper/checkParams');


const MessageController = {
  index: async function(request, response) {
    const query_filter = Helper.setFilter(request.query);
    let data = await MessageModel.list(query_filter);
    data.pages = Helper.pages(query_filter.limit, data.count);
    data.results.forEach(element => {
      element.message = element.message.slice(0, 100);
       element.created_at = new Date(element.created_at).getDate() + "/" + new Date(element.created_at).getMonth() + "/" + new Date(element.created_at).getFullYear()
    });
    return response.render('message/index', {items: data});
  },

  store: async function(request, response){
    let input = {
      id: uuidv4(),
      name: request.body.name,
      email: request.body.email,
      phone_number: request.body.phone_number,
      message: request.body.message
  }
    await MessageModel.create(input);
    return  response.redirect('/');
  },

  detail: async function(request, response) {
    let input = {
      id: request.params.id
    }
    let results = await MessageModel.one(input);
    results.created_at = new Date(results.created_at).getHours() + ":" + new Date(results.created_at).getMinutes() + " " + new Date(results.created_at).getDate() + "/" + new Date(results.created_at).getMonth() + "/" + new Date(results.created_at).getFullYear()
    return response.render('message/viewMessage', {items: results});
  }

}
module.exports = {MessageController}