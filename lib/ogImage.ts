// lib/ogImage.ts
// Returns the direct image URL for OG tags.
// TMDB images work fine for Twitter and Facebook when the URL is direct.
// The previous proxy approaches were causing the failures.

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_BASE = 'https://image.tmdb.org/t/p/w1280';

function buildSocialImageUrl(
  path: string | null | undefined,
  _title?: string
): string {
  if (!path) {
    return `${BASE_URL}/og-image.jpg`;
  }

  // Local files on your domain - always work
  if (
    path.startsWith('/images/') ||
    path === '/18only.png' ||
    path === '/logo.png' ||
    path === '/og-image.jpg'
  ) {
    return `${BASE_URL}${path}`;
  }

  // Already a full URL (sports/live items with external images)
  if (path.startsWith('http')) {
    return path;
  }

  // TMDB relative path - return direct TMDB URL
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${TMDB_BASE}${clean}`;
}

export const buildOgImageUrl = buildSocialImageUrl;
export const getOgImageUrl = buildSocialImageUrl;