<script context="module">
	import Form from './../components/form.svelte';
	export const load = async ({ url, params, props, fetch, session, stuff, status, error }) => {
		let defaultprops = {
			active: ['1', '3', '5', '15', '30', '45', '60', '120', '240', '480'],
			symbol: 'BTCUSDT',
			exchange: 'Binance',
			rows: 2,
			cols: 2,
			fullSymbol: `Binance:BTCUSDT`.toUpperCase()
		};
		try {
			return {
				status: 200,
				props: {
					config: JSON.parse(decodeURIComponent(atob(params.slug)))
				}
			};
		} catch (error) {
			return {
				status: 302,
				redirect: `/${btoa(encodeURIComponent(JSON.stringify(defaultprops)))}`,
				props: {
					config: defaultprops
				}
			};
		}
	};
</script>

<script lang="ts">
	import { get } from 'svelte/store';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import TradingViewWidget from './../components/tradingview-widget.svelte';
	import SvelteForm from './../components/form.svelte';
	import { onMount, afterUpdate } from 'svelte';

	export let config;
	// let config = {};

	let i = 1;
	let open = false;
</script>

<button on:click|preventDefault={() => (open = !open)} class="fixed top-1 left-1 z-[10]" type="button"
	><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></button
>

<div class={open ? '' : 'hidden'}>
	<SvelteForm bind:config />
</div>

<div class="grid grid-cols-{config.cols} grid-rows-{config.rows}">
	{#key config.fullSymbol}
		{#each config.active as time (time)}
			<div class=" g-item group relative flex items-center justify-center" style="--rows: {config.rows}">
				<div class="absolute top-1 right-1 z-[10] hidden bg-black p-2 text-white group-hover:block group-hover:transition-all">{config.fullSymbol} | {time}</div>
				<div id={`tradingview_${time}`} on:scroll|preventDefault={() => {}} class="h-full w-full">
					<svelte:component
						this={TradingViewWidget}
						options={{
							autosize: true,
							container_id: `tradingview_${time}`,
							enable_publishing: false,
							interval: time,
							locale: 'en',
							save_image: false,
							style: '8',
							symbol: config.fullSymbol,
							theme: 'dark',
							timezone: 'Etc/UTC',
							hide_legend: true,
							studies: [
								'BB@tv-basicstudies'
								// "MACD@tv-basicstudies",
								// {
								// 	"id": "MASimple@tv-basicstudies",
								// 	"inputs": {
								// 		"length": 5
								// 	}
								// },
								// {
								// 	"id": "MASimple@tv-basicstudies",
								// 	"inputs": {
								// 		"length": 10
								// 	}
								// },
								// {
								// 	"id": "MASimple@tv-basicstudies",
								// 	"inputs": {
								// 		"length": 20
								// 	}
								// },
								// {
								// 	"id": "MASimple@tv-basicstudies",
								// 	"inputs": {
								// 		"length": 30
								// 	}
								// },
								// {`
								// 	"id": "MASimple@tv-basicstudies",
								// 	"inputs": {
								// 		"length": 90
								// 	}
								// },
							],
							allow_symbol_change: false,
							hide_top_toolbar: true,
							details: false
						}}
					/>
				</div>
			</div>
		{/each}
	{/key}
</div>

<style>
	.g-item {
		height: calc(100vh / var(--rows));
	}

	:global(.g-item iframe) {
		pointer-events: none;
		overflow: hidden;
	}
</style>
