<script lang="ts">
	import { fade } from 'svelte/transition'

	// Components
	import Textbox from './textbox.svelte'

	// Stores
	import session from '$lib/stores/session'
	import social from '$lib/stores/social'
	import chat from '$lib/stores/chat'
	import server from '$lib/stores/server'

	let name = 'You'
	$: {
		if (name == 'You' && $session && $social.players.length > 0) {
			const this_player = $social.players.find(p => p.pid == $session!.pid)
			if (!this_player) throw new Error('Could not find this player in the social list')
			name = this_player.name
		}
	}

	function send_msg(e: CustomEvent<{ text: string }>) {
		server.msg(e.detail.text, err => {
			console.log(err)
		})
	}
</script>

<!-- outer container -->
<div class="w-1/3 lg:w-1/4 border-4 border-green-800 p-2 flex flex-col">
	<!-- messages area -->
	<div class="flex-grow text-green-800">
		<ul>
			{#each $chat.msgs as c}
				<li transition:fade>
					<em>{c.sender}: </em>
					{c.content}
				</li>
			{/each}
		</ul>

		<!-- input line -->
		<div class="flex flex-row gap-2">
			<span class="text-green-600">{name}: </span>
			<Textbox on:submit={send_msg} />
		</div>
	</div>

	<!-- player's list -->
	<div class="h-8 text-red-800">
		Player's online:
		{#each $social.players as p}
			{p.name + '; '}
		{/each}
	</div>
</div>
