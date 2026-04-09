---
title: indian civilizational phenomenology wiki
id: 999
---

<script lang="ts">

    import { onMount } from 'svelte'
    import { wikiCivilization } from '$lib/utils/locals'

    let dataCiv:any

    onMount(() => {
        (async() => {
            dataCiv = await wikiCivilization();
        })();
    })

</script>

A personal wiki on Indian history, ancient religion, civilizational phenomenology, and the evolution of Hinduism.

## Topics
{#if dataCiv && dataCiv.length > 0}
    <div class="wiki-items-box">
    {#each dataCiv as item}
        <p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
    {/each}
    </div>
{/if}

## Sources

| Source | Topic Page |
|--------|-----------|
| *Base Archaeological Data* (archaeology-base.md) | [[prehistoric-india-and-archaeology]] |
| Aurobindo, *The Human Cycle* | [[time-eternity-and-cosmic-cycles]] |
| Assmann, *Cultural Memory and Early Civilization* | [[cultural-memory-and-tradition]] |
| Bhattacharji, *Indian Theogony* | [[vedic-deities-and-mythology]], [[shiva]] |
| Bhandarkar, *Vaisnavism, Saivism and Minor Religious Systems* | [[hinduism-sectarian-traditions]] |
| Butler, *The Metaphysics of Polytheism in Proclus* | [[polytheism-and-divine-plurality]] |
| Coomaraswamy, *The Dance of Siva* | [[indian-art-and-aesthetics]] |
| Coomaraswamy, *Time and Eternity* | [[time-eternity-and-cosmic-cycles]] |
| Dandekar, *Vedic Mythological Tracts* | [[vedic-deities-and-mythology]] |
| Daniélou, *While the Gods Play* | [[hinduism-sectarian-traditions]], [[time-eternity-and-cosmic-cycles]] |
| Doniger (ed.), *Karma and Rebirth in Indian Traditions* | [[karma-and-rebirth]] |
| Eck, *India: A Sacred Geography* | [[indian-sacred-geography]], [[sacred-space-and-time]] |
| Eliade, *The Myth of the Eternal Return* | [[sacred-space-and-time]] |
| Eliade, *The Sacred and the Profane* | [[sacred-space-and-time]] |
| Feuerstein, *The Yoga Tradition* | [[yoga-and-liberation]] |
| Gonda, *Change and Continuity in Indian Religion* | [[cultural-memory-and-tradition]] |
| Hiltebeitel & Lariviere (eds.), *Dharma: Its Early History* | [[dharma]] |
| Kosambi, *Culture and Civilisation of Ancient India* | [[indian-history-and-civilization]] |
| Kosambi, *Myth and Reality* | [[indian-history-and-civilization]] |
| Kramrisch, *The Presence of Shiva* | [[shiva]] |
| *Laghu Yoga Vasishtha* | [[yoga-and-liberation]] |
| McClelland, *Encyclopedia of Reincarnation and Karma* | [[karma-and-rebirth]] |
| Miller, *Vision of Rta in the Vedas* | [[rta-and-cosmic-order]] |
| Panikkar, *The Cosmotheandric Experience* | [[interreligious-dialogue]] |
| Panikkar, *Intrareligious Dialogue* | [[interreligious-dialogue]] |
| Panikkar, *The Vedic Experience (Mantramañjarī)* | [[rta-and-cosmic-order]], [[vedic-ritual-and-sacrifice]] |
| Singh, *Vishvamitra: Life and Vision of Vedic Seers* | [[vedic-ritual-and-sacrifice]] |
| Smith, J.Z., *Reflections on Resemblance, Ritual, and Religion* | [[comparative-religion-methodology]], [[vedic-ritual-and-sacrifice]] |
| Staal, *Rules Without Meaning* | [[vedic-ritual-and-sacrifice]] |
| Tylor, *Primitive Culture* | [[comparative-religion-methodology]] |
| van der Leeuw, *Phenomenology of Religion* | [[phenomenology-of-religion]] |
| *Research Synthesis: Continuity and Metaphysics of Order* (res-continuity.md) | [[cultural-memory-and-tradition]] |
| *Research Synthesis: Divinity in Ancient India* (res-divinity.md) | [[prehistoric-india-and-archaeology]] |
| *Research Synthesis: Origins of Karma and Punarjanma* (res-karma.md) | [[karma-and-rebirth]] |
| *Research Synthesis: Long-Term Continuity Framework* (res-methodology.md) | [[comparative-religion-methodology]] |
| Adluri & Bagchee, *The Nay Science* | [[colonial-indology]], [[comparative-religion-methodology]] |
| Coburn, *Devi-Mahatmya: The Crystallization of the Goddess Tradition* | [[goddess-tradition]], [[hinduism-sectarian-traditions]] |

