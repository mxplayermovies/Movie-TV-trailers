// // pages/_document.tsx
// import { Html, Head, Main, NextScript } from 'next/document';

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
//           rel="stylesheet"
//         />
//         {/* Global meta tags – these will be overridden by page‑specific tags */}
//         <meta name="description" content="Watch free movies, TV shows, live sports, and more online. No sign‑up required." />
//         <meta name="keywords" content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed" />
//         <meta name="robots" content="index, follow" />
//         <meta name="language" content="English" />
//         <meta name="revisit-after" content="7 days" />
//         <meta name="author" content="Movie & TV trailers" />
//         <meta property="og:site_name" content="Movie & TV trailers" />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://movie-tv-trailers.vercel.app" />
//         <meta property="og:title" content="Movie & TV trailers – Free Streaming Platform" />
//         <meta property="og:description" content="Your ultimate destination for movies, TV, live sports, and more." />
//         <meta property="og:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:image:alt" content="Movie & TV trailers" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Movie & TV trailers – Free Streaming Platform" />
//         <meta name="twitter:description" content="Your ultimate destination for movies, TV, live sports, and more." />
//         <meta name="twitter:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
//         <meta name="twitter:site" content="@movie-tv-trailers" />
//         <meta name="twitter:creator" content="@movie-tv-trailers" />
//         <link rel="icon" href="/logo.png" type="image/png" />
//         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="manifest" href="/site.webmanifest" />
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }


// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

/**
 * IMPORTANT: _document.tsx should NEVER contain OG, Twitter, or any
 * page-specific meta tags. Those tags belong in each page's <Head>.
 * _document.tsx is rendered ONCE on the server and its <Head> content
 * is NOT overridable by page-level Next.js <Head> tags — they MERGE,
 * causing duplicates and the wrong fallback values to win on social scrapers.
 *
 * Keep _document.tsx to: fonts, favicons, manifest, and truly global tags
 * (robots, author) that never need to be overridden per-page.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Fonts ─────────────────────────────────────────────────────── */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* ── Favicons & manifest ───────────────────────────────────────── */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Truly global, never overridden ───────────────────────────── */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Movie & TV trailers" />

        {/*
         * ── DO NOT add og:*, twitter:*, description, canonical, or
         *    og:image here. Those MUST live only in each page's <Head>
         *    so social scrapers receive page-specific values.
         * ─────────────────────────────────────────────────────────────── */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}