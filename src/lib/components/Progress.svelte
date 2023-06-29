<script lang="ts">
	export let current_step: number;
	export let num_steps: number;

	$: progress_prc = (current_step / num_steps) * 100;
</script>

<div class="bg-white border border-sky-100 h-2 my-2 flex rounded overflow-hidden">
	<div class="bg-sky-500" style="width: {progress_prc}%;" />
</div>
