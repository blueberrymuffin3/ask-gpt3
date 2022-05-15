<script lang="ts">
	import { slide } from 'svelte/transition';

	import '$lib/global.scss';

	import type { ResponseData } from '$lib/response.svelte';
	import { query } from '$lib/openai';
	import Response from '$lib/response.svelte';

	let nextId = 1;
	let inputText: HTMLTextAreaElement;
	let responses: ResponseData[] = [
		{
			id: 0,
			timestamp: 1652411478473,
			prompt: 'Write a story about a highschool programmer girl',
			result:
				'\n\nIt was the usual scene in the computer lab: a group of teenage boys clustered around the desk of the lone girl, trying to get her to help them with their projects. But this girl was no ordinary high school student. She was a programmer, and she knew how to use the computers.\n\nSo'
		}
	];

	function submit() {
		const prompt = inputText.value;
		const response: ResponseData = {
			id: nextId++,
			timestamp: Date.now(),
			prompt
		};
		responses = [response, ...responses];
		query(inputText.value)
			.then((result) => {
				response.result = result;
				responses = responses;
			})
			.catch((error) => {
				response.error = error;
				responses = responses;
			});
	}
</script>

<head>
	<title></title>
</head>

<main>
	<div class="card">
		<textarea bind:this={inputText}>Write a story about a highschool programmer girl</textarea>
		<button on:click={submit}>Submit</button>
	</div>
	<h1>Responses</h1>
	{#each responses as response (response.id)}
		<div transition:slide>
			<Response {response} />
		</div>
	{/each}
</main>

<style lang="scss">
	main {
		max-width: 50rem;
		margin: 0 auto;
		padding: 2rem;
	}
</style>
