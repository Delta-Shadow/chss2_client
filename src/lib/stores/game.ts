import { derived } from 'svelte/store'
import server_store, { type Data as ServerData } from './server'

interface Fields {
	pieces: Array<{
		x?: number
		y?: number
		type: 'k' | 'q' | 'r' | 'b' | 'n' | 'p'
		color: 'w' | 'b'
		moves?: Array<{
			x: number
			y: number
			notation: string
		}>
	}>
	turn: 'white' | 'black'
	over: boolean
	draw: boolean
	winner: 'white' | 'black' | null
}

export type Data = Fields | null

class GameStore {
	store = derived(server_store, this.#update, null)

	subscribe = this.store.subscribe

	#update(server: ServerData, set: (value: Data) => void) {
		if (server == null) return
		const event_name = 'game_update'
		server.socket.on(event_name, (data: Fields) => set(data))
	}
}

export default new GameStore()
