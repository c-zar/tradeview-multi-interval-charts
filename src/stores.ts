import { writable } from 'svelte-local-storage-store';

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const config = writable('preferences', {
	active: ['1', '3', '5', '15', '30', '45', '60', '120', '240', 'D', 'W', 'M'],
	exchange: 'Binance',
	symbol: 'BTCUSDT',
	cols: 2,
	rows: 2
});
