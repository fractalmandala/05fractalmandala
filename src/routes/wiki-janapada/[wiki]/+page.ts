export async function load({ params }: { params: { wiki: string } }) {
  const post = await import(`../${params.wiki}.md`);
  const { title, id } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    id
  };
}
