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
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

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

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Adult Movies - Movie & TV trailers",
    "description": "Browse the latest adult movie collection. 18+ content.",
    "url": `${BASE_URL}/adult`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": visibleItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${BASE_URL}/adult/${item.id}`,
        "name": item.title || item.name
      }))
    }
  };

  return (
    <>
      <Head>
        <title>Adult Movies - Movie & TV trailers</title>
        <meta name="description" content="Browse the latest adult movie collection. 18+ content available." />
        <meta name="keywords" content="adult movies, 18+, streaming" />
        <meta name="rating" content="adult" />
        <link rel="canonical" href={`${BASE_URL}/adult`} />
        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content="Movie & TV trailers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/adult`} />
        <meta property="og:title" content="Adult Movies - Movie & TV trailers" />
        <meta property="og:description" content="Browse the latest adult movie collection." />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:title" content="Adult Movies - Movie & TV trailers" />
        <meta name="twitter:description" content="Browse the latest adult movie collection." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
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
  if (!UNIQUE_ADULT || UNIQUE_ADULT.length === 0) {
    console.error('UNIQUE_ADULT is empty or undefined');
    return {
      props: { items: [] },
      revalidate: 3600,
    };
  }
  const items = UNIQUE_ADULT.map(sanitizeMediaItem);
  return {
    props: { items },
    revalidate: 3600,
  };
};