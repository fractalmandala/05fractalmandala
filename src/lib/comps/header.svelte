<script lang="ts">
	import { page } from '$app/state'
	import { WIKIS } from "$lib/wikis";
	import Mandala from "$lib/assets/mandala.svelte";
	import Menu from "$lib/assets/menu.svelte";
	import Close from "$lib/assets/close.svelte";
	import { toggleMenu, menuMode } from "$lib/utils/stores";

	let text = "FRACTALMAṆḌALA";
	const rootPath = $derived(page.url.pathname.split('/')[1]);
</script>

<div class="header-comp">
	<div class="areaoflogo">
		<a class="logo" href="/">
			<Mandala />
		</a>
		<a class="name" href="/">
			{#each text.split("") as char, i}
				<span
					class="text-animation char-{i}"
					style="animation-delay: {i * 0.04}s">{char}</span
				>
			{/each}
		</a>
	</div>
	<nav class="nav-row">
		{#each WIKIS as wiki}
			<p class:themed={rootPath === wiki.slug}><a href="/{wiki.slug}">{wiki.label}</a></p>
		{/each}
	</nav>
	<button class="menu" onclick={toggleMenu}>
		{#if $menuMode}
			<Close />
		{:else}
			<Menu />
		{/if}
	</button>
</div>

<style lang="sass">

.header-comp
	display: flex
	flex-direction: row
	align-items: center
	justify-content: space-between
	width: 100%
	height: 100%

.nav-row
	display: flex
	flex-direction: row
	align-items: center
	column-gap: 16px
	p
		font-size: 14px
		text-transform: uppercase
		font-weight: 500
		color: #FFFFFF
		font-family: 'Source Code Pro', monospace
		letter-spacing: -0.5px
		a
			text-decoration: none
			color: inherit
		&:hover
			a
				text-decoration: underline
				text-decoration-color: var(--col-green)
	@media screen and (max-width: 1024px)
		display: none

.menu
	background: none
	border: none
	padding: 0
	cursor: pointer
	@media screen and (min-width: 1025px)
		display: none
	@media screen and (max-width: 1024px)
		display: flex
		align-items: center
		justify-content: center

.areaoflogo
	display: flex
	flex-direction: row
	align-items: center
	column-gap: 0.5rem
	.name
		text-decoration: none
		color: #FFFFFF
		font-family: 'Iosevka Charon', monospace
		font-size: 18.6px
		font-weight: 600
		.char-7, .char-8, .char-9, .char-10, .char-11, .char-12, .char-13
			color: var(--col-green)
	&:hover
		.name
			.text-animation
				animation: colorchange 1s infinite forwards

.logo
	width: 20px
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start

@keyframes colorchange
	0%
		color: #b4f000
	50%
		color: var(--col-green)
	100%
		color: #b4f000

</style>
