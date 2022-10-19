const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const { _initRoute } = require('./src/route/_init');

dotenv.config();

const app = express();
const port = process.env.APP_PORT;
app.engine('hbs', exphbs.engine({
  layoutsDir: __dirname + '/src/view',
  partialsDir: __dirname + '/src/view/partials',
  extname: 'hbs',
  defaultLayout: 'main',
}))
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views',__dirname + '/src/view/pages');

_initRoute(app)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});