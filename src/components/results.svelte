<script lang="ts">
	export let closestLapTime: string;
	export let aiLevel: string;
</script>

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
