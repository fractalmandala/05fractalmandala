// Single source of truth for all wiki sections.
// Used by: sidebar, +page.ts load functions, header, homepage.

export const WIKIS = [
  { slug: 'wiki-writings',     label: 'Writings' },
  { slug: 'wiki-civilization', label: 'Civilization' },
  { slug: 'wiki-history',      label: 'History' },
  { slug: 'wiki-auro',         label: 'Sri Aurobindo' },
  { slug: 'wiki-srgsrs',       label: 'Sita Ram Goel & Ram Swarup' },
  { slug: 'wiki-thea',         label: 'Thea' },
  { slug: 'wiki-janapada',     label: 'Janapada' },
] as const;

export type WikiSlug = typeof WIKIS[number]['slug'];

export function getWikiLabel(slug: string): string {
  return WIKIS.find((w) => w.slug === slug)?.label ?? slug;
}
