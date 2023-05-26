
const {AuthAPIController} = require('../controller/api/auth')
const { uploadProduct } = require('../../src/helper/fileupload');
const {BookController} = require('../controller/api/book')
const {CategoryController} = require('../controller/api/category')
const {RateController} = require('../controller/api/rate')
const {UserController} = require('../controller/api/user')
const {VersionAppController} = require('../controller/api/version')
const {MessageController} = require('../controller/api/message')
const {AuthMiddle} = require('../helper/middleware');

const AuthRouter = require('express').Router();
const BookRouter = require('express').Router();
const CategoryRouter = require('express').Router();
const RateRouter = require('express').Router();
const UserRouter = require('express').Router();
const MessageRouter = require('express').Router();
const VersionRouter = require('express').Router();

let isAuth = AuthMiddle.isAuth;

// AuthRouter.post('/register', AuthAPIController.register)
AuthRouter.post('/login', AuthAPIController.login)
AuthRouter.post('/refresh', AuthAPIController.refreshToken)

BookRouter.get('/', BookController.list)
BookRouter.post('/', isAuth, uploadProduct.single('image'), BookController.create)
BookRouter.get('/:id', BookController.one)
BookRouter.delete('/:id', isAuth, BookController.delete)
BookRouter.put('/:id', isAuth, uploadProduct.single('image'), BookController.update)

CategoryRouter.get('/',  CategoryController.list)
CategoryRouter.post('/', isAuth, CategoryController.create)
CategoryRouter.get('/:id',  CategoryController.one)
CategoryRouter.delete('/:id', isAuth, CategoryController.delete)
CategoryRouter.put('/:id', isAuth, CategoryController.update)

RateRouter.get('/',  RateController.list)
RateRouter.post('/', RateController.create)
RateRouter.get('/:id',  RateController.one)
RateRouter.delete('/:id', RateController.delete)
RateRouter.put('/:id', RateController.update)

UserRouter.get('/',  UserController.list)
UserRouter.post('/',isAuth, UserController.create)
UserRouter.get('/:id',  UserController.one)
UserRouter.delete('/:id', isAuth, UserController.delete)
UserRouter.put('/:id', isAuth, UserController.update)

MessageRouter.get('/',  MessageController.list)
MessageRouter.post('/', MessageController.create)
MessageRouter.get('/:id',  MessageController.one)

VersionRouter.get('/', VersionAppController.one)


const _initRouteAPI = function(app){
    app.use('/api/books', BookRouter)
    app.use('/api/users', UserRouter)
    app.use('/api/rates', RateRouter)
    app.use('/api/categories', CategoryRouter)
    app.use('/api/admins', AuthRouter)
    app.use('/api/message', MessageRouter)
    app.use('/api/versions', VersionRouter)
}

module.exports = {_initRouteAPI}