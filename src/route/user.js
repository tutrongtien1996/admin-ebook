const express = require('express');
const { UserController } = require('../controller/user.js');

const UserRouter = express.Router();

UserRouter.get('/', UserController.index)

module.exports = {UserRouter}