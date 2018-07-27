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

/******************************************************************************
 * Initialise
 ******************************************************************************/
const pathView = join(__dirname, '../views')
const pathPublic = join(__dirname, '../public')
const pathFavicon = normalize(__dirname + '/../public/img/favicon.ico')

export const app = express()
app.locals.ENV = process.env.NODE_ENV || 'development'
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development'
app.locals.mainMenu = ['about', 'portfolio', 'feed', 'status', 'contact']

/******************************************************************************
 * View Engine
 ******************************************************************************/
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

/******************************************************************************
 * Generic Handlers
 ******************************************************************************/
app.use(favicon(pathFavicon))

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(pathPublic))

/******************************************************************************
 * Routing
 ******************************************************************************/
app.use('/svg/:name', (req, res) => {
	const icon = simpleIcons[req.params.name]

	if (!icon) return res.status(404).send()

	res.status(200)
		.set('Content-Type', 'image/svg+xml')
		.send(icon.svg.replace(/<path /g, `<path fill="white" `))
})
app.use('/r', redirect)
app.use('/', routes)

/******************************************************************************
 * error Handlers
 ******************************************************************************/
app.use((req, res, next) => {
	const err = new Error('Not Found')
	// @ts-ignore
	err.status = 404

	next(err)
})

const isDev = app.get('env') === 'development'
if (isDev)
	app.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err,
			title: 'error',
		})
	})
else
	app.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: {},
			title: 'error',
		})
	})

/******************************************************************************
 * Launch Server
 ******************************************************************************/
app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function() {
	console.log(`Express server listening on port ${server.address().port}`)
})
