// // pages/hindi-dubbed/[id]/index.tsx
// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { UNIQUE_HINDI_DUBBED, getDetails } from '../../../services/tmdb';
// import { ContentDetails, MediaItem } from '../../../types';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// import YouTubePlayer from '../../../components/YouTubePlayer';
// import { voiceManager } from '../../../lib/core/VoiceManager';
// import { Play, Volume2 } from 'lucide-react';
// import { sanitizeMediaItem } from '../../../lib/core/sanitize';
// import Recommendations from '../../../components/Recommendations';

// interface Props {
//   item: Omit<ContentDetails, 'streams'>;
//   recommendations: Omit<MediaItem, 'streams'>[];
// }

// export default function HindiDubbedDetail({ item, recommendations }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const title = item.title || item.name || 'Movie';
//   const ytId = item.yt_id;

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

//   return (
//     <>
//       <Head>
//         <title>{title} - Watch Online HD</title>
//         <meta name="description" content={description} />

//         <meta property="og:type" content="video.movie" />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={item.poster_path || '/og-image.jpg'} />
//         <meta property="og:url" content={`https://movie-tv-trailers.vercel.app/hindi-dubbed/${item.id}`} />
//         {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />

//         <meta name="twitter:card" content="player" />
//         <meta name="twitter:title" content={title} />
//         <meta name="twitter:description" content={description} />
//         <meta name="twitter:image" content={item.poster_path || '/og-image.jpg'} />
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
//                 thumbnailUrl: item.poster_path || '/og-image.jpg',
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
//                   {item.vote_average?.toFixed(1)} ★
//                 </span>
//                 <span>{item.release_date}</span>
//                 <span>{item.duration}</span>
//               </div>
//               <button
//                 onClick={handlePlay}
//                 disabled={loading}
//                 className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
//               >
//                 <Play size={20} />
//                 {loading ? 'Loading...' : 'Play Now'}
//               </button>
//             </div>
//             <div>
//               <YouTubePlayer videoId={ytId} title={title} autoplay loop />
//             </div>
//           </div>

//           <Recommendations items={recommendations} basePath="/hindi-dubbed" title="More Hindi Dubbed Movies" />
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = UNIQUE_HINDI_DUBBED.map((item) => ({
//     params: { id: String(item.id) },
//   }));
//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = params?.id as string;
//   try {
//     const item = await getDetails('movie', id);
//     const sanitizedItem = sanitizeMediaItem(item);

//     const allItems = UNIQUE_HINDI_DUBBED.map(sanitizeMediaItem);
//     const recommendations = allItems
//       .filter(m => String(m.id) !== String(id))
//       .slice(0, 6);

//     return {
//       props: { item: sanitizedItem, recommendations },
//       revalidate: 3600,
//     };
//   } catch {
//     return { notFound: true };
//   }
// };












































// pages/hindi-dubbed/[id]/index.tsx

// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { UNIQUE_HINDI_DUBBED, getDetails } from '../../../services/tmdb';
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

// interface Props {
//   item: Omit<ContentDetails, 'streams'>;
//   recommendations: Omit<MediaItem, 'streams'>[];
// }

// export default function HindiDubbedDetail({ item, recommendations }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const title = item.title || item.name || 'Movie';
//   const ytId = item.yt_id;
//   const shareUrl = `${BASE_URL}/hindi-dubbed/${item.id}`;

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

//   return (
//     <>
//       <Head>
//         <title>{title} - Watch Online HD</title>
//         <meta name="description" content={description} />

//         <meta property="og:type" content="video.movie" />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={item.poster_path || '/og-image.jpg'} />
//         <meta property="og:url" content={shareUrl} />
//         {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
//         {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />

//         <meta name="twitter:card" content="player" />
//         <meta name="twitter:title" content={title} />
//         <meta name="twitter:description" content={description} />
//         <meta name="twitter:image" content={item.poster_path || '/og-image.jpg'} />
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
//                 thumbnailUrl: item.poster_path || '/og-image.jpg',
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
//                   {item.vote_average?.toFixed(1)} ★
//                 </span>
//                 <span>{item.release_date}</span>
//                 <span>{item.duration}</span>
//               </div>
//               <button
//                 onClick={handlePlay}
//                 disabled={loading}
//                 className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
//               >
//                 <Play size={20} />
//                 {loading ? 'Loading...' : 'Play Now'}
//               </button>

//               <ShareButtons url={shareUrl} title={title} image={item.poster_path || undefined} />
//             </div>
//             <div>
//               <YouTubePlayer videoId={ytId} title={title} autoplay loop />
//             </div>
//           </div>

//           <Recommendations items={recommendations} basePath="/hindi-dubbed" title="More Hindi Dubbed Movies" />
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = UNIQUE_HINDI_DUBBED.map((item) => ({
//     params: { id: String(item.id) },
//   }));
//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = params?.id as string;
//   try {
//     const item = await getDetails('movie', id);
//     const sanitizedItem = sanitizeMediaItem(item);

//     const allItems = UNIQUE_HINDI_DUBBED.map(sanitizeMediaItem);
//     const recommendations = allItems
//       .filter(m => String(m.id) !== String(id))
//       .slice(0, 6);

//     return {
//       props: { item: sanitizedItem, recommendations },
//       revalidate: 3600,
//     };
//   } catch {
//     return { notFound: true };
//   }
// };

// pages/hindi-dubbed/[id]/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UNIQUE_HINDI_DUBBED, getDetails } from '../../../services/tmdb';
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

interface Props {
  item: Omit<ContentDetails, 'streams'>;
  recommendations: Omit<MediaItem, 'streams'>[];
}

export default function HindiDubbedDetail({ item, recommendations }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = item.title || item.name || 'Movie';
  const ytId = item.yt_id;
  const shareUrl = `${BASE_URL}/hindi-dubbed/${item.id}`;

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

  return (
    <>
      <Head>
        <title>{title} - Watch Online HD</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={item.poster_path || '/og-image.jpg'} />
        <meta property="og:url" content={shareUrl} />
        {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={item.poster_path || '/og-image.jpg'} />
        {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        {ytId && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'VideoObject',
            name: title, description, thumbnailUrl: item.poster_path || '/og-image.jpg',
            uploadDate: item.release_date || new Date().toISOString().split('T')[0],
            duration: item.duration || 'PT2H40M', contentUrl: youtubeWatchUrl, embedUrl: youtubeEmbedUrl,
          })}} />
        )}
      </Head>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <button onClick={readDetails} className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition">
              <Volume2 size={20} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{item.overview}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded">{item.vote_average?.toFixed(1)} ★</span>
                <span>{item.release_date}</span>
                <span>{item.duration}</span>
              </div>
              <button onClick={handlePlay} disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50">
                <Play size={20} />
                {loading ? 'Loading...' : 'Play Now'}
              </button>
              <ShareButtons url={shareUrl} title={title} description={description} />
            </div>
            <div>
              <YouTubePlayer videoId={ytId} title={title} autoplay loop />
            </div>
          </div>
          <Recommendations items={recommendations} basePath="/hindi-dubbed" title="More Hindi Dubbed Movies" />
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = UNIQUE_HINDI_DUBBED.map((item) => ({ params: { id: String(item.id) } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const item = await getDetails('movie', id);
    const sanitizedItem = sanitizeMediaItem(item);
    const allItems = UNIQUE_HINDI_DUBBED.map(sanitizeMediaItem);
    const recommendations = allItems.filter(m => String(m.id) !== String(id)).slice(0, 6);
    return { props: { item: sanitizedItem, recommendations }, revalidate: 3600 };
  } catch {
    return { notFound: true };
  }
};