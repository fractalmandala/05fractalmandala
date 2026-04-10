<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Tag: {data.tag} | Fractal Mandala</title>
	<meta name="description" content="Personal writings." />
</svelte:head>

<section>
	<nav class="breadcrumb" aria-label="breadcrumb">
		<a href="/wiki-writings">Writings</a>
		<span aria-hidden="true"> > </span>
		<span aria-current="page">Tag: {data.tag}</span>
	</nav>
	<h1 class="tt-c">Tag: {data.tag}</h1>
	{#if data.posts.length > 0}
	<div>
		{#each data.posts as post}
			<p class="wiki-items tt-c">
				<a href={post.link}>{post.title}</a>
			</p>
		{/each}
	</div>
{:else}
	<p>No posts found for this tag.</p>
{/if}
</section>

<style lang="sass">
	
.breadcrumb
	display: flex
	flex-direction: row
	column-gap: 4px
	align-items: center
	margin-bottom: 8px
	font-size: 12px
	color: var(--col-textgreylight)
	a
		color: inherit
		text-decoration: none
		&:hover
			color: var(--col-green)
	
h1
	border-bottom: 1px solid var(--col-border)
	padding-bottom: 16px
	margin-bottom: 24px
	
	</style>
	
	