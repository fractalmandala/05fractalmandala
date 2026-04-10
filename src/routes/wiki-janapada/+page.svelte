<script lang="ts">
	import { onMount } from "svelte";
	import {
		getJanapada,
		getJanapadaGroups,
		selectedJanapadaGroup,
	} from "$lib/utils/locals";
	import Template from "$lib/comps/page-template.svelte";

	let japs: any;
	let groups: any;
	let category = " ";
	let grouped: any;
	let isThis = Array(7).fill(false);
	isThis[6] = true;

	function toggleFilter(index: number) {
		isThis[index] = !isThis[index];
		let anyTrue = false;
		for (let i = 0; i < isThis.length; i++) {
			if (i !== index && isThis[i]) {
				isThis[i] = false;
			}
			if (isThis[i]) {
				anyTrue = true;
			}
		}
		// If no item is selected, set isThis[9] to true
		if (!anyTrue) {
			isThis[6] = true;
		}
	}

	function setFilter(newFilter: string) {
		category = newFilter;
		(async () => {
			grouped = await selectedJanapadaGroup(category);
		})();
	}

	onMount(() => {
		(async () => {
			groups = await getJanapadaGroups();
			grouped = await selectedJanapadaGroup(category);
			japs = await getJanapada();
		})();
	});
</script>

<svelte:head>
	<title>The Janapada | Fractal Mandala</title>
	<meta
		name="description"
		content="A historical fiction wiki on the Janapada — places, personalities, tribes, and civilizational world-building from ancient Bharatavarsha."
	/>
</svelte:head>

<Template showNav={false} showDesc={false} title="The Janapada">
	<div class="box-0">
		<p>
			The Janapada is a historical fiction world-building project. Here I
			imagine the Puranic Bharatavarsha, its characters, places, events,
			and more. This index lists the full Janapada wiki. It organizes the project
			into linked notes on places, personalities, tribes, cultural
			concepts, and source-overview pages so the material can be navigated
			as a connected civilizational world.
		</p>
	</div>
	<div class="box-2">
		{#if groups && groups.length > 0}
			<div class="row rgap8 cgap8 wrap">
				<button
					class="wiki-labels"
					class:selected={isThis[6]}
					on:click={() => toggleFilter(6)}
				>
					All
				</button>
				{#each groups as item, i}
					<button
						class="wiki-labels"
						on:click={() => {
							toggleFilter(i);
							setFilter(item);
						}}
						class:selected={isThis[i]}
					>
						{item}
					</button>
				{/each}
			</div>
		{/if}
		{#if isThis[6]}
			{#if japs && japs.length > 0}
				<div class="grid four rgap8 cgap8">
					{#each japs as item, i (item.meta.title)}
						<p class="wiki-labels tt-c">
							<a href={item.linkpath}>{item.meta.title}</a>
						</p>
					{/each}
				</div>
			{/if}
		{:else if grouped && grouped.length > 0}
			<div class="grid four rgap8 cgap8">
				{#each grouped as item, i (item.meta.title)}
					<p class="wiki-labels tt-c">
						<a href={item.linkpath}>{item.meta.title}</a>
					</p>
				{/each}
			</div>
		{/if}
	</div>
</Template>
