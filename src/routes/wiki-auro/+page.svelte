<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry, loadWikiSources } from '$lib/utils/locals'
	import Template from '$lib/comps/page-template.svelte'

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

<Template showNav={false} showDesc={false} title="Sri Aurobindo Wiki">
	<div class="box-0">
		<p>
			This wiki organizes Sri Aurobindo's work into major thematic topics, moving from early cultural and political work toward Vedic interpretation, Upanishadic exegesis, the Gita, Integral Yoga, metaphysics, and social philosophy. Each topic page begins with a summary paragraph, includes source summaries for the relevant volumes, and links outward to related pages through the internal wiki-link format.
		</p>
		<p>
			His work traces a movement from cultural criticism and anti-colonial nationalism toward a large synthetic vision in which Veda, Upanishad, Gita, yoga, metaphysics, and social development become parts of one evolutionary account of consciousness. The strongest recurring themes are the recovery of Indian civilization from reductive colonial readings, the reinterpretation of Hindu scripture as a record of spiritual experience, and the claim that individual and collective life can be transformed rather than merely renounced.
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
		<div class="grid two rgap8">
			{#each sources as source}
				<p class="wiki-items tt-c"><a href={source.href}>{source.title}</a></p>
			{/each}
		</div>
	</div>
	{/if}
</Template>