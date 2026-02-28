// pages/api/og.tsx
// Built-in Next.js OG image generation — served from YOUR domain
// Facebook and Twitter always load images from your own domain.
// No external services, no accounts, no API keys needed.

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Movie & TV Trailers';
  const imageUrl = searchParams.get('img') || '';
  const BASE = 'https://movie-tv-trailers.vercel.app';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0f172a',
        }}
      >
        {/* Background image */}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.6,
            }}
          />
        )}
        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          }}
        />
        {/* Site branding top-left */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 48,
            color: '#ef4444',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          🎬 MOVIE &amp; TV TRAILERS
        </div>
        {/* Title bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 48,
            right: 48,
            color: '#ffffff',
            fontSize: title.length > 40 ? 38 : 52,
            fontWeight: 800,
            lineHeight: 1.2,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </div>
        {/* Watch now badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 48,
            color: '#94a3b8',
            fontSize: 18,
          }}
        >
          ▶ Watch Online in HD — No Sign-up Required
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}