export const config: config = require('../.config.json')

interface config {
	feed: feedConfig[]
}

export interface feedConfig {
	type: string
}
