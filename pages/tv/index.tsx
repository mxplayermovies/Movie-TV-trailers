// import React, { useState, useCallback, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import { GetStaticProps } from 'next';
// import { UNIQUE_TV_SHOWS } from '../../services/tmdb';
// import { MediaItem } from '../../types';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import { voiceManager } from '../../lib/core/VoiceManager';
// import { Volume2, ChevronDown } from 'lucide-react';
// import { sanitizeMediaItem } from '../../lib/core/sanitize';
// import { musicController } from '../../lib/core/MusicController';
// import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

// const ITEMS_PER_PAGE = 15;
// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// interface Props {
//   items: Omit<MediaItem, 'streams'>[];
//   buildDateString: string; // Pre-formatted date from server
// }

// export default function TvShowsPage({ items, buildDateString }: Props) {
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
//   const totalItems = items.length;
//   const hasMore = visibleCount < totalItems;

//   // Auto‑speak the page content after a short delay (once on mount)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       readPageContent();
//     }, 1500);
//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty array ensures this runs only once

//   const getPageText = useCallback((): string => {
//     const heading = document.querySelector('h1');
//     const pageTextEl = document.querySelector('.page-text');
//     let text = '';
//     if (heading?.textContent) text += heading.textContent + '. ';
//     if (pageTextEl?.textContent) text += pageTextEl.textContent + '. ';
//     return text;
//   }, []);

//   const readPageContent = () => {
//     const text = getPageText();
//     if (text) {
//       voiceManager.speak(text, true);
//     } else {
//       voiceManager.speak("TV shows page. Browse the latest TV shows collection. Click the speaker icon to learn about the latest updated TV shows.");
//     }
//   };

//   const loadMore = () => {
//     setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
//   };

//   const visibleItems = items.slice(0, visibleCount);

//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "name": "TV Shows - Movie & TV trailers",
//     "description": "Browse the latest TV shows collection. Watch free TV shows online.",
//     "url": `${BASE_URL}/tv`,
//     "mainEntity": {
//       "@type": "ItemList",
//       "itemListElement": visibleItems.map((item, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "url": `${BASE_URL}/tv/${item.id}`,
//         "name": item.title || item.name
//       }))
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>TV Shows - Movie & TV trailers</title>
//         <meta name="description" content="Browse the latest TV shows collection. Watch free TV shows online in HD." />
//         <meta name="keywords" content="free tv shows, watch online, tv series, streaming" />
//         <link rel="canonical" href={`${BASE_URL}/tv`} />
//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content="Movie & TV trailers" />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`${BASE_URL}/tv`} />
//         <meta property="og:title" content="TV Shows - Movie & TV trailers" />
//         <meta property="og:description" content="Browse the latest TV shows collection." />
//         <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content="TV Shows - Movie & TV trailers" />
//         <meta name="twitter:description" content="Browse the latest TV shows collection." />
//         <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold">TV Shows</h1>
//             {/* Hidden paragraph – using server‑generated date to avoid hydration mismatch */}
//             <p className="page-text hidden">
//               We have {items.length} TV Shows available. Updated as on {buildDateString}.We update our content regularly to ensure you have the latest and greatest Tv Show trailers and information.every 24 hours. Watch our Latest Tv Show library and enjoy the best free streaming experience.
//             </p>
//             <span className="p-2 dark:text-gray-300 mb-4">Read details aloud</span>
//             <button
//               onClick={readPageContent}
//               className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
//               title="Read page aloud"
//             >
//               <Volume2 size={20} />
//             </button>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {visibleItems.map((item) => (
//               <Link key={item.id} href={`/tv/${item.id}`}>
//                 <div className="group cursor-pointer">
//                   <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
//                     <img
//                       src={item.poster_path || '/og-image.jpg'}
//                       alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                     />
//                   </div>
//                   <h2 className="mt-2 font-semibold text-sm truncate">{item.title}</h2>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {hasMore && (
//             <div className="flex justify-center mt-8">
//               <button
//                 onClick={loadMore}
//                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95"
//               >
//                 <ChevronDown size={20} />
//                 Load More ({visibleCount} / {totalItems})
//               </button>
//             </div>
//           )}
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const items = UNIQUE_TV_SHOWS.map(sanitizeMediaItem);

//   // Generate the date on the server using a fixed locale (en-GB)
//   const buildDateString = new Date().toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });

//   return {
//     props: { items, buildDateString },
//     revalidate: 3600,
//   };
// };







// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import { GetStaticProps } from 'next';
// import { UNIQUE_TV_SHOWS } from '../../services/tmdb';
// import { MediaItem } from '../../types';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import { Volume2, ChevronDown } from 'lucide-react';
// import { sanitizeMediaItem } from '../../lib/core/sanitize';
// import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

// const ITEMS_PER_PAGE = 15;
// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// interface Props {
//   items: Omit<MediaItem, 'streams'>[];
//   buildDateString: string;
// }

// export default function TvShowsPage({ items, buildDateString }: Props) {
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
//   const voiceRef = useRef<{
//     speak: (text: string, force?: boolean, withMusic?: boolean) => void;
//     playBackgroundMusic: (id: string) => void;
//     stopBackgroundMusic: () => void;
//   } | null>(null);
//   const totalItems = items.length;
//   const hasMore = visibleCount < totalItems;

//   const getPageText = useCallback((): string => {
//     if (typeof document === 'undefined') return '';
//     try {
//       const heading = document.querySelector('h1');
//       const pageTextEl = document.querySelector('.page-text');
//       let text = '';
//       if (heading?.textContent) text += heading.textContent + '. ';
//       if (pageTextEl?.textContent) text += pageTextEl.textContent + '. ';
//       return text;
//     } catch { return ''; }
//   }, []);

//   useEffect(() => {
//     let cancelled = false;
//     import('../../lib/core/VoiceManager').then(({ voiceManager }) => {
//       if (cancelled) return;
//       voiceRef.current = voiceManager;
//       voiceManager.playBackgroundMusic(DEFAULT_BG_MUSIC_IDS.tv);
//       setTimeout(() => {
//         if (cancelled) return;
//         try {
//           const text = getPageText() || 'TV Shows page. Browse the latest TV shows collection.';
//           voiceManager.speak(text, true, true);
//         } catch { /* ignore */ }
//       }, 1500);
//     }).catch(() => {});
//     return () => {
//       cancelled = true;
//       voiceRef.current?.stopBackgroundMusic();
//     };
//   }, [getPageText]);

//   const readPageContent = () => {
//     try {
//       const text = getPageText() || 'TV Shows page. Browse the latest TV shows collection.';
//       voiceRef.current?.speak(text, true, true);
//     } catch { /* ignore */ }
//   };

//   const loadMore = () => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
//   const visibleItems = items.slice(0, visibleCount);

//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "name": "TV Shows - Movie & TV trailers",
//     "description": "Browse the latest TV shows collection. Watch free TV shows online.",
//     "url": `${BASE_URL}/tv`,
//     "mainEntity": {
//       "@type": "ItemList",
//       "itemListElement": visibleItems.map((item, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "url": `${BASE_URL}/tv/${item.id}`,
//         "name": item.title || item.name
//       }))
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>TV Shows - Movie & TV trailers</title>
//         <meta name="description" content="Browse the latest TV shows collection. Watch free TV shows online in HD." />
//         <meta name="keywords" content="free tv shows, watch online, tv series, streaming" />
//         <link rel="canonical" href={`${BASE_URL}/tv`} />
//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content="Movie & TV trailers" />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`${BASE_URL}/tv`} />
//         <meta property="og:title" content="TV Shows - Movie & TV trailers" />
//         <meta property="og:description" content="Browse the latest TV shows collection." />
//         <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content="TV Shows - Movie & TV trailers" />
//         <meta name="twitter:description" content="Browse the latest TV shows collection." />
//         <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold">TV Shows</h1>
//             <p className="page-text hidden">
//               We have {items.length} TV Shows available. Updated as on {buildDateString}. We update our content regularly to ensure you have the latest and greatest TV Show trailers and information every 24 hours. Watch our Latest TV Show library and enjoy the best free streaming experience.
//             </p>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-500 dark:text-gray-300">Read details aloud</span>
//               <button onClick={readPageContent} className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition" title="Read page aloud">
//                 <Volume2 size={20} />
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {visibleItems.map((item) => (
//               <Link key={item.id} href={`/tv/${item.id}`}>
//                 <div className="group cursor-pointer">
//                   <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
//                     <img src={item.poster_path || '/og-image.jpg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
//                   </div>
//                   <h2 className="mt-2 font-semibold text-sm truncate">{item.title}</h2>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {hasMore && (
//             <div className="flex justify-center mt-8">
//               <button onClick={loadMore} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95">
//                 <ChevronDown size={20} />
//                 Load More ({visibleCount} / {totalItems})
//               </button>
//             </div>
//           )}
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const items = UNIQUE_TV_SHOWS.map(sanitizeMediaItem);
//   const buildDateString = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
//   return { props: { items, buildDateString }, revalidate: 3600 };
// };








import React, { useState, useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { UNIQUE_TV_SHOWS } from '../../services/tmdb';
import { MediaItem } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { sanitizeMediaItem } from '../../lib/core/sanitize';
import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

const ITEMS_PER_PAGE = 15;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  items: Omit<MediaItem, 'streams'>[];
  buildDateString: string;
}

export default function TvShowsPage({ items, buildDateString }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isMuted, setIsMuted] = useState(false);
  const voiceRef = useRef<{
    speak: (text: string, force?: boolean, withMusic?: boolean) => void;
    cancelSpeech: () => void;
    playBackgroundMusic: (id: string) => void;
    stopBackgroundMusic: () => void;
    setMusicMuted: (muted: boolean) => void;
  } | null>(null);
  const totalItems = items.length;
  const hasMore = visibleCount < totalItems;

  const getPageText = useCallback((): string => {
    if (typeof document === 'undefined') return '';
    try {
      const heading = document.querySelector('h1');
      const pageTextEl = document.querySelector('.page-text');
      let text = '';
      if (heading?.textContent) text += heading.textContent + '. ';
      if (pageTextEl?.textContent) text += pageTextEl.textContent + '. ';
      return text;
    } catch { return ''; }
  }, []);

  useEffect(() => {
    let cancelled = false;
    import('../../lib/core/VoiceManager').then(({ voiceManager }) => {
      if (cancelled) return;
      voiceRef.current = voiceManager;
      voiceManager.playBackgroundMusic(DEFAULT_BG_MUSIC_IDS.tv);
      setTimeout(() => {
        if (cancelled || isMuted) return;
        try {
          const text = getPageText() || 'TV Shows page. Browse the latest TV shows collection.';
          voiceManager.speak(text, true, true);
        } catch { /* ignore */ }
      }, 1500);
    }).catch(() => {});
    return () => {
      cancelled = true;
      voiceRef.current?.stopBackgroundMusic();
    };
  }, [getPageText, isMuted]);

  useEffect(() => {
    if (voiceRef.current) {
      if (isMuted) {
        voiceRef.current.cancelSpeech();
        voiceRef.current.setMusicMuted(true);
      } else {
        voiceRef.current.setMusicMuted(false);
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const readPageContent = () => {
    if (isMuted) return;
    try {
      const text = getPageText() || 'TV Shows page. Browse the latest TV shows collection.';
      voiceRef.current?.speak(text, true, true);
    } catch { /* ignore */ }
  };

  const loadMore = () => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
  const visibleItems = items.slice(0, visibleCount);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "TV Shows - Movie & TV trailers",
    "description": "Browse the latest TV shows collection. Watch free TV shows online.",
    "url": `${BASE_URL}/tv`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": visibleItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${BASE_URL}/tv/${item.id}`,
        "name": item.title || item.name
      }))
    }
  };

  return (
    <>
      <Head>
        <title>TV Shows - Movie & TV trailers</title>
        <meta name="description" content="Browse the latest TV shows collection. Watch free TV shows online in HD." />
        <meta name="keywords" content="free tv shows, watch online, tv series, streaming" />
        <link rel="canonical" href={`${BASE_URL}/tv`} />
        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content="Movie & TV trailers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/tv`} />
        <meta property="og:title" content="TV Shows - Movie & TV trailers" />
        <meta property="og:description" content="Browse the latest TV shows collection." />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:title" content="TV Shows - Movie & TV trailers" />
        <meta name="twitter:description" content="Browse the latest TV shows collection." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">TV Shows</h1>
            <p className="page-text hidden">
              We have {items.length} TV Shows available. Updated as on {buildDateString}. We update our content regularly to ensure you have the latest and greatest TV Show trailers and information every 24 hours. Watch our Latest TV Show library and enjoy the best free streaming experience.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-300">Read details aloud</span>
              <button
                onClick={toggleMute}
                className={`p-2 rounded-full transition ${
                  isMuted
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visibleItems.map((item) => (
              <Link key={item.id} href={`/tv/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={item.poster_path || '/og-image.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h2 className="mt-2 font-semibold text-sm truncate">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <ChevronDown size={20} />
                Load More ({visibleCount} / {totalItems})
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const items = UNIQUE_TV_SHOWS.map(sanitizeMediaItem);
  const buildDateString = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return { props: { items, buildDateString }, revalidate: 3600 };
};