/**
 * lib/ogImage.ts
 *
 * Converts ANY image path/URL into a Facebook & Twitter-safe OG image URL
 * by proxying through Cloudinary's CDN (which FB/Twitter always whitelist).
 *
 * SETUP (one time):
 *  1. Sign up free at cloudinary.com
 *  2. Copy your Cloud Name from the dashboard
 *  3. Set NEXT_PUBLIC_CLOUDINARY_CLOUD in your Vercel environment variables
 *     OR hardcode it below replacing 'demo'
 *
 * Both function names exported so ALL pages work regardless of import name used.
 */

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w1280';

// Replace 'demo' with your Cloudinary cloud name from cloudinary.com dashboard
const CLOUDINARY_CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || 'db36kfuq3';

/**
 * Builds a social-media-safe absolute image URL for og:image / twitter:image.
 *
 * Handles all image types used in this app:
 *  1. null / undefined          → site fallback /og-image.jpg
 *  2. Local paths (/images/...) → served directly from your domain (always works)
 *  3. External http URLs        → proxied through Cloudinary
 *  4. TMDB relative paths       → built into full URL then proxied through Cloudinary
 */
function buildSocialImageUrl(path: string | null | undefined): string {
  if (!path) {
    return `${BASE_URL}/og-image.jpg`;
  }

  // Local assets served from your own domain — scrapers can always load these
  if (
    path.startsWith('/images/') ||
    path === '/18only.png' ||
    path === '/logo.png' ||
    path === '/og-image.jpg'
  ) {
    return `${BASE_URL}${path}`;
  }

  let fullUrl: string;

  if (path.startsWith('http')) {
    // Already a full URL (external CDN, sports/live items, etc.)
    fullUrl = path;
  } else {
    // TMDB relative path like /rktDFPbfHfUbArZ6OOOKsXcv0Bs.jpg
    const clean = path.startsWith('/') ? path : `/${path}`;
    fullUrl = `${TMDB_IMAGE_BASE}${clean}`;
  }

  // Proxy through Cloudinary fetch API — res.cloudinary.com is whitelisted
  // by Facebook and Twitter so images always load in social previews
  const encoded = encodeURIComponent(fullUrl);
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/f_jpg,q_80,w_1200,h_630,c_fill/${encoded}`;
}

// Export with BOTH names so every page compiles regardless of which name they import
export const buildOgImageUrl = buildSocialImageUrl;
export const getOgImageUrl = buildSocialImageUrl;