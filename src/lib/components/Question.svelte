<script lang="ts">
	import Radio from '$lib/components/Radio.svelte'
	import { ChevronRight } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import type { Question } from '$lib/types'
	export let question: Question
	export let answer: string | null = null

	function on_submit(e: SubmitEvent) {
		console.log('on_submit')

		e.preventDefault()
		dispatch('next')
	}
</script>

<h2 class="text-2xl mb-8">{question.question_text}</h2>

<form class="flex flex-col flex-grow pb-8" method="post" on:submit={on_submit}>
	<fieldset class="grid grid-cols-2 gap-4">
		{#each question.answers as item}
			<Radio label={item.label} bind:group={answer} value={item.id} name="question" />
		{/each}
	</fieldset>

	<button type="submit" class="mt-auto btn btn--lg gap-2">
		<span>Next</span>
		<ChevronRight />
	</button>
</form>
