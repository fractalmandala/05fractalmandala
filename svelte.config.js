import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const WIKI_SLUG_MAP = {
    'wiki-auro': 'wiki-auro',
    'wiki-srgsrs': 'wiki-srgsrs',
    'wiki-civilization': 'wiki-civilization',
    'wiki-writings': 'wiki-writings',
    'wiki-janapada': 'wiki-janapada',
    'wiki-thea': 'wiki-thea',
    'wiki-history': 'wiki-history'
};

function getWikiSlugFromPath(filename) {
    const normalizedPath = filename.replace(/\\/g, '/');
    for (const [folderName, routeName] of Object.entries(WIKI_SLUG_MAP)) {
        // If the file path contains '/wiki-auro/', we know the route should start with /wiki-auro/
        if (normalizedPath.includes(`/${folderName}/`)) return routeName;
    }
    return null;
}

const wikiLinkPreprocessor = {
    markup({ content, filename }) {
        if (!filename?.endsWith('.md')) return;
        
        const wikiRoute = getWikiSlugFromPath(filename);
        
        // If the file isn't in one of our wiki folders, don't touch it
        if (!wikiRoute) return;

        const code = content.replace(
            /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
            (_, slug, display) => {
                const cleanSlug = slug.trim();
                
                // Format the label: lowercase-slug -> Capitalized Words
                const label = display?.trim() || 
                    cleanSlug
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');

                // Return a standard Markdown link that Svelte/MDSvex understands
                return `[${label}](/${wikiRoute}/${cleanSlug})`;
            }
        );

        return { code };
    }
};

function remarkHeadingIds() {
	return (tree) => {
		function walk(node) {
			if (node.type === 'heading') {
				const text = node.children
					.filter((c) => c.type === 'text')
					.map((c) => c.value)
					.join('');
				const id = text
					.toLowerCase()
					.replace(/[^\w\s-]/g, '')
					.trim()
					.replace(/\s+/g, '-');
				node.data = node.data || {};
				node.data.hProperties = node.data.hProperties || {};
				node.data.hProperties.id = id;
			}
			if (node.children) node.children.forEach(walk);
		}
		walk(tree);
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        wikiLinkPreprocessor, // <--- ADD THIS LINE HERE
        vitePreprocess(),
        mdsvex({
            extensions: ['.md'],
            remarkPlugins: [remarkHeadingIds]
        }),
    ],
    extensions: ['.svelte', '.md', '.svx'],
    kit: {
        adapter: adapter()
    }
};

export default config;
