<script lang="ts">
	import { onMount } from 'svelte'

	// Components
	import Textbox from './textbox.svelte'

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

	// Variables to store state

	onMount(() => {
		// server.connect()
		// let name = prompt('Enter nickname')
		// if (name == null) name = rand_name()
		// server.join(name, data.rid, err => {
		// console.log(err)
		// })
	})

	$: {
		console.log('Update', {
			session: $session,
			social: $social,
			chat: $chat,
			game: $game
		})
	}

	function send_msg(e: CustomEvent<{ text: string }>) {
		console.log(e.detail.text)
	}
</script>

<!-- outer container -->
<div class="flex flex-row items-stretch w-full h-full p-4">
	<!-- main -->
	<div class="w-2/3 lg:w-3/4">Main</div>

	<!-- side -->
	<div class="w-1/3 lg:w-1/4 border-4 border-green-600 p-2 flex flex-col">
		<!-- messages area -->
		<div class="flex-grow">
			<ul>
				<li><em>author: </em>content</li>
				<li><em>author: </em>content</li>
				<li><em>author: </em>content</li>
			</ul>

			<!-- input line -->
			<div class="flex flex-row gap-2">
				<span class="text-green-600">You: </span>
				<Textbox on:submit={send_msg} />
			</div>
		</div>

		<!-- player's list -->
		<div class="h-8">Player's online: None</div>
	</div>
</div>
