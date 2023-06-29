<script lang="ts">
	import { fade } from 'svelte/transition'
	import { cubicOut, cubicIn } from 'svelte/easing'

	import Radio from '$lib/components/Radio.svelte'
	import { ChevronRight } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	import type { Question } from '$lib/types'
	export let question: Question
	export let answer: string | null = null

	function on_submit(e: SubmitEvent) {
		e.preventDefault()
		dispatch('next')
	}
</script>

<form class="flex flex-grow flex-col py-8" method="post" on:submit={on_submit}>
	{#key question.id}
		<div
			in:fade={{ duration: 200, delay: 300, easing: cubicOut }}
			out:fade={{ duration: 200, easing: cubicIn }}
		>
			<h2 class="mb-8 text-2xl">{question.question_text}</h2>

			<fieldset class="grid grid-cols-2 gap-4">
				{#each question.answers as item}
					<Radio label={item.label} bind:group={answer} value={item.id} name="question" />
				{/each}
			</fieldset>
		</div>
	{/key}

	<button
		out:fade={{ duration: 200, easing: cubicIn }}
		type="submit"
		disabled={!answer}
		class="btn btn--lg mt-auto gap-2 pl-4 transition-opacity"
	>
		<span class="pl-6">Next</span>
		<ChevronRight />
	</button>
</form>
