// // components/Recommendations.tsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MediaItem } from '../types';

// interface Props {
//   items: Omit<MediaItem, 'streams'>[];
//   title?: string;
//   basePath: string; // e.g., '/movies', '/tv'
// }

// const Recommendations: React.FC<Props> = ({ items, title = 'You may also like', basePath }) => {
//   const [shuffledItems, setShuffledItems] = useState<Omit<MediaItem, 'streams'>[]>([]);

//   // Fisher‑Yates shuffle
//   const shuffleArray = (array: Omit<MediaItem, 'streams'>[]) => {
//     const arr = [...array];
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
//   };

//   // Initial shuffle
//   useEffect(() => {
//     if (items.length) {
//       setShuffledItems(shuffleArray(items));
//     }
//   }, [items]);

//   // Reshuffle every 5 seconds
//   useEffect(() => {
//     if (items.length <= 1) return;

//     const interval = setInterval(() => {
//       setShuffledItems(prev => shuffleArray(prev));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [items.length]);

//   if (!items.length) return null;

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {shuffledItems.map((item, index) => (
//           <AnimatePresence key={`${item.id}-${index}`} mode="wait">
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.4, delay: index * 0.03 }} // staggered effect
//               layout
//             >
//               <Link href={`${basePath}/${item.id}`}>
//                 <motion.div
//                   className="group cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: 'spring', stiffness: 300 }}
//                 >
//                   <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
//                     <img
//                       src={item.poster_path || '/og-image.jpg'}
//                       alt={item.title || item.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <h3 className="mt-2 font-semibold text-sm truncate">{item.title || item.name}</h3>
//                 </motion.div>
//               </Link>
//             </motion.div>
//           </AnimatePresence>
//         ))}
//       </div>
//     </div>
//   );
// };
  
// export default Recommendations;

// components/Recommendations.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem } from '../types';

interface Props {
  items: Omit<MediaItem, 'streams'>[];
  title?: string;
  basePath: string; // e.g., '/movies', '/tv'
}

const Recommendations: React.FC<Props> = ({ items, title = 'You may also like', basePath }) => {
  const [shuffledItems, setShuffledItems] = useState<Omit<MediaItem, 'streams'>[]>([]);

  // Fisher‑Yates shuffle
  const shuffleArray = (array: Omit<MediaItem, 'streams'>[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initial shuffle
  useEffect(() => {
    if (items.length) {
      setShuffledItems(shuffleArray(items));
    }
  }, [items]);

  // Reshuffle every 5 seconds
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setShuffledItems(prev => shuffleArray(prev));
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shuffledItems.map((item, index) => (
          <AnimatePresence key={`${item.id}-${index}`} mode="wait">
            <motion.div
              key={item.id}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03, ease: 'easeOut' }}
              style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
              layout
            >
              <Link href={`${basePath}/${item.id}`}>
                <motion.div
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={item.poster_path || '/og-image.jpg'}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-2 font-semibold text-sm truncate">{item.title || item.name}</h3>
                </motion.div>
              </Link>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};
  
export default Recommendations;