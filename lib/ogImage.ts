/**
 * lib/ogImage.ts
 *
 * Generates OG image URLs served from YOUR OWN domain via /api/og
 * Facebook and Twitter ALWAYS load images from the page's own domain.
 * Zero external services. Zero accounts. Zero API keys.
 */

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_BASE = 'https://image.tmdb.org/t/p/w780';

function buildSocialImageUrl(
  path: string | null | undefined,
  title?: string
): string {
  // Resolve the raw image URL
  let imgUrl = '';

  if (!path) {
    imgUrl = '';
  } else if (path.startsWith('http')) {
    imgUrl = path;
  } else if (
    path.startsWith('/images/') ||
    path === '/18only.png' ||
    path === '/logo.png'
  ) {
    imgUrl = `${BASE_URL}${path}`;
  } else {
    const clean = path.startsWith('/') ? path : `/${path}`;
    imgUrl = `${TMDB_BASE}${clean}`;
  }

  // Build URL to our own /api/og endpoint
  const params = new URLSearchParams();
  if (title) params.set('title', title.slice(0, 80));
  if (imgUrl) params.set('img', imgUrl);

  return `${BASE_URL}/api/og?${params.toString()}`;
}

export const buildOgImageUrl = buildSocialImageUrl;
export const getOgImageUrl = buildSocialImageUrl;