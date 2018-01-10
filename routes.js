const router = module.exports = require( 'express' ).Router();

const feedList = require( './feed/list' );

const homeOptions = {};
const feedOptions = {
	feed: feedList
};

simpleRouter( '/about', 'about', homeOptions );
simpleRouter( '/portfolio', 'portfolio', homeOptions );
simpleRouter( '/feed', 'feed', feedOptions );
simpleRouter( '/contact', 'contact', homeOptions );
simpleRouter( '/', 'index', homeOptions );


function simpleRouter( path, view, opts ) {
	router.get( path, ( req, res ) => res.render( view, opts ) );
}
