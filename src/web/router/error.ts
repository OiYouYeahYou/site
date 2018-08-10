import { Router } from 'express'

export const errorRouter = Router()

errorRouter.use((req, res, next) => {
	const err = new Error('Not Found')
	// @ts-ignore
	err.status = 404

	next(err)
})

const isDev = (process.env.NODE_ENV || 'development') === 'development'
if (isDev)
	errorRouter.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err,
			title: 'error',
		})
	})
else
	errorRouter.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: {},
			title: 'error',
		})
	})
