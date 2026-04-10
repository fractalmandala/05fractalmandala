import { loadWiki, archiveGroups, getTagsWithCounts } from '$lib/utils/locals';

export async function load() {
	const data = await loadWiki('wiki-writings');
	const groups = await archiveGroups();
	const tagger = await getTagsWithCounts();

	return {
		data,
		groups,
		tagger
	};
}