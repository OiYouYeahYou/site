require('source-map-support').install()

import * as express from 'express'
import { join, normalize } from 'path'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import { urlencoded, json } from 'body-parser'
import * as exphbs from 'express-handlebars'
import moment = require('moment')
import simpleIcons = require('simple-icons')

import { redirect } from './redirect'
import { routes } from './routes'

const pathView = join(__dirname, '../views')
const pathPublic = join(__dirname, '../public')
const pathFavicon = normalize(__dirname + '/../public/img/favicon.ico')

export const app = express()
app.locals.ENV = process.env.NODE_ENV || 'development'
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development'
app.locals.mainMenu = ['about', 'portfolio', 'feed', 'status', 'contact']

app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main',
		partialsDir: ['views/partials/'],
		helpers: {
			friendlyDateTime: d => {
				return moment(d).format('h:hh - d MMM YYYY')
			},
		},
	})
)
app.set('views', pathView)
app.set('view engine', 'handlebars')

app.use(favicon(pathFavicon))

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(pathPublic))

app.use('/svg/:name', (req, res) => {
	const icon = simpleIcons[req.params.name]

	if (!icon) return res.status(404).send()

	res.status(200)
		.set('Content-Type', 'image/svg+xml')
		.send(icon.svg.replace(/<path /g, `<path fill="white" `))
})
app.use('/r', redirect)
app.use('/', routes)
