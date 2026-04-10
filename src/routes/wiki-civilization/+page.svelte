<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry, loadWikiSources } from '$lib/utils/locals'
	import Template from '$lib/comps/page-template.svelte'

    let data: WikiEntry[] = []
	const sources = loadWikiSources('wiki-civilization');

    onMount(async () => {
        data = await loadWiki('wiki-civilization')
    })

</script>

<svelte:head>
    <title>Civilization and Phenomenology | Fractal Mandala</title>
    <meta name="description" content="A wiki on Indian history, ancient religion, civilizational phenomenology, and the evolution of Hinduism." />
</svelte:head>

<Template showNav={false} showDesc={true} title="Civilization and Phenomenology" description="A wiki on Indian civilizational phenomenology, emergence, metahistory, and the evolution of Hinduism.">
	<div class="box-0">
		<p>
			This wiki is a WIP, part of my ongoing fellowship at <a href="https://fihcr.com/" target="_blank" rel="noreferrer">FIHCR</a>, where I research the emergence of dharma in India's civilizational past. It collects readings I've found relevant for investigating the origins, emergence, and evolution of:
		</p>
		<p>
			1. the Hindu engagement with divinity,<br>2. karma-punarjanma metaphysics, and<br>3. the purusharthas.
		</p>
		<p>
			As with the other wikis, the readings have been indexed into major themes by Claude. I also used Claude and Codex to create book reports for each of the source texts. Replate with typical AI-writing style, but good and comprehensive coverage of the actual texts.
		</p>
	</div>
	{#if data.length > 0}
		<div class="box-1">
			<div>
				<h2>Themes</h2>
			</div>
			<div class="grid two rgap8">
				{#each data as item}
				<p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
				{/each}
			</div>
		</div>
	{/if}
	{#if sources.length > 0}
	<div class="box-2">
		<h2>Source Texts</h2>
		<div class="grid two rgap8">
			{#each sources as source}
				<p class="wiki-items tt-c"><a href={source.link}>{source.title}</a></p>
			{/each}
		</div>
	</div>
	{/if}
</Template>