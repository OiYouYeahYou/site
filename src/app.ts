require( 'source-map-support' ).install()

import * as express from 'express';
import { join } from 'path';
// import favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import { urlencoded, json } from 'body-parser';

import exphbs from './exphbs';
import { redirect } from './redirect';
import { routes } from './routes';

const pathView = join( __dirname, '../views' );
const pathPublic = join( __dirname, '../public' );

const app = express();
export default app
app.locals.ENV = process.env.NODE_ENV || 'development';
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development';
app.locals.mainMenu = [ 'about', 'portfolio', 'feed', 'status', 'contact' ];

// view engine setup
app.engine( 'handlebars', exphbs );
app.set( 'views', pathView );
app.set( 'view engine', 'handlebars' );

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
[
	[ json() ],
	[ urlencoded( { extended: true } ) ],
	[ cookieParser() ],
	[ express.static( pathPublic ) ],

	[ '/r', redirect ],
	[ '/', routes ],
].forEach( params => app.use( ...params ) )
