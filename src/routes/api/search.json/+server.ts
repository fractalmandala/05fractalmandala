import { json } from '@sveltejs/kit';
import wikisources from '$lib/assets/wikisources.json';

export const prerender = true;

export interface SearchEntry {
  title:   string;
  section: string;
  link:    string;
  content: string;
}

type WikiSource = {
  id: number;
  title: string;
  wiki: string;
  file: string;
  prelink: string;
  'actual link': string;
};

const WIKI_SOURCE_SECTIONS: Record<string, string> = {
  'wiki-auro':         'Sri Aurobindo',
  'wiki-civilization': 'Civilization',
  'wiki-history':      'History',
  'wiki-srgsrs':       'Sita Ram Goel & Ram Swarup',
};

// Pull title and id out of YAML frontmatter without a full parser
function parseFrontmatter(raw: string): { title?: string; id?: number } {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = match[1];
  const title = fm.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
  const idStr = fm.match(/^id:\s*(\d+)$/m)?.[1];
  return { title, id: idStr ? Number(idStr) : undefined };
}

function stripMarkdown(raw: string): string {
  return raw
    .replace(/^---[\s\S]*?---\n?/, '')            // frontmatter
    .replace(/<[^>]+>/g, ' ')                      // HTML tags
    .replace(/```[\s\S]*?```/g, ' ')               // fenced code blocks
    .replace(/`[^`]+`/g, ' ')                      // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')               // images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')      // links → text only
    .replace(/^#{1,6}\s+/gm, '')                   // headings
    .replace(/[*_]{1,3}([^*_\n]+)[*_]{1,3}/g, '$1') // bold / italic
    .replace(/^>\s+/gm, '')                        // blockquotes
    .replace(/^[-*_]{3,}\s*$/gm, '')               // horizontal rules
    .replace(/\s+/g, ' ')
    .trim();
}

// Uses ?raw so Vite gives us the file as a plain string — one pass for both metadata and content
async function globToEntries(
  rawFiles: Record<string, () => Promise<unknown>>,
  section: string
): Promise<SearchEntry[]> {
  const results = await Promise.all(
    Object.entries(rawFiles).map(async ([path, resolver]) => {
      try {
        const raw = (await resolver()) as string;
        const { title, id } = parseFrontmatter(raw);

        if (!title || id === 999) return null;

        const link    = path.replace('/src/routes', '').replace(/\.md$/, '');
        const content = stripMarkdown(raw).slice(0, 3000);

        return { title, section, link, content } satisfies SearchEntry;
      } catch {
        return null;
      }
    })
  );
  return results.filter((x): x is SearchEntry => x !== null);
}

function wikiSourcesToEntries(): SearchEntry[] {
  return (wikisources as WikiSource[]).map((item) => ({
    title:   item.title,
    section: WIKI_SOURCE_SECTIONS[item.wiki] ?? item.wiki,
    link:    `/${item.wiki}/posts/${item.id}`,
    content: '',
  }));
}

export async function GET() {
  const [
    wikiAuro,
    wikiCivilization,
    wikiHistory,
    wikiSrgsrs,
    wikiThea,
    wikiJanapada,
    wikiWritings,
    writingsPosts,
    theaPosts,
    videos,
  ] = await Promise.all([
    globToEntries(import.meta.glob('/src/routes/wiki-auro/*.md',              { query: '?raw', import: 'default' }), 'Sri Aurobindo'),
    globToEntries(import.meta.glob('/src/routes/wiki-civilization/*.md',      { query: '?raw', import: 'default' }), 'Civilization'),
    globToEntries(import.meta.glob('/src/routes/wiki-history/*.md',           { query: '?raw', import: 'default' }), 'History'),
    globToEntries(import.meta.glob('/src/routes/wiki-srgsrs/*.md',            { query: '?raw', import: 'default' }), 'Sita Ram Goel & Ram Swarup'),
    globToEntries(import.meta.glob('/src/routes/wiki-thea/*.md',              { query: '?raw', import: 'default' }), 'Thea'),
    globToEntries(import.meta.glob('/src/routes/wiki-janapada/*.md',          { query: '?raw', import: 'default' }), 'Janapada'),
    globToEntries(import.meta.glob('/src/routes/wiki-writings/*.md',          { query: '?raw', import: 'default' }), 'Writings'),
    globToEntries(import.meta.glob('/src/routes/wiki-writings/posts/*.md',    { query: '?raw', import: 'default' }), 'Writings'),
    globToEntries(import.meta.glob('/src/routes/wiki-thea/posts/*.md',        { query: '?raw', import: 'default' }), 'Thea'),
    globToEntries(import.meta.glob('/src/routes/videos/*.md',                 { query: '?raw', import: 'default' }), 'Videos'),
  ]);

  const pages: SearchEntry[] = [
    ...wikiAuro,
    ...wikiCivilization,
    ...wikiHistory,
    ...wikiSrgsrs,
    ...wikiThea,
    ...wikiJanapada,
    ...wikiWritings,
    ...writingsPosts,
    ...theaPosts,
    ...videos,
    ...wikiSourcesToEntries(),
  ];

  return json({ pages });
}
