import { Router } from 'express'
import { IRouter } from '..'
import { StatusManager, StatusConfig } from '../../status/status'
import { mockStatuses } from '../../status/mockStatusData'

const router = Router()

export const vx: IRouter = {
	info: 'experimental api',
	router: router,
}

const statusManager = new StatusManager(
	Object.values<StatusConfig>(mockStatuses)
)

router.use('/status/:path/update/:state', (req, res) => {
	const { path, state } = req.params
	const status = statusManager.getStatus(path)

	if (status) {
		if (!status.hasState(state)) {
			res.status(404).json({ error: `invalid: ${state}` })
		} else {
			status.setState(state)

			res.status(200).json(status)
		}
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status/:path/info/:state', (req, res) => {
	const { path, state } = req.params
	const status = statusManager.getStatus(path)

	if (status) {
		if (!status.hasState(state)) {
			res.status(404).json({ error: `invalid state: ${state}` })
		} else {
			res.status(200).json(status.getState(state))
		}
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status/:path/state/:state/delete', (req, res) => {
	const { path, state } = req.params
	const status = statusManager.getStatus(path)

	if (status) {
		if (!status.hasState(state)) {
			res.status(404).json({ error: `invalid state: ${state}` })
		} else {
			status.deleteState(state)

			res.status(200).json(status.toJSON())
		}
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status/:path/heartbeat/:state', (req, res) => {
	const { path, state } = req.params
	const status = statusManager.getStatus(path)

	if (status) {
		status.heartbeat(state)

		res.status(200).json(status.toJSON())
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status/:path', (req, res) => {
	const { path } = req.params
	const status = statusManager.getStatus(path)

	if (status) {
		res.status(200).json(status.toJSON())
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status', (req, res) => {
	res.status(200).json({
		paths: statusManager.getKeys(),
	})
})
router.use('/', (req, res) => res.json({}))
