<script lang="ts">
	import { LapTime, type Time } from '../app/LapTime';
	import { getNearestBeatableTime, type Track } from '../app/TrackUtils';
	export let track: Track;
	export let closestLapTime: string;
	export let aiLevel: string;
	export let hidden: boolean = true;
	const inputs: HTMLInputElement[] = [];

	const input = (event: Event) => {
		const target = <HTMLInputElement>event.target;
		const maxLength = target.maxLength;
		const myLength = target.value.length;
		if (myLength === maxLength) {
			for (let index = 0; index < inputs.length; index++) {
				const element = inputs[index];
				if (target === element && index !== inputs.length - 1) {
					inputs[index + 1]?.focus();
				}
			}
		}
		if (myLength === 0) {
			for (let index = 0; index < inputs.length; index++) {
				const element = inputs[index];
				if (target === element && index !== 0) {
					inputs[index - 1]?.focus();
				}
			}
		}
		if (myLength >= maxLength) {
			target.value = target.value.slice(0, maxLength);
		}
	};

	const handleSubmit = (e: Event) => {
		const laptimeForm = new FormData(<HTMLFormElement>e.target);
		const formDataObj = Object.fromEntries(laptimeForm.entries());
		const inputLapTime = formDataObj as unknown as Time;
		const lapTime = new LapTime(inputLapTime);
		const result = getNearestBeatableTime(lapTime.getDateTime().getTime(), track);
		closestLapTime = result.lapTime.getFormatted();
		aiLevel = result.difficulty;
		hidden = false;
	};
</script>

<div
	class="w-full dark:text-gray-300 md:w-3/4 xl:w-1/2 mb-6 nm-flat-slate-200-lg dark:nm-flat-slate-700-lg rounded-lg"
>
	<form id="lapTime" on:submit|preventDefault={handleSubmit}>
		<div class="overflow-hidden rounded-md shadow">
			<div class="px-4 py-6 ">
				<div class="">
					<div class="grid grid-cols-3">
						<div class="col-span-1">
							<label for="lapTimeMin" class="mb-1 block text-sm text-gray-900 dark:text-gray-300"
								>Minutes</label
							>
							<div class="flex w-full flex-row items-center">
								<input
									on:input={input}
									bind:this={inputs[0]}
									id="lapTimeMin"
									name="min"
									type="number"
									placeholder="1"
									max="3"
									min="0"
									maxlength="1"
									required
									class="appearance-none rounded-full nm-inset-slate-200 dark:nm-inset-slate-700 leading-5 px-8 py-4 flex-grow w-full"
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
									on:input={input}
									bind:this={inputs[1]}
									id="lapTimeSec"
									name="sec"
									type="number"
									placeholder="32"
									max="59"
									min="0"
									maxlength="2"
									required
									class="appearance-none rounded-full nm-inset-slate-200 dark:nm-inset-slate-700 leading-5 px-8 py-4 flex-grow w-full"
								/>
								<p class="mx-1 inline-block h-fit">.</p>
							</div>
						</div>

						<div class="col-span-1">
							<label for="lapTimeMil" class="mb-1 block text-sm text-gray-900 dark:text-gray-300"
								>Milliseconds</label
							>
							<input
								on:input={input}
								bind:this={inputs[2]}
								id="lapTimeMil"
								name="mil"
								type="number"
								placeholder="329"
								max="999"
								min="0"
								maxlength="3"
								required
								class="appearance-none rounded-full nm-inset-slate-200  dark:nm-inset-slate-700 leading-5 px-8 py-4 flex-grow w-full"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="px-6 py-6 text-center lg:py-3">
				<button
					type="submit"
					class="text-white dark:text-gray-300 min-w-fit w-1/2 rounded-full bg-indigo-600 hover:bg-indigo-600-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110"
				>
					Calculate
				</button>
			</div>
		</div>
	</form>
</div>
