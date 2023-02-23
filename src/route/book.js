const express = require('express');
const { BookController } = require('../controller/book.js');
const { uploadProduct } = require('../helper/fileupload.js');
const { CheckLoggedIn } = require('../helper/util.js');

const BookRouter = express.Router();

BookRouter.get('/', CheckLoggedIn, BookController.index)
BookRouter.get('/one/:id', CheckLoggedIn, BookController.one)
BookRouter.get('/form', CheckLoggedIn, BookController.formCreate)
BookRouter.post('/form', CheckLoggedIn, uploadProduct.single('image'), BookController.store)
BookRouter.get('/delete/:id', CheckLoggedIn, BookController.delete)
BookRouter.get('/edit/:id', CheckLoggedIn, BookController.formEdit)
BookRouter.post('/edit/:id', CheckLoggedIn,uploadProduct.single('image'), BookController.update)

module.exports = {BookRouter}