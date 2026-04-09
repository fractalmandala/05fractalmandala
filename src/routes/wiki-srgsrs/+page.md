---
title: Sita Ram Goel and Ram Swarup Wiki
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { loadWiki, type WikiEntry } from '$lib/utils/locals'

    let data: WikiEntry[] = []

    onMount(async () => {
        data = await loadWiki('wiki-srgsrs')
    })

</script>

<svelte:head>
    <title>Sita Ram Goel & Ram Swarup | Fractal Mandala</title>
    <meta name="description" content="A wiki on Sita Ram Goel and Ram Swarup — Hindu self-understanding, encounters with Islam and Christianity, and civilizational critique." />
</svelte:head>

This wiki organizes the works of Sita Ram Goel and Ram Swarup into major themes around Hindu self-understanding, encounters with Christianity and Islam, temple destruction, Sikh-Hindu relations, secularism, freedom of expression, and Ram Swarup's political-economic writings.

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
