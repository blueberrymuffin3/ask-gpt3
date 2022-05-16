<script lang="ts" context="module">
	export interface ResponseData {
		id: number;
		timestamp: number;
		prompt: string;
		result?: string;
		truncated: boolean;
		error?: string;
	}
</script>

<script lang="ts">
	import { slide, scale, fade } from 'svelte/transition';
	import Icon from 'mdi-svelte';
	import { mdiDeleteOutline } from '@mdi/js';

	import Spinner from './spinner.svelte';

	export let response: ResponseData;
	export let remove: EventListener;
</script>

<div class="container" transition:slide>
	<article>
		<div class="header">
			<h1 class="prompt">{response.prompt}</h1>
			<h2 class="timestamp">{new Date(response.timestamp).toLocaleString()}</h2>
			<button on:click={remove} aria-label="Delete item">
				<Icon path={mdiDeleteOutline} color="white" />
			</button>
		</div>
		<div class="content">
			{#if response.error}
				<p class="error" transition:fade>{response.error}</p>
			{:else if response.result}
				<p transition:fade>{response.result}{response.truncated ? "…" : ""}</p>
			{:else}
				<div class="spinner" transition:scale>
					<Spinner />
				</div>
			{/if}
		</div>
	</article>
</div>

<style lang="scss">
	.container {
		padding: 16px 0;
	}
	article {
		display: flex;
		flex-direction: column;
		background-color: #e2e2e2;
		padding: 24px;
		border-radius: 1rem;
		box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1), 0 8px 16px 0 rgba(0, 0, 0, 0.05);
	}
	button {
		flex-shrink: 0;
		display: block;
		width: 32px;
		height: 32px;
		margin: 0;
		padding: 0;

		border: none;
		border-radius: 8px;

		background-color: #c26b6b;
	}
	button:hover,
	button:focus {
		background-color: #be8080;
	}
	button:active {
		background-color: #9c3333;
	}
	.header {
		display: flex;
		align-items: center;
		gap: 16px;

		.prompt {
			flex-grow: 1;
			font-size: 24px;
			font-weight: normal;
			margin: 0;
		}
		.timestamp {
			flex-shrink: 0;
			font-size: 16px;
			font-weight: bold;
			float: right;
			color: #555;
			margin: 0;
		}
	}
	.content {
		min-height: 100px;
		flex-grow: 1;
		display: grid;
	}
	.content > * {
		grid-row: 1;
		grid-column: 1;
	}
	.spinner {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	p {
		font-size: 16px;
		margin: 0;
		margin-top: 16px;
	}
	p.error {
		color: #d10909;
	}
</style>
