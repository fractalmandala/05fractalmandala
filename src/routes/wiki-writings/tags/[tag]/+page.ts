import type { PageLoad } from './$types';
import { getTagsWithCounts } from '$lib/utils/locals';

export async function entries() {
  const tags = await getTagsWithCounts();
  return tags.map(({ tag }) => ({ tag }));
}

type PostModule = {
	metadata?: {
		title?: string;
		date?: string;
		tags?: string[];
	};
};

export const load: PageLoad = async ({ params }) => {
	const { tag } = params;

	const posts = import.meta.glob('/src/routes/wiki-writings/posts/*.md');
	const entries = Object.entries(posts);

	const results = await Promise.all(
		entries.map(async ([path, resolver]) => {
			const mod = (await resolver()) as PostModule;

			if (!mod.metadata?.tags || !Array.isArray(mod.metadata.tags)) return null;

			// match tag (case-insensitive optional)
			const hasTag = mod.metadata.tags.some(
				(t) => t.toLowerCase() === tag.toLowerCase()
			);

			if (!hasTag) return null;

			const date = mod.metadata.date ? new Date(mod.metadata.date) : null;

			return {
				title: mod.metadata.title ?? 'Untitled',
				date,
				link: path
					.replace('/src/routes', '')
					.replace('.md', '')
			};
		})
	);

	const filtered = results.filter(
		(x): x is { title: string; date: Date | null; link: string } => x !== null
	);

	// optional: sort by date desc
	filtered.sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return b.date.getTime() - a.date.getTime();
	});

	return {
		tag,
		posts: filtered
	};
};