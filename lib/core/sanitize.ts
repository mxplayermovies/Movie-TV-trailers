// lib/core/sanitize.ts
import { MediaItem, ContentDetails } from '../../types';

/**
 * Removes the `streams` field from a media item.
 * Use this in getStaticProps to prevent stream URLs from being exposed in the initial HTML.
 */
export function sanitizeMediaItem<T extends MediaItem | ContentDetails>(
  item: T
): Omit<T, 'streams'> {
  const { streams, ...rest } = item;
  return rest as Omit<T, 'streams'>;
}