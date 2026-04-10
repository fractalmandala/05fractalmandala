<script lang="ts">
	import Template from '$lib/comps/page-template.svelte'
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

<Template showNav={true} showDesc={true} link="/wiki-writings" linkLabel="Writings" title={data.title} description={data.description}>
	<article class="article-box" use:externalLinks>
		<svelte:component this={data.content} />
	</article>
</Template>

<style lang="sass">

.article-box
	@media screen and (min-width: 1025px)
		max-width: 900px

</style>

