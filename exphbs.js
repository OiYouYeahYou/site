const exphbs = require( 'express-handlebars' );

module.exports =  exphbs( {
	defaultLayout: 'main',
	partialsDir: [ 'views/partials/' ],
} )
