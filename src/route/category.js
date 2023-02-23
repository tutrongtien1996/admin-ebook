const express = require('express');
const { CategoryController } = require('../controller/category.js');
const { CheckLoggedIn } = require('../helper/util.js');

const CategoryRouter = express.Router();

CategoryRouter.get('/', CheckLoggedIn, CategoryController.index)
CategoryRouter.get('/form', CheckLoggedIn, CategoryController.formCreate)
CategoryRouter.post('/form', CheckLoggedIn, CategoryController.store)
CategoryRouter.get('/:id', CheckLoggedIn, CategoryController.one)
CategoryRouter.get('/one/:id', CheckLoggedIn, CategoryController.detail)
CategoryRouter.get('/delete/:id', CheckLoggedIn, CategoryController.delete)
CategoryRouter.get('/edit/:id', CheckLoggedIn, CategoryController.formEdit)
CategoryRouter.post('/edit/:id', CheckLoggedIn, CategoryController.update)

module.exports = {CategoryRouter}