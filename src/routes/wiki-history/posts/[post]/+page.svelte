<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
	export let data
</script>

<svelte:head>
	<title>{data.title} | History | Fractal Mandala</title>
	<meta name="description" content="History — {data.title}" />
</svelte:head>

<Template showNav={true} link="/wiki-history" linkLabel="History" showDesc={false} title={data.title}>
	<div class="pdf-box">
		<iframe title={data.title} src={data.link} allow="autoplay"></iframe>
	</div>
</Template>

<style lang="sass">

.pdf-box
	iframe
		border: none
		background: #FFFFFF
		@media screen and (min-width: 1025px)
			aspect-ratio: 3/4
			width: 80%
			padding: 16px
			border-radius: 24px
		@media screen and (max-width: 1024px)
			width: 100%
			height: 600px

</style>
