import { ConfigHandlerParams } from '../list'

interface Static {
	items: any[]
}

export = async function({ config, feed }: ConfigHandlerParams<Static>) {
	for (const { heading, time, content } of config.items) {
		feed.push({ heading, time: new Date(time), content })
	}
}
