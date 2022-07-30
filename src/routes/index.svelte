<script lang="ts">
	import LapChart from '../components/lapChart.svelte';
	import { TrackList } from '../app/TrackUtils';
	import Header from '../components/header.svelte';
	import Results from '../components/results.svelte';
	import TimeForm from '../components/timeForm.svelte';
	import TrackInfo from '../components/trackInfo.svelte';
	import TrackSelect from '../components/trackSelect.svelte';
	let hidden: boolean = true;
	let selected: string = 'Bahrain';
	$: track = TrackList[selected];
	let closestLapTime: string = '';
	let aiLevel: string = '';
</script>

<div class="mx-3 flex flex-col items-center gap-12 sm:mx-12">
	<Header />
	<TrackSelect tracks={TrackList} bind:selected bind:hidden />
	<TrackInfo trackName={track.trackName} flag={track.flagmoji} friendlyName={track.friendlyName} />
	<Results {aiLevel} {closestLapTime} bind:hidden />
	<TimeForm {track} bind:closestLapTime bind:aiLevel bind:hidden />
	<LapChart {track} />
</div>
