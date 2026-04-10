<script lang="ts">

	import type { WikiEntry } from '$lib/utils/locals';
	import autoAnimate from '@formkit/auto-animate';

	let { wikiData }: { wikiData: { slug: string; label: string; entries: WikiEntry[] }[] } = $props();
	let openSlug = $state<string | null>(null);

	const toggleAccordion = (slug: string) => {
		if (openSlug === slug) {
			openSlug = null;
		} else {
			openSlug = slug;
		}
	};

</script>

<div class="sidebar-column">
	{#each wikiData as wiki}
		<div class="accordion"  use:autoAnimate>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<p class="acco-title" on:click={() => toggleAccordion(wiki.slug)}>
				<a href="/{wiki.slug}">{wiki.label}</a>
			</p>
			{#if openSlug === wiki.slug}
				<div class="accordion-items">
					{#each wiki.entries as item}
						<p class="textgrey"><a href={item.linkpath}>{item.meta.title}</a></p>
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
	height: calc(100vh - 210px)
	overflow-y: scroll
	padding-right: 32px

::-webkit-scrollbar
	width: 4px
::-webkit-scrollbar-thumb
	background: var(--col-green)
	border-bottom: 280px solid #FFFFFF
::-webkit-scrollbar-track
	background: #FFFFFF

.accordion
	row-gap: 1em
	padding-bottom: 20px
	background: #FFFFFF
	border-bottom: 1px solid var(--col-border)

.accordion-items
	row-gap: 12px

p.acco-title
	text-transform: uppercase
	font-size: 13.7px
	cursor: pointer
	user-select: none
	font-family: 'Source Code Pro', monospace
	a
		text-decoration: none
		color: inherit
	&:hover
		color: var(--col-green)

.accordion-items
	p
		font-size: 14px
		text-transform: capitalize
		transition: all 0.2s cubic-bezier(0.640, 0.000, 0.000, 1.000)
		a
			text-decoration: none
			color: inherit
		&:hover
			color: var(--col-green)
			font-weight: 500
		

</style>
