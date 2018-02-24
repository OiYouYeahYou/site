import * as exphbs from 'express-handlebars';
import moment = require( 'moment' );

export default exphbs( {
	defaultLayout: 'main',
	partialsDir: [ 'views/partials/' ],
	helpers: {
		friendlyDateTime: ( d ) => {
			return moment( d ).format( 'h:hh - d MMM YYYY' );
		}
	},
} )
