<script lang="ts">
  import { onMount } from "svelte";
  import { loadWiki, type WikiEntry } from "$lib/utils/locals";
  import { WIKIS } from "$lib/wikis";

  let wikiData: { slug: string; label: string; entries: WikiEntry[] }[] = [];
  let openSlug: string | null = null;

  const toggleAccordion = (slug: string) => {
    if (openSlug === slug) {
      openSlug = null;
    } else {
      openSlug = slug;
    }
  };

  onMount(async () => {
    const results = await Promise.all(
      WIKIS.map(async (wiki) => ({
        slug: wiki.slug,
        label: wiki.label,
        entries: await loadWiki(wiki.slug),
      }))
    );
    // Only show wikis that have at least one article
    wikiData = results.filter((w) => w.entries.length > 0);
  });
</script>

<div class="sidebar-column">
  {#each wikiData as wiki}
    <div class="accordion">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <p class="acco-title" on:click={() => toggleAccordion(wiki.slug)}>
        <a href="/{wiki.slug}/+page">{wiki.label}</a>
      </p>
      {#if openSlug === wiki.slug}
      <div class="accordion-items">
        {#each wiki.entries as item}
          <p><a href={item.linkpath}>{item.meta.title}</a></p>
        {/each}
      </div>
      {/if}
    </div>
  {/each}
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
    cursor: pointer
    user-select: none
    a
        text-decoration: none
        color: inherit
    &:hover
        color: var(--col-green)

.accordion-items
    p
        font-size: 14px
        text-transform: capitalize
        color: var(--col-textgrey)
    a
        text-decoration: none
        color: inherit

</style>
