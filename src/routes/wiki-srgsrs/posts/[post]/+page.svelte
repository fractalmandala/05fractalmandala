<script lang="ts">
	export let data
</script>

<svelte:head>
	<title>{data.title} | Sita Ram Goel & Ram Swarup | Fractal Mandala</title>
	<meta name="description" content="SRG and SRS — {data.title}" />
</svelte:head>

<article>
<nav class="breadcrumb" aria-label="breadcrumb">
	<a href="/wiki-srgsrs/+page">Sita Ram Goel and Ram Swarup</a>
	<span aria-hidden="true"> > </span>
	<span aria-current="page">{data.title}</span>
</nav>
<h1 class="tt-c">{data.title}</h1>
<div class="pdf-box">
	<iframe title={data.title} src={data.link} allow="autoplay"></iframe>
</div>

</article>

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

.breadcrumb
	display: flex
	flex-direction: row
	column-gap: 4px
	align-items: center
	margin-bottom: 8px
	font-size: 12px
	color: var(--col-textgreylight)
	a
		color: inherit
		text-decoration: none
		&:hover
			text-decoration: underline

h1
	border-bottom: 1px solid var(--col-border)
	padding-bottom: 16px
	margin-bottom: 24px

</style>
