<script lang="ts">
	import type { PageData } from './$types';
	import Template from '$lib/comps/page-template.svelte'
	import Tags from '$lib/comps/tags.svelte'
	export let data: PageData;
</script>

<svelte:head>
	<title>Writings | Fractal Mandala</title>
	<meta name="description" content="Writings on Indian history, dharma, consciousness, technology, design, fiction, and poetry." />
</svelte:head>

<Template showDesc={true} title="Writings" description="This wiki organizes my writings into major themes spanning Indian history, Vedic chronology, dharma and civilizational thought, consciousness and psychedelics, technology and web development, etc.">
	{#if data.data.length > 0}
	<div class="box-1">
		<div>
			<h2>Topics</h2>
		</div>
		<div class="grid two rgap8 mtop-1 mbot-1">
			{#each data.data as item}
				<p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
			{/each}
		</div>
	</div>
	{/if}
	<Tags/>
</Template>