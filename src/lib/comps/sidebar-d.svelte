<script lang="ts">
  import { onMount } from "svelte";
  import {
    wikiAuro,
    wikiSRGSRS,
    wikiCivilization,
    wikiWritings,
    wikiThea,
    wikiJanapada,
    wikiHistory
  } from "$lib/utils/locals";

  let dataAuro: any;
  let dataSS: any;
  let dataCiv: any;
  let dataHist: any;
  let dataOwn: any;
  let dataThea: any;
  let dataJana: any;

  onMount(() => {
    (async () => {
        dataAuro = await wikiAuro();
        dataSS = await wikiSRGSRS();
        dataCiv = await wikiCivilization();
        dataOwn = await wikiWritings();
        dataHist = await wikiHistory();
        dataThea = await wikiThea();
        dataJana = await wikiJanapada();
    })();
  });
</script>

<div class="sidebar-column">
    {#if dataOwn && dataOwn.length > 0}
    <div class="accordion">
      <p class="acco-title"><a href="/wiki-writings/+page">Own Writings</a></p>
      <div class="accordion-items">
        {#each dataOwn as item}
          {#if item.meta.id !== 999}
            <p><a href={item.linkpath}>{item.meta.title}</a></p>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  {#if dataCiv && dataCiv.length > 0}
    <div class="accordion">
      <p class="acco-title">
        <a href="/wiki-civilization/+page">Civilizational Phenomenology</a>
      </p>
      <div class="accordion-items">
        {#each dataCiv as item}
          {#if item.meta.id !== 999}
            <p><a href={item.linkpath}>{item.meta.title}</a></p>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  {#if dataHist && dataHist.length > 0}
    <div class="accordion">
      <p class="acco-title">
        <a href="/wiki-history/+page">Indian History</a>
      </p>
      <div class="accordion-items">
        {#each dataHist as item}
          {#if item.meta.id !== 999}
            <p><a href={item.linkpath}>{item.meta.title}</a></p>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  {#if dataAuro && dataAuro.length > 0}
    <div class="accordion">
      <p class="acco-title"><a href="/wiki-auro/+page">Sri Aurobindo</a></p>
      <div class="accordion-items">
        {#each dataAuro as item}
          {#if item.meta.id !== 999}
            <p><a href={item.linkpath}>{item.meta.title}</a></p>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  {#if dataSS && dataSS.length > 0}
    <div class="accordion">
      <p class="acco-title">
        <a href="/wiki-srg&srs/+page">Sita Ram Goel & Ram Swarup</a>
      </p>
      <div class="accordion-items">
        {#each dataSS as item}
          {#if item.meta.id !== 999}
            <p><a href={item.linkpath}>{item.meta.title}</a></p>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  {#if dataThea && dataThea.length > 0}
  <div class="accordion">
    <p class="acco-title">
      <a href="/wiki-thea/+page">Thea</a>
    </p>
    <div class="accordion-items">
      {#each dataThea as item}
        {#if item.meta.id !== 999}
          <p><a href={item.linkpath}>{item.meta.title}</a></p>
        {/if}
      {/each}
    </div>
  </div>
{/if}
  {#if dataJana && dataJana.length > 0}
  <div class="accordion">
    <p class="acco-title">
      <a href="/wiki-janapada/+page">The Janapada</a>
    </p>
    <div class="accordion-items">
      {#each dataJana as item}
        {#if item.meta.id !== 999}
          <p><a href={item.linkpath}>{item.meta.title}</a></p>
        {/if}
      {/each}
    </div>
  </div>
{/if}
</div>

<style lang="sass">

.sidebar-column, .accordion, .accordion-items
    display: flex
    flex-direction: column

.sidebar-column
    row-gap: 24px
    height: calc(100vh - 240px)
    overflow-y: scroll

.accordion
    row-gap: 8px

.accordion-items
    row-gap: 4px

p.acco-title
    text-transform: uppercase
    font-size: 14px
    font-weight: 600
    a
        text-decoration: none
        color: inherit

.accordion-items
    p
        font-size: 14px
        text-transform: capitalize
        color: var(--col-textgrey)
    a
        text-decoration: none
        color: inherit

</style>
