import { loadWiki } from '$lib/utils/locals';
import { WIKIS } from '$lib/wikis';

export async function load() {
  const results = await Promise.all(
    WIKIS.map(async (wiki) => ({
      slug: wiki.slug,
      label: wiki.label,
      entries: await loadWiki(wiki.slug),
    }))
  );
  return {
    wikiData: results.filter((w) => w.entries.length > 0),
  };
}

export const prerender = true;