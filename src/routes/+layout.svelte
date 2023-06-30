<script>
	import { fade } from 'svelte/transition'
	import '@fontsource/ibm-plex-sans/400.css'
	import '@fontsource/ibm-plex-sans/500.css'
	import '@fontsource/ibm-plex-sans/700.css'

	import '../app.css'

	export let data
</script>

{#key data.url}
	<div
		class=" d-min-h-screen flex w-full flex-col"
		in:fade={{ duration: 200, delay: 400 }}
		out:fade={{ duration: 200 }}
	>
		<slot />
	</div>
{/key}
