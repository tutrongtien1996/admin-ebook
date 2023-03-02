const BookRouter = require('express').Router();
const { uploadProduct } = require('../../src/helper/fileupload');
const {BookController} = require('../controller/book')
const {AuthMiddle} = require('../helper/middleware');

let isAuth = AuthMiddle.isAuth;

BookRouter.get('/', isAuth, BookController.list)
BookRouter.post('/', isAuth, uploadProduct.single('image'), BookController.create)
BookRouter.get('/:id', isAuth, BookController.one)
BookRouter.delete('/:id', isAuth, BookController.delete)
BookRouter.put('/:id', isAuth, uploadProduct.single('image'), BookController.update)

module.exports = {BookRouter}