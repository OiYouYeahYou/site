const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const exphbs = require( 'express-handlebars' );

const routes = require( './routes' );

const pathView = path.join( __dirname, 'views' );
const pathPublic = path.join( __dirname, 'public' );

const app = module.exports = express();
app.locals.ENV = process.env.NODE_ENV || 'development';
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development';

// view engine setup
app.engine( 'handlebars', exphbs( {
	defaultLayout: 'main',
	partialsDir: [ 'views/partials/' ]
} ) );
app.set( 'views', pathView );
app.set( 'view engine', 'handlebars' );

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser() );
app.use( express.static( pathPublic ) );

app.use( '/', routes );
