<script lang="ts">
	import type { Chart } from 'chart.js';
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
	onMount(async () => {
		ctx = chartCanvas.getContext('2d')!;
		chart = registerlapTimeChart(ctx!, track.aiTimes);
	});
</script>

<div class="w-full md:w-3/4 xl:w-1/2">
	<canvas bind:this={chartCanvas} id="lapChart" />
</div>
