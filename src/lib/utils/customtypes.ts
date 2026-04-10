export type SearchEntry = {
	title:   string;
	section: string;
	link:    string;
	content: string;
};

export type DisplayResult = {
	item:      SearchEntry;
	titleHtml: string;
	excerpt:   string;
};

export type Filter = {
	label:   string;
	section: string;
};