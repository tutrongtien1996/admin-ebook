const express = require('express');
const { DashboardController } = require('../controller/dashboard.js');
const { CheckLoggedIn } = require('../helper/util.js');

const DashboardRouter = express.Router();

DashboardRouter.get('/', CheckLoggedIn, DashboardController.index)

module.exports = {DashboardRouter}