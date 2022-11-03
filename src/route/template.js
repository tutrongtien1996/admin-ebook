const express = require('express');
const { TemplateController } = require('../controller/template.js');
const { CheckLoggedIn } = require('../helper/util.js');

const TemplateRouter = express.Router();

TemplateRouter.get('/', CheckLoggedIn, TemplateController.index)
TemplateRouter.get('/form', CheckLoggedIn, TemplateController.formCreate)
TemplateRouter.post('/form', CheckLoggedIn, TemplateController.store)

module.exports = {TemplateRouter}