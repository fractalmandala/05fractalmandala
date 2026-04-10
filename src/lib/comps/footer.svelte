<script lang="ts">

	import { darkTheme, toggleTheme } from '$lib/utils/stores'
	import Sun from '$lib/assets/sun.svelte'
	import Moon from '$lib/assets/moon.svelte'

</script>
<div class="footer-row">
	<p class="textgrey"><a href="/wiki-writings/posts/about">Amritanshu Pandey</a> | <a href="https://x.com/saamaanyafreaky" target="_blank" rel="noreferrer">Twitter/X</a> | 2026</p>
	<button class="blank" onclick={toggleTheme}>
		{#if $darkTheme}
		<Sun/>
		{:else}
		<Moon/>
		{/if}
	</button>
</div>

<style lang="sass">

.footer-row
	display: flex
	flex-direction: row
	align-items: center
	justify-content: space-between
	height: 100%
	width: 100%
	border-top: 1px solid var(--col-border)
	p
		font-size: 12.5px
		font-family: 'Source Code Pro', monospace

p.textgrey
	color: var(--col-textgreylight)
	a
		color: var(--col-green)
		text-decoration: none

</style>
