<script lang="ts">
	import { HeartHandshake } from 'lucide-svelte'
</script>

<main class="my-auto w-full flex flex-col items-center text-center">
	<figure class="text-sky-600 mb-4 heart">
		<HeartHandshake size="36" />
	</figure>

	<h1 class="font-medium text-2xl text-center mb-2">Welcome to HeartEase</h1>

	<p class="text-zinc-600 mb-6">
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
			transform: scale(1.2);
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
