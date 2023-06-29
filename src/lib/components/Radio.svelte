<script lang="ts">
	import { Circle } from 'lucide-svelte'
	import { CheckCircle2 } from 'lucide-svelte'

	export let label: string
	export let name: string
	export let value: string
	export let group: string | null
</script>

<label class="inline-flex gap-2 items-center bg-sky-50 p-4 text-lg rounded border border-sky-100">
	<figure class="unchecked"><Circle /></figure>
	<figure class="checked"><CheckCircle2 /></figure>
	<input type="radio" class="sr-only" bind:group {name} {value} />
	<span>{label}</span>
</label>

<style lang="postcss">
	label {
		@apply cursor-pointer transition-colors duration-150 font-medium text-sky-950;

		& .checked {
			@apply hidden;
		}
	}

	label:has(:checked) {
		@apply bg-sky-950 text-sky-50;

		& .unchecked {
			@apply hidden;
		}

		& .checked {
			@apply block;
		}
	}
</style>
