const express = require('express');
const { AuthController } = require('../controller/auth.js');

const AuthRouter = express.Router();

AuthRouter.get('/login', AuthController.login)
AuthRouter.post('/login', AuthController.DoLogin)
AuthRouter.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = {AuthRouter}