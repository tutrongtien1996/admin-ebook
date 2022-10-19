const express = require('express');
const { AuthController } = require('../controller/auth.js');

const AuthRouter = express.Router();

AuthRouter.get('/login', AuthController.login)

module.exports = {AuthRouter}