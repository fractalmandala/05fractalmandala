<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
    export let data

</script>

<svelte:head>
    <title>{data.title} | Fractal Mandala</title>
    <meta name="description" content="{data.description}" />
</svelte:head>

<Template showNav={true} showDesc={true} link="/wiki-writings" linkLabel="Writings" title={data.title} description={data.description}>
	<article class="article-box">
		<svelte:component this={data.content} />
	</article>
</Template>

<style lang="sass">

.article-box
	@media screen and (min-width: 1025px)
		max-width: 900px

</style>

