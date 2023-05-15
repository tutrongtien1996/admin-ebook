const express = require('express');
const { AuthController } = require('../controller/admin/auth.js');
const { DashboardController } = require('../controller/admin/dashboard.js');
const { CategoryController } = require('../controller/admin/category.js');
const { BookController } = require('../controller/admin/book.js');
const { AuthorController } = require('../controller/admin/author.js');
const { uploadProduct } = require('../helper/fileupload.js');
const { CheckLoggedIn } = require('../helper/util.js');

const AuthRouter = express.Router();
const AuthorRouter = express.Router();
const BookRouter = express.Router();
const CategoryRouter = express.Router();
const DashboardRouter = express.Router();

AuthRouter.get('/login', AuthController.login)
AuthRouter.post('/login', AuthController.DoLogin)
AuthRouter.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

DashboardRouter.get('/', CheckLoggedIn, DashboardController.index)


AuthorRouter.get('/', CheckLoggedIn, AuthorController.index)
AuthorRouter.get('/details/:id', CheckLoggedIn, AuthorController.detail)
AuthorRouter.get('/form', CheckLoggedIn, AuthorController.formCreate)
AuthorRouter.post('/form', CheckLoggedIn, AuthorController.store)
AuthorRouter.get('/delete/:id', CheckLoggedIn, AuthorController.delete)
AuthorRouter.get('/edit/:id', CheckLoggedIn, AuthorController.formEdit)
AuthorRouter.post('/edit/:id', CheckLoggedIn, AuthorController.update)

BookRouter.get('/', CheckLoggedIn, BookController.index)
BookRouter.get('/one/:id', CheckLoggedIn, BookController.one)
BookRouter.get('/form', CheckLoggedIn, BookController.formCreate)
BookRouter.post('/form', CheckLoggedIn,uploadProduct.single('image'), BookController.store)
BookRouter.get('/delete/:id', CheckLoggedIn, BookController.delete)
BookRouter.get('/edit/:id', CheckLoggedIn, BookController.formEdit)
BookRouter.post('/edit/:id', CheckLoggedIn,uploadProduct.single('image'), BookController.update)

CategoryRouter.get('/', CheckLoggedIn, CategoryController.index)
CategoryRouter.get('/form', CheckLoggedIn, CategoryController.formCreate)
CategoryRouter.post('/form', CheckLoggedIn, CategoryController.store)
CategoryRouter.get('/:id', CheckLoggedIn, CategoryController.one)
CategoryRouter.get('/one/:id', CheckLoggedIn, CategoryController.detail)
CategoryRouter.get('/delete/:id', CheckLoggedIn, CategoryController.delete)
CategoryRouter.get('/edit/:id', CheckLoggedIn, CategoryController.formEdit)
CategoryRouter.post('/edit/:id', CheckLoggedIn, CategoryController.update)

const _initRouteAdmin = function (app) {
    app.get('/', CheckLoggedIn, (request, response) => response.redirect('/books'))
    app.use('/auth', AuthRouter)
    app.use('/categories', CategoryRouter)
    app.use('/books', BookRouter)
    app.use('/authors', AuthorRouter)
}
  
module.exports = {_initRouteAdmin}