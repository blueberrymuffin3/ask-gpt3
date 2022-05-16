<script lang="ts">
	import { slide } from 'svelte/transition';

	import '$lib/global.scss';

	import type { ResponseData } from '$lib/response.svelte';
	import { query } from '$lib/openai';
	import Response from '$lib/response.svelte';
	import { browser } from '$app/env';

	let inputText: HTMLTextAreaElement;
	let responses: ResponseData[] = browser ? loadFromLocalStorage() : [];
	let nextId = responses.map((response) => response.id).reduce((a, b) => Math.max(a, b), 0) + 1;

	$: browser && saveToLocalStorage(responses);

	function submit() {
		const prompt = inputText.value;
		const response: ResponseData = {
			id: nextId++,
			timestamp: Date.now(),
			prompt,
			truncated: false
		};
		responses = [response, ...responses];
		query(inputText.value)
			.then((result) => {
				response.result = result.text;
				response.truncated = result.truncated;
				responses = responses;
			})
			.catch((error) => {
				response.error = error.toString();
				console.error(error);
				responses = responses;
			});
	}

	function remove(response: ResponseData) {
		responses = responses.filter((r) => r !== response);
	}

	function saveToLocalStorage(responses: ResponseData[]) {
		localStorage['responses'] = JSON.stringify(responses);
	}

	function loadFromLocalStorage(): ResponseData[] {
		let data = null;
		try {
			data = JSON.parse(localStorage['responses']);
		} catch (error) {
			return [];
		}
		if (!Array.isArray(data)) {
			return [];
		}
		let responses = new Array<ResponseData>();
		for (let response of data) {
			if (typeof response.id != 'number') continue;
			if (typeof response.timestamp != 'number') continue;
			if (typeof response.result != 'string' && typeof response.error != 'string') continue;
			if (typeof response.truncated != 'boolean') continue;
			responses.push(response);
		}
		return responses;
	}
</script>

<svelte:head>
	<title>Ask GPT-3</title>
</svelte:head>

<main>
	<section class="prompt">
		<div class="row wrap-mobile">
			<img src="/img/ask-gpt-3.svg" alt="Ask GPT-3" width="200" height="100" />
			<div>
				<ul>
					<li>
						Ask a qustion, enter the start of a sentence, type a command, or enter anything else.
					</li>
					<li>Submit the same prompt multiple times to get different answers.</li>
					<li>Leave the prompt empty to get something completely random.</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<textarea bind:this={inputText} rows="3" placeholder="Ask me anything…" />
			<button on:click={submit}>Submit</button>
		</div>
	</section>
	<section>
		{#if responses.length > 0}
			<h1 transition:slide>Responses</h1>
			{#each responses as response (response.id)}
				<Response
					{response}
					remove={() => {
						remove(response);
					}}
				/>
			{/each}
		{/if}
	</section>
</main>

<style lang="scss">
	main {
		max-width: 50rem;
		margin: 0 auto;
		padding: 2rem;
	}
	.prompt {
		display: flex;
		flex-direction: column;
		gap: 32px;

		.row {
			display: flex;
			gap: 32px;
			align-items: center;

			textarea {
				flex-grow: 1;
				resize: none;
			}

			button {
				padding: 16px;
			}
		}
		.row.wrap-mobile {
			@media only screen and (max-width: 700px) {
				flex-direction: column;
			}
		}
		margin: 128px 0;
	}
</style>
