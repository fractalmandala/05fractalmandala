import { loadWiki, archiveGroups } from '$lib/utils/locals';

export async function load() {
	const data = await loadWiki('wiki-writings');
	const groups = await archiveGroups();

	return {
		data,
		groups
	};
}