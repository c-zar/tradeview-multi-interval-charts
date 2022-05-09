<script context="module">
	import { get } from 'svelte/store';
	import { config } from '../stores';
</script>

<script lang="ts">
	import TradingViewWidget from './../components/tradingview-widget.svelte';
	// import TradingViewWidget from 'svelte-tradingview-widget';
	let times = ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '4h', '1D', '1W', '1M'];
	let time_values = ['1', '3', '5', '15', '30', '45', '60', '120', '240', 'D', 'W', 'M'];
	$: active = $config?.active || ['1', '3', '5', '15', '30', '45', '60', '120', '240', 'D', 'W', 'M'];
	// let active = [];
	$: exchange = $config?.exchange || 'Binance';
	$: symbol = $config?.symbol || 'BTCUSDT';
	$: cols = $config?.cols || 2;
	$: rows = $config?.rows || 2;
	let fullSymbol = `${exchange}:${symbol}`.toUpperCase();
	let open = false;
</script>

<button on:click={() => (open = !open)} class="z-[10] fixed top-1 left-1" type="button"
	><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></button
>

{#if open}
	<div class="child:my-4 prose mx-auto py-8">
		<h1>View charts in multiple time intervals</h1>
		<div class="mx-auto w-fit">
			{#each time_values as time, index}
				<label>
					<input class="form-checkbox" type="checkbox" bind:group={$config.active} value={time} />
					{times[index]}
				</label>
			{/each}
		</div>

		<div class="mx-auto w-fit">
			<input class="p-1" bind:value={$config.exchange} placeholder="Exchange" />
			<input class="p-1" bind:value={$config.symbol} placeholder="Symbol" />
			<button
				on:click={() => {
					fullSymbol = `${exchange}:${symbol}`.toUpperCase();
				}}
			>
				<div>
					<div>Update Symbol</div>
				</div>
			</button>
		</div>
		<div class="mx-auto w-fit">
			<label>
				<input type="number" bind:value={$config.cols} min="1" max="5" />
				# of Columns
			</label>

			<label>
				<input type="number" bind:value={$config.rows} min="1" max="5" />
				# of Rows
			</label>
		</div>
	</div>
{/if}

<div class="grid grid-cols-{cols} grid-rows-{rows}">
	{#key fullSymbol}
		{#each active as time (time)}
			<div id={`tradingview_${time}`} class=" flex justify-center items-center g-item" style="--rows: {rows}">
				<svelte:component
					this={TradingViewWidget}
					class="h-full w-full"
					options={{
						autosize: true,
						container_id: `tradingview_${time}`,
						enable_publishing: false,
						interval: time,
						locale: 'en',
						save_image: false,
						style: '1',
						symbol: `${exchange}:${symbol}`.toUpperCase(),
						theme: 'dark',
						timezone: 'Etc/UTC',
						// hide_legend: true,
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
						allow_symbol_change: true,
						hide_top_toolbar: true,
						details: true
					}}
				/>
			</div>
		{/each}
	{/key}
</div>

<style>
	.g-item {
		height: calc(100vh / var(--rows));
	}
</style>
