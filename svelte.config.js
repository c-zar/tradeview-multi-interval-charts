import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import svelte from 'rollup-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/tradeview-multi-interval-charts' : ''
		}
	}
};

export default config;
