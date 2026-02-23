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
        <meta property="og:site_name" content="Movie & TV Trailers" />
        <meta name="twitter:site" content="@movietvtrailers" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}