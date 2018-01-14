const exphbs = require( 'express-handlebars' );
const moment = require( 'moment' );

module.exports =  exphbs( {
	defaultLayout: 'main',
	partialsDir: [ 'views/partials/' ],
	helpers: {
		friendlyDateTime: ( d ) => {
			return moment( d ).format( 'h:hh - d MMM YYYY' );
		}
	},
} )
