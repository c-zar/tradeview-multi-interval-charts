<script context="module">
	export const load = async ({ url, params, props, fetch, session, stuff, status, error }) => {
		let defaultprops = {
			active: ['1', '3', '5', '15', '30', '45', '60', '120', '240', '480'],
			symbol: 'BTCUSDT',
			exchange: 'Binance',
			rows: 2,
			cols: 2
		};

		return {
			status: 302,
			redirect: `btoa(/${encodeURIComponent(JSON.stringify(defaultprops))})`,
			props: {
				config: defaultprops
			}
		};
	};
</script>
