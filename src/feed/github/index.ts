require( 'source-map-support' ).install()

import * as request from 'request';

import handlers from './handlers';
import list from '../list';

const user = 'oiyouyeahyou';
const eventURL = `https://api.github.com/users/${ user }/events`;
const requestOptions = {
	headers: {
		'User-Agent': 'OiYouYeahYou/site'
	}
};

const sortTimeDesc = ( a, b ) => b.time - a.time;

const getUserEvents = () => {
	request( eventURL, requestOptions, responseHandler );
}
export default getUserEvents

function responseHandler( err, res, body ) {
	var events = JSON.parse( body );

	events.forEach( event => {
		if ( 'actor' in event )
			delete event.actor;
	} );

	processEventsToFeedItems( events );
}

function processEventsToFeedItems( events ) {
	events.forEach( eventToItemPusher );
	list.sort( sortTimeDesc );
}

function eventToItemPusher( event ) {
	if ( !( event.type in handlers ) )
		return;

	var item = handlers[ event.type ]( event );

	if ( item )
		list.push( item );
}

