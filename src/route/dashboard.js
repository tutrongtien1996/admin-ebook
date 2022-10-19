const express = require('express');
const { DashboardController } = require('../controller/dashboard.js');

const DashboardRouter = express.Router();

DashboardRouter.get('/', DashboardController.index)

module.exports = {DashboardRouter}