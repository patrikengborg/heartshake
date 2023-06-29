<script lang="ts">
	import Progress from '$lib/components/Progress.svelte'
	import TestQuestion from '$lib/components/Question.svelte'
	import Results from '$lib/components/Results.svelte'
	import { ChevronLeft, HeartHandshake } from 'lucide-svelte'
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import type { Answer, Next, NextLast, Question } from '$lib/types'

	let test_is_complete = false

	// Gets set when the test is complete
	let outcome_id: string | null = null

	// All questions
	$: questions = $page.data.questions

	// Current question id
	let question_id: string | null = null

	// Default to first question id when questions are loaded
	$: {
		question_id = questions[0].id
	}

	$: current_step = completed_steps.length + 1
	$: num_steps = questions?.length

	// Get the current question by id
	$: question = questions.find((item: Question) => item.id === question_id)

	// Holds the current answer. Gets reset between questions
	let answer: string | null = null

	interface CompleteStep {
		id: string
		score: number
	}

	let completed_steps: CompleteStep[] = []

	// Calculate total score from completed steps
	$: total_score = completed_steps.reduce((acc, current) => acc + current.score, 0)

	function next_step() {
		if (!answer) {
			return
		}

		// Update score
		const score = question.answers.find((item: Answer) => item.id === answer).score
		completed_steps = [...completed_steps, { score, id: question.id }]

		// Figure out next step
		const next_question = question.next

		const is_last_question = next_question.some((item: NextLast) => !!item.outcome)

		// If it's the last question, mark test as complete and set the outcome
		if (is_last_question) {
			test_is_complete = true

			outcome_id = next_question.find((item: NextLast, idx: number, arr: NextLast[]) => {
				return (item.max_score && total_score <= item.max_score) || arr.length - 1 === idx
			}).outcome

			return
		}

		// Otherwise, get the next question
		const next_id =
			question.next.length > 1
				? next_question.find((item: Next) => item.answered === answer).next_question
				: next_question[0].next_question

		question_id = next_id
		answer = null
	}

	function go_back() {
		// Go back by getting the previous step and remove it from the completed steps
		const prev_step = completed_steps[completed_steps.length - 1]
		completed_steps = completed_steps.slice(0, -1)

		if (prev_step) {
			question_id = prev_step.id
		}
	}
</script>

<header class="-mx-8 mb-6 border-b border-sky-100 bg-sky-50 px-8 pt-3">
	<div class="relative mb-3 flex items-center justify-center">
		{#if completed_steps.length > 0 && !test_is_complete}
			<button
				transition:fade
				type="button"
				class="absolute -left-6 text-sky-500"
				on:click={go_back}
			>
				<ChevronLeft />
			</button>
		{:else if current_step === 1}
			<a transition:fade href="/" class="absolute -left-6 text-sky-500">
				<ChevronLeft />
			</a>
		{/if}

		<figure class="me-2 text-sky-600">
			<HeartHandshake size="18" />
		</figure>

		<h1 class="text-center text-lg font-medium">HeartShake</h1>
	</div>

	<Progress {current_step} {num_steps} />
</header>

{#key test_is_complete}
	<main class="flex flex-grow flex-col" in:fade={{ duration: 500, delay: 300 }}>
		{#if test_is_complete}
			<Results {outcome_id} />
		{:else}
			<TestQuestion {question} bind:answer on:next={next_step} />
		{/if}
	</main>
{/key}
