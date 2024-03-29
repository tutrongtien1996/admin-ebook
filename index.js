const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { ConfigSession } = require('./src/helper/config');
dotenv.config();

const { _initRouteAdmin } = require('./src/route/admin');
const { _initRouteAPI } = require('./src/route/api');
const { _initRouteWeb } = require('./src/route/web');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const port = process.env.APP_PORT;
app.engine('hbs', exphbs.engine({
  layoutsDir: __dirname + '/src/view/admin',
  partialsDir: __dirname + '/src/view/admin/partials',
  extname: 'hbs',
  defaultLayout: 'main',
}))
app.use('/public', express.static('public'))
app.use('/upload', express.static('upload'))

app.set('view engine', 'hbs')
app.set('views',__dirname + '/src/view');
ConfigSession(app)
_initRouteWeb(app)
_initRouteAdmin(app)
_initRouteAPI(app)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});