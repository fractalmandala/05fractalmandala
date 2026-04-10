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
	<div class="row wrap rgap8 cgap8 mtop-2 mbot-1">
		{#each tags as item}
			<p class="wiki-labels"><a href="/wiki-writings/tags/{item.tag}">{item.tag}</a></p>
		{/each}
	</div>
</div>
{/if}

<style lang="sass">

p.wiki-labels
	padding: 4px 16px
	margin: 0
	background: #e1e1e1
	color: #000000
	font-size: 14px
	text-transform: uppercase
	transition: all 0.07s ease
	a
		color: inherit
	&:hover
		background: var(--col-green)
		color: #FFFFFF
	@media screen and (max-width: 1024px)
		font-size: 13px

.row.wrap
	display: flex
	flex-direction: row
	flex-wrap: wrap

</style>