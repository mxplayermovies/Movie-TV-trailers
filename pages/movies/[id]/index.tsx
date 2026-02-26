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
// import { formatDurationToISO } from '../../../lib/utils/duration';
// import ShareButtons from '../../../components/ShareButtons';

// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

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

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(canonicalUrl);
//     setCopiedLink(true);
//     setTimeout(() => setCopiedLink(false), 2000);
//   };

//   // Movie schema
//   const movieSchema = {
//     "@context": "https://schema.org",
//     "@type": "Movie",
//     "name": title,
//     "description": description,
//     "image": ogImage,
//     "datePublished": item.release_date || new Date().toISOString().split('T')[0],
//     "url": canonicalUrl,
//     "duration": item.duration ? formatDurationToISO(item.duration) : undefined,
//     "contentRating": "PG-13", // Default; adult pages will override
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
//             {/* Poster */}
//             <div className="hidden md:block w-[300px] flex-shrink-0">
//               <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
//                 <img
//                   src={getImageUrl(item.poster_path)}
//                   alt={title}
//                   className="w-full h-full object-cover"
//                   style={{ filter: 'brightness(1.05) contrast(1.1) saturate(1.08)' }}
//                 />
//               </div>
//             </div>

//             {/* Details */}
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
//                   {/* <button
//                     onClick={() => setIsShareOpen(true)}
//                     className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-miraj-gold hover:text-black transition-colors border border-white/5"
//                   >
//                     <Share2 size={18} />
//                     <span className="hidden sm:inline font-bold text-sm">Share</span>
//                   </button> */}
//                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
//               <h3 className="text-lg font-semibold mb-4">Share this post</h3>
//               <ShareButtons url={canonicalUrl} title={item.title} description={item.poster_path} />
//             </div>
//                 </div>
//               </div>

//               {ytId && (
//                 <div className="mb-6">
//                   <YouTubePlayer videoId={ytId} title={title} autoplay loop />
//                 </div>
//               )}

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

//       {/* Share Modal */}
//       {isShareOpen && (
//         <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
//             {/* <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">Share Content</h3>
//               <button onClick={() => setIsShareOpen(false)} className="text-gray-400 hover:text-white">
//                 <X size={24} />
//               </button>
//             </div> */}
//             <div className="p-6">
//               <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
//                 <input
//                   type="text"
//                   className="bg-transparent text-gray-300 text-sm flex-1 outline-none"
//                   readOnly
//                   value={canonicalUrl}
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
//     const ogImage =
//       sanitizedItem.backdrop_path
//         ? getImageUrl(sanitizedItem.backdrop_path, 'original')
//         : sanitizedItem.poster_path
//         ? getImageUrl(sanitizedItem.poster_path, 'original')
//         : `${BASE_URL}/og-image.jpg`;

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
// import { Play, Volume2 } from 'lucide-react';
// import { sanitizeMediaItem } from '../../../lib/core/sanitize';
// import Recommendations from '../../../components/Recommendations';
// import { formatDurationToISO } from '../../../lib/utils/duration';
// import ShareButtons from '../../../components/ShareButtons';

// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// interface Props {
//   item: Omit<ContentDetails, 'streams'>;
//   recommendations: Omit<MediaItem, 'streams'>[];
//   ogImage: string; // absolute URL for social sharing
// }

// export default function MovieDetail({ item, recommendations, ogImage }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

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

//   // Movie schema
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
//             {/* Poster */}
//             <div className="hidden md:block w-[300px] flex-shrink-0">
//               <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
//                 <img
//                   src={getImageUrl(item.poster_path)}
//                   alt={title}
//                   className="w-full h-full object-cover"
//                   style={{ filter: 'brightness(1.05) contrast(1.1) saturate(1.08)' }}
//                 />
//               </div>
//             </div>

//             {/* Details */}
//             <div className="min-w-0">
//               <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
//                 <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">{title}</h1>
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
//                   {loading ? 'Loading…' : 'Play Now'}
//                 </button>
//               </div>

//               {/* ✅ Share section – now correctly placed and using text description */}
//              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
//               <h3 className="text-lg font-semibold mb-4">Share this post</h3>
//               <ShareButtons
//                 contentType="blog"
//                 contentId={item.id} // or post.slug – both work because we search by id or slug
//                 url={canonicalUrl}
//               />
//             </div>
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

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = params?.id as string;
//   try {
//     const item = await getDetails('movie', id);
//     const sanitizedItem = sanitizeMediaItem(item);

//     // Get the best available image URL (may be absolute or relative)
//     const imagePath = sanitizedItem.backdrop_path || sanitizedItem.poster_path;
//     let ogImage: string;

//     if (imagePath) {
//       // Convert to full URL using getImageUrl (handles TMDB and site images)
//       const rawImageUrl = getImageUrl(imagePath, 'original');
//       // Ensure absolute URL for social sharing
//       if (rawImageUrl.startsWith('http')) {
//         ogImage = rawImageUrl; // already absolute (TMDB or external)
//       } else {
//         // Site-relative image (e.g., /images/movie/case.jpg) -> prepend BASE_URL
//         ogImage = `${BASE_URL}${rawImageUrl}`;
//       }
//     } else {
//       // Fallback only if absolutely no image (should not happen with your data)
//       ogImage = `${BASE_URL}/og-image.jpg`;
//     }

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


import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UNIQUE_MOVIES, getImageUrl } from '../../../services/tmdb'; // adjust path if needed
import { MediaItem } from '../../../types';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import YouTubePlayer from '../../../components/YouTubePlayer';
import { voiceManager } from '../../../lib/core/VoiceManager';
import { Play, Volume2 } from 'lucide-react';
import { sanitizeMediaItem } from '../../../lib/core/sanitize';
import Recommendations from '../../../components/Recommendations';
import { formatDurationToISO } from '../../../lib/utils/duration';
import ShareButtons from '../../../components/ShareButtons';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  item: MediaItem | null;
  recommendations: MediaItem[];
  ogImage: string; // absolute URL for social sharing
}

export default function MovieDetail({ item, recommendations, ogImage }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!item) {
    return (
      <>
        <Head>
          <title>Movie Not Found | Movie & TV Trailers</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <p>Movie not found</p>
        </div>
      </>
    );
  }

  const title = item.title || item.name || 'Movie';
  const ytId = item.yt_id;
  const canonicalUrl = `${BASE_URL}/movies/${item.id}`;
  const description = item.overview?.slice(0, 160) || `Watch ${title} online in HD on Movie & TV trailers. No sign-up required.`;

  const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
  const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1` : null;

  useEffect(() => {
    if (title) {
      voiceManager.speak(`Now viewing ${title}. Click the speaker icon to learn about the movie.`);
    }
  }, [title]);

  const readDetails = () => {
    voiceManager.speak(`${title}. ${item.overview || ''}`, true);
  };

  const handlePlay = () => {
    setLoading(true);
    router.push(`/watch/${item.id}?type=movie`);
  };

  // Movie schema for structured data
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

        {/* Open Graph */}
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

        {/* Twitter */}
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

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }} />
      </Head>

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
                  style={{ filter: 'brightness(1.05) contrast(1.1) saturate(1.08)' }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="min-w-0">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">{title}</h1>
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

              {/* Share section */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-semibold mb-4">Share this movie</h3>
                <ShareButtons
                  contentType="movie"
                  contentId={String(item.id)}
                  url={canonicalUrl}
                />
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
  // Directly use UNIQUE_MOVIES – no async calls
  const paths = UNIQUE_MOVIES.map((item) => ({
    params: { id: String(item.id) },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  try {
    // Directly find the movie in UNIQUE_MOVIES
    const movie = UNIQUE_MOVIES.find((m) => String(m.id) === id);
    if (!movie) {
      console.error(`Movie not found for id: ${id}`);
      return { notFound: true };
    }

    // Sanitize if needed (but you can pass raw if your component accepts MediaItem)
    const sanitizedItem = sanitizeMediaItem ? sanitizeMediaItem(movie) : movie;

    // Build OG image URL (priority: backdrop_path -> poster_path)
    const imagePath = sanitizedItem.backdrop_path || sanitizedItem.poster_path;
    let ogImage: string;

    if (imagePath) {
      const rawImageUrl = getImageUrl(imagePath, 'original');
      // Ensure absolute URL
      ogImage = rawImageUrl.startsWith('http') ? rawImageUrl : `${BASE_URL}${rawImageUrl}`;
    } else {
      ogImage = `${BASE_URL}/og-image.jpg`; // fallback
    }

    // Get recommendations (excluding current movie)
    const recommendations = UNIQUE_MOVIES
      .filter((m) => String(m.id) !== id)
      .slice(0, 6)
      .map(m => sanitizeMediaItem ? sanitizeMediaItem(m) : m);

    return {
      props: {
        item: sanitizedItem,
        recommendations,
        ogImage,
      },
      revalidate: 3600, // 1 hour
    };
  } catch (error) {
    console.error(`Error in getStaticProps for movie ${id}:`, error);
    // Return notFound to show 404 page
    return { notFound: true };
  }
};


