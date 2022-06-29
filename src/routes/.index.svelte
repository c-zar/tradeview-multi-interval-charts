<script lang="ts">
	import { get } from 'svelte/store';
	import { config } from '../stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import TradingViewWidget from './../components/tradingview-widget.svelte';
	import { onMount } from 'svelte';

	let times = ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '4h', '8h', '1D', '1W', '1M'];
	let time_values = ['1', '3', '5', '15', '30', '45', '60', '120', '240', '480', 'D', 'W', 'M'];
	let time_array = '';
	let defaultActive = ['1', '3', '5', '15', '30', '45', '60', '120', '240', '480'];
	let active = time_values;
	let exchange = 'Binance';
	let symbol = 'BTCUSDT';
	let cols = 2;
	let rows = 2;
	// let active = $config?.active || time_values;
	// let exchange = $config?.exchange || 'Binance';
	// let symbol = $config?.symbol || 'BTCUSDT';
	// let cols = $config?.cols || 2;
	// let rows = $config?.rows || 2;

	let fullSymbol = `${exchange}:${symbol}`.toUpperCase();
	let open = false;

	// $: $config.active = active.length > 0 ? active : defaultActive;
	// $: $config.exchange = exchange;
	// $: $config.symbol = symbol;
	// $: $config.cols = cols;
	// $: $config.rows = rows;

	let jsonO = {
		active: active.length > 0 ? active : defaultActive,
		symbol: symbol,
		exchange: exchange,
		rows: rows,
		cols: cols
	};

	onMount(async () => {
		let params = Object.fromEntries(new URLSearchParams(window.location.search));
		console.log(params);
		let test = encodeURIComponent(JSON.stringify(atob(jsonO)));
		console.log(test);
		console.log(JSON.parse(decodeURIComponent(test)));
	});
</script>

<button on:click|preventDefault={() => (open = !open)} class="fixed top-1 left-1 z-[10]" type="button"
	><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></button
>

{#if open}
	<div class="prose mx-auto py-8 child:my-4">
		<h1>View charts in multiple time intervals</h1>
		<div class="mx-auto w-fit">
			{#each time_values as time, index}
				<label>
					<input class="form-checkbox" type="checkbox" bind:group={active} value={time} />
					{times[index]}
				</label>
			{/each}
			<!-- <textarea on:submit={() => {time_array = JSON.parse(this.value)}} name="" id="" cols="30" rows="10" /> -->
		</div>

		<div class="mx-auto w-fit">
			<input class="p-1" bind:value={exchange} placeholder="Exchange" />
			<input class="p-1" bind:value={symbol} placeholder="Symbol" />
			<button
				on:click={() => {
					fullSymbol = `${exchange}:${symbol}`.toUpperCase();
					console.log(JSON.stringify($config, null, 4));
					console.log(fullSymbol);
				}}
			>
				<div>
					<div>Update Symbol</div>
				</div>
			</button>
		</div>
		<div class="mx-auto w-fit">
			<label>
				<input type="number" bind:value={cols} min="1" max="10" />
				# of Columns
			</label>

			<label>
				<input type="number" bind:value={rows} min="1" max="10" />
				# of Rows
			</label>
		</div>
	</div>
{/if}

<div class="grid grid-cols-{cols} grid-rows-{rows}">
	{#key fullSymbol}
		{#each active as time (time)}
			<div class=" g-item group relative flex items-center justify-center" style="--rows: {rows}">
				<div class="absolute top-1 right-1 z-[10] hidden bg-black p-2 text-white group-hover:block group-hover:transition-all">{fullSymbol} | {time}</div>
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
							symbol: fullSymbol,
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
