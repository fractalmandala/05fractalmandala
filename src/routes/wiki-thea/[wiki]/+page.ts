import { loadWikiArticle } from "$lib/utils/locals";
import { getWikiLabel } from "$lib/wikis";

export async function load({ params, url }: { params: { wiki: string }; url: URL }) {
  const wikiSlug = url.pathname.split("/")[1];
  return loadWikiArticle(wikiSlug, params.wiki, getWikiLabel(wikiSlug));
}

