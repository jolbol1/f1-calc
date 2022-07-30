<script lang="ts">
	import type { Track } from 'src/app/TrackUtils';
	export let selected: string;
	export let tracks: { [key: string]: Track };
	export let hidden: boolean = true;
</script>

<div
	class="flex flex-grow flex-col items-center text-gray-700 dark:text-gray-300 md:w-3/4 xl:w-1/2"
>
	<label for="trackSelect" class="mb-3 font-bold">Select Track</label>
	<div
		class="relative w-full flex-grow rounded-full leading-5 nm-flat-slate-200 dark:nm-flat-slate-700"
	>
		<select
			id="trackSelect"
			on:change={() => (hidden = true)}
			bind:value={selected}
			class="w-full appearance-none bg-transparent px-8 py-4 font-semibold"
		>
			{#each Object.entries(tracks) as [track, trackInfo]}
				<option value={track}
					>{trackInfo.flagmoji + trackInfo.friendlyName + ' - ' + trackInfo.trackName}</option
				>
			{/each}
		</select>
		<div
			class="pointer-events-none absolute right-0 top-0 flex h-full flex-col items-center justify-center pr-2 md:pr-4 lg:pr-8"
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
