<script lang="ts">

	import { onMount } from 'svelte'
	import { getTagsWithCounts } from '$lib/utils/locals';

	let tags:any

	onMount(() => {
		(async() => {
			tags = await getTagsWithCounts();
		})();
	})

</script>

{#if tags && tags.length > 0}
<div class="box-2">
	<div>
		<h2>Tags</h2>
	</div>
	<div class="row wrap rgap8 cgap8">
		{#each tags as item}
			<p class="filter-btn"><a href="/wiki-writings/tags/{item.tag}">{item.tag}</a></p>
		{/each}
	</div>
</div>
{/if}

<style lang="sass">

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
	a
		color: inherit
	&:hover
		border-color: var(--col-green)
		color: var(--col-green)
	&:click
		background: var(--col-green)
		border-color: var(--col-green)
		color: var(--background)

</style>