const router = module.exports = require( 'express' ).Router();

const exampleFeed = [ {
		heading: 'Totally not a blog post!',
		content: 'Do ... I put words here?',
		time: ( new Date( Date.now() ) ).toISOString(),
	},
	{
		content: 'Hello World!',
		time: ( new Date( Date.now() ) ).toISOString(),
	},
	{
		content: 'In the begining!',
		place: 'Twooter',
		time: new Date( 0 ).toISOString(),
	},
];

const homeOptions = {};
const feedOptions = {
	feed: exampleFeed
};

simpleRouter( '/about', 'about', homeOptions );
simpleRouter( '/portfolio', 'portfolio', homeOptions );
simpleRouter( '/feed', 'feed', feedOptions );
simpleRouter( '/contact', 'contact', homeOptions );
simpleRouter( '/', 'index', homeOptions );


function simpleRouter( path, view, opts ) {
	router.get( path, ( req, res ) => res.render( view, opts ) );
}
