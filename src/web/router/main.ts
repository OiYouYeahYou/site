import { Router } from 'express'
import simpleIcons = require('simple-icons')

import { redirect } from '../../redirect'
import { routes } from '../../routes'
import { api } from '../../api'

export const mainRouter = Router()

mainRouter.use('/svg/:name', (req, res) => {
	const icon = simpleIcons[req.params.name]

	if (!icon) return res.status(404).send()

	res.status(200)
		.set('Content-Type', 'image/svg+xml')
		.send(icon.svg.replace(/<path /g, `<path fill="white" `))
})
mainRouter.use('/r', redirect)
mainRouter.use('/api', api)
mainRouter.use('/', routes)
