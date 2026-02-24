// lib/utils/extractId.ts
/**
 * Extracts the numeric ID from a slug like "123-movie-name"
 * Returns the ID as a string, or null if no numeric prefix found.
 */
export function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/^(\d+)/);
  return match ? match[1] : null;
}