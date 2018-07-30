import { Router } from 'express'
import { vx } from './vx'

export interface IRouter {
	info: string
	router: Router
}

export const api = Router()

api.use('/vx', vx.router)
api.use('/', (req, res) => res.json({ vx: vx.info }))
