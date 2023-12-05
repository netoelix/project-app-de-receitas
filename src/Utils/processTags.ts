export default function processTags(
  tags: string | null,
) {
  if (tags === null) {
    return [];
  }
  const allTags = tags.split(',');

  return allTags;
}
