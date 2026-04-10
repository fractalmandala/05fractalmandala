import { archiveGroups } from '$lib/utils/locals'
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const allPosts = await archiveGroups();
  return json(allPosts);
}