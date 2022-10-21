const express = require('express');
const { CategoryController } = require('../controller/category.js');
const { CheckLoggedIn } = require('../helper/util.js');

const CategoryRouter = express.Router();

CategoryRouter.get('/', CheckLoggedIn, CategoryController.index)

module.exports = {CategoryRouter}