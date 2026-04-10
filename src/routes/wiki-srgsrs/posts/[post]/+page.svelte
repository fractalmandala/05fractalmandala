<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
	export let data
</script>

<svelte:head>
	<title>{data.title} | Sita Ram Goel & Ram Swarup | Fractal Mandala</title>
	<meta name="description" content="SRG and SRS — {data.title}" />
</svelte:head>

<Template showNav={true} link="/wiki-srgsrs" linkLabel="Sita Ram Goel & Ram Swarup" showDesc={false} title={data.title}>
	<div class="pdf-box">
		<iframe title={data.title} src={data.link} allow="autoplay"></iframe>
	</div>
</Template>