<script lang="ts">
	import Progress from '$lib/components/Progress.svelte'
	import TestQuestion from '$lib/components/Question.svelte'
	import Results from '$lib/components/Results.svelte'
	import { HeartHandshake } from 'lucide-svelte'

	import { page } from '$app/stores'
	import type { Question, Next, NextLast, Answer } from '$lib/types'

	let test_is_complete = false
	let outcome_id: string | null = null
	let current_step = 1
	$: num_steps = questions.length

	let question_id = 'is_heartburn_known'

	$: questions = $page.data.questions

	$: question = questions.find((item: Question) => item.id === question_id)

	let answer: string | null = null

	let scores: number[] = []
	$: total_score = scores.reduce((acc, current) => acc + current, 0)

	function next_step() {
		if (!answer) {
			return
		}

		// Update score
		const score = question.answers.find((item: Answer) => item.id === answer).score
		scores = [...scores, score]

		// Figure out next step
		const next_question = question.next

		const is_last_question = next_question.some((item: NextLast) => !!item.outcome)

		if (is_last_question) {
			test_is_complete = true

			outcome_id = next_question.find((item: NextLast, idx: number, arr: NextLast[]) => {
				return (item.max_score && total_score <= item.max_score) || arr.length - 1 === idx
			}).outcome

			return
		}

		const next_id =
			question.next.length > 1
				? next_question.find((item: Next) => item.answered === answer).next_question
				: next_question[0].next_question

		question_id = next_id
		answer = null
	}
</script>

<header class=" mb-6 bg-sky-50 -mx-8 px-8 py-2">
	<div class="items-center flex justify-center">
		<figure class="text-sky-600 me-2">
			<HeartHandshake size="18" />
		</figure>

		<h1 class="font-medium text-center">HeartEase</h1>
	</div>

	<Progress {current_step} {num_steps} />
</header>

<main class="flex-grow flex flex-col">
	{#if test_is_complete}
		<Results {outcome_id} />
	{:else}
		<TestQuestion {question} bind:answer on:next={next_step} />
	{/if}
</main>

<footer />
