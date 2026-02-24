// pages/api/og-image.ts
//
// Image proxy for OG/social share images.
// Facebook and Twitter scrapers are blocked by TMDB's CDN and many third-party
// image hosts. This route fetches the image server-side from YOUR domain, so
// scrapers always succeed.
//
// Usage:  /api/og-image?url=https://image.tmdb.org/t/p/original/abc.jpg

import type { NextApiRequest, NextApiResponse } from 'next';

// Only allow proxying from these trusted image domains
const ALLOWED_DOMAINS = [
  'image.tmdb.org',
  'encrypted-tbn0.gstatic.com',
  'assets-in.bmscdn.com',
  'femalecricket.com',
  'thumbor.prod.vidiocdn.com',
  'www.cbssports.com',
  'www.fcbarcelona.com',
  'static.flashscore.com',
  'mms.businesswire.com',
  'www.shutterstock.com',
  'www.vhv.rs',
  'picsum.photos',
  'median.co',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Missing url parameter');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).send('Invalid url parameter');
  }

  // Security: only proxy from allowed domains
  if (!ALLOWED_DOMAINS.some((d) => parsedUrl.hostname === d || parsedUrl.hostname.endsWith(`.${d}`))) {
    // If domain not in allowlist, redirect directly — don't block the share
    return res.redirect(302, url);
  }

  try {
    const imageRes = await fetch(url, {
      headers: {
        // Pretend to be a browser so CDNs don't block us
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });

    if (!imageRes.ok) {
      // Fetch failed — serve the site fallback OG image instead
      return res.redirect(302, '/og-image.jpg');
    }

    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await imageRes.arrayBuffer());

    // Cache for 24 hours on CDN edge, 1 hour revalidation
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch {
    return res.redirect(302, '/og-image.jpg');
  }
}