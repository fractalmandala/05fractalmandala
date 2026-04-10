---
title: Sri Aurobindo Wiki
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry, loadWikiSources } from '$lib/utils/locals'

    let data: WikiEntry[] = []
	const sources = loadWikiSources('wiki-auro');

    onMount(async () => {
        data = await loadWiki('wiki-auro');
    })

</script>

<svelte:head>
    <title>Sri Aurobindo | Fractal Mandala</title>
    <meta name="description" content="A wiki on Sri Aurobindo — Vedic interpretation, Integral Yoga, metaphysics, and civilizational thought." />
</svelte:head>

This wiki organizes Sri Aurobindo's work into major thematic topics, moving from early cultural and political work toward Vedic interpretation, Upanishadic exegesis, the Gita, Integral Yoga, metaphysics, and social philosophy. Each topic page begins with a summary paragraph, includes source summaries for the relevant volumes, and links outward to related pages through the internal wiki-link format.

His work traces a movement from cultural criticism and anti-colonial nationalism toward a large synthetic vision in which Veda, Upanishad, Gita, yoga, metaphysics, and social development become parts of one evolutionary account of consciousness. The strongest recurring themes are the recovery of Indian civilization from reductive colonial readings, the reinterpretation of Hindu scripture as a record of spiritual experience, and the claim that individual and collective life can be transformed rather than merely renounced.

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
