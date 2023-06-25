<script lang="ts">
	import { onMount } from 'svelte'

	// Stores
	import server from '$lib/stores/server.js'
	import session from '$lib/stores/session.js'
	import social from '$lib/stores/social.js'
	import chat from '$lib/stores/chat.js'
	import game from '$lib/stores/game.js'

	// Misc Lib
	import rand_name from '$lib/rand_name'

	// Props
	export let data // For receiving data from page.ts

	onMount(() => {
		server.connect()
		const name = prompt('Enter nickname', rand_name())!
		server.join(name, data.rid, err => {
			console.log(err)
		})
	})

	$: {
		console.log('Update', {
			session: $session,
			social: $social,
			chat: $chat,
			game: $game
		})
	}
</script>

<h1>Hello World!</h1>
