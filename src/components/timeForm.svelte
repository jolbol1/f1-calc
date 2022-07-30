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
	class="mb-6 w-full rounded-lg nm-flat-slate-200-lg dark:text-gray-300 dark:nm-flat-slate-700-lg md:w-3/4 xl:w-1/2"
>
	<form id="lapTime" on:submit|preventDefault={handleSubmit}>
		<div class="overflow-hidden rounded-md shadow">
			<div class="px-4 py-6 ">
				<label for="lapTimeMin" class="mb-3 block w-full text-center font-bold">Lap Time</label>

				<div
					class="mt-3 flex w-full flex-grow flex-row justify-center rounded-full px-8 py-3 leading-5 nm-inset-slate-200 dark:nm-inset-slate-700"
				>
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
						class="flex-grow appearance-none bg-transparent text-right outline-none"
					/>
					<p class="mx-1 inline-block h-fit">:</p>

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
						class="w-5 appearance-none bg-transparent outline-none"
					/>
					<p class="mx-1 inline-block h-fit">.</p>

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
						class="appearance-nonce flex-grow bg-transparent outline-none"
					/>
				</div>
			</div>
			<div class="px-6 py-6 text-center lg:py-3">
				<button
					type="submit"
					class="hover:bg-indigo-600-lg w-1/2 min-w-fit transform rounded-full bg-indigo-600 px-8 py-4 font-bold uppercase leading-5 tracking-widest text-white transition duration-200 ease-in-out hover:scale-110 dark:text-gray-300"
				>
					Calculate
				</button>
			</div>
		</div>
	</form>
</div>
