import type { PageLoad } from './$types';
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

export function entries() {
  return (wikisources as WikiSource[])
    .filter((item) => item.wiki === 'wiki-history')
    .map((item) => ({ post: String(item.id) }));
}

export const load: PageLoad = ({ params }) => {
	const id = Number(params.post);

	if (isNaN(id)) throw error(404, 'Source not found');

	const source = (wikisources as WikiSource[]).find(
		(item) => item.id === id && item.wiki === 'wiki-history'
	);

	if (!source) throw error(404, `Source not found: ${params.post}`);

	return {
		id: source.id,
		title: source.title,
		file: source.file,
		link: source['actual link']
	};
};
