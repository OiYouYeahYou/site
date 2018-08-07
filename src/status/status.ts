import { StaticStatus } from './handlers/StaticStatus'

export interface IStatus {
	name: string
	label: string
	toJSON(): StatusConfig
	getState(key: string)
	setState(key: string): void
	deleteState(key: string): void
	hasState(key: string): boolean
	heartbeat(key: string): number
}

export interface StatusConfig {
	type: string
	path: string
	label: string
	currentState: string
	lastBeat?: number
	states: {
		[key: string]: {
			name: string
			icon: any
		}
	}
}

const handlerClasses = { StaticStatus }

export class StatusManager {
	private handlers: { [key: string]: IStatus } = {}
	private handlerArray: IStatus[] = []

	constructor(configs: StatusConfig[]) {
		for (const config of configs) {
			const { path, type } = config

			if (this.handlers.hasOwnProperty(path)) {
				throw new Error(`Path already exists: ${path}`)
			} else if (!handlerClasses.hasOwnProperty(type)) {
				throw new Error(`Type of status does not exists: ${type}`)
			}

			this.handlerArray.push(
				(this.handlers[path] = new handlerClasses[type](config))
			)
		}
	}

	doesStatusExist(key: string) {
		return this.handlers.hasOwnProperty(key)
	}

	getStatus(key: string) {
		const { handlers } = this

		if (!handlers.hasOwnProperty(key)) {
			return false
		}

		return handlers[key]
	}

	getKeys() {
		return Object.keys(this.handlers)
	}

	toJSON() {
		return this.handlerArray
	}
}
