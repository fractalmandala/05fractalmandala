<script lang="ts">
    export let data
</script>

<svelte:head>
    <title>{data.title} | {data.wikiLabel} | Fractal Mandala</title>
    <meta name="description" content="{data.wikiLabel} — {data.title}" />
</svelte:head>

<article>
<nav class="breadcrumb" aria-label="breadcrumb">
    <a href="/{data.wikiSlug}">{data.wikiLabel}</a>
    <span aria-hidden="true"> > </span>
    <span aria-current="page">{data.title}</span>
</nav>
<h1 class="tt-c">{data.title}</h1>
<svelte:component this={data.content} />
</article>

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

