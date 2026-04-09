import type { ComponentType } from 'svelte';
import { error } from '@sveltejs/kit';

// Vite requires import.meta.glob() to receive a static string literal —
// dynamic variables in the pattern aren't allowed. The workaround is a
// wildcard glob that captures all wiki markdown files, then filter by
// wiki slug at runtime.

export interface WikiMeta {
  id: number;
  title: string;
  [key: string]: unknown;
}

export interface WikiEntry {
  meta: WikiMeta;
  linkpath: string;
}

const allWikiFiles = import.meta.glob('/src/routes/wiki-*/*.md');

// Mirrors what CSS text-transform: capitalize does, so <title> tags
// match the visual rendering on the page.
function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  );
}

export interface WikiArticle {
  content: ComponentType;
  title: string;
  id: number;
  wikiSlug: string;
  wikiLabel: string;
}

// Used by every [wiki]/+page.ts load function.
// wikiSlug comes from url.pathname.split('/')[1] — e.g. 'wiki-auro'.
// articleSlug comes from params.wiki — e.g. 'sri-aurobindo-life'.
export async function loadWikiArticle(
  wikiSlug: string,
  articleSlug: string,
  wikiLabel: string
): Promise<WikiArticle> {
  const key = `/src/routes/${wikiSlug}/${articleSlug}.md`;
  const resolver = allWikiFiles[key] as
    | (() => Promise<{ default: ComponentType; metadata: WikiMeta }>)
    | undefined;

  if (!resolver) throw error(404, `Article not found: ${articleSlug}`);

  const post = await resolver();
  return {
    content: post.default,
    title: toTitleCase(post.metadata.title),
    id: post.metadata.id,
    wikiSlug,
    wikiLabel,
  };
}

export async function loadWiki(wikiSlug: string): Promise<WikiEntry[]> {
  const entries = Object.entries(allWikiFiles).filter(([path]) =>
    path.startsWith(`/src/routes/${wikiSlug}/`)
  );

  const resolved = await Promise.all(
    entries.map(async ([path, resolver]) => {
      try {
        const mod = await (resolver as () => Promise<{ metadata: WikiMeta }>)();
        return {
          meta: mod.metadata,
          linkpath: path.replace(/^\/src\/routes/, '').replace(/\.md$/, ''),
        };
      } catch (e) {
        console.warn(`[loadWiki] Failed to load ${path}:`, e);
        return null;
      }
    })
  );

  return resolved
    .filter((item): item is WikiEntry => item !== null && Number(item.meta.id) !== 999)
    .sort((a, b) => (a.meta.title || '').localeCompare(b.meta.title || ''));
}

export async function getVideos(){
	const allfiles = import.meta.glob('/src/routes/videos/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-expect-error//why
			const { metadata } = await resolver()
			const pathitem = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: pathitem
			}
		})
	)
	return eachfiled.sort((a, b) => b.meta.sequence - a.meta.sequence);
}
