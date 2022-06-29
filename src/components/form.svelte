<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let config;

	let times = ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '4h', '8h', '1D', '1W', '1M'];
	let time_values = ['1', '3', '5', '15', '30', '45', '60', '120', '240', '480', 'D', 'W', 'M'];
	let time_array = '';
	let defaultActive = ['1', '3', '5', '15', '30', '45', '60', '120', '240', '480'];
	let active = config?.active || time_values;
	let exchange = config?.exchange || 'Binance';
	let symbol = config?.symbol || 'BTCUSDT';
	let cols = config?.cols || 2;
	let rows = config?.rows || 2;
	let fullSymbol = `${exchange}:${symbol}`.toUpperCase();

	let last = btoa(encodeURIComponent(JSON.stringify(config)));

	$: config.active = active.length > 0 ? active : defaultActive;
	$: config.exchange = exchange;
	$: config.symbol = symbol;
	$: config.cols = cols;
	$: config.rows = rows;
	$: config.fullSymbol = fullSymbol;

	afterUpdate(() => {
		let z = btoa(encodeURIComponent(JSON.stringify(config)));
		console.log('shit updated');
		if (z != last) {
			last = z;
			goto(z, { keepfocus: true, replaceState: true, noscroll: true });
		}
	});
</script>

<!-- <button on:click|preventDefault={() => (open = !open)} class="fixed top-1 left-1 z-[10]" type="button"
	><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></button
> -->

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
