import { Router } from 'express'
import { IRouter } from '..'

const router = Router()

export const vx: IRouter = {
	info: 'experimental api',
	router: router,
}

const statuses = {
	connection: {
		type: 'StaticStatus',
		path: 'connection',
		label: 'Connection',
		currentState: 'online',
		states: {
			online: {
				name: 'online',
				icon: '',
			},
			streaming: {
				name: 'streaming',
				icon: '',
			},
			busy: {
				name: 'busy',
				icon: '',
			},
			away: {
				name: 'away',
				icon: '',
			},
			offline: {
				name: 'offline',
				icon: '',
			},
			invisible: {
				name: 'invisible',
				icon: '',
			},
		},
	},
}

router.use('/status/:path/update/:state', (req, res) => {
	const { path, state } = req.params

	if (statuses.hasOwnProperty(path)) {
		const status = statuses[path]

		if (!status.states.hasOwnProperty(state)) {
			res.status(404).json({ error: `invalid: ${state}` })
		} else {
			status.currentState = state

			res.status(200).json(status)
		}
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status/:path/info/:state', (req, res) => {
	const { path, state } = req.params

	if (statuses.hasOwnProperty(path)) {
		const status = statuses[path]

		if (!status.states.hasOwnProperty(state)) {
			res.status(404).json({ error: `invalid state: ${state}` })
		} else {
			res.status(200).json(status.states[state])
		}
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status/:path', (req, res) => {
	const { path } = req.params

	if (statuses.hasOwnProperty(path)) {
		const status = statuses[path]

		res.status(200).json(status)
	} else {
		res.status(404).json({ error: `path not found: ${path}` })
	}
})
router.use('/status', (req, res) =>
	res.status(200).json({
		paths: Object.keys(statuses),
	})
)
router.use('/', (req, res) => res.json({}))
