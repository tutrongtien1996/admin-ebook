const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { _initRoute } = require('./src/route/_init');
const { ConfigSession } = require('./src/helper/config');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const port = process.env.APP_PORT;
app.engine('hbs', exphbs.engine({
  layoutsDir: __dirname + '/src/view',
  partialsDir: __dirname + '/src/view/partials',
  extname: 'hbs',
  defaultLayout: 'main',
}))
app.use('/public', express.static('public'))
app.set('view engine', 'hbs')
app.set('views',__dirname + '/src/view/pages');
ConfigSession(app)
_initRoute(app)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});