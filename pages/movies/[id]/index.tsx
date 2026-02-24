// // pages/movies/[id]/index.tsx
// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { UNIQUE_MOVIES, getDetails, getImageUrl } from '../../../services/tmdb';
// import { ContentDetails, MediaItem } from '../../../types';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// import YouTubePlayer from '../../../components/YouTubePlayer';
// import { voiceManager } from '../../../lib/core/VoiceManager';
// import { Play, Volume2, Share2, X, Copy, Check } from 'lucide-react';
// import { sanitizeMediaItem } from '../../../lib/core/sanitize';
// import Recommendations from '../../../components/Recommendations';
// import { getOgImageUrl } from '../../../lib/ogImage';

// const BASE_URL = 'https://movie-tv-trailers.vercel.app';

// interface Props {
//   item: Omit<ContentDetails, 'streams'>;
//   recommendations: Omit<MediaItem, 'streams'>[];
//   ogImage: string;
// }

// export default function MovieDetail({ item, recommendations, ogImage }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isShareOpen, setIsShareOpen] = useState(false);
//   const [copiedLink, setCopiedLink] = useState(false);

//   const title = item.title || item.name || 'Movie';
//   const ytId = item.yt_id;
//   const shareUrl = `${BASE_URL}/movies/${item.id}`;
//   const description = item.overview?.slice(0, 160) || `Watch ${title} online in HD.`;

//   const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
//   const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;

//   useEffect(() => {
//     if (title) {
//       voiceManager.speak(`Now viewing ${title}. Click the speaker icon to learn about the movie.`);
//     }
//   }, [title]);

//   const readDetails = () => {
//     const text = `${title}. ${item.overview || ''}`;
//     voiceManager.speak(text, true);
//   };

//   const handlePlay = () => {
//     setLoading(true);
//     router.push(`/watch/${item.id}?type=movie`);
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopiedLink(true);
//     setTimeout(() => setCopiedLink(false), 2000);
//   };

//   return (
//     <>
//       <Head>
//         <title>{title} - Watch Online HD | Movie & TV Trailers</title>
//         <meta name="description" content={description} />
//         <link rel="canonical" href={shareUrl} />

//         {/* Open Graph */}
//         <meta property="og:type" content="video.movie" />
//         <meta property="og:title" content={`${title} - Watch Online HD`} />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={ogImage} />
//         <meta property="og:image:width" content="780" />
//         <meta property="og:image:height" content="1170" />
//         <meta property="og:image:alt" content={title} />
//         <meta property="og:url" content={shareUrl} />
//         <meta property="og:site_name" content="Movie & TV Trailers" />
//         {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:secure_url" content={youtubeEmbedUrl} />}
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />

//         {/* Twitter / X Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`${title} - Watch Online HD`} />
//         <meta name="twitter:description" content={description} />
//         <meta name="twitter:image" content={ogImage} />
//         <meta name="twitter:image:alt" content={title} />
//         {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
//         <meta name="twitter:player:width" content="1280" />
//         <meta name="twitter:player:height" content="720" />

//         {/* JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               '@context': 'https://schema.org',
//               '@type': 'Movie',
//               name: title,
//               description: description,
//               image: ogImage,
//               datePublished: item.release_date || new Date().toISOString().split('T')[0],
//               url: shareUrl,
//               ...(youtubeWatchUrl
//                 ? {
//                     trailer: {
//                       '@type': 'VideoObject',
//                       name: `${title} - Trailer`,
//                       thumbnailUrl: ogImage,
//                       uploadDate: item.release_date || new Date().toISOString().split('T')[0],
//                       contentUrl: youtubeWatchUrl,
//                       embedUrl: youtubeEmbedUrl,
//                     },
//                   }
//                 : {}),
//             }),
//           }}
//         />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           {/* Main content with poster and trailer */}
//           <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 max-w-7xl mx-auto">
//             {/* Poster - visible on desktop */}
//             <div className="hidden md:block w-[300px] flex-shrink-0">
//               <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
//                 <img
//                   src={getImageUrl(item.poster_path)}
//                   alt={title}
//                   className="w-full h-full object-cover"
//                   style={{
//                     filter:
//                       'url(#ultraSharp) brightness(1.05) contrast(1.1) saturate(1.08) hue-rotate(5deg)',
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Right column: title, share, player, details */}
//             <div className="min-w-0">
//               <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
//                 <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">{title}</h1>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={readDetails}
//                     className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
//                     title="Read aloud"
//                   >
//                     <Volume2 size={20} />
//                   </button>
//                   <button
//                     onClick={() => setIsShareOpen(true)}
//                     className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-miraj-gold hover:text-black transition-colors border border-white/5"
//                   >
//                     <Share2 size={18} />
//                     <span className="hidden sm:inline font-bold text-sm">Share</span>
//                   </button>
//                 </div>
//               </div>

//               {/* YouTube Trailer */}
//               {ytId && (
//                 <div className="mb-6">
//                   <YouTubePlayer videoId={ytId} title={title} autoplay loop />
//                 </div>
//               )}

//               {/* Movie details and play button */}
//               <div className="mt-4">
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">{item.overview}</p>
//                 <div className="flex items-center gap-4 mb-6 flex-wrap">
//                   {item.vote_average ? (
//                     <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">
//                       {item.vote_average.toFixed(1)} ★
//                     </span>
//                   ) : null}
//                   {item.release_date && <span>{item.release_date}</span>}
//                   {item.duration && <span>{item.duration}</span>}
//                 </div>
//                 <button
//                   onClick={handlePlay}
//                   disabled={loading}
//                   className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
//                 >
//                   <Play size={20} />
//                   {loading ? 'Loading...' : 'Play Now'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Recommendations */}
//           <div className="mt-12">
//             <Recommendations items={recommendations} basePath="/movies" title="More Movies" />
//           </div>
//         </main>
//         <Footer />
//       </div>

//       {/* Share Modal */}
//       {isShareOpen && (
//         <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
//             <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">Share Content</h3>
//               <button onClick={() => setIsShareOpen(false)} className="text-gray-400 hover:text-white">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
//                 <input
//                   type="text"
//                   className="bg-transparent text-gray-300 text-sm flex-1 outline-none"
//                   readOnly
//                   value={typeof window !== 'undefined' ? window.location.href : ''}
//                 />
//                 <button
//                   onClick={handleCopyLink}
//                   className="p-2 bg-white/10 rounded hover:bg-white/20 transition"
//                 >
//                   {copiedLink ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-white" />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = UNIQUE_MOVIES.map((item) => ({
//     params: { id: String(item.id) },
//   }));
//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = params?.id as string;
//   try {
//     const item = await getDetails('movie', id);
//     const sanitizedItem = sanitizeMediaItem(item);

//     const ogImage = getOgImageUrl(sanitizedItem.poster_path);

//     const allItems = UNIQUE_MOVIES.map(sanitizeMediaItem);
//     const recommendations = allItems.filter((m) => String(m.id) !== String(id)).slice(0, 6);

//     return {
//       props: { item: sanitizedItem, recommendations, ogImage },
//       revalidate: 3600,
//     };
//   } catch {
//     return { notFound: true };
//   }
// };

























// pages/movies/[id]/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UNIQUE_MOVIES, getDetails, getImageUrl } from '../../../services/tmdb';
import { ContentDetails, MediaItem } from '../../../types';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import YouTubePlayer from '../../../components/YouTubePlayer';
import { voiceManager } from '../../../lib/core/VoiceManager';
import { Play, Volume2, Share2, X, Copy, Check } from 'lucide-react';
import { sanitizeMediaItem } from '../../../lib/core/sanitize';
import Recommendations from '../../../components/Recommendations';

const BASE_URL = 'https://movie-tv-trailers.vercel.app';

/**
 * Replace with your real Facebook App ID from
 * https://developers.facebook.com/apps/
 * Even a placeholder value silences the "missing fb:app_id" warning.
 */
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID || 'YOUR_FB_APP_ID';

interface Props {
  item: Omit<ContentDetails, 'streams'>;
  recommendations: Omit<MediaItem, 'streams'>[];
  /** Full-resolution backdrop URL for OG image (resolved at build time). */
  ogImage: string;
}

export default function MovieDetail({ item, recommendations, ogImage }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const title = item.title || item.name || 'Movie';
  const ytId = item.yt_id;

  /** Canonical URL for THIS movie — used by og:url, canonical link, and share sheet. */
  const canonicalUrl = `${BASE_URL}/movies/${item.id}`;

  const description =
    item.overview?.slice(0, 160) ||
    `Watch ${title} online in HD on Movie & TV trailers. No sign-up required.`;

  const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
  const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1` : null;

  useEffect(() => {
    if (title) {
      voiceManager.speak(
        `Now viewing ${title}. Click the speaker icon to learn about the movie.`
      );
    }
  }, [title]);

  const readDetails = () => {
    voiceManager.speak(`${title}. ${item.overview || ''}`, true);
  };

  const handlePlay = () => {
    setLoading(true);
    router.push(`/watch/${item.id}?type=movie`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <Head>
        {/* ── Basic ─────────────────────────────────────────────────────── */}
        <title>{title} – Watch Online HD | Movie &amp; TV Trailers</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* ── Facebook / Open Graph ─────────────────────────────────────── */}
        {/*
         * Rules that make social scrapers work:
         *  1. og:url  MUST be the canonical URL of the page being shared —
         *     NOT the homepage. Facebook & WhatsApp resolve all other tags
         *     relative to og:url, and they de-duplicate via og:url.
         *  2. og:image MUST be an absolute HTTPS URL pointing to a unique,
         *     per-page image (backdrop or poster). Sharing the same fallback
         *     og-image.jpg on every page causes scrapers to cache it globally
         *     and show the wrong image for every subsequent share.
         *  3. fb:app_id silences the "missing fb:app_id" debugger warning
         *     and allows Facebook Insights to attribute shares to your app.
         *  4. Do NOT duplicate any of these in _document.tsx — duplicates
         *     cause scrapers to pick the wrong (first-seen) value.
         */}
        <meta property="fb:app_id" content={FB_APP_ID} />

        <meta property="og:site_name" content="Movie & TV Trailers" />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${title} – Watch Online HD`} />
        <meta property="og:description" content={description} />

        {/* Unique per-page backdrop image — high resolution for link previews */}
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={`${title} - backdrop`} />

        {/* Optional: video metadata so Facebook shows an inline player */}
        {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
        {youtubeEmbedUrl && (
          <meta property="og:video:secure_url" content={youtubeEmbedUrl} />
        )}
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />

        {/* Release date (helps Facebook categorise the movie) */}
        {item.release_date && (
          <meta property="video:release_date" content={item.release_date} />
        )}

        {/* ── Twitter Card ──────────────────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:creator" content="@MovieTVTrailers" />
        <meta name="twitter:title" content={`${title} – Watch Online HD`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={`${title} - backdrop`} />
        {youtubeEmbedUrl && (
          <meta name="twitter:player" content={youtubeEmbedUrl} />
        )}
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />

        {/* ── Structured data (JSON-LD) ─────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Movie',
              name: title,
              description: description,
              image: ogImage,
              datePublished:
                item.release_date ||
                new Date().toISOString().split('T')[0],
              url: canonicalUrl,
              aggregateRating: item.vote_average
                ? {
                    '@type': 'AggregateRating',
                    ratingValue: item.vote_average.toFixed(1),
                    bestRating: '10',
                    ratingCount: 1,
                  }
                : undefined,
              ...(youtubeWatchUrl
                ? {
                    trailer: {
                      '@type': 'VideoObject',
                      name: `${title} – Trailer`,
                      thumbnailUrl: ogImage,
                      uploadDate:
                        item.release_date ||
                        new Date().toISOString().split('T')[0],
                      contentUrl: youtubeWatchUrl,
                      embedUrl: youtubeEmbedUrl,
                    },
                  }
                : {}),
            }),
          }}
        />
      </Head>

      {/* ── Page layout ──────────────────────────────────────────────────── */}
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 max-w-7xl mx-auto">
            {/* Poster */}
            <div className="hidden md:block w-[300px] flex-shrink-0">
              <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
                <img
                  src={getImageUrl(item.poster_path)}
                  alt={title}
                  className="w-full h-full object-cover"
                  style={{
                    filter:
                      'brightness(1.05) contrast(1.1) saturate(1.08)',
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="min-w-0">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">
                  {title}
                </h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={readDetails}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
                    title="Read aloud"
                  >
                    <Volume2 size={20} />
                  </button>
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-miraj-gold hover:text-black transition-colors border border-white/5"
                  >
                    <Share2 size={18} />
                    <span className="hidden sm:inline font-bold text-sm">
                      Share
                    </span>
                  </button>
                </div>
              </div>

              {ytId && (
                <div className="mb-6">
                  <YouTubePlayer videoId={ytId} title={title} autoplay loop />
                </div>
              )}

              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.overview}
                </p>
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  {item.vote_average ? (
                    <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">
                      {item.vote_average.toFixed(1)} ★
                    </span>
                  ) : null}
                  {item.release_date && <span>{item.release_date}</span>}
                  {item.duration && <span>{item.duration}</span>}
                </div>
                <button
                  onClick={handlePlay}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
                >
                  <Play size={20} />
                  {loading ? 'Loading…' : 'Play Now'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Recommendations
              items={recommendations}
              basePath="/movies"
              title="More Movies"
            />
          </div>
        </main>
        <Footer />
      </div>

      {/* Share modal */}
      {isShareOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Share Content
              </h3>
              <button
                onClick={() => setIsShareOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
                <input
                  type="text"
                  className="bg-transparent text-gray-300 text-sm flex-1 outline-none"
                  readOnly
                  value={canonicalUrl}
                />
                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  {copiedLink ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = UNIQUE_MOVIES.map((item) => ({
    params: { id: String(item.id) },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const item = await getDetails('movie', id);
    const sanitizedItem = sanitizeMediaItem(item);

    /**
     * og:image priority:
     *  1. backdrop_path (landscape, ideal 1280×720 for OG)
     *  2. poster_path   (portrait, still valid)
     *  3. global fallback
     *
     * We request 'original' quality so the image isn't too small for
     * Facebook's 600×315 minimum recommendation.
     */
    const ogImage =
      sanitizedItem.backdrop_path
        ? getImageUrl(sanitizedItem.backdrop_path, 'original')
        : sanitizedItem.poster_path
        ? getImageUrl(sanitizedItem.poster_path, 'original')
        : `${BASE_URL}/og-image.jpg`;

    const allItems = UNIQUE_MOVIES.map(sanitizeMediaItem);
    const recommendations = allItems
      .filter((m) => String(m.id) !== String(id))
      .slice(0, 6);

    return {
      props: { item: sanitizedItem, recommendations, ogImage },
      revalidate: 3600,
    };
  } catch {
    return { notFound: true };
  }
};