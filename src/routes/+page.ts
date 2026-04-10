import { loadWiki, getVideos } from '$lib/utils/locals';

export async function load() {
  return {
    writings: await loadWiki('wiki-writings'),
    vids: await getVideos(),
  };
}