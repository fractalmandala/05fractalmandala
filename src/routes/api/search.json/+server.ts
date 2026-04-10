import { json } from '@sveltejs/kit';

export const prerender = true;

export interface SearchEntry {
  title: string;
  section: string;
  link: string;
}

type MarkdownModule = {
  metadata?: {
    title?: string;
    id?: number;
  };
};

async function globToEntries(
  files: Record<string, () => Promise<unknown>>,
  section: string
): Promise<SearchEntry[]> {
  const results = await Promise.all(
    Object.entries(files).map(async ([path, resolver]) => {
      try {
        const mod = (await resolver()) as MarkdownModule;
        const title = mod.metadata?.title;
        const id = mod.metadata?.id;

        // Skip drafts (id: 999 convention)
        if (!title || id === 999) return null;

        const link = path
          .replace('/src/routes', '')
          .replace(/\.md$/, '');

        return { title, section, link } satisfies SearchEntry;
      } catch {
        return null;
      }
    })
  );
  return results.filter((x): x is SearchEntry => x !== null);
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
    globToEntries(import.meta.glob('/src/routes/wiki-auro/*.md'), 'Sri Aurobindo'),
    globToEntries(import.meta.glob('/src/routes/wiki-civilization/*.md'), 'Civilization'),
    globToEntries(import.meta.glob('/src/routes/wiki-history/*.md'), 'History'),
    globToEntries(import.meta.glob('/src/routes/wiki-srgsrs/*.md'), 'Sita Ram Goel & Ram Swarup'),
    globToEntries(import.meta.glob('/src/routes/wiki-thea/*.md'), 'Thea'),
    globToEntries(import.meta.glob('/src/routes/wiki-janapada/*.md'), 'Janapada'),
    globToEntries(import.meta.glob('/src/routes/wiki-writings/*.md'), 'Writings'),
    globToEntries(import.meta.glob('/src/routes/wiki-writings/posts/*.md'), 'Writings'),
    globToEntries(import.meta.glob('/src/routes/wiki-thea/posts/*.md'), 'Thea'),
    globToEntries(import.meta.glob('/src/routes/videos/*.md'), 'Videos'),
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
  ];

  return json({ pages });
}
