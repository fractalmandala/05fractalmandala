<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
	export let data
</script>

<svelte:head>
	<title>{data.title} | Sri Aurobindo | Fractal Mandala</title>
	<meta name="description" content="Sri Aurobindo — {data.title}" />
</svelte:head>

<Template showNav={true} link="/wiki-auro" linkLabel="Sri Aurobindo" showDesc={false} title={data.title}>
	<div class="pdf-box">
		<iframe title={data.title} src={data.link} allow="autoplay"></iframe>
	</div>
</Template>