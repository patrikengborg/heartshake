<script lang="ts">
	export let current_step: number
	export let num_steps: number

	$: progress_prc = current_step / num_steps
</script>

<div class="-mx-8 flex h-2 overflow-hidden bg-sky-100">
	<div
		class="h-full w-full origin-left bg-sky-500 transition-transform delay-200"
		style="transform: scaleX({progress_prc});"
	/>
</div>
