<script lang="ts">
	import { onMount } from 'svelte'

	// Components
	import Main from './main.svelte'
	import Side from './side.svelte'

	// Stores
	import server from '$lib/stores/server.js'
	import game from '$lib/stores/game.js'

	// Misc Lib
	import rand_name from '$lib/rand_name'

	// Props
	export let data // For receiving data from page.ts

	// Variables to store state

	onMount(() => {
		server.connect()
		let name = prompt('Enter nickname')
		if (name == null) name = rand_name()
		server.join(name, data.rid, err => {
			console.log(err)
		})
	})

	$: {
		console.log('Update', {
			game: $game
		})
	}
</script>

<!-- outer container -->
<div class="flex flex-row items-stretch w-full h-full p-4">
	<Main />
	<Side />
</div>
