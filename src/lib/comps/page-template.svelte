<script lang="ts">

	export let title:string = ' '
	export let description:string = ' '
	export let link = ' '
	export let linkLabel = ' '

	export let showDesc:boolean = true
	export let showNav:boolean = false

</script>

<div class="page-template">
	{#if showNav}
	<nav class="breadcrumb" aria-label="breadcrumb">
		<a href="{link}">{linkLabel}</a>
	</nav>
	{/if}
	<div class="page-title">
		<h1>{title}</h1>
		{#if showDesc}
		<p class="small textgreylight">{description}</p>
		{/if}
	</div>
	<slot></slot>
</div>

<style lang="sass">

.page-title
	border-bottom: 1px solid var(--col-border)
	padding-bottom: 1rem
	margin-bottom: 2.4rem
	h1
		font-weight: 600
	p
		margin-bottom: 0

.page-template
	display: flex
	flex-direction: column

.breadcrumb
	display: flex
	flex-direction: row
	column-gap: 4px
	align-items: center
	margin-bottom: 8px
	font-size: 12px
	a
		color: var(--col-green)
		text-decoration: none

</style>