<script lang="ts">
	import type { Track } from 'src/app/TrackUtils';
	export let selected: string;
	export let tracks: { [key: string]: Track };
	export let hidden: boolean = true;
</script>

<div
	class="flex flex-col items-center flex-grow md:w-3/4 xl:w-1/2 text-gray-700 dark:text-gray-300"
>
	<label for="trackSelect" class="font-bold mb-3">Select Track</label>
	<div
		class="rounded-full nm-flat-slate-200 dark:nm-flat-slate-700 leading-5 flex-grow w-full relative"
	>
		<select
			id="trackSelect"
			on:change={() => (hidden = true)}
			bind:value={selected}
			class="appearance-none w-full px-8 py-4 bg-transparent font-semibold"
		>
			{#each Object.entries(tracks) as [track, trackInfo]}
				<option value={track}
					>{trackInfo.flagmoji + trackInfo.friendlyName + ' - ' + trackInfo.trackName}</option
				>
			{/each}
		</select>
		<div
			class="absolute right-0 top-0 h-full pr-2 md:pr-4 lg:pr-8 flex flex-col justify-center items-center pointer-events-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 0 24 24"
				width="24"
				class="fill-current"
			>
				<path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
				<path
					d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
				/>
			</svg>
		</div>
	</div>
</div>
