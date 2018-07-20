import { config, feedConfig } from '../config'

export interface IListItem {
	heading?: string
	content: string
	time: Date
	place?: string
}

export interface HandlerParams<T = {}> {
	feed: IListItem[]
	config: feedConfig & T
}

export const feed: IListItem[] = [
	{
		heading: 'Totally not a blog post!',
		content: 'Do ... I put words here?',
		time: new Date('2018-08-20'),
	},
	{
		content: 'Hello World!',
		time: new Date('2017-04-15'),
	},
	{
		content: 'In the begining!',
		place: 'Twooter',
		time: new Date(0),
	},
]

const handlerPromises = config.feed.map<Promise<void>>(async config => {
	const params: HandlerParams = { feed, config }

	return require(`./handlers/${config.type}`)(params)
})

Promise.all(handlerPromises)
	.catch(err => console.log(err))
	.then(() => {
		// @ts-ignore It's valid
		feed.sort((a, b) => b.time - a.time)
	})
