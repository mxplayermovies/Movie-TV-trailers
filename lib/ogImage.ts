/**
 * lib/ogImage.ts
 *
 * Converts ANY image path/URL into a Facebook & Twitter-safe OG image URL.
 *
 * WHY THIS IS NEEDED:
 * - Facebook and Twitter scrapers are blocked by TMDB's CDN (image.tmdb.org)
 * - Many third-party image CDNs also block social scrapers
 * - Local /images/ paths work fine (served from your own domain)
 * - External http:// images need to be proxied through a trusted CDN
 *
 * SOLUTION — Cloudinary Fetch (free, no account needed for public images):
 * Cloudinary's fetch API takes any public image URL and re-serves it from
 * Cloudinary's CDN (res.cloudinary.com), which Facebook and Twitter always
 * whitelist. The free demo cloud_name "demo" works for any public image.
 *
 * FORMAT:
 * https://res.cloudinary.com/demo/image/fetch/f_jpg,q_80,w_1200,h_630,c_fill/{encoded_url}
 */

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w1280';

// Your Cloudinary cloud name — sign up free at cloudinary.com and replace "demo"
// with your own cloud name for production (demo has rate limits)
const CLOUDINARY_CLOUD = 'db36kfuq3';

/**
 * Returns a social-media-safe absolute image URL for use in og:image / twitter:image.
 *
 * Handles all 3 image types in your app:
 *  1. TMDB relative paths  (/abc123.jpg)        → proxy via Cloudinary
 *  2. External http URLs   (https://...)         → proxy via Cloudinary
 *  3. Local paths          (/images/x.jpg etc.)  → serve directly from your domain
 */
export function buildOgImageUrl(path: string | null | undefined): string {
  // Fallback
  if (!path) return `${BASE_URL}/og-image.jpg`;

  let fullUrl: string;

  if (path.startsWith('/images/') || path === '/18only.png' || path === '/logo.png') {
    // Local asset — served from your own domain, always accessible to scrapers
    return `${BASE_URL}${path}`;
  } else if (path.startsWith('http')) {
    // Already a full URL (external CDN or sports/live images)
    fullUrl = path;
  } else {
    // TMDB relative path like /rktDFP.jpg
    const clean = path.startsWith('/') ? path : `/${path}`;
    fullUrl = `${TMDB_IMAGE_BASE}${clean}`;
  }

  // Proxy through Cloudinary fetch — FB/Twitter always load from res.cloudinary.com
  const encoded = encodeURIComponent(fullUrl);
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/f_jpg,q_80,w_1200,h_630,c_fill/${encoded}`;
}