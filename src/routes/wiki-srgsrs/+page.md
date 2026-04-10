---
title: Sita Ram Goel and Ram Swarup Wiki
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry, loadWikiSources } from '$lib/utils/locals'

    let data: WikiEntry[] = []
	const sources = loadWikiSources('wiki-srgsrs');

    onMount(async () => {
        data = await loadWiki('wiki-srgsrs')
    })

</script>

<svelte:head>
    <title>Sita Ram Goel & Ram Swarup | Fractal Mandala</title>
    <meta name="description" content="A wiki on Sita Ram Goel and Ram Swarup — Hindu self-understanding, encounters with Islam and Christianity, and civilizational critique." />
</svelte:head>

This wiki organizes the works of Sita Ram Goel and Ram Swarup into major themes around Hindu self-understanding, encounters with Christianity and Islam, temple destruction, Sikh-Hindu relations, secularism, freedom of expression, and Ram Swarup's political-economic writings.

{#if data.length > 0}
<div class="box-up">
	<h2>Topics</h2>
	<div class="grid two">
    {#each data as item}
        <p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
    {/each}
	</div>
</div>
{/if}

{#if sources.length > 0}
<div class="box-up">
	<h2>Source Texts</h2>
	<div class="grid two">
		{#each sources as source}
			<p class="wiki-items tt-c"><a href={source.href}>{source.title}</a></p>
		{/each}
	</div>
</div>
{/if}

<style lang="sass">

.box-up
	border-top: 1px solid var(--col-border)
	margin-top: 32px

.wiki-items-box
	display: flex
	flex-direction: column
	row-gap: 5px

h1.page-title
	border-bottom: 1px solid var(--col-border)
	padding-bottom: 16px
	margin-bottom: 24px

</style> 
