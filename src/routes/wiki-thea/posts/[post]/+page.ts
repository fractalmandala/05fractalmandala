export async function entries() {
  const files = import.meta.glob('/src/routes/wiki-thea/posts/*.md');
  return Object.keys(files).map((path) => ({
    post: path.split('/').pop()!.replace('.md', ''),
  }));
}

export async function load({ params }: { params: { post: string } }) {
	const post = await import(`../${params.post}.md`)
	const { title, tags, group, description } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
		group,
		description
	}
}