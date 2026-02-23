// pages/api/og.ts
// This API route serves a lightweight HTML page with correct OG meta tags.
// Social crawlers (Facebook, WhatsApp, Telegram, Twitter) scrape THIS URL.
// It NEVER calls external APIs — uses only static data — so it NEVER 500s.
//
// HOW IT WORKS:
// ShareButtons passes url="https://yourdomain.com/api/og?id=xxx&type=movie"
// Facebook crawls that URL, reads OG tags, shows title + image in the preview.
// The user is then redirected to the actual movie page via og:url.

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  UNIQUE_MOVIES,
  UNIQUE_TV_SHOWS,
  UNIQUE_SPORTS,
  UNIQUE_TV_LIVE,
  UNIQUE_HINDI_DUBBED,
  UNIQUE_ADULT,
  UNIQUE_DOCUMENTARY,
  getImageUrl,
} from '../../services/tmdb';

const BASE_URL = 'https://movie-tv-trailers.vercel.app';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, type = 'movie' } = req.query;

  if (!id) {
    res.status(400).send('Missing id');
    return;
  }

  const idStr = String(id);
  const typeStr = String(type);

  // Find item from static data — NO external API calls, NEVER fails
  let item: any = null;
  if (typeStr === 'movie') {
    item = UNIQUE_MOVIES.find((m) => String(m.id) === idStr)
        || UNIQUE_HINDI_DUBBED.find((m) => String(m.id) === idStr)
        || UNIQUE_ADULT.find((m) => String(m.id) === idStr)
        || UNIQUE_DOCUMENTARY.find((m) => String(m.id) === idStr);
  } else if (typeStr === 'tv') {
    item = UNIQUE_TV_SHOWS.find((m) => String(m.id) === idStr);
  } else if (typeStr === 'sports') {
    item = UNIQUE_SPORTS.find((m) => String(m.id) === idStr);
  } else if (typeStr === 'tv_live') {
    item = UNIQUE_TV_LIVE.find((m) => String(m.id) === idStr);
  }

  const title = item?.title || item?.name || 'Movie & TV Trailers';
  const description = item?.overview?.slice(0, 200) || 'Watch free movies, TV shows, live sports and more.';

  // getImageUrl handles TMDB relative paths → absolute URLs correctly
  const rawPoster = item?.poster_path || null;
  let imageUrl = `${BASE_URL}/og-image.jpg`;
  if (rawPoster) {
    const resolved = getImageUrl(rawPoster, 'w500');
    // If resolved is still relative (e.g. /18only.png), make it absolute
    imageUrl = resolved.startsWith('http') ? resolved : `${BASE_URL}${resolved}`;
  }

  // The actual page the user should land on
  const pageUrl = `${BASE_URL}/${typeStr === 'movie' ? 'movies' : typeStr}/${idStr}`;

  // Cache for 1 hour
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Return a minimal HTML page — just meta tags + instant redirect
  res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />

  <!-- Open Graph — Facebook, WhatsApp, Telegram, LinkedIn -->
  <meta property="og:type" content="video.movie" />
  <meta property="og:site_name" content="Movie &amp; TV Trailers" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="500" />
  <meta property="og:image:height" content="750" />
  <meta property="og:image:alt" content="${escapeHtml(title)} poster" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <!-- Redirect real users to the actual page immediately -->
  <meta http-equiv="refresh" content="0;url=${pageUrl}" />
  <link rel="canonical" href="${pageUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${pageUrl}">${escapeHtml(title)}</a>...</p>
</body>
</html>`);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}