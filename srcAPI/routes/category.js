const CategoryRouter = require('express').Router();
const {CategoryController} = require('../controller/category')
const {AuthMiddle} = require('../helper/middleware');

let isAuth = AuthMiddle.isAuth;

CategoryRouter.get('/',  CategoryController.list)
CategoryRouter.post('/', isAuth, CategoryController.create)
CategoryRouter.get('/:id',  CategoryController.one)
CategoryRouter.delete('/:id', isAuth, CategoryController.delete)
CategoryRouter.put('/:id', isAuth, CategoryController.update)

module.exports = {CategoryRouter}