// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { UNIQUE_MOVIES, getImageUrl } from '../../../services/tmdb';
// import { MediaItem } from '../../../types';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// import YouTubePlayer from '../../../components/YouTubePlayer';
// import { voiceManager } from '../../../lib/core/VoiceManager';
// import { Play, Volume2, Link2, Check } from 'lucide-react';
// import { sanitizeMediaItem } from '../../../lib/core/sanitize';
// import Recommendations from '../../../components/Recommendations';
// import { formatDurationToISO } from '../../../lib/utils/duration';

// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// interface Props {
//   item: MediaItem | null;
//   recommendations: MediaItem[];
//   ogImage: string | null;
// }

// export default function MovieDetail({ item, recommendations, ogImage }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   if (!item || !ogImage) {
//     return (
//       <>
//         <Head>
//           <title>Movie Not Found | Movie & TV Trailers</title>
//           <meta name="robots" content="noindex" />
//         </Head>
//         <div className="min-h-screen flex items-center justify-center">
//           <p>Movie not found</p>
//         </div>
//       </>
//     );
//   }

//   const title = item.title || item.name || 'Movie';
//   const ytId = item.yt_id;
//   const canonicalUrl = `${BASE_URL}/movies/${item.id}`;
//   const description = item.overview?.slice(0, 160) || `Watch ${title} online in HD on Movie & TV trailers. No sign-up required.`;

//   const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
//   const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1` : null;

//   useEffect(() => {
//     if (title) {
//       voiceManager.speak(`Now viewing ${title}. Click the speaker icon to learn about the movie.`);
//     }
//   }, [title]);

//   const readDetails = () => {
//     voiceManager.speak(`${title}. ${item.overview || ''}`, true);
//   };

//   const handlePlay = () => {
//     setLoading(true);
//     router.push(`/watch/${item.id}?type=movie`);
//   };

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(canonicalUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       const el = document.createElement('input');
//       el.value = canonicalUrl;
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand('copy');
//       document.body.removeChild(el);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const movieSchema = {
//     "@context": "https://schema.org",
//     "@type": "Movie",
//     "name": title,
//     "description": description,
//     "image": ogImage,
//     "datePublished": item.release_date || new Date().toISOString().split('T')[0],
//     "url": canonicalUrl,
//     "duration": item.duration ? formatDurationToISO(item.duration) : undefined,
//     "contentRating": "PG-13",
//     "aggregateRating": item.vote_average ? {
//       "@type": "AggregateRating",
//       "ratingValue": item.vote_average.toFixed(1),
//       "bestRating": "10",
//       "ratingCount": 100
//     } : undefined,
//     ...(youtubeWatchUrl ? {
//       "trailer": {
//         "@type": "VideoObject",
//         "name": `${title} – Trailer`,
//         "description": `Watch the trailer for ${title}`,
//         "thumbnailUrl": ogImage,
//         "uploadDate": item.release_date || new Date().toISOString().split('T')[0],
//         "contentUrl": youtubeWatchUrl,
//         "embedUrl": youtubeEmbedUrl
//       }
//     } : {})
//   };

//   return (
//     <>
//       <Head>
//         <title>{title} – Watch Online HD | Movie & TV Trailers</title>
//         <meta name="description" content={description} />
//         <link rel="canonical" href={canonicalUrl} />

//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content="Movie & TV Trailers" />
//         <meta property="og:type" content="video.movie" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:title" content={`${title} – Watch Online HD`} />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={ogImage} />
//         <meta property="og:image:secure_url" content={ogImage} />
//         <meta property="og:image:type" content="image/jpeg" />
//         <meta property="og:image:width" content="1280" />
//         <meta property="og:image:height" content="720" />
//         <meta property="og:image:alt" content={`${title} - backdrop`} />

//         {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:secure_url" content={youtubeEmbedUrl} />}
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />

//         {item.release_date && <meta property="video:release_date" content={item.release_date} />}

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:creator" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content={`${title} – Watch Online HD`} />
//         <meta name="twitter:description" content={description} />
//         <meta name="twitter:image" content={ogImage} />
//         <meta name="twitter:image:alt" content={`${title} - backdrop`} />
//         {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
//         <meta name="twitter:player:width" content="1280" />
//         <meta name="twitter:player:height" content="720" />

//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 max-w-7xl mx-auto">
//             <div className="hidden md:block w-[300px] flex-shrink-0">
//               <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
//                 <img
//                   src={getImageUrl(item.poster_path)}
//                   alt={title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             <div className="min-w-0">
//               <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
//                  <h1 className="text-2xl md:text-5xl font-bold text-gray-500/10/10 mb-2">{title}</h1>
//                 <span className="p-2 dark:text-gray-300 mb-4">Read details aloud</span>
//                 <button
//                   onClick={readDetails}
//                   className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
//                   title="Read aloud"
//                 >
//                   <Volume2 size={20} />
//                 </button>
//               </div>
//               {ytId && (
//                 <div className="mb-6">
//                   <YouTubePlayer videoId={ytId} title={title} autoplay loop />
//                 </div>
//               )}

//               <div className="mt-4">
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">{item.overview}</p>
//                 <div className="flex items-center gap-4 mb-6 flex-wrap">
//                   {item.vote_average && (
//                     <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">
//                       {item.vote_average.toFixed(1)} ★
//                     </span>
//                   )}
//                   {item.release_date && <span>{item.release_date}</span>}
//                   {item.duration && <span>{item.duration}</span>}
//                 </div>
//                 <button
//                   onClick={handlePlay}
//                   disabled={loading}
//                   className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
//                 >
//                   <Play size={20} />
//                   {loading ? 'Loading…' : 'Play Now'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-12">
//             <Recommendations items={recommendations} basePath="/movies" title="More Movies" />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = UNIQUE_MOVIES.map((item) => ({
//     params: { id: String(item.id) },
//   }));
//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   const id = params?.id as string;
//   try {
//     const movie = UNIQUE_MOVIES.find((m) => String(m.id) === id);
//     if (!movie) return { notFound: true };

//     const sanitizedItem = sanitizeMediaItem ? sanitizeMediaItem(movie) : movie;

//     const imagePath = sanitizedItem.backdrop_path || sanitizedItem.poster_path;
//     if (!imagePath) {
//       console.error(`Movie "${sanitizedItem.title}" (id: ${id}) has no image. Add one to the data.`);
//       return { notFound: true };
//     }

//     const rawImageUrl = getImageUrl(imagePath, 'original');
//     const ogImage = rawImageUrl.startsWith('http') ? rawImageUrl : `${BASE_URL}${rawImageUrl}`;

//     const recommendations = UNIQUE_MOVIES
//       .filter((m) => String(m.id) !== id)
//       .slice(0, 6)
//       .map(m => sanitizeMediaItem ? sanitizeMediaItem(m) : m);

//     return {
//       props: {
//         item: sanitizedItem,
//         recommendations,
//         ogImage,
//       },
//       revalidate: 3600,
//     };
//   } catch (error) {
//     console.error(`Error in getStaticProps for movie ${id}:`, error);
//     return { notFound: true };
//   }
// };







// pages/movies/[id]/index.tsx
import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UNIQUE_MOVIES, getImageUrl } from '../../../services/tmdb';
import { MediaItem } from '../../../types';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import YouTubePlayer from '../../../components/YouTubePlayer';
import { voiceManager } from '../../../lib/core/VoiceManager';
import { Play, Volume2 } from 'lucide-react';
import { sanitizeMediaItem } from '../../../lib/core/sanitize';
import Recommendations from '../../../components/Recommendations';
import { formatDurationToISO } from '../../../lib/utils/duration';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  item: Omit<MediaItem, 'streams'>;
  recommendations: Omit<MediaItem, 'streams'>[];
  ogImage: string;
}

export default function MovieDetail({ item, recommendations, ogImage }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = item.title || item.name || 'Movie';
  const ytId = item.yt_id;
  const canonicalUrl = `${BASE_URL}/movies/${item.id}`;
  const description = item.overview?.slice(0, 160) || `Watch ${title} online in HD on Movie & TV trailers. No sign-up required.`;

  const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
  const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1` : null;

  const getPageText = useCallback((): string => {
    const titleEl = document.querySelector('h1');
    const overviewEl = document.querySelector('.text-gray-600.dark\\:text-gray-300');
    let text = '';
    if (titleEl?.textContent) text += titleEl.textContent + '. ';
    if (overviewEl?.textContent) text += overviewEl.textContent;
    return text;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const text = getPageText();
      if (text) {
        voiceManager.speak(text);
      } else {
        voiceManager.speak(`Now viewing ${title}.`);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [title, getPageText]);

  const readDetails = () => {
    const text = getPageText();
    if (text) {
      voiceManager.speak(text, true);
    }
  };

  const handlePlay = () => {
    setLoading(true);
    router.push(`/watch/${item.id}?type=movie`);
  };

  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": title,
    "description": description,
    "image": ogImage,
    "datePublished": item.release_date || new Date().toISOString().split('T')[0],
    "url": canonicalUrl,
    "duration": item.duration ? formatDurationToISO(item.duration) : undefined,
    "contentRating": "PG-13",
    "aggregateRating": item.vote_average ? {
      "@type": "AggregateRating",
      "ratingValue": item.vote_average.toFixed(1),
      "bestRating": "10",
      "ratingCount": 100
    } : undefined,
    ...(youtubeWatchUrl ? {
      "trailer": {
        "@type": "VideoObject",
        "name": `${title} – Trailer`,
        "description": `Watch the trailer for ${title}`,
        "thumbnailUrl": ogImage,
        "uploadDate": item.release_date || new Date().toISOString().split('T')[0],
        "contentUrl": youtubeWatchUrl,
        "embedUrl": youtubeEmbedUrl
      }
    } : {})
  };

  return (
    <>
      <Head>
        <title>{title} – Watch Online HD | Movie & TV Trailers</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content="Movie & TV Trailers" />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${title} – Watch Online HD`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={`${title} - backdrop`} />

        {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:secure_url" content={youtubeEmbedUrl} />}
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />

        {item.release_date && <meta property="video:release_date" content={item.release_date} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:creator" content="@MovieTVTrailers" />
        <meta name="twitter:title" content={`${title} – Watch Online HD`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={`${title} - backdrop`} />
        {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }} />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 max-w-7xl mx-auto">
            <div className="hidden md:block w-[300px] flex-shrink-0">
              <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
                <img
                  src={getImageUrl(item.poster_path)}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-500/10/10 mb-2">{title}</h1>
                <span className="p-2 dark:text-gray-300 mb-4">Read details aloud</span>
                <button
                  onClick={readDetails}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
                  title="Read aloud"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              {ytId && (
                <div className="mb-6">
                  <YouTubePlayer videoId={ytId} title={title} autoplay loop />
                </div>
              )}

              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.overview}</p>
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  {item.vote_average && (
                    <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">
                      {item.vote_average.toFixed(1)} ★
                    </span>
                  )}
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
            <Recommendations items={recommendations} basePath="/movies" title="More Movies" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = UNIQUE_MOVIES.map((item) => ({
    params: { id: String(item.id) },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  try {
    const movie = UNIQUE_MOVIES.find((m) => String(m.id) === id);
    if (!movie) return { notFound: true };

    const sanitizedItem = sanitizeMediaItem(movie);

    const imagePath = sanitizedItem.backdrop_path || sanitizedItem.poster_path;
    if (!imagePath) {
      console.error(`Movie "${sanitizedItem.title}" (id: ${id}) has no image.`);
      return { notFound: true };
    }

    const rawImageUrl = getImageUrl(imagePath, 'original');
    const ogImage = rawImageUrl.startsWith('http') ? rawImageUrl : `${BASE_URL}${rawImageUrl}`;

    const recommendations = UNIQUE_MOVIES
      .filter((m) => String(m.id) !== id)
      .slice(0, 6)
      .map(m => sanitizeMediaItem(m));

    return {
      props: {
        item: sanitizedItem,
        recommendations,
        ogImage,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error in getStaticProps for movie ${id}:`, error);
    return { notFound: true };
  }
};