const express = require('express');
const { TemplateController } = require('../controller/template.js');
const { CheckLoggedIn } = require('../helper/util.js');

const TemplateRouter = express.Router();

TemplateRouter.get('/', CheckLoggedIn, TemplateController.index)
TemplateRouter.get('/form', CheckLoggedIn, TemplateController.formCreate)
TemplateRouter.post('/form', CheckLoggedIn, TemplateController.store)
TemplateRouter.get('/:id', CheckLoggedIn, TemplateController.delete)
TemplateRouter.get('/edit/:id', CheckLoggedIn, TemplateController.formEdit)
TemplateRouter.post('/edit/:id', CheckLoggedIn, TemplateController.update)

module.exports = {TemplateRouter}