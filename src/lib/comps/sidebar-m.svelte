<script lang="ts">
  import autoAnimate from '@formkit/auto-animate';
  import { menuMode, toggleMenu } from '$lib/utils/stores';
  import type { WikiEntry } from '$lib/utils/locals';

  let { wikiData }: { wikiData: { slug: string; label: string; entries: WikiEntry[] }[] } = $props();

  let openSlug = $state<string | null>(null);

  const toggleAccordion = (slug: string) => {
    openSlug = openSlug === slug ? null : slug;
  };
  </script>
  

  <div class="sidebar-column" class:onscreen={$menuMode}>
	{#each wikiData as wiki}
	  <div class="accordion" use:autoAnimate>
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
	<div class="fill-pad"></div>
  </div>
  
<style lang="sass">

.sidebar-column, .accordion, .accordion-items
	display: flex
	flex-direction: column
  
.sidebar-column
	box-sizing: border-box
	row-gap: 32px
	height: 100vh
	overflow-y: scroll
	position: fixed
	top: -100vh
	width: 100vw
	background: #FFFFFF
	z-index: 499
	align-items: flex-end
	padding-top: 112px
	padding-right: 16px
	padding-left: 16px
	transition: all 0.5s 
	&.onscreen
		top: 0

.fill-pad
	height: 48px
	width: 48px
  
.accordion
	row-gap: 16px
	align-items: flex-end
	text-align: right
	border-bottom: 1px solid var(--col-border)
	width: 100%
	padding-bottom: var(--ds-std)
  
.accordion-items
	row-gap: 12px
	align-items: flex-end
  
p.acco-title
	text-transform: uppercase
	font-size: 28px
	font-weight: 300
	cursor: pointer
	user-select: none
	text-align: right
	a
		text-decoration: none
		color: inherit
	&:hover
		color: var(--col-green)
  
.accordion-items
	p
		font-size: 21px
		text-transform: capitalize
	a
		text-decoration: none
		color: inherit
  </style>
  