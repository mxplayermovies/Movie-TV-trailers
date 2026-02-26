// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Global meta tags – these will be overridden by page‑specific tags */}
        <meta name="description" content="Watch free movies, TV shows, live sports, and more online. No sign‑up required." />
        <meta name="keywords" content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Movie & TV trailers" />
        <meta name="theme-color" content="#0f172a" />

        {/* Facebook App ID – required for rich sharing */}
        <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />

        <meta property="og:site_name" content="Movie & TV trailers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app'} />
        <meta property="og:title" content="Movie & TV trailers – Free Streaming Platform" />
        <meta property="og:description" content="Your ultimate destination for movies, TV, live sports, and more." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app'}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Movie & TV trailers" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie & TV trailers – Free Streaming Platform" />
        <meta name="twitter:description" content="Your ultimate destination for movies, TV, live sports, and more." />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app'}/og-image.jpg`} />
        <meta name="twitter:site" content="@movie-tv-trailers" />
        <meta name="twitter:creator" content="@movie-tv-trailers" />

        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}