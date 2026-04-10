<script lang="ts">
	import { onMount } from "svelte";
	import { Document } from "flexsearch";
	import Template from "$lib/comps/page-template.svelte";
	import type { SearchEntry } from "../api/search.json/+server";

	let query = $state("");
	let results = $state<SearchEntry[]>([]);
	let loading = $state(true);
	let inputEl: HTMLInputElement;

	// FlexSearch TS types are incomplete — any is intentional here
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let index: any;

	onMount(async () => {
		const res = await fetch("/api/search.json");
		const { pages } = (await res.json()) as { pages: SearchEntry[] };

		index = new Document({
			document: {
				id: "link",
				index: [{ field: "title", tokenize: "forward" }],
				store: ["title", "section", "link"],
			},
		});

		for (const page of pages) {
			index.add(page);
		}

		loading = false;
		inputEl?.focus();
	});

	function runSearch(q: string) {
		if (!q.trim() || !index) {
			results = [];
			return;
		}

		const raw = index.search(q, { enrich: true, limit: 30 });

		// raw[0] is the title field results
		results = (raw[0]?.result ?? []).map(
			(item: any) => item.doc as SearchEntry,
		);
	}

	let timer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const q = query;
		clearTimeout(timer);
		timer = setTimeout(() => runSearch(q), 180);
		return () => clearTimeout(timer);
	});

	const hasQuery = $derived(query.trim().length > 0);
</script>

<svelte:head>
	<title>Search - Fractal Mandala</title>
</svelte:head>

<Template showNav={false} showDesc={false} title="Search">
	<div class="box-0O">
		<input	bind:this={inputEl} bind:value={query}	type="search"	placeholder={loading ? "Building index…" : "Search…"}	disabled={loading}	autocomplete="off"	spellcheck="false"/>
		{#if hasQuery}
			<p class="small">{results.length} result{results.length !== 1 ? "s" : ""}</p>
		{/if}
		{#if hasQuery && results.length === 0 && !loading}
			<p class="small">No results for <em>"{query}"</em></p>
		{/if}
		{#if results.length > 0}
		<div class="grid two rgap8">
			{#each results as item (item.link)}
				<p class="wiki-labels tt-c"><a href={item.link}>{item.title}</a></p>
			{/each}
		</div>
	{/if}
	</div>
</Template>

<style lang="sass">

input
	padding: 8px
	outline: none
	border: 1px solid #a7a7a7
	border-radius: 4px
	@media screen and (min-width: 1025px)
		width: 480px

</style>

