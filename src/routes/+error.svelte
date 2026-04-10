<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status} | Fractal Mandala</title>
</svelte:head>

<div class="page-shell error-page">
  <p class="status">{page.status}</p>
  <h1>{page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
  <p class="message">{page.error?.message ?? ''}</p>
  <a href="/">← Back to all wikis</a>
</div>

<style lang="sass">

.error-page
  display: flex
  flex-direction: column
  gap: 12px

p.status
  font-size: 12px
  font-weight: 600
  text-transform: uppercase
  color: var(--col-textgreylight)
  margin: 0

h1
  margin: 0
  border-bottom: 1px solid var(--col-border)
  padding-bottom: 16px

p.message
  font-size: 14px
  color: var(--col-textgrey)
  margin: 0

a
  font-size: 14px
  color: var(--col-green)
  text-decoration: none

</style>
