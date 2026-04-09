---
title: Sri Aurobindo Wiki
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { wikiAuro } from '$lib/utils/locals'

    let dataAuro:any

    onMount(() => {
        (async() => {
            dataAuro = await wikiAuro();
        })();
    })

</script>

This wiki organizes Sri Aurobindo's work into major thematic topics, moving from early cultural and political work toward Vedic interpretation, Upanishadic exegesis, the Gita, Integral Yoga, metaphysics, and social philosophy. Each topic page begins with a summary paragraph, includes source summaries for the relevant volumes, and links outward to related pages through the internal wiki-link format.

His work traces a movement from cultural criticism and anti-colonial nationalism toward a large synthetic vision in which Veda, Upanishad, Gita, yoga, metaphysics, and social development become parts of one evolutionary account of consciousness. The strongest recurring themes are the recovery of Indian civilization from reductive colonial readings, the reinterpretation of Hindu scripture as a record of spiritual experience, and the claim that individual and collective life can be transformed rather than merely renounced.

## Chronological Arc
- Early period: cultural essays, literary criticism, education, and political nationalism.
- Middle period: reinterpretation of Veda, Upanishads, and Gita alongside major philosophical works.
- Later period: Integral Yoga in systematic form, especially through letters to disciples.

## Key Intellectual Moves
- India is treated as a civilization with its own spiritual logic, not as a failed imitation of Europe.
- Ancient texts are read psychologically and spiritually rather than only ritualistically or philologically.
- Human evolution is understood as unfinished and capable of supramental transformation.
- Politics, culture, yoga, and metaphysics are connected rather than separated into different compartments.

## Topics
{#if dataAuro && dataAuro.length > 0}
    <div class="wiki-items-box">
    {#each dataAuro as item}
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
