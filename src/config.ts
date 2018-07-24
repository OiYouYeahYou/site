export const config: config = require('../.config.json')

export interface config {
	feed: feedConfig[]
}

export interface feedConfig {
	type: string
}
