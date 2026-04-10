<script lang="ts">
  import { onMount } from "svelte";
  import { loadWiki, type WikiEntry, getVideos } from "$lib/utils/locals";
  import { WIKIS } from '$lib/wikis';
  import Youtube from '$lib/comps/youtuber.svelte'

  let data: WikiEntry[] = []
  let vids:any
  let sY:number

  onMount(async () => {
        data = await loadWiki('wiki-writings');
        vids = await getVideos();
    })
</script>

<svelte:window bind:scrollY={sY}/>

<svelte:head>
    <title>Fractal Mandala</title>
    <meta name="description" content="Knowledge base and digital garden on Indian history and civilization." />
</svelte:head>

<div class="page-shell wiki-home">
	<img class="machine" src="/images/fractalmachine.png" alt="fractal mandala" style="transform: rotate({sY / 1.5}deg)"/>
    <div class="box-one">
		<h1>
			Welcome to <br><span class="themed">Fractal Maṇḍala</span>
		</h1>
        <p>
            I am a writer, designer, web developer and researcher. I write extensively on Indian history and civilization, and some times on other things like technology, AI, and consciousness. This digital garden features my own work, alongside various knowledge bases on Indian history and civilization, of great thinkers like Sri Aurobindo, Shri Ram Swarup, and Shri Sita Ram Goel.
        </p>
        <p>
            The site also features two ongoing creative projects. One is The Janapada, a historical fiction project set in ancient Bharata. The other is Thea, a science fiction project.
        </p>
    </div>
    <div class="box-one">
        <h2>My Writings</h2>
        <p>All of my own work can be grouped into these broad themes:</p>
        <div class="grid two">
            {#if data.length > 0}
            {#each data as item}
                <p class="wiki-items tt-c"><a href={item.linkpath}>{item.meta.title}</a></p>
            {/each}
        {/if}
        </div>
    </div>
    <div class="box-one">
        <h2>All Wikis</h2>
        <p>Explore all the knowledge bases on this site:</p>
        <div class="grid two">
            {#each WIKIS as wiki}
            <p class="wiki-items tt-c"><a href="/{wiki.slug}">{wiki.label}</a></p>
        {/each}
        </div>
    </div>
    {#if vids && vids.length > 0}
    <div class="box-two">
        <h2>Videos</h2>
        <p>Various talks and podcasts:</p>
        <div class="grid three cgap24 rgap24">
            {#each vids as item}
                <div class="vid-box">
                    <Youtube youTubeId={item.meta.caption}></Youtube>
                </div>
            {/each}
        </div>
    </div>
    {/if}
</div>

<style lang="sass">

.machine
	object-fit: contain
	margin-bottom: 16px
	transform-origin: center center
	@media screen and (min-width: 1025px)
		width: 128px
	@media screen and (max-width: 1024px)
		width: 96px

.box-one
	border-bottom: 1px solid var(--col-border)
	padding-bottom: 24px

h1
	font-weight: 600
	margin-bottom: 1em
	@media screen and (min-width: 1025px)
		font-size: 42px

</style>
