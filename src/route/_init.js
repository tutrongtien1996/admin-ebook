const { AuthRouter } = require("./auth")
const { DashboardRouter } = require("./dashboard")
const { UserRouter } = require("./user")

const _initRoute = function (app) {
  app.use('/', DashboardRouter)
  app.use('/auth', AuthRouter)
  app.use('/users', UserRouter)
}

module.exports = {_initRoute}