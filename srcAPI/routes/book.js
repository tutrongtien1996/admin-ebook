const BookRouter = require('express').Router();
const {BookController} = require('../controller/book')
const {AuthMiddle} = require('../helper/middleware');

let isAuth = AuthMiddle.isAuth;

BookRouter.get('/', isAuth, BookController.list)
BookRouter.post('/', isAuth, BookController.create)
BookRouter.get('/:id', isAuth, BookController.one)
BookRouter.delete('/:id', isAuth, BookController.delete)
BookRouter.put('/:id', isAuth, BookController.update)

module.exports = {BookRouter}