import { Router } from 'express'
import { makeList } from './feed/list'
import { config } from './config'

export const routes = Router()
const feed = []

makeList(config, feed)

interface contacts {
	contacts?: {
		service: string
		redirection: string
		username: string
	}[]
}

const oy3 = 'OiYouYeahYou'

const homeOptions = {}
const feedOptions = { feed }
const contactOptions: contacts = {
	contacts: [
		simpleContact('Twitter'),
		simpleContact('Instagram'),
		simpleContact('Keybase'),
		simpleContact('Discord', 'The Ultimate Server'),
		simpleContact('GitHub'),
		simpleContact('Twitch', 'nallaj'),
		simpleContact('NPM'),
		simpleContact('YouTube'),
		simpleContact('LinkedIn'),
	],
}
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
simpleRouter('/contact', 'contact', contactOptions)
simpleRouter('/status', 'status', statusOptions)
simpleRouter('/', 'index', homeOptions)

function simpleRouter(path, view, opts) {
	routes.get(path, (req, res) => res.render(view, opts))
}

function simpleContact(platfrom: string, username = oy3) {
	return {
		service: platfrom,
		redirection: platfrom.toLowerCase(),
		username,
	}
}
