const express = require('express');
const { ContactController } = require('../controller/contact.js');
const { CheckLoggedIn } = require('../helper/util.js');

const ContactRouter = express.Router();

ContactRouter.get('/', CheckLoggedIn, ContactController.index)
module.exports = {ContactRouter}