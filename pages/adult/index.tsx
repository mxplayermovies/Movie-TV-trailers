import React, { useState, useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { UNIQUE_ADULT } from '../../services/tmdb';
import { MediaItem } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Volume2, ChevronDown } from 'lucide-react';
import { sanitizeMediaItem } from '../../lib/core/sanitize';

const ITEMS_PER_PAGE = 15;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props { items: Omit<MediaItem, 'streams'>[]; buildDateString: string; }

export default function AdultPage({ items, buildDateString }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const voiceRef = useRef<{ speak: (text: string, interrupt?: boolean) => void } | null>(null);
  const totalItems = items.length;

  const getPageText = useCallback((): string => {
    if (typeof document === 'undefined') return '';
    try { const h = document.querySelector('h1')?.textContent || ''; const p = document.querySelector('.page-text')?.textContent || ''; return h ? `${h}. ${p}` : p; } catch { return ''; }
  }, []);

  useEffect(() => {
    let cancelled = false; let timer: ReturnType<typeof setTimeout>;
    import('../../lib/core/VoiceManager').then(({ voiceManager }) => {
      if (cancelled) return; voiceRef.current = voiceManager;
      timer = setTimeout(() => { if (cancelled) return; try { voiceManager.speak(getPageText() || 'Adult movies page. Browse the latest adult movie collection.', true); } catch { } }, 1500);
    }).catch(() => {});
    return () => { cancelled = true; clearTimeout(timer); };
  }, [getPageText]);

  const readPageContent = () => { try { voiceRef.current?.speak(getPageText() || 'Adult movies page.', true); } catch { } };
  const loadMore = () => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <Head>
        <title>Adult Movies - Movie &amp; TV trailers</title>
        <meta name="description" content="Browse the latest adult movie collection. 18+ content available." />
        <meta name="rating" content="adult" />
        <link rel="canonical" href={`${BASE_URL}/adult`} />
        {FB_APP_ID && <meta property="fb:app_id" content={FB_APP_ID} />}
        <meta property="og:type" content="website" /><meta property="og:url" content={`${BASE_URL}/adult`} />
        <meta property="og:title" content="Adult Movies - Movie & TV trailers" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
      </Head>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Adult Movies</h1>
            <p className="page-text hidden">We have {items.length} Hot Adult Movies available. Updated as on {buildDateString}.</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-300">Read details aloud</span>
              <button onClick={readPageContent} className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition" aria-label="Read page aloud"><Volume2 size={20} /></button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visibleItems.map((item) => (
              <Link key={item.id} href={`/adult/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800"><img src={item.poster_path || '/og-image.jpg'} alt={item.title || item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" /></div>
                  <h2 className="mt-2 font-semibold text-sm truncate">{item.title || item.name}</h2>
                </div>
              </Link>
            ))}
          </div>
          {visibleCount < totalItems && (
            <div className="flex justify-center mt-8">
              <button onClick={loadMore} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all"><ChevronDown size={20} />Load More ({visibleCount} / {totalItems})</button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  if (!UNIQUE_ADULT || UNIQUE_ADULT.length === 0) return { props: { items: [], buildDateString: '' }, revalidate: 3600 };
  return { props: { items: UNIQUE_ADULT.map(sanitizeMediaItem), buildDateString: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }, revalidate: 3600 };
};