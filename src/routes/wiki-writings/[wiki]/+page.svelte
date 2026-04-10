<script lang="ts">

	import Template from '$lib/comps/page-template.svelte'
    export let data
</script>

<svelte:head>
    <title>{data.title} | Fractal Mandala</title>
    <meta name="description" content="{data.wikiLabel} — {data.title}" />
</svelte:head>

<Template showDesc={false} showNav={true} link="/wiki-writings" linkLabel="Writings" title={data.title}>
	<article>
		<svelte:component this={data.content} />
	</article>
</Template>