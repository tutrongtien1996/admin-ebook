const { AuthRouter } = require("./auth")
const { CategoryRouter } = require("./category")
const { BookRouter } = require("./book")
const { AuthorRouter } = require("./author")
const { CheckLoggedIn } = require("../helper/util")

const _initRoute = function (app) {
  app.get('/', CheckLoggedIn, (request, response) => response.redirect('/books'))
  app.use('/auth', AuthRouter)
  app.use('/categories', CategoryRouter)
  app.use('/books', BookRouter)
  app.use('/authors', AuthorRouter)
}

module.exports = {_initRoute}