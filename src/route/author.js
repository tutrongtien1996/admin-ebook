const express = require('express');
const { AuthorController } = require('../controller/author.js');
const { CheckLoggedIn } = require('../helper/util.js');

const AuthorRouter = express.Router();

AuthorRouter.get('/', CheckLoggedIn, AuthorController.index)
AuthorRouter.get('/details/:id', CheckLoggedIn, AuthorController.detail)
AuthorRouter.get('/form', CheckLoggedIn, AuthorController.formCreate)
AuthorRouter.post('/form', CheckLoggedIn, AuthorController.store)
AuthorRouter.get('/delete/:id', CheckLoggedIn, AuthorController.delete)
AuthorRouter.get('/edit/:id', CheckLoggedIn, AuthorController.formEdit)
AuthorRouter.post('/edit/:id', CheckLoggedIn, AuthorController.update)

module.exports = {AuthorRouter}