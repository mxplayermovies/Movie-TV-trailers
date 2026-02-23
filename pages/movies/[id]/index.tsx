// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { UNIQUE_MOVIES, getDetails } from '../../../services/tmdb';
// import { ContentDetails, MediaItem } from '../../../types';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// import YouTubePlayer from '../../../components/YouTubePlayer';
// import { voiceManager } from '../../../lib/core/VoiceManager';
// import { Play, Volume2 } from 'lucide-react';
// import { sanitizeMediaItem } from '../../../lib/core/sanitize';
// import Recommendations from '../../../components/Recommendations';
// import ShareButtons from '../../../components/ShareButtons';

// const BASE_URL = 'https://movie-tv-trailers.vercel.app';
// const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// interface Props {
//   item?: Omit<ContentDetails, 'streams'>;
//   recommendations?: Omit<MediaItem, 'streams'>[];
//   notFound?: boolean;
// }

// export default function MovieDetail({ item, recommendations, notFound }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   if (notFound || !item) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Content not found</h1>
//           <button
//             onClick={() => router.push('/movies')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Back to Movies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const title = item.title || item.name || 'Movie';
//   const ytId = item.yt_id;
//   const shareUrl = `${BASE_URL}/movies/${item.id}`; // uses the exact string ID

//   useEffect(() => {
//     if (title) {
//       voiceManager.speak(`Now viewing ${title}. Click the speaker icon to learn about the movie.`);
//     }
//   }, [title]);

//   const readDetails = () => {
//     const text = `${title}. ${item.overview || ''}...`;
//     voiceManager.speak(text, true);
//   };

//   const handlePlay = () => {
//     setLoading(true);
//     router.push(`/watch/${item.id}?type=movie`);
//   };

//   const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
//   const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;
//   const description = item.overview?.slice(0, 160) || `Watch ${title} online in HD.`;

//   // Build absolute image URL for social tags
//   let imageUrl = `${BASE_URL}/og-image.jpg`;
//   if (item.poster_path) {
//     if (item.poster_path.startsWith('http')) {
//       imageUrl = item.poster_path;
//     } else if (item.poster_path.startsWith('/')) {
//       // Local path (e.g., /images/...)
//       imageUrl = `${BASE_URL}${item.poster_path}`;
//     } else {
//       // TMDB relative path
//       imageUrl = `${TMDB_IMAGE_BASE}${item.poster_path}`;
//     }
//   }

//   return (
//     <>
//       <Head>
//         <title>{title} - Watch Online HD</title>
//         <meta name="description" content={description} />

//         <meta property="og:type" content="video.movie" />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:url" content={shareUrl} />
//         {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />

//         <meta name="twitter:card" content="player" />
//         <meta name="twitter:title" content={title} />
//         <meta name="twitter:description" content={description} />
//         <meta name="twitter:image" content={imageUrl} />
//         {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
//         <meta name="twitter:player:width" content="1280" />
//         <meta name="twitter:player:height" content="720" />

//         {ytId && (
//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{
//               __html: JSON.stringify({
//                 '@context': 'https://schema.org',
//                 '@type': 'VideoObject',
//                 name: title,
//                 description: description,
//                 thumbnailUrl: imageUrl,
//                 uploadDate: item.release_date || new Date().toISOString().split('T')[0],
//                 duration: item.duration || 'PT2H40M',
//                 contentUrl: youtubeWatchUrl,
//                 embedUrl: youtubeEmbedUrl,
//               }),
//             }}
//           />
//         )}
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={readDetails}
//               className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
//             >
//               <Volume2 size={20} />
//             </button>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">{item.overview}</p>
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">
//                   {item.vote_average?.toFixed(1) || 'N/A'} ★
//                 </span>
//                 <span>{item.release_date || 'Unknown'}</span>
//                 <span>{item.duration || 'Unknown'}</span>
//               </div>
//               <button
//                 onClick={handlePlay}
//                 disabled={loading}
//                 className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
//               >
//                 <Play size={20} />
//                 {loading ? 'Loading...' : 'Play Now'}
//               </button>

//               <ShareButtons url={shareUrl} title={title} image={imageUrl} />
//             </div>
//             <div>
//               {ytId ? (
//                 <YouTubePlayer videoId={ytId} title={title} autoplay loop />
//               ) : (
//                 <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
//                   No trailer available
//                 </div>
//               )}
//             </div>
//           </div>

//           <Recommendations items={recommendations || []} basePath="/movies" title="More Movies" />
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = UNIQUE_MOVIES.map((item) => ({
//     params: { id: String(item.id) }, // uses the exact string ID
//   }));
//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const id = params?.id as string;
//     if (!id) return { notFound: true };

//     // First, verify the ID exists in our static list
//     const matched = UNIQUE_MOVIES.find((item) => String(item.id) === id);
//     if (!matched) return { notFound: true };

//     // Now fetch full details (including streams) – this may still throw, so we wrap it
//     let item: ContentDetails;
//     try {
//       item = await getDetails('movie', id);
//     } catch (err) {
//       console.error(`[MovieDetail] getDetails failed for id ${id}:`, err);
//       return { notFound: true };
//     }

//     const sanitizedItem = sanitizeMediaItem(item);

//     const allMovies = UNIQUE_MOVIES.map(sanitizeMediaItem);
//     const recommendations = allMovies.filter((m) => String(m.id) !== id).slice(0, 6);

//     return {
//       props: { item: sanitizedItem, recommendations },
//       revalidate: 3600,
//     };
//   } catch (err) {
//     console.error('[MovieDetail] Unhandled error in getStaticProps:', err);
//     return { notFound: true };
//   }
// };


import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UNIQUE_MOVIES, getDetails } from '../../../services/tmdb';
import { ContentDetails, MediaItem } from '../../../types';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import YouTubePlayer from '../../../components/YouTubePlayer';
import { voiceManager } from '../../../lib/core/VoiceManager';
import { Play, Volume2 } from 'lucide-react';
import { sanitizeMediaItem } from '../../../lib/core/sanitize';
import Recommendations from '../../../components/Recommendations';
import ShareButtons from '../../../components/ShareButtons';

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props {
  item?: Omit<ContentDetails, 'streams'>;
  recommendations?: Omit<MediaItem, 'streams'>[];
  notFound?: boolean;
}

export default function MovieDetail({ item, recommendations, notFound }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (notFound || !item) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content not found</h1>
          <button
            onClick={() => router.push('/movies')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  const title = item.title || item.name || 'Movie';
  const ytId = item.yt_id;
  const shareUrl = `${BASE_URL}/movies/${item.id}`;

  useEffect(() => {
    if (title) {
      voiceManager.speak(`Now viewing ${title}. Click the speaker icon to learn about the movie.`);
    }
  }, [title]);

  const readDetails = () => {
    const text = `${title}. ${item.overview || ''}...`;
    voiceManager.speak(text, true);
  };

  const handlePlay = () => {
    setLoading(true);
    router.push(`/watch/${item.id}?type=movie`);
  };

  const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
  const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;
  const description = item.overview?.slice(0, 160) || `Watch ${title} online in HD.`;

  // Build absolute image URL for social tags
  let imageUrl = `${BASE_URL}/og-image.jpg`;
  if (item.poster_path) {
    if (item.poster_path.startsWith('http')) {
      imageUrl = item.poster_path;
    } else if (item.poster_path.startsWith('/')) {
      imageUrl = `${BASE_URL}${item.poster_path}`;
    } else {
      imageUrl = `${TMDB_IMAGE_BASE}${item.poster_path}`;
    }
  }

  return (
    <>
      <Head>
        <title>{title} - Watch Online HD</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="video.movie" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={shareUrl} />
        {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />

        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />

        {ytId && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'VideoObject',
                name: title,
                description: description,
                thumbnailUrl: imageUrl,
                uploadDate: item.release_date || new Date().toISOString().split('T')[0],
                duration: item.duration || 'PT2H40M',
                contentUrl: youtubeWatchUrl,
                embedUrl: youtubeEmbedUrl,
              }),
            }}
          />
        )}
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={readDetails}
              className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{item.overview}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">
                  {item.vote_average?.toFixed(1) || 'N/A'} ★
                </span>
                <span>{item.release_date || 'Unknown'}</span>
                <span>{item.duration || 'Unknown'}</span>
              </div>
              <button
                onClick={handlePlay}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
              >
                <Play size={20} />
                {loading ? 'Loading...' : 'Play Now'}
              </button>

              <ShareButtons url={shareUrl} title={title} image={imageUrl} />
            </div>
            <div>
              {ytId ? (
                <YouTubePlayer videoId={ytId} title={title} autoplay loop />
              ) : (
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                  No trailer available
                </div>
              )}
            </div>
          </div>

          <Recommendations items={recommendations || []} basePath="/movies" title="More Movies" />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    if (!id) return { notFound: true };

    // Verify the ID exists in our static list
    const matched = UNIQUE_MOVIES.find((item) => String(item.id) === id);
    if (!matched) return { notFound: true };

    // Fetch full details – catch any error and return notFound
    let item: ContentDetails;
    try {
      item = await getDetails('movie', id);
    } catch (err) {
      console.error(`[MovieDetail] getDetails failed for id ${id}:`, err);
      return { notFound: true };
    }

    const sanitizedItem = sanitizeMediaItem(item);

    const allMovies = UNIQUE_MOVIES.map(sanitizeMediaItem);
    const recommendations = allMovies.filter((m) => String(m.id) !== id).slice(0, 6);

    return {
      props: { item: sanitizedItem, recommendations },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('[MovieDetail] Unhandled error in getStaticProps:', err);
    return { notFound: true };
  }
};