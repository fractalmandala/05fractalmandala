<script lang="ts">

    export let data

</script>

<article>
<div class="breadcrumb">
    <p>Indian History</p>
    <p> > </p>
    <p class="tt-c">{data.title}</p>
</div>
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
    p
        font-size: 12px
        color: var(--col-textgreylight)

h1
    border-bottom: 1px solid var(--col-border)
    padding-bottom: 16px
    margin-bottom: 24px

</style>
