<script lang="ts">
    export let data
	function externalLinks(node: HTMLElement) {
        const updateLinks = () => {
            const links = node.querySelectorAll('a');
            links.forEach(link => {
                // Optional: Only target external links (not starting with / or #)
                if (link.getAttribute('href')?.startsWith('http')) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer'; // Security best practice
                }
            });
        };

        updateLinks();

        return {
            // If data.content changes, we re-run the logic
            update: updateLinks 
        };
    }
</script>

<svelte:head>
    <title>{data.title} | Fractal Mandala</title>
    <meta name="description" content="{data.description}" />
</svelte:head>

<article>
<nav class="breadcrumb" aria-label="breadcrumb">
    <a href="/wiki-writings">Writings</a>
    <span aria-hidden="true"> > </span>
    <span aria-current="page">{data.title}</span>
</nav>
<h1 class="tt-c">{data.title}</h1>
<div class="article-box" use:externalLinks>
<svelte:component this={data.content} />
</div>
</article>

<style lang="sass">

.article-box
	@media screen and (min-width: 1025px)
		max-width: 900px

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

