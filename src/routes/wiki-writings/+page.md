---
title: Own Writings
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { wikiWritings } from '$lib/utils/locals'

    let dataOwn:any

    onMount(() => {
        (async() => {
            dataOwn = await wikiWritings();
        })();
    })

</script>

This wiki organizes my own writings into major themes spanning Indian history, Vedic chronology, dharma and civilizational thought, consciousness and psychedelics, technology and web development, design, fiction, poetry, and whisky notes.

## Topics
{#if dataOwn && dataOwn.length > 0}
    <div class="wiki-items-box">
    {#each dataOwn as item}
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
