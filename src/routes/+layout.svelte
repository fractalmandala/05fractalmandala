<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/styles/global.sass'
	import Footer from '$lib/comps/footer.svelte'
	import Header from '$lib/comps/header.svelte'
	import SidebarD from '$lib/comps/sidebar-d.svelte'
	import SidebarM from '$lib/comps/sidebar-m.svelte'
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { enhanceCodeBlocks } from '$lib/utils/code-copy';

	let { children } = $props();
	let mainEl: HTMLElement;

	onMount(() => enhanceCodeBlocks(mainEl));
	afterNavigate(() => enhanceCodeBlocks(mainEl));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<Header/>
</header>
<SidebarM/>
<main class="doc-grid">
	<div class="side">
		<div class="sticker">
			<SidebarD/>
		</div>
	</div>
	<div class="main" bind:this={mainEl}>
		{@render children()}
	</div>
</main>
<footer>
	<Footer/>
</footer>

<style lang="sass">

.doc-grid
	display: grid
	grid-auto-template: rows
	.main
		min-width: 0
		overflow-x: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: 340px 1fr
		grid-template-areas: "side main"
		padding-left: var(--pad-side)
		padding-right: var(--pad-side)
		.main
			padding-left: var(--pad-side)
		.side
			border-right: 1px solid var(--col-border)
			padding-top: 48px
			padding-bottom: 64px
			padding-right: 32px
			.sticker
				position: sticky
				top: 112px
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr
		grid-template-areas: "main"
		padding-left: 16px
		padding-right: 16px
		.side
			display: none

header
	height: 64px
	position: sticky
	top: 0
	background: linear-gradient(90deg,rgba(26, 26, 26, 1) 0%, rgba(3, 23, 10, 1) 100%)
	z-index: 999
	@media screen and (min-width: 1025px)
		padding-left: var(--pad-side)
		padding-right: var(--pad-side)
	@media screen and (max-width: 1024px)
		padding-left: 16px
		padding-right: 16px

footer
	height: 64px
	background: linear-gradient(90deg,rgba(26, 26, 26, 1) 0%, rgba(3, 23, 10, 1) 100%)
	z-index: 999
	@media screen and (min-width: 1025px)
		padding-left: var(--pad-side)
		padding-right: var(--pad-side)
	@media screen and (max-width: 1024px)
		padding-left: 16px
		padding-right: 16px

</style>
