<script lang="ts">
	import type { Outcome } from '$lib/types'

	import { BedDouble, Skull, Stethoscope, Phone } from 'lucide-svelte'
	import { page } from '$app/stores'

	export let outcome_id: string | null = 'rest_and_come_back_later'

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
	<div class="p-6">
		<h1 class="font-medium text-xl border-b mb-6 pb-1">Your results</h1>
		<div class="flex gap-4">
			<figure class="mb-4 {styles[outcome.id]?.class}">
				<svelte:component this={styles[outcome.id]?.icon} size="36" />
			</figure>

			<p class="mb-10">
				{outcome.text}
			</p>
		</div>

		{#if !outcome.show_booking_button}
			<p>
				<button class="btn gap-2 w-full">
					<span>Book an appointment</span>
					<Phone size="16" />
				</button>
			</p>
		{/if}
		<p class="text-center mt-6">
			<a href="/" class="text-sky-600 hover:underline font-medium">Take the test again</a>
		</p>
	</div>
</div>

<style>
	.result-ok {
	}

	.result-ok {
	}

	.result-ok {
	}
</style>
