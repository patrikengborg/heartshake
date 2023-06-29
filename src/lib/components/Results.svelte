<script lang="ts">
	import type { Outcome } from '$lib/types'

	import { BedDouble, Skull, Stethoscope, Phone } from 'lucide-svelte'
	import { page } from '$app/stores'

	export let outcome_id: string | null = 'rest_and_come_back_later'

	let rick_rolled = false

	$: outcome = $page.data.outcomes.find((outcome: Outcome) => outcome.id === outcome_id) || {}

	interface Icon {
		[key: string]: {
			icon: typeof BedDouble | typeof Stethoscope | typeof Skull
			class: string
		}
	}

	$: styles = {
		rest_and_come_back_later: { icon: BedDouble, class: 'text-emerald-500' },
		see_a_doctor: { icon: Stethoscope, class: 'text-orange-500' },
		go_to_emergency_room: { icon: Skull, class: 'text-red-500' }
	} as Icon
</script>

<div class="my-auto">
	{#if rick_rolled}
		<iframe
			title="Rick Astley - Never Gonna Give You Up (Video)"
			src="https://giphy.com/embed/Ju7l5y9osyymQ"
			width="300"
			height="225"
			frameBorder="0"
			allowFullScreen
		/>
	{:else}
		<div>
			<h1 class="mb-6 border-b pb-1 text-xl font-medium">Your results</h1>
			<div class="flex gap-4">
				<figure class="mb-4 {styles[outcome.id]?.class}">
					<svelte:component this={styles[outcome.id]?.icon} size="36" />
				</figure>

				<p class="mb-10">
					{outcome.text}
				</p>
			</div>

			{#if outcome.show_booking_button}
				<p>
					<button class="btn w-full gap-2" type="button" on:click={() => (rick_rolled = true)}>
						<span>Book an appointment</span>
						<Phone size="16" />
					</button>
				</p>
			{/if}
		</div>
	{/if}

	<p class="mt-6 text-center">
		<a href="/" class="btn btn-border">Take the test again</a>
	</p>
</div>
