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