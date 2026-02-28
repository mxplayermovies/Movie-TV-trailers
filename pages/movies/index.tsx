import React, { useState, useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { UNIQUE_MOVIES } from '../../services/tmdb';
import { MediaItem } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Volume2, ChevronDown } from 'lucide-react';
import { sanitizeMediaItem } from '../../lib/core/sanitize';

// NO top-level voiceManager import — loads dynamically below to avoid SSR crash

const ITEMS_PER_PAGE = 15;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  items: Omit<MediaItem, 'streams'>[];
  buildDateString: string;
}

export default function MoviesPage({ items, buildDateString }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const voiceRef = useRef<{ speak: (text: string, interrupt?: boolean) => void } | null>(null);
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
    let timer: ReturnType<typeof setTimeout>;
    import('../../lib/core/VoiceManager').then(({ voiceManager }) => {
      if (cancelled) return;
      voiceRef.current = voiceManager;
      timer = setTimeout(() => {
        if (cancelled) return;
        try {
          const text = getPageText() || 'Movies page. Browse the latest movie collection.';
          voiceManager.speak(text, true);
        } catch { /* ignore */ }
      }, 1500);
    }).catch(() => {});
    return () => { cancelled = true; clearTimeout(timer); };
  }, [getPageText]);

  const readPageContent = () => {
    try {
      const text = getPageText() || 'Movies page. Browse the latest movie collection.';
      voiceRef.current?.speak(text, true);
    } catch { /* ignore */ }
  };

  const loadMore = () => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
  const visibleItems = items.slice(0, visibleCount);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Movies - Movie & TV trailers',
    description: 'Browse the latest movie collection. Watch free movies online.',
    url: `${BASE_URL}/movies`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: visibleItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE_URL}/movies/${item.id}`,
        name: item.title || item.name,
      })),
    },
  };

  return (
    <>
      <Head>
        <title>Movies - Movie &amp; TV trailers</title>
        <meta name="description" content="Browse the latest movie collection. Watch free movies online in HD. No sign-up required." />
        <meta name="keywords" content="free movies, watch online, movies, streaming" />
        <link rel="canonical" href={`${BASE_URL}/movies`} />
        {FB_APP_ID && <meta property="fb:app_id" content={FB_APP_ID} />}
        <meta property="og:site_name" content="Movie & TV trailers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/movies`} />
        <meta property="og:title" content="Movies - Movie & TV trailers" />
        <meta property="og:description" content="Browse the latest movie collection. Watch free movies online." />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:title" content="Movies - Movie & TV trailers" />
        <meta name="twitter:description" content="Browse the latest movie collection." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Movies</h1>
            <p className="page-text hidden">We have {items.length} movies available. Updated as on {buildDateString}.</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-300">Read details aloud</span>
              <button onClick={readPageContent} className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition" title="Read page aloud" aria-label="Read page aloud">
                <Volume2 size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visibleItems.map((item) => (
              <Link key={item.id} href={`/movies/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <img src={item.poster_path || '/og-image.jpg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h2 className="mt-2 font-semibold text-sm truncate">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button onClick={loadMore} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95">
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
  const items = UNIQUE_MOVIES.map(sanitizeMediaItem);
  const buildDateString = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return { props: { items, buildDateString }, revalidate: 3600 };
};
