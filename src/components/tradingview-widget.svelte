<script>
	import { onMount, onDestroy } from 'svelte';
	/**
	 * @type {TradingView.widget}
	 */
	let widg = {};
	export let options = Object;
	const SCRIPT_ID = 'tradingview-widget-script';
	let CONTAINER_ID = '';

	onMount(() => {
		CONTAINER_ID = options && options.container_id ? options.container_id : 'svelte-tradingview-widget;';
		initWidget();
	});

	onDestroy(() => {
		delete widg.widget;
	});

	function initWidget() {
		if (typeof TradingView !== 'undefined') {
			const element = document.getElementById(CONTAINER_ID);
			widg.widget = new window.TradingView.widget(Object.assign({ container_id: CONTAINER_ID }, options));
			// widg.widget.ready(function () {
			// 	console.log(JSON.stringify(widg.widget.getSymbolInfo(), null, 4));
			// });
		}
	}

	// function appendScript(onload) {
	// 	if (document.getElementById(SCRIPT_ID) === null) {
	// 		const script = document.createElement('script');
	// 		script.id = SCRIPT_ID;
	// 		script.type = 'text/javascript';
	// 		script.async = true;
	// 		script.src = 'https://s3.tradingview.com/tv.js';
	// 		script.onload = onload;
	// 		document.getElementsByTagName('head')[0].appendChild(script);
	// 	} else {
	// 		const script = document.getElementById(SCRIPT_ID);
	// 		const oldOnload = script.onload;
	// 		return (script.onload = () => {
	// 			oldOnload();
	// 			onload();
	// 		});
	// 	}
	// }

	$: autosize = options.autosize;
</script>

<!-- {@debug widg} -->
