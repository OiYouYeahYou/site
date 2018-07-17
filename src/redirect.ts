export const redirect = require('express').Router()

const config = {
	twitter: 'http://twitter.com/oiyouyeahyou',
}

redirect.get('/:service', (req, res) => {
	const service = req.params.service
	const url = service in config && typeof config[service] === 'string'

	if (!url) {
		res.redirect(404, '/')
	} else {
		res.redirect(200, url)
	}
})
