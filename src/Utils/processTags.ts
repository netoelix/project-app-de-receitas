export default function processTags(
  tags: string | null,
) {
  if (tags === null) return [];
  if (tags === undefined) return [];
  const allTags = tags.split(',');

  return allTags;
}
