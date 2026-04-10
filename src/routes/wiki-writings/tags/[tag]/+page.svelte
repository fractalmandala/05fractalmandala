<script lang="ts">

	import Template from '$lib/comps/page-template.svelte'
	import Tags from '$lib/comps/tags.svelte'
	import type { PageData } from './$types';
	export let data: PageData;

</script>

<svelte:head>
	<title>Tag: {data.tag} | Fractal Mandala</title>
	<meta name="description" content="Personal writings." />
</svelte:head>

<Template showNav={true} showDesc={false} link="/wiki-writings" linkLabel="Writings" title="tag- {data.tag}">
	{#if data.posts.length > 0}
	<div class="grid two rgap8 mtop-2 mbot-1">
		{#each data.posts as post}
			<p class="wiki-items tt-c">
				<a href={post.link}>{post.title}</a>
			</p>
		{/each}
	</div>
{:else}
	<p>No posts found for this tag.</p>
{/if}
<Tags/>
</Template>

<style lang="sass">

.grid.two
	border-bottom: 1px solid var(--col-border)
	padding-bottom: 24px

</style>