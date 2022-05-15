<script lang="ts" context="module">
	export interface ResponseData {
		id: number;
		timestamp: number;
		prompt: string;
		result?: string;
		error?: any;
	}
</script>

<script lang="ts">
	import Spinner from './spinner.svelte';

	export let response: ResponseData;
</script>

<div class="card">
	<div class="timestamp">{new Date(response.timestamp).toLocaleString()}</div>
	<div class="prompt">{response.prompt}</div>
	{#if response.error}
		<div>{response.error}</div>
	{:else if response.result}
		<div>{response.result}</div>
	{:else}
		<Spinner />
	{/if}
</div>

<style lang="scss">
	.timestamp {
		float: right;
		font-weight: bold;
		opacity: 0.6;
	}
	.prompt {
		font-size: 1.5rem;
		margin: 0;
	}
	.card {
		background-color: #e4e4e4;
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1), 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.05);
	}
</style>
