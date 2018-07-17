import { getGitHubEvents } from './github'

export interface IListItem {
	heading?: string
	content: string
	time: Date
	place?: string
}

export const feed: IListItem[] = [
	{
		heading: 'Totally not a blog post!',
		content: 'Do ... I put words here?',
		time: new Date(Date.now()),
	},
	{
		content: 'Hello World!',
		time: new Date(Date.now()),
	},
	{
		content: 'In the begining!',
		place: 'Twooter',
		time: new Date(0),
	},
]

getGitHubEvents()

export function sortFeed() {
	feed.sort(sortTimeDesc)
}

const sortTimeDesc = (a, b) => b.time - a.time
