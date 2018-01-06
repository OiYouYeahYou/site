const router = module.exports = require( 'express' ).Router();

var homeOptions = {
	title: 'Express',
};

simpleRouter( '/about', 'about', homeOptions );
simpleRouter( '/portfolio', 'portfolio', homeOptions );
simpleRouter( '/feed', 'feed', homeOptions );
simpleRouter( '/contact', 'contact', homeOptions );
simpleRouter( '/', 'index', homeOptions );


function simpleRouter( path, view, opts ) {
	router.get( path, ( req, res ) => res.render( view, opts ) );
}
