import { Html, Head, Main, NextScript } from 'next/document'

const BASE_URL = 'https://movie-tv-trailers.vercel.app';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Default OG fallbacks - these get overridden by page-level Head tags */}
       <meta name="description" content="Watch free movies, TV shows, live sports, and more online. No sign‑up required." />
        <meta name="keywords" content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed" />
        <meta property="og:title" content="Movie & TV trailers – Free Streaming Platform" />
        <meta property="og:description" content="Your ultimate destination for movies, TV, live sports, and more." />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Movie & TV trailers" />
        <meta property="og:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://movie-tv-trailers.vercel.app" />
        <link rel="canonical" href="https://movie-tv-trailers.vercel.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie & TV trailers – Free Streaming Platform" />
        <meta name="twitter:description" content="Your ultimate destination for movies, TV, live sports, and more." />
        <meta name="twitter:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
        <meta name="twitter:site" content="@movie-tv-trailers" />
        <meta name="twitter:creator" content="@movie-tv-trailers" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}