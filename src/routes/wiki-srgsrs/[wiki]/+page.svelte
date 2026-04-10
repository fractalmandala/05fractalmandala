<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
    export let data
</script>

<svelte:head>
    <title>{data.title} | {data.wikiLabel} | Fractal Mandala</title>
    <meta name="description" content="{data.wikiLabel} — {data.title}" />
</svelte:head>

<Template showNav={true} link="/wiki-srgsrs" linkLabel="Sita Ram Goel & Ram Swarup" showDesc={false} title={data.title}>
	<article>
		<svelte:component this={data.content} />
	</article>
</Template>