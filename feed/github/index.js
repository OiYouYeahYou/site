const fs = require( 'fs' );
const request = require( 'request' );

const handlers = require( './handlers' );
const list = require( '../list' );

const user = 'oiyouyeahyou';
const eventURL = `https://api.github.com/users/${ user }/events`;
const requestOptions = {
	headers: {
		'User-Agent': 'OiYouYeahYou/site'
	}
};

function getUserEvents() {
	request( eventURL, requestOptions, ( err, res, body ) => {
		var events = JSON.parse( body );

		events.forEach( event => {
			if ( 'actor' in event )
				delete event.actor;
		} );

		processEventsToFeedItems( events );
	} );
}

function processEventsToFeedItems( events ) {
	events.forEach( ( event ) => {
		if ( !( event.type in handlers ) )
			return;

		var item = handlers[ event.type ]( event );

		if ( item )
			list.push( item );
	} );

	list.sort( ( a, b ) => b.time - a.time );
}

module.exports = getUserEvents;

