const express = require('express');
const { WebsiteController } = require('../controller/website.js');
const { CheckLoggedIn } = require('../helper/util.js');

const WebsiteRouter = express.Router();

WebsiteRouter.get('/', CheckLoggedIn, WebsiteController.index)

module.exports = {WebsiteRouter}