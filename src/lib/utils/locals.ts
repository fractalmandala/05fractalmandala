import type { ComponentType } from 'svelte';
import { error } from '@sveltejs/kit';
import wikisources from '$lib/assets/wikisources.json';

type WikiSource = {
  id: number;
  file: string;
  title: string;
  wiki: string;
  prelink: string;
  'actual link': string;
};

export interface WikiSourceEntry {
  id: number;
  title: string;
  link: string;
  href: string;
}

export function loadWikiSources(wikiSlug: string): WikiSourceEntry[] {
  return (wikisources as WikiSource[])
    .filter((item) => item.wiki === wikiSlug)
    .map((item) => ({
      id: item.id,
      title: item.title,
      link: item['actual link'],
      href: `/${wikiSlug}/posts/${item.id}`,
    }));
}

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

export async function archiveGroups() {
    const allfiles = import.meta.glob('/src/routes/wiki-writings/posts/*.md');
    const filed = Object.entries(allfiles);
    const eachfiled = await Promise.all(
        filed.map(async ([, resolver]) => {
            // @ts-expect-error
            const { metadata } = await resolver();
            if (!metadata?.date) return null;
            const date = new Date(metadata.date as string);
            if (isNaN(date.getTime())) return null;
            const monthYear = date.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
            });
            return { monthYear, date };
        })
    );
    // remove nulls
    const valid = eachfiled.filter((x): x is { monthYear: string; date: Date } => x !== null);
    // Sort by date descending
    valid.sort((a, b) => b.date.getTime() - a.date.getTime());
    // Get unique labels while preserving order
    const seen = new Set<string>();
    return valid.filter(item => {
        if (seen.has(item.monthYear)) return false;
        seen.add(item.monthYear);
        return true;
    });
}

type PostModule = {
	metadata?: {
		date?: string;
		tags?: string[];
	};
};

export async function getTagsWithCounts() {
	const posts = import.meta.glob('/src/routes/wiki-writings/posts/*.md');
	const filed = Object.entries(posts);
	const tagCounts = new Map<string, number>();

	await Promise.all(
		filed.map(async ([, resolver]) => {
			const mod = (await resolver()) as PostModule;

			if (!mod.metadata) return;

			const tags = mod.metadata.tags;
			if (!Array.isArray(tags)) return;

			tags.forEach((tag) => {
				if (typeof tag !== 'string' || !tag.trim()) return;
				tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
			});
		})
	);

	const tags = [...tagCounts.entries()].map(([tag, count]) => ({
		tag,
		count
	}));
	return tags.sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function getJanapada(){
	const allfiles = import.meta.glob('/src/routes/wiki-janapada/*.md')
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
	return eachfiled
}

export async function getJanapadaGroups() {
    const allFiles = import.meta.glob('/src/routes/wiki-janapada/*.md');
    const files = Object.entries(allFiles);
    
    const allGroups = await Promise.all(
      files.map(async ([, resolver]) => {
        // Define what the markdown module looks like
        const module = await resolver() as { 
            metadata: { group?: string | string[] } 
        };
        
        return module.metadata.group;
      })
    );

    // Flattening handles both single strings and arrays of groups
    const distinctGroups = [...new Set(allGroups.flat().filter((group): group is string => !!group))].sort();
    
    return distinctGroups;
}

  export async function selectedJanapadaGroup(group:string){
	const allfiles = import.meta.glob('/src/routes/wiki-janapada/*.md')
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
 const groupedPosts = eachfiled.filter(post => post.meta.group && post.meta.group.includes(group)).sort();
	return groupedPosts
}