const UserRouter = require('express').Router();
const {UserController} = require('../controller/user')
const {AuthMiddle} = require('../helper/middleware');

let isAuth = AuthMiddle.isAuth;

UserRouter.get('/', isAuth, UserController.list)
UserRouter.post('/',isAuth, UserController.create)
UserRouter.get('/:id', isAuth, UserController.one)
UserRouter.delete('/:id', isAuth, UserController.delete)
UserRouter.put('/:id', isAuth, UserController.update)

module.exports = {UserRouter}