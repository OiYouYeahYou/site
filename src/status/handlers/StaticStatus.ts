import { IStatus, StatusConfig } from '../status'

export class StaticStatus implements IStatus {
	constructor(private config: StatusConfig) {}

	get _currentState() {
		return this.config.currentState
	}

	set _currentState(v: string) {
		this.config.currentState = v
	}

	get currentState() {
		return this.config.states[this._currentState]
	}

	get name() {
		return this.currentState.name
	}

	get icon() {
		return this.currentState.icon
	}

	get label() {
		return this.config.label
	}

	getState(key: string) {
		return this.config.states[key]
	}

	setState(key: string) {
		if (!this.hasState(key)) {
			throw new Error(`State does not exist: ${key}`)
		}

		return (this._currentState = key)
	}

	hasState(key: string) {
		return this.config.states.hasOwnProperty(key)
	}

	addState(key, { name, icon, colour }) {
		this.config.states[key] = {
			name,
			icon,
		}
	}

	deleteState(key: string) {
		delete this.config[key]
	}

	changeStatus(key) {
		if (key in this.config.states) {
			this._currentState = key
			return true
		} else {
			return false
		}
	}

	toJSON() {
		return this.config
	}
}
