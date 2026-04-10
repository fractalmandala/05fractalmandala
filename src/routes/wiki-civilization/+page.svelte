<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry } from '$lib/utils/locals'

    let data: WikiEntry[] = []

    onMount(async () => {
        data = await loadWiki('wiki-civilization')
    })

</script>

<svelte:head>
    <title>Civilizational Phenomenology | Fractal Mandala</title>
    <meta name="description" content="A wiki on Indian history, ancient religion, civilizational phenomenology, and the evolution of Hinduism." />
</svelte:head>

<article>
	<p>
		A personal wiki on Indian history, ancient religion, civilizational phenomenology, and the evolution of Hinduism.
	</p>
	{#if data.length > 0}
    <div class="wiki-items-box">
	<h2>Topics</h2>
    {#each data as item}
        <p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
    {/each}
    </div>
{/if}
</article>