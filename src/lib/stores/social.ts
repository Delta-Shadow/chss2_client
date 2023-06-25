import { derived, writable } from 'svelte/store'
import server_store, { type Data as ServerData } from './server'

interface Fields {
	players: Array<{
		pid: string
		rid: string | null
		name: string | null
		role: 'white' | 'black' | 'spectator' | null
	}>
}

export type Data = Fields | null

class SocialStore {
	store = derived(server_store, this.#update, null)

	subscribe = this.store.subscribe

	#update(server: ServerData, set: (value: Data) => void) {
		if (server == null) return
		const event_name = 'social_update'
		server.socket.on(event_name, (data: Fields) => set(data))
	}
}

export default new SocialStore()
