<script lang="ts">
	import { HeartHandshake } from 'lucide-svelte'
</script>

<main class="my-auto flex w-full flex-col items-center text-center">
	<figure class="heart mb-4 text-sky-600">
		<HeartHandshake size="36" />
	</figure>

	<h1 class="mb-2 text-center text-2xl font-medium">Welcome to HeartShake</h1>

	<p class="mb-6 text-zinc-600">
		Your digital solution to understanding and managing heartburn. Start your journey towards a
		heartburn-free life today.
	</p>

	<a href="/test" class="btn">Take the test</a>
</main>

<style>
	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.25);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0.8;
		}
	}

	.heart {
		animation: pulse 2s ease infinite;
	}
</style>
