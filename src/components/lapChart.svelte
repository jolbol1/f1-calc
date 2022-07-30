<script lang="ts">
	import { Chart } from 'chart.js';
	import { onMount } from 'svelte';
	import { registerlapTimeChart } from '../app/ChartConfig';
	import type { Track } from '../app/TrackUtils';
	export let track: Track;
	let ctx: CanvasRenderingContext2D;
	let chartCanvas: HTMLCanvasElement;
	let chart: Chart;

	$: {
		if (chart) {
			chart.destroy();
			chart = registerlapTimeChart(ctx!, track.aiTimes);
		}
	}
	let legendColor: string = '';

	$: console.log(legendColor);
	const handleChange = (e: MediaQueryListEvent) => {
		legendColor = e.matches ? '#969EA2' : '#505050';
		chart.config.options!.backgroundColor = 'rgba(255, 0, 0, 100)';
		console.log(Chart.defaults.color);
		Chart.defaults.color = legendColor;
		Chart.defaults.borderColor = legendColor;
		chart.update();
	};

	onMount(async () => {
		ctx = chartCanvas.getContext('2d')!;
		chart = registerlapTimeChart(ctx!, track.aiTimes);
		const darkMode = matchMedia('(prefers-color-scheme: dark)');
		legendColor = darkMode.matches ? '#969EA2' : '#505050';
		Chart.defaults.color = legendColor;
		Chart.defaults.borderColor = legendColor;
		darkMode.addEventListener('change', handleChange);
		return () => darkMode.removeEventListener('change', handleChange);
	});
</script>

<div class="w-full md:w-3/4 xl:w-1/2">
	<canvas bind:this={chartCanvas} id="lapChart" />
</div>
