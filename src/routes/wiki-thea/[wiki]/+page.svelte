<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
    export let data
</script>

<svelte:head>
    <title>{data.title} | {data.wikiLabel} | Fractal Mandala</title>
    <meta name="description" content="{data.wikiLabel} — {data.title}" />
</svelte:head>

<Template showNav={true} showDesc={false} link="/wiki-thea" linkLabel="Thea" title={data.title}>
	<div>
		<svelte:component this={data.content} />
	</div>
</Template>
