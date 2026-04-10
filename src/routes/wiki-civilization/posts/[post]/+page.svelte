<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
	export let data
</script>

<svelte:head>
	<title>{data.title} | Civilization | Fractal Mandala</title>
	<meta name="description" content="Civilization — {data.title}" />
</svelte:head>

<Template showNav={true} showDesc={false} link="/wiki-civilization" linkLabel="Civilization and Phenomenology" title={data.title}>
	<article>
		<svelte:component this={data.content} />
	</article>
</Template>

<style lang="sass">

article
	@media screen and (min-width: 1025px)
		max-width: 900px
	
	</style>