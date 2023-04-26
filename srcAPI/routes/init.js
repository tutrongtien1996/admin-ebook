const {BookRouter} = require('./book')
const {CategoryRouter} = require('./category')
const {UserRouter} = require('./user')
const {RateRouter} = require('./rate')
const {AuthRouter} = require('./auth')

const _initRouteAPI = function(app){
    app.use('/api/books', BookRouter)
    app.use('/api/users', UserRouter)
    app.use('/api/rates', RateRouter)
    app.use('/api/categories', CategoryRouter)
    app.use('/api/admins', AuthRouter)
}

module.exports = {_initRouteAPI}