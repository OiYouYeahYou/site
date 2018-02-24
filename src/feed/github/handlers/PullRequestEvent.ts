export default function ( list ) {
	list.PullRequestEvent = function ( { repo, payload } ) {
		const { action, pull_request } = payload;

		if ( action !== 'opened' )
			return;

		const { name } = repo;
		const { created_at } = pull_request;

		return {
			content: `Opened a pull request to <a href="https://github.com/${ name }">${ name }</a>`,
			time: new Date( created_at ),
			place: 'GitHub',
		};
	};
};
