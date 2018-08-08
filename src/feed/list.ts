import { config, feedConfig } from '../config'

export interface IListItem {
	heading?: string
	content: string
	time: Date
	place?: string
}

export interface ConfigHandlerParams<T = {}> {
	feed: IListItem[]
	config: feedConfig & T
}

export async function makeList(config: config, feed: IListItem[]) {
	await Promise.all(
		config.feed.map(config => {
			const params: ConfigHandlerParams = { feed, config }

			try {
				return require(`./handlers/${config.type}`)(params)
			} catch (error) {
				if (error.code === 'MODULE_NOT_FOUND')
					console.log(
						`Unable to find a handler for ${config.type}`,
						error
					)
			}
		})
	).catch(err => console.log(err))

	// @ts-ignore Sort algortithm is valid
	feed.sort((a, b) => b.time - a.time)
}
