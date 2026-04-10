<script lang="ts">

	import { onMount } from 'svelte'
	import { loadWiki, type WikiEntry, loadWikiSources } from '$lib/utils/locals'
	import Template from '$lib/comps/page-template.svelte'

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

<Template showNav={false} showDesc={true} title="Sita Ram Goel & Ram Swarup" description="A wiki on Sita Ram Goel and Ram Swarup — Hindu self-understanding, encounters with Islam and Christianity, and civilizational critique.">
	<div class="box-0">
		<p>
			This wiki organizes the works of Sita Ram Goel and Ram Swarup into major themes around Hindu self-understanding, encounters with Christianity and Islam, temple destruction, Sikh-Hindu relations, secularism, freedom of expression, and Ram Swarup's political-economic writings.
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