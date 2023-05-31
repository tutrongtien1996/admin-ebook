const express = require('express');
const { homeController } = require('../controller/web/home.js');

const homeRouter = express.Router();

homeRouter.get('/', homeController.index)
homeRouter.get('/privacy-policy', homeController.pravicy)
homeRouter.get('/terms-of-services', homeController.terms)

const _initRouteWeb = function (app) {
    app.use('/', homeRouter)
}
  
module.exports = {_initRouteWeb}