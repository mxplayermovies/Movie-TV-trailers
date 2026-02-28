// components/Recommendations.tsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MediaItem } from '../types';
import {
  UNIQUE_MOVIES,
  UNIQUE_TV_SHOWS,
  UNIQUE_SPORTS,
  UNIQUE_TV_LIVE,
  UNIQUE_HINDI_DUBBED,
  UNIQUE_ADULT,
  UNIQUE_DOCUMENTARY,
} from '../services/tmdb';

interface Props {
  items: Omit<MediaItem, 'streams'>[];
  title?: string;
  basePath: string; // e.g. '/movies', '/tv', '/sports', '/live', '/hindi-dubbed', '/adult'
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Pick the FULL list for the category based on basePath
const getFullListForCategory = (basePath: string): Omit<MediaItem, 'streams'>[] => {
  const strip = (arr: MediaItem[]): Omit<MediaItem, 'streams'>[] =>
    arr.map(({ streams, ...rest }) => rest);

  if (basePath.includes('hindi-dubbed')) return strip(UNIQUE_HINDI_DUBBED);
  if (basePath.includes('adult'))        return strip(UNIQUE_ADULT);
  if (basePath.includes('sports'))       return strip(UNIQUE_SPORTS);
  if (basePath.includes('live'))         return strip(UNIQUE_TV_LIVE);
  if (basePath.includes('tv'))           return strip(UNIQUE_TV_SHOWS);
  if (basePath.includes('documentary'))  return strip(UNIQUE_DOCUMENTARY);
  // default: movies
  return strip(UNIQUE_MOVIES);
};

const Recommendations: React.FC<Props> = ({ items, title = 'You may also like', basePath }) => {
  const [displayedItems, setDisplayedItems] = useState<Omit<MediaItem, 'streams'>[]>([]);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const cardIndexRef = useRef(0);
  const queueRef = useRef<Omit<MediaItem, 'streams'>[]>([]);

  const getNextFromQueue = (currentDisplayed: Omit<MediaItem, 'streams'>[]) => {
    const displayedIds = new Set(currentDisplayed.map(d => String(d.id)));

    if (queueRef.current.length === 0) {
      queueRef.current = shuffleArray(getFullListForCategory(basePath));
    }

    let attempts = 0;
    while (attempts < queueRef.current.length) {
      const next = queueRef.current.shift()!;
      if (!displayedIds.has(String(next.id))) return next;
      queueRef.current.push(next);
      attempts++;
    }

    if (queueRef.current.length === 0) {
      queueRef.current = shuffleArray(getFullListForCategory(basePath));
    }
    return queueRef.current.shift()!;
  };

  useEffect(() => {
    const fullList = getFullListForCategory(basePath);
    const shuffled = shuffleArray(fullList);
    const initial = shuffled.slice(0, 10);
    queueRef.current = shuffled.slice(10);
    cardIndexRef.current = 0;
    setDisplayedItems(initial);
  }, [basePath]);

  useEffect(() => {
    if (displayedItems.length === 0) return;

    const interval = setInterval(() => {
      const idx = cardIndexRef.current % displayedItems.length;
      setFlippingIndex(idx);

      setTimeout(() => {
        setDisplayedItems(prev => {
          const arr = [...prev];
          arr[idx] = getNextFromQueue(arr);
          return arr;
        });
      }, 300);

      setTimeout(() => setFlippingIndex(null), 600);
      cardIndexRef.current += 1;
    }, 800);

    return () => clearInterval(interval);
  }, [displayedItems.length]);

  if (!displayedItems.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} style={{ perspective: '800px' }}>
            <motion.div
              animate={
                flippingIndex === index
                  ? { rotateY: [0, 90, 0] }
                  : { rotateY: 0 }
              }
              transition={
                flippingIndex === index
                  ? { duration: 0.6, ease: 'easeInOut', times: [0, 0.5, 1] }
                  : { duration: 0 }
              }
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link href={`${basePath}/${item.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={item.poster_path || '/og-image.jpg'}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="mt-2 font-semibold text-sm truncate">{item.title || item.name}</h3>
                </div>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;