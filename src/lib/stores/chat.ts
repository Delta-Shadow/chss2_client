import { writable, type Writable } from 'svelte/store'
import server_store from './server'

interface Fields {
	msgs: Array<{
		sender: string
		content: string
	}>
}

export type Data = Fields

class ChatStore {
	#store: Writable<Data>
	subscribe: any

	constructor() {
		this.#store = writable({ msgs: [] })

		server_store.subscribe(server => {
			this.subscribe = this.#store.subscribe
			if (server != null) {
				const event_name = 'chat_update'
				server.socket.on(event_name, this.#server_callback.bind(this))
			}
		})
	}

	#server_callback(data: Data) {
		this.#store.update((old_data: Data) => ({
			msgs: [...old_data.msgs, data.msgs[data.msgs.length - 1]]
		}))
	}

	sys_msg(msg: string) {
		this.#store.update((old_data: Data) => ({
			msgs: [
				...old_data.msgs,
				{
					sender: 'CHSS',
					content: msg
				}
			]
		}))
	}
}

export default new ChatStore()
