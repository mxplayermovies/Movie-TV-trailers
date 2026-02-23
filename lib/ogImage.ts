// lib/ogImage.ts
// Utility to generate reliable OG image URLs for social media crawlers

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

/**
 * Converts any poster_path to a crawler-safe absolute URL.
 * - TMDB relative paths (/abc.jpg) → full TMDB URL
 * - External URLs → proxied through our /api/og-image
 * - null/undefined → fallback OG image
 */
export function getOgImageUrl(posterPath: string | null | undefined): string {
  if (!posterPath) {
    return `${BASE_URL}/og-image.jpg`;
  }

  // TMDB relative path (starts with /)
  if (posterPath.startsWith('/') && !posterPath.startsWith('//')) {
    return `${TMDB_IMAGE_BASE}${posterPath}`;
  }

  // Already an absolute external URL - proxy it
  if (posterPath.startsWith('http://') || posterPath.startsWith('https://')) {
    return `${BASE_URL}/api/og-image?url=${encodeURIComponent(posterPath)}`;
  }

  return `${BASE_URL}/og-image.jpg`;
}

/**
 * Generates all required OG/Twitter meta tag props for a media item page
 */
export function generateSeoMeta({
  title,
  description,
  posterPath,
  pageUrl,
  type = 'video.movie',
  youtubeWatchUrl,
  youtubeEmbedUrl,
}: {
  title: string;
  description: string;
  posterPath: string | null | undefined;
  pageUrl: string;
  type?: string;
  youtubeWatchUrl?: string | null;
  youtubeEmbedUrl?: string | null;
}) {
  const ogImage = getOgImageUrl(posterPath);

  return {
    ogImage,
    ogType: type,
    title,
    description,
    pageUrl,
    youtubeWatchUrl,
    youtubeEmbedUrl,
  };
}