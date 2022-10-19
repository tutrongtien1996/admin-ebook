const { AuthRouter } = require("./auth")
const { DashboardRouter } = require("./dashboard")

const _initRoute = function (app) {
  app.use('/', DashboardRouter)
  app.use('/auth', AuthRouter)
}

module.exports = {_initRoute}