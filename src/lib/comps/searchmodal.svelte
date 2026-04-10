<script lang="ts">

	import { onMount } from "svelte";
	import { Document } from "flexsearch";
	import type { SearchEntry, DisplayResult, Filter } from '$lib/utils/customtypes'
	import { searchMode, toggleSearch } from '$lib/utils/stores'
	import Close from '$lib/assets/close.svelte'

	const FILTERS: Filter[] = [
		{ label: 'Writings',    section: 'Writings' },
		{ label: 'Aurobindo',   section: 'Sri Aurobindo' },
		{ label: 'SRG & RS',    section: 'Sita Ram Goel & Ram Swarup' },
		{ label: 'History',     section: 'History' },
		{ label: 'Civilization',section: 'Civilization' },
	];

	let query = $state("");
	let activeFilter = $state<string | null>(null);
	let results = $state<DisplayResult[]>([]);
	let loading = $state(true);
	let inputEl = $state<HTMLInputElement | undefined>(undefined);
	let index: any;
	let contentMap = new Map<string, string>();

	function escapeRegex(str: string) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	function highlight(text: string, match: string): string {
		const regex = new RegExp(escapeRegex(match), "gi");
		return text.replace(regex, (m) => `<mark>${m}</mark>`);
	}

	function getExcerpt(text: string, searchTerm: string): string {
		if (!text) return "";
		const regex = new RegExp(escapeRegex(searchTerm), "gi");
		const match = regex.exec(text);
		if (!match) return "";
		const start   = Math.max(0, match.index - 40);
		const end     = Math.min(text.length, match.index + 120);
		const excerpt = text.substring(start, end).trim();
		const prefix  = start > 0 ? "…" : "";
		const suffix  = end < text.length ? "…" : "";
		return `${prefix}${highlight(excerpt, searchTerm)}${suffix}`;
	}

	onMount(async () => {
		const res = await fetch("/api/search.json");
		const { pages } = (await res.json()) as { pages: SearchEntry[] };
		for (const page of pages) {
			contentMap.set(page.link, page.content ?? "");
		}
		index = new Document({
			document: {
				id: "link",
				index: [
					{ field: "title",   tokenize: "forward" },
					{ field: "content", tokenize: "forward" },
				],
				store: ["title", "section", "link"],
			},
		});
		for (const page of pages) {
			index.add(page);
		}
		loading = false;
		inputEl?.focus();
	});

	function runSearch(q: string, filter: string | null) {
		if (!q.trim() || !index) {
			results = [];
			return;
		}
		const raw = index.search(q, { enrich: true, limit: 60 });
		const seen = new Set<string>();
		const titleMatchIds = new Set<string>();
		const deduped: SearchEntry[] = [];
		for (const fieldResult of raw) {
			for (const item of fieldResult.result) {
				const id = item.id as string;
				if (fieldResult.field === "title") titleMatchIds.add(id);
				if (!seen.has(id)) {
					seen.add(id);
					deduped.push(item.doc as SearchEntry);
				}
			}
		}
		// Apply section filter if active
		const filtered = filter
			? deduped.filter((item) => item.section === filter)
			: deduped;
		results = filtered.slice(0, 30).map((item) => {
			const titleHtml = highlight(item.title, q);
			let excerpt = "";
			if (!titleMatchIds.has(item.link)) {
				excerpt = getExcerpt(contentMap.get(item.link) ?? "", q);
			}
			return { item, titleHtml, excerpt };
		});
	}
	let timer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const q      = query;
		const filter = activeFilter;
		clearTimeout(timer);
		timer = setTimeout(() => runSearch(q, filter), 180);
		return () => clearTimeout(timer);
	});

	const hasQuery = $derived(query.trim().length > 0);

</script>

