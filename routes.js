const router = module.exports = require( 'express' ).Router();

const feedList = require( './feed/list' );

const homeOptions = {};
const feedOptions = {
	feed: feedList
};
const statusOptions = {
	statusses: [
		{
			title: 'Online',
			status: 'Offline',
		},
		{
			title: 'Music',
			status: 'Not Listening',
		},
	],
};

simpleRouter( '/about', 'about', homeOptions );
simpleRouter( '/portfolio', 'portfolio', homeOptions );
simpleRouter( '/feed', 'feed', feedOptions );
simpleRouter( '/contact', 'contact', homeOptions );
simpleRouter( '/status', 'status', statusOptions );
simpleRouter( '/', 'index', homeOptions );


function simpleRouter( path, view, opts ) {
	router.get( path, ( req, res ) => res.render( view, opts ) );
}
