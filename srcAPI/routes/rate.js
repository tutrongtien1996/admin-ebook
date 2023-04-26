const RateRouter = require('express').Router();
const {RateController} = require('../controller/rate')

RateRouter.get('/',  RateController.list)
RateRouter.post('/', RateController.create)
RateRouter.get('/:id',  RateController.one)
RateRouter.delete('/:id', RateController.delete)
RateRouter.put('/:id', RateController.update)

module.exports = {RateRouter}