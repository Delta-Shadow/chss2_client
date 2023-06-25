import { derived } from 'svelte/store'
import server_store, { type Data as ServerData } from './server'

interface Fields {
	sid: string
	pid: string
}

export type Data = Fields | null

class SessionStore {
	store = derived(server_store, this.#update, null)

	subscribe = this.store.subscribe

	#update(server: ServerData, set: (value: Data) => void) {
		if (server == null) return
		const event_name = 'session_update'
		server.socket.on(event_name, (data: Fields) => set(data))
	}
}

export default new SessionStore()
