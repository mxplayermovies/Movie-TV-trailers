// pages/api/og-image.ts
// This proxy fetches external images and serves them locally so social media
// crawlers (Facebook, Twitter, WhatsApp) can reliably access them.
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.redirect(302, '/og-image.jpg');
  }

  // Decode and validate URL
  let imageUrl: string;
  try {
    imageUrl = decodeURIComponent(url);
    // Basic validation - must be http/https
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      return res.redirect(302, '/og-image.jpg');
    }
  } catch {
    return res.redirect(302, '/og-image.jpg');
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': 'image/*,*/*',
      },
      // 5 second timeout
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return res.redirect(302, '/og-image.jpg');
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.byteLength);
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    // Fallback to default OG image
    return res.redirect(302, '/og-image.jpg');
  }
}