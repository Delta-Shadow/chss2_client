import { io, Socket } from 'socket.io-client'
import { get, writable } from 'svelte/store'
import { server_host } from '$lib/config'

interface Fields {
	socket: Socket
}

export type Data = null | Fields

type Callback = (err: ServerError) => void

class ServerStore {
	store = writable<Data>(null)

	subscribe = this.store.subscribe

	connect() {
		this.store.set({
			socket: io(server_host)
		})
	}

	ready() {
		return get(this.store) != null
	}

	join(name: string, room: string, callback: Callback) {
		const server = get(this.store)
		if (server == null) return false
		server.socket.emit('join', { name, room }, callback)
	}

	msg(content: string, callback: Callback) {
		const server = get(this.store)
		if (server == null) return false
		server.socket.emit('msg', { content }, callback)
	}

	play(move: string, callback: Callback) {
		const server = get(this.store)
		if (server == null) return false
		server.socket.emit('play', { move }, callback)
	}
}

export default new ServerStore()
