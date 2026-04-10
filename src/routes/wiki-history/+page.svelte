<script lang="ts">

	import { onMount } from 'svelte'
	import { loadWiki, type WikiEntry, loadWikiSources } from '$lib/utils/locals'
	import Template from '$lib/comps/page-template.svelte'

    let data: WikiEntry[] = []
	const sources = loadWikiSources('wiki-history');

    onMount(async () => {
        data = await loadWiki('wiki-history');
    })

</script>

<svelte:head>
    <title>Indian History | Fractal Mandala</title>
    <meta name="description" content="A wiki on ancient Indian history — chronology, Vedic literature, the Sarasvati-Harappan world, Indo-European debate, and Sanskrit traditions." />
</svelte:head>

<Template showNav={false} showDesc={true} title="History" description="A somewhat unsorted and disorganized but extensive repo on ancient Indian history, archaeology, linguistics.">
	<div class="box-0">
		<p>
			This repo is most of my reference and study material from when I was working on my book, <a href="https://amzn.in/d/0f71INCf" target="_blank" rel="noreferrer">Fractal Maṇḍala</a>. A lot of stuff on Aryan theory, PIE, Sindhu-Sarasvati archaeology, and more. Several scriptural texts like Upanishads and Brahmanas. Should probably remove them from here and club them separately.
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
		<div>
			<h2>Source Texts</h2>
		</div>
		<div class="grid two rgap8 cgap8">
			{#each sources as source}
				<p class="wiki-items tt-c"><a href={source.link} target="_blank" rel="noreferrer">{source.title}</a></p>
			{/each}
		</div>
	</div>
	{/if}
</Template>