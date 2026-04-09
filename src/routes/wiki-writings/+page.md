---
title: Own Writings
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry } from '$lib/utils/locals'

    let data: WikiEntry[] = []

    onMount(async () => {
        data = await loadWiki('wiki-writings')
    })

</script>

<svelte:head>
    <title>Own Writings | Fractal Mandala</title>
    <meta name="description" content="Personal writings on Indian history, dharma, consciousness, technology, design, fiction, and poetry." />
</svelte:head>

This wiki organizes my own writings into major themes spanning Indian history, Vedic chronology, dharma and civilizational thought, consciousness and psychedelics, technology and web development, design, fiction, poetry, and whisky notes.

## Topics
{#if data.length > 0}
    <div class="wiki-items-box">
    {#each data as item}
        <p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
    {/each}
    </div>
{/if}

<style lang="sass">

.wiki-items-box
    display: flex
    flex-direction: column
    row-gap: 5px

</style> 
