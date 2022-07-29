<script lang="ts">
	import { LapTime, type Time } from '../app/LapTime';

	import { getNearestBeatableTime, TrackList } from '../app/TrackUtils';
	let selected: string = 'Bahrain';
	$: track = TrackList[selected];
	let closestLapTime: string = '';
	let aiLevel: string = '';

	const handleSubmit = (e: Event) => {
		const laptimeForm = new FormData(<HTMLFormElement>e.target);
		const formDataObj = Object.fromEntries(laptimeForm.entries());
		const inputLapTime = formDataObj as unknown as Time;
		const lapTime = new LapTime(inputLapTime);
		const result = getNearestBeatableTime(lapTime.getDateTime().getTime(), track);
		closestLapTime = result.lapTime.getFormatted();
		aiLevel = result.difficulty;
	};
</script>

<div class="mx-3 flex flex-col items-center gap-12 sm:mx-12">
	<h1
		class="w-full py-6 text-center text-2xl font-extrabold text-slate-900 dark:text-gray-300 md:text-4xl"
	>
		F1 2022 AI Difficulty Calculator
	</h1>
	<h2 class="text-justify text-lg text-gray-700 dark:text-gray-300 sm:text-base">
		<span class="font-extrabold">Usage: </span>Input your best lap time from
		<span class="font-extrabold underline">Time Trial Equal Performance Mode</span>
		to see your recommended AI level
	</h2>
	<div class="flex w-full flex-col md:w-3/4 xl:w-1/2">
		<label for="trackSelect" class="text-center text-gray-700 dark:text-gray-300 sm:text-left"
			>Select Track</label
		>
		<select
			id="trackSelect"
			bind:value={selected}
			class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
		>
			{#each Object.entries(TrackList) as [track, trackInfo]}
				<option value={track}
					>{trackInfo.flagmoji + trackInfo.friendlyName + ' - ' + trackInfo.trackName}</option
				>
			{/each}
		</select>
	</div>
	<div class="w-full md:w-3/4 xl:w-1/2">
		<h1
			id="trackTitle"
			class="mb-6 text-center text-3xl font-bold text-slate-900 dark:text-gray-300 md:text-4xl"
		>
			{track.flagmoji}
			{track.friendlyName}
		</h1>
		<h2 id="trackName" class="text-center font-semibold dark:text-gray-300 md:text-2xl">
			{track.trackName}
		</h2>
	</div>
	<div id="results" class="w-full text-center text-xl font-medium md:text-2xl">
		<p class="mb-3 dark:text-gray-300">
			Closest Lap Time:
			<span id="closestLapTime" class="font-bold underline">{closestLapTime}</span>
		</p>
		<p class="dark:text-gray-300">
			Recommended AI Level:
			<span id="difficulty" class="font-bold underline">{aiLevel}</span>
		</p>
	</div>
	<div class="w-full dark:text-gray-300 md:w-3/4 xl:w-1/2 my-6">
		<form id="lapTime" on:submit|preventDefault={handleSubmit}>
			<div class="overflow-hidden rounded-md shadow">
				<div class="bg-white px-4 py-6 dark:bg-slate-600">
					<div class="">
						<div class="grid grid-cols-3">
							<div class="col-span-1">
								<label for="lapTimeMin" class="mb-1 block text-sm text-gray-900 dark:text-gray-300"
									>Minutes</label
								>
								<div class="flex w-full flex-row items-center">
									<input
										id="lapTimeMin"
										name="min"
										type="number"
										placeholder="1"
										max="3"
										min="0"
										maxlength="1"
										required
										class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									/>
									<p class="mx-1 inline-block h-fit">:</p>
								</div>
							</div>

							<div class="col-span-1">
								<label for="lapTimeSec" class="mb-1 block text-sm text-gray-900 dark:text-gray-300"
									>Seconds</label
								>
								<div class="flex w-full flex-row items-end">
									<input
										id="lapTimeSec"
										name="sec"
										type="number"
										placeholder="32"
										max="59"
										min="0"
										maxlength="2"
										required
										class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									/>
									<p class="mx-1 inline-block h-fit">.</p>
								</div>
							</div>

							<div class="col-span-1">
								<label for="lapTimeMil" class="mb-1 block text-sm text-gray-900 dark:text-gray-300"
									>Milliseconds</label
								>
								<input
									id="lapTimeMil"
									name="mil"
									type="number"
									placeholder="329"
									max="999"
									min="0"
									maxlength="3"
									required
									class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-100 px-6 py-6 text-center dark:bg-slate-700 lg:py-3">
					<button
						type="submit"
						class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-2 font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-xl lg:py-2 xl:w-1/2"
					>
						Calculate
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
