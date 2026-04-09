---
title: Sita Ram Goel and Ram Swarup Wiki
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { wikiSRGSRS } from '$lib/utils/locals'

    let dataSS:any

    onMount(() => {
        (async() => {
            dataSS = await wikiSRGSRS();
        })();
    })

</script>

This wiki organizes the works of Sita Ram Goel and Ram Swarup into major themes around Hindu self-understanding, encounters with Christianity and Islam, temple destruction, Sikh-Hindu relations, secularism, freedom of expression, and Ram Swarup's political-economic writings.

## Topics
{#if dataSS && dataSS.length > 0}
    <div class="wiki-items-box">
    {#each dataSS as item}
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
