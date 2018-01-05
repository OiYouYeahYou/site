const router = module.exports = require( 'express' ).Router();

var homeOptions = {
	title: 'Express',
};

simpleRouter( '/home', 'index', homeOptions );
simpleRouter( '/contact', 'index', homeOptions );
simpleRouter( '/feed', 'index', homeOptions );
simpleRouter( '/about', 'index', homeOptions );
simpleRouter( '/portfolio', 'index', homeOptions );
simpleRouter( '/', 'index', homeOptions );

function simpleRouter( path, view, opts ) {
	router.get( path, ( req, res ) => res.render( view, opts ) );
}
