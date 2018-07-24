import * as Octokit from '@octokit/rest'

import { IListItem, ConfigHandlerParams } from '../list'

interface IPayload {
	repo: any
	payload: any
	type: string
}

interface IHandlers {
	[key: string]: (payload: IPayload) => IListItem
}

interface GitHubConfig {
	type: 'github'
	username: string
}

export = async function handler({
	config,
	feed,
}: ConfigHandlerParams<GitHubConfig>) {
	const octokit = new Octokit()
	const { username } = config

	const events = await octokit.activity.getEventsForUser({ username })

	for (const event of events.data) {
		const { type } = event

		if (!(type in handlers)) return

		var item = handlers[type](event)

		if (item) feed.push(item)
	}
}

/* =================================== §§ ===================================
	Handlers
   =================================== §§ =================================== */

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