{#if $searchMode}
<section class="search-modal-canvas wiki-home">
	<div class="search-modal-inner">
		<div class="row" style="align-items: center; justify-content: space-between">
			<small class="themed">SEARCH</small>
			<button class="blank" onclick={toggleSearch}>
				<Close bigger={true}/>
			</button>
		</div>
		<div class="search-box">
			<input bind:this={inputEl} bind:value={query} type="search" placeholder={loading ? "Building Index…" : "Search …"} disabled={loading} autocomplete="off" spellcheck="false"/>
			<div class="filters">
				<small class="textgreylight">To search in specific section only:</small>
				<div class="filter-row">
					{#each FILTERS as f}
					<button class="filter-btn" class:active={activeFilter === f.section} onclick={() => activeFilter = activeFilter === f.section ? null : f.section}>{f.label}</button>
				{/each}
				</div>
			</div>
		</div>
		<!--
		<div class="box-n">
			<div>
				{#if hasQuery}
				<p class="small textgreylight">{results.length} result{results.length !== 1 ? "s" : ""}{#if activeFilter} in <em>{activeFilter}</em>{/if}</p>
				{/if}
				{#if hasQuery && results.length === 0 && !loading}
				<p class="small textgrey">No results for <em>"{query}"</em></p>
				{/if}
			</div>
		</div>
		-->
		{#if results.length > 0}
		<div class="grid two rgap8 cgap8" id="search-results" onclick={toggleSearch}>
			{#each results as { item, titleHtml, excerpt } (item.link)}
			<div class="nonce result-box">
				<small class="item-section textgreylight" style="margin: 0">{item.section}</small>
				<p class="title tt-c" style="margin: 0">
					<a href={item.link} style="margin: 0">{@html titleHtml}</a>
				</p>
				{#if excerpt}
					<p class="excerpt" style="margin: 0">{@html excerpt}</p>
				{/if}
			</div>
		{/each}
		</div>
		{/if}
	</div>
</section>
{/if}

<style lang="sass">

.grid.two
	align-items: start
	align-content: start

#search-results
	border: 1px solid var(--col-border)
	border-radius: 6px
	height: 70%
	overflow-y: scroll
	padding: 16px

.result-box
	text-align: left

.search-modal-canvas
	box-sizing: border-box
	width: 100vw
	height: 100vh
	position: fixed
	top: 0
	left: 0
	backdrop-filter: blur(10px)
	z-index: 999
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	padding: 64px 64px
	.search-modal-inner
		background: var(--background)
		border: 1px solid var(--col-border)
		width: 90%
		height: 100%
		border-radius: 5px
		padding: 32px
		display: flex
		flex-direction: column
		row-gap: var(--ds-l)
	@media screen and (max-width: 1024px)
		padding: 16px 16px
		.search-modal-inner
			width: 100%
			height: 100%
			padding: 16px
			row-gap: var(--ds-std)

input
	padding: 16px
	outline: none
	border: 1px solid var(--col-textgreylight)
	border-radius: 4px
	font-family: inherit
	font-size: 18px
	transition: border-color 0.15s
	width: 100%
	background: var(--background)
	color: var(--primary)
	&:focus
		border-color: var(--col-border)
		background: var(--background)

.filters
	display: flex
	flex-direction: column
	row-gap: var(--ds-sm)
	padding-top: var(--ds-std)

.filter-row
	display: flex
	flex-direction: row
	column-gap: var(--ds-sm)
	flex-wrap: wrap
	row-gap: var(--ds-sm)

.filter-btn
	padding: 4px 12px
	font-size: 12px
	font-family: 'Source Code Pro', monospace
	text-transform: uppercase
	letter-spacing: 0.04em
	border: 1px solid var(--col-border)
	border-radius: 6px
	background: var(--background)
	color: var(--col-textgrey)
	cursor: pointer
	transition: all 0.15s
	&:hover
		border-color: var(--col-green)
		color: var(--col-green)
	&.active
		background: var(--col-green)
		border-color: var(--col-green)
		color: var(--background)

p.title
	color: var(--primary)
	font-size: 15.22px
	a
		color: inherit

.result-box
	&:hover
		p.title
			color: var(--col-green)

small.item-section
	font-size: 10.56px

.excerpt
	font-size: 13px
	color: var(--col-textgrey)
	line-height: 1.5
	margin-top: 4px

:global(mark)
	background: var(--col-highlight)
	color: inherit
	border-radius: 2px
	padding: 0 1px

</style>