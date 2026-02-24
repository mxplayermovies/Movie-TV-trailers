// pages/adult/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { UNIQUE_ADULT } from '../../services/tmdb';
import { MediaItem } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { voiceManager } from '../../lib/core/VoiceManager';
import { Volume2, ChevronDown } from 'lucide-react';
import { sanitizeMediaItem } from '../../lib/core/sanitize';

const ITEMS_PER_PAGE = 15;

interface Props {
  items: Omit<MediaItem, 'streams'>[];
}

export default function AdultPage({ items }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const totalItems = items.length;
  const hasMore = visibleCount < totalItems;

  useEffect(() => {
    voiceManager.speak('Adult Movies page. Browse the latest adult movie collection. Click the speaker icon to learn about the latest updated Hot Adult Movies.');
  }, []);

  const readPageContent = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const text = ` We have ${items.length} Hot Adult Movies available. Updated as on ${formattedDate}. `;
    voiceManager.speak(text, true);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, totalItems));
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <Head>
        <title>Adult Movies - Movie & TV trailers</title>
      </Head>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Adult Movies</h1>
            <button
              onClick={readPageContent}
              className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
              title="Read page aloud"
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visibleItems.map((item) => (
              <Link key={item.id} href={`/adult/${item.id}`}>
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
  const items = UNIQUE_ADULT.map(sanitizeMediaItem);
  return {
    props: { items },
    revalidate: 3600,
  };
};