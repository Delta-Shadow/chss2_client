<script lang="ts">
	// Components
	import Textbox from './textbox.svelte'

	function send_msg(e: CustomEvent<{ text: string }>) {
		console.log(e.detail.text)
	}
</script>

<!-- outer container -->
<div class="w-1/3 lg:w-1/4 border-4 border-green-800 p-2 flex flex-col">
	<!-- messages area -->
	<div class="flex-grow text-green-800">
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
	<div class="h-8 text-red-800">Player's online: None</div>
</div>
