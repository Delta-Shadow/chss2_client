import { derived } from 'svelte/store'
import server_store, { type Data as ServerData } from './server'

interface Fields {
	msgs: Array<{
		sender: string
		content: string
	}>
}

export type Data = Fields | null

class ChatStore {
	store = derived(server_store, this.#update, null)

	subscribe = this.store.subscribe

	#update(server: ServerData, set: (value: Data) => void) {
		if (server == null) return
		const event_name = 'chat_update'
		server.socket.on(event_name, (data: Fields) => set(data))
	}
}

export default new ChatStore()
