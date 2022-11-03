const { AuthRouter } = require("./auth")
const { CategoryRouter } = require("./category")
const { DashboardRouter } = require("./dashboard")
const { UserRouter } = require("./user")
const { TemplateRouter } = require("./template")
const { WebsiteRouter } = require("./website")
// const {formInputRouter} = require("./formInp")

const _initRoute = function (app) {
  app.use('/', DashboardRouter)
  app.use('/auth', AuthRouter)
  app.use('/users', UserRouter)
  app.use('/categories', CategoryRouter)
  app.use('/templates', TemplateRouter)
  app.use('/websites', WebsiteRouter)
}

module.exports = {_initRoute}