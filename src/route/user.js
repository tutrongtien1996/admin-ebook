const express = require('express');
const { UserController } = require('../controller/user.js');
const { CheckLoggedIn } = require('../helper/util.js');

const UserRouter = express.Router();

UserRouter.get('/', CheckLoggedIn, UserController.index)

module.exports = {UserRouter}