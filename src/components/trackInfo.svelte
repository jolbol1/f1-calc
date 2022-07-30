<script lang="ts">
	export let flag: string;
	export let friendlyName: string;
	export let trackName: string;
</script>

<div class="w-full md:w-3/4 xl:w-1/2">
	<h1
		id="trackTitle"
		class="mb-6 text-center text-3xl font-bold text-slate-900 dark:text-gray-300 md:text-4xl"
	>
		{flag}
		{friendlyName}
	</h1>
	<h2 id="trackName" class="text-center font-semibold dark:text-gray-300 md:text-2xl">
		{trackName}
	</h2>
</div>
