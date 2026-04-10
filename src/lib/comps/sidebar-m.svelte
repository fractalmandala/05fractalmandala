<script lang="ts">
	import { onMount } from "svelte";
	import { menuMode, toggleMenu } from '$lib/utils/stores'
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
  
{#if $menuMode}
  <div class="sidebar-column">
	{#each wikiData as wiki}
	  <div class="accordion">
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<p class="acco-title" on:click={() => toggleAccordion(wiki.slug)}>
		  <a href="/{wiki.slug}">{wiki.label}</a>
		</p>
		{#if openSlug === wiki.slug}
		<div class="accordion-items" on:click={toggleMenu}>
		  {#each wiki.entries as item}
			<p><a href={item.linkpath}>{item.meta.title}</a></p>
		  {/each}
		</div>
		{/if}
	  </div>
	{/each}
  </div>
{/if}
  
<style lang="sass">
.sidebar-column, .accordion, .accordion-items
	display: flex
	flex-direction: column
  
.sidebar-column
	row-gap: 24px
	height: 100vh
	overflow-y: scroll
	position: fixed
	top: 0
	right: 0
	width: 100vw
	background: linear-gradient(90deg,rgba(26, 26, 26, 1) 0%, rgba(3, 23, 10, 1) 100%)
	z-index: 499
	padding-top: 112px
	padding-bottom: 32px
	align-items: flex-end
	padding-right: 16px
  
.accordion
	row-gap: 12px
	align-items: flex-end
  
.accordion-items
	row-gap: 12px
	align-items: flex-end
  
p.acco-title
	text-transform: uppercase
	font-size: 20px
	font-weight: 500
	cursor: pointer
	user-select: none
	text-align: right
	color: #FFFFFF
	a
		text-decoration: none
		color: inherit
	&:hover
		color: var(--col-green)
  
.accordion-items
	p
		font-size: 18px
		text-transform: capitalize
		color: #FFFFFF
	a
		text-decoration: none
		color: inherit
  </style>
  