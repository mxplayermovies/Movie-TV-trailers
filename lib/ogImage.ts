// lib/ogImage.ts
// Builds OG image URLs proxied through our own domain.
// Facebook and Twitter always load images from your own domain.

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_BASE = 'https://image.tmdb.org/t/p/w1280';

function buildSocialImageUrl(
  path: string | null | undefined,
  _title?: string
): string {
  if (!path) {
    return `${BASE_URL}/og-image.jpg`;
  }

  // Local files — already on your domain, always work
  if (
    path.startsWith('/images/') ||
    path === '/18only.png' ||
    path === '/logo.png' ||
    path === '/og-image.jpg'
  ) {
    return `${BASE_URL}${path}`;
  }

  // Build the source image URL
  let sourceUrl: string;
  if (path.startsWith('http')) {
    sourceUrl = path;
  } else {
    const clean = path.startsWith('/') ? path : `/${path}`;
    sourceUrl = `${TMDB_BASE}${clean}`;
  }

  // Proxy through our own domain
  return `${BASE_URL}/api/og-image?url=${encodeURIComponent(sourceUrl)}`;
}

export const buildOgImageUrl = buildSocialImageUrl;
export const getOgImageUrl = buildSocialImageUrl;