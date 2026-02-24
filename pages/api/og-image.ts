// pages/api/og-image.ts
// Simple image proxy — fetches the image and pipes it back.
// Served from YOUR domain so Facebook/Twitter always load it.
// No @vercel/og, no edge runtime, no external services needed.

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  // No URL provided — serve the static fallback
  if (!url || typeof url !== 'string') {
    res.redirect(302, '/og-image.jpg');
    return;
  }

  let targetUrl: string;
  try {
    targetUrl = decodeURIComponent(url);
    // Validate it's a real URL
    new URL(targetUrl);
  } catch {
    res.redirect(302, '/og-image.jpg');
    return;
  }

  try {
    const imageRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': 'image/webp,image/jpeg,image/png,image/*',
      },
      // 5 second timeout
      signal: AbortSignal.timeout(5000),
    });

    if (!imageRes.ok) {
      res.redirect(302, '/og-image.jpg');
      return;
    }

    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await imageRes.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.status(200).send(buffer);
  } catch {
    // On any error serve the fallback
    res.redirect(302, '/og-image.jpg');
  }
}