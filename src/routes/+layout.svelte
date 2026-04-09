<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import '$lib/styles/global.sass'
    import Footer from '$lib/comps/footer.svelte'
    import Header from '$lib/comps/header.svelte'
    import SidebarD from '$lib/comps/sidebar-d.svelte'
    import SidebarM from '$lib/comps/sidebar-m.svelte'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
    <Header/>
</header>
<SidebarM/>
<main class="doc-grid">
    <div class="side">
        <div class="sticker">
            <SidebarD/>
        </div>
    </div>
    <div class="main">
        {@render children()}
    </div>
</main>
<footer>
    <Footer/>
</footer>

<style lang="sass">

.doc-grid
    display: grid
    grid-auto-template: rows
    @media screen and (min-width: 1025px)
        grid-template-columns: 400px 1fr
        grid-template-areas: "side main"
        padding-left: 64px
        padding-right: 64px
        .side
            border-right: 1px solid var(--col-border)
            padding-top: 48px
            padding-bottom: 64px
            .sticker
                position: sticky
                top: 112px
    @media screen and (max-width: 1024px)
        grid-template-columns: 1fr
        grid-template-areas: "main"
        padding-left: 16px
        padding-right: 16px
        .side
            display: none

header
    height: 64px
    border-bottom: 1px solid var(--col-border)
    position: sticky
    top: 0
    background: #FFFFFF
    z-index: 999
    @media screen and (min-width: 1025px)
        padding-left: 64px
        padding-right: 64px
    @media screen and (max-width: 1024px)
        padding-left: 16px
        padding-right: 16px

footer
    height: 64px
    border-top: 1px solid var(--col-border)
    background: #FFFFFF
    z-index: 999
    @media screen and (min-width: 1025px)
        padding-left: 64px
        padding-right: 64px
    @media screen and (max-width: 1024px)
        padding-left: 16px
        padding-right: 16px

</style>
