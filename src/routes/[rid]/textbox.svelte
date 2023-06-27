<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'

	// Constants
	const cursor = '_'
	const blink_interval = 500

	// Variables to store state
	let text = ''
	let cursor_visible = false
	$: appendage = cursor_visible ? cursor : ''
	$: display = text + appendage

	// Element refs
	let input_field: HTMLElement

	// Event Dispatcher
	const dispatch = createEventDispatcher<{ submit: { text: string } }>()

	onMount(() => {
		const timer = setInterval(toggle_cursor, blink_interval)
		return () => clearInterval(timer)
	})

	function toggle_cursor() {
		cursor_visible = !cursor_visible
	}

	function handle_submit() {
		dispatch('submit', { text })
	}

	function focus() {
		input_field.focus()
	}
</script>

<form class="w-full flex-grow relative" on:submit={handle_submit}>
	<p class="absolute w-full text-green-600">{display}</p>
	<input
		autofocus
		type="text"
		class="absolute opacity-0 w-full"
		bind:value={text}
		bind:this={input_field}
	/>
</form>
