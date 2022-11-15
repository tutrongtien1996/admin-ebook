const {ContactModel} = require('../model/contact')

class ContactControllerClass {
    async index (request, response){
        const items = await ContactModel.list(null);
        response.render('contact', {items: items});
    }
}
const ContactController = new ContactControllerClass();

module.exports = {ContactController}