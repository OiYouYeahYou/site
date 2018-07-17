import { Router } from 'express'
import { feed } from './feed/list'

export const routes = Router()

const homeOptions = {}
const feedOptions = { feed }
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
}

simpleRouter('/about', 'about', homeOptions)
simpleRouter('/portfolio', 'portfolio', homeOptions)
simpleRouter('/feed', 'feed', feedOptions)
simpleRouter('/contact', 'contact', homeOptions)
simpleRouter('/status', 'status', statusOptions)
simpleRouter('/', 'index', homeOptions)

function simpleRouter(path, view, opts) {
	routes.get(path, (req, res) => res.render(view, opts))
}
