const { AuthRouter } = require("./auth")
const { CategoryRouter } = require("./category")
const { DashboardRouter } = require("./dashboard")
const { UserRouter } = require("./user")
const { TemplateRouter } = require("./template")
const { WebsiteRouter } = require("./website")
const { ContactRouter } = require("./contact")
// const {formInputRouter} = require("./formInp")

const _initRoute = function (app) {
  app.use('/', DashboardRouter)
  app.use('/auth', AuthRouter)
  app.use('/users', UserRouter)
  app.use('/categories', CategoryRouter)
  app.use('/templates', TemplateRouter)
  app.use('/websites', WebsiteRouter)
  app.use('/contacts', ContactRouter)
}

module.exports = {_initRoute}