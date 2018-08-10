require('source-map-support').install()

import * as express from 'express'
import * as exphbs from 'express-handlebars'
import moment = require('moment')

import { errorRouter } from './web/router/error'
import { mainRouter } from './web/router/main'
import { middlewareRouter } from './web/router/middleware'
import { pathView } from './pats'

export const app = express()
app.locals.ENV = process.env.NODE_ENV || 'development'
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development'
app.locals.mainMenu = ['about', 'portfolio', 'feed', 'status', 'contact']

const handlebars = exphbs({
	defaultLayout: 'main',
	partialsDir: ['views/partials/'],
	helpers: {
		friendlyDateTime: d => moment(d).format('h:hh - d MMM YYYY'),
	},
})

app.engine('handlebars', handlebars)
	.set('views', pathView)
	.set('view engine', 'handlebars')
	.use(middlewareRouter)
	.use(mainRouter)
	.use(errorRouter)
	.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function() {
	// @ts-ignore
	console.log(`Express server listening on port ${server.address().port}`)
})
