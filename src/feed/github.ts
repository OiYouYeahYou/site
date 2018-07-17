import * as Octokit from '@octokit/rest'

import { feed, IListItem, sortFeed } from './list'

interface IPayload {
	repo: any
	payload: any
	type: string
}

interface IHandlers {
	[key: string]: (payload: IPayload) => IListItem
}

const octokit = new Octokit()
const user = 'oiyouyeahyou'

export async function getGitHubEvents() {
	const events = await octokit.activity.getEventsForUser({ username: user })
	console.log(events.data)
	events.data.forEach(eventToItemPusher)
	sortFeed()
}

function eventToItemPusher(event: IPayload) {
	const { type } = event

	if (!(type in handlers)) {
		return
	}

	var item = handlers[type](event)

	if (item) {
		feed.push(item)
	}
}

const handlers: IHandlers = {}

handlers.PullRequestEvent = ({ repo, payload }) => {
	const { action, pull_request } = payload

	if (action !== 'opened') {
		return
	}

	const { name } = repo
	const { created_at } = pull_request

	return {
		content: `Opened a pull request to <a href="https://github.com/${name}">${name}</a>`,
		time: new Date(created_at),
		place: 'GitHub',
	}
}
