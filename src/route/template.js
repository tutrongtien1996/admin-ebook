const express = require('express');
const { TemplateController } = require('../controller/template.js');
const { CheckLoggedIn } = require('../helper/util.js');

const TemplateRouter = express.Router();

TemplateRouter.get('/', CheckLoggedIn, TemplateController.index)

module.exports = {TemplateRouter}