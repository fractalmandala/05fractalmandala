<script lang="ts">
	import type { WikiEntry } from '$lib/utils/locals';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Own Writings | Fractal Mandala</title>
	<meta name="description" content="Personal writings on Indian history, dharma, consciousness, technology, design, fiction, and poetry." />
</svelte:head>

<p>
	This wiki organizes my own writings into major themes spanning Indian history, Vedic chronology, dharma and civilizational thought, consciousness and psychedelics, technology and web development, design, fiction, poetry, and whisky notes.
</p>
{#if data.data.length > 0}
<div class="box-up">
	<h2>Topics</h2>
	<div class="grid two">
		{#each data.data as item}
			<p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
		{/each}
	</div>
</div>
{/if}
{#if data.tagger.length > 0}
<div class="box-up">
	<h2>Tags</h2>
	<div class="grid four">
		{#each data.tagger as item}
			<p class="wiki-items tt-c"><a href="/wiki-writings/tags/{item.tag}">{item.tag}</a></p>
		{/each}
	</div>
</div>
{/if}

<style lang="sass">

.box-up
	border-top: 1px solid var(--col-border)
	margin-top: 32px
	margin-bottom: 32px
	
	</style> 