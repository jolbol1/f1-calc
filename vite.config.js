import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['chart.js', 'chartjs-adapter-moment', 'moment']
	}
};

export default config;
