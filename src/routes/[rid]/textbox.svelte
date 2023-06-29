<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { tweened } from 'svelte/motion'

	// Constants
	const cursors = ['_', '']
	const blink_interval = 500

	// Variables to store state
	let text = ''
	let cursor = 0
	let cursor_size = 0
	let cursor_max_pos = 0
	let cursor_pos = tweened(0, {
		duration: 100
	})

	// Element refs
	let input_field: HTMLInputElement

	// Event Dispatcher
	const dispatch = createEventDispatcher<{ submit: { text: string } }>()

	onMount(() => {
		const style = getComputedStyle(input_field)
		const family = style.getPropertyValue('font-family')
		const size = style.getPropertyValue('font-size')
		const weight = style.getPropertyValue('font-weight')
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')!
		ctx.font = `${weight} ${size} ${family}`
		cursor_size = ctx.measureText('a').width
		cursor_max_pos = parseInt(style.width)
		input_field.addEventListener('input', update_cursor)
		input_field.addEventListener('keydown', update_cursor)
	})

	onMount(() => {
		const timer = setInterval(change_cursor, blink_interval)
		return () => clearInterval(timer)
	})

	function change_cursor() {
		cursor = (cursor + 1) % cursors.length
	}

	function update_cursor() {
		const pos = input_field.selectionStart! * cursor_size
		if (pos < cursor_max_pos) cursor_pos.set(pos)
	}

	function handle_submit() {
		dispatch('submit', { text })
		text = ''
		cursor_pos.set(0)
	}

	function focus() {
		input_field.focus()
	}
</script>

<form class="w-full flex-grow relative" on:submit={handle_submit}>
	<input
		autofocus
		type="text"
		class="bg-transparent border-none outline-none w-full caret-transparent"
		bind:value={text}
		bind:this={input_field}
	/>
	<span class="absolute bottom-0" style:left={`${$cursor_pos}px`}>
		{cursors[cursor]}
	</span>
</form>
