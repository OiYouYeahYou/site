const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );

const exphbs = require( './exphbs' );
const routes = require( './routes' );

const pathView = path.join( __dirname, 'views' );
const pathPublic = path.join( __dirname, 'public' );

const app = module.exports = express();
app.locals.ENV = process.env.NODE_ENV || 'development';
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development';
app.locals.mainMenu = [ 'about', 'portfolio', 'feed', 'contact' ];

// view engine setup
app.engine( 'handlebars', exphbs );
app.set( 'views', pathView );
app.set( 'view engine', 'handlebars' );

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
[
	[ logger( 'dev' ) ],
	[ bodyParser.json() ],
	[ bodyParser.urlencoded( { extended: true } ) ],
	[ cookieParser() ],
	[ express.static( pathPublic ) ],

	[ '/', routes ],
].forEach( params => app.use( ...params ) )


require( './feed/github' )();
