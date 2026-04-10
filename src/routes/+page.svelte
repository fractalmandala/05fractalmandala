<script lang="ts">
	import { onMount } from "svelte";
	import { loadWiki, type WikiEntry, getVideos } from "$lib/utils/locals";
	import { WIKIS } from "$lib/wikis";
	import Youtube from "$lib/comps/youtuber.svelte";

	let data: WikiEntry[] = [];
	let vids: any;
	let sY: number;

	onMount(async () => {
		data = await loadWiki("wiki-writings");
		vids = await getVideos();
	});
</script>

<svelte:window bind:scrollY={sY} />

<svelte:head>
	<title>Fractal Mandala</title>
	<meta
		name="description"
		content="Knowledge base and digital garden on Indian history and civilization."
	/>
</svelte:head>

<div class="page-shell wiki-home">
	<div class="box-1">
		<img
		class="machine"
		src="/images/fractalmachine.png"
		alt="fractal mandala"
		style="transform: rotate({sY / 1.5}deg)"
	/>
		<h1>
			Welcome to <br /><span class="themed">Fractal Maṇḍala</span>
		</h1>
		<p>
			I'm Amrit, a writer, designer, and researcher. I write extensively on Indian history and civilization, and on technology, AI, and consciousness.<br />Fractal Maṇḍala is a blog, knowledge base, and digital garden. I post here my own writings, fiction, poetry, and references like code snippets.
		</p>
		<p>
			Also featured here are some amazing knowledge banks - history, civilization, the works of Sri Aurobindo, Shri Sita Ram Goel, and Shri Ram Swarup. I've used Claude to index and wiki-fy their works, but it's a WIP. The site also features two ongoing creative projects. One is The Janapada, a historical fiction project set in ancient Bharata. The other is Thea, a science fiction project.
		</p>
		<p>
			Dive into my own work below, or use navigation areas to explore the knowledge banks.
		</p>
	</div>
	<div class="box-1">
		<div>
			<h2>Writings</h2>
			<p class="small">
				All of my own work can be grouped into these broad themes:
			</p>
		</div>
		<div class="grid two rgap8 mbot-1">
			{#if data.length > 0}
				{#each data as item}
					<p class="wiki-items tt-c">
						<a href={item.linkpath}>{item.meta.title}</a>
					</p>
				{/each}
				<p class="wiki-items tt-c">
					<a href="/wiki-writings">All Writings</a>
				</p>
			{/if}
		</div>
	</div>
	<div class="box-1">
		<div>
			<h2>Sections</h2>
			<p class="small">Explore all the sections on this site:</p>
		</div>
		<div class="grid two rgap8 mbot-1">
			{#each WIKIS as wiki}
				<p class="wiki-items tt-c">
					<a href="/{wiki.slug}">{wiki.label}</a>
				</p>
			{/each}
		</div>
	</div>
	{#if vids && vids.length > 0}
		<div class="box-2">
			<div>
				<h2>Videos</h2>
				<p class="small">Various talks and podcasts:</p>
			</div>
			<div class="grid two cgap16 rgap16">
				{#each vids as item}
					<div class="vid-box">
						<Youtube youTubeId={item.meta.caption}></Youtube>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="sass">

.machine
	object-fit: contain
	margin-bottom: 16px
	transform-origin: center center
	@media screen and (min-width: 1025px)
		width: 128px
	@media screen and (max-width: 1024px)
		width: 96px

h1
	font-weight: 600
	margin-bottom: var(--ds-std)
	@media screen and (min-width: 1025px)
		font-size: 36px

</style>
