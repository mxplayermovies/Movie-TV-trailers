// import React, { useEffect, useState, useCallback } from 'react';
// import { getMovies, searchContent } from '../services/tmdb';
// import MovieCard from '../components/MovieCard';
// import SEO from '../components/SEO';
// import { Movie, MediaItem } from '../types';
// import { Film, Search, X, Volume2, VolumeX } from 'lucide-react';

// // ========== IMPORT THE AUDIO/TTS MODULES ==========
// import { voiceManager } from '../lib/core/VoiceManager';
// import { musicController } from '../lib/core/MusicController';
// import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

// const Movies: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);

//   // ========== TTS PLAY/STOP STATE ==========
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   // Background music ID for movies page
//   const getBgMusicId = useCallback((): string | null => {
//     return DEFAULT_BG_MUSIC_IDS.movies || DEFAULT_BG_MUSIC_IDS.home;
//   }, []);

//   // Stop music on unmount
//   useEffect(() => {
//     return () => {
//       voiceManager.stopBackgroundMusic();
//       musicController.setCurrentMusicId(null);
//     };
//   }, []);

//   // Unlock audio on first user interaction (any click on the page)
//   useEffect(() => {
//     const unlockOnce = () => {
//       voiceManager.onUserInteraction(); // Unmutes YT player if needed
//       document.removeEventListener('click', unlockOnce);
//     };
//     document.addEventListener('click', unlockOnce);
//     return () => document.removeEventListener('click', unlockOnce);
//   }, []);

//   // Helper to format current date as "Month Day, Year"
//   const getCurrentDateString = (): string => {
//     const date = new Date();
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   // TTS: play/stop toggle (controls both TTS and background music)
//   const handleSpeakerClick = () => {
//     if (isSpeaking) {
//       // Stop both TTS and background music
//       voiceManager.cancelSpeech();
//       voiceManager.stopBackgroundMusic();
//       setIsSpeaking(false);
//     } else {
//       // Start background music first
//       const videoId = getBgMusicId();
//       if (videoId) {
//         voiceManager.playBackgroundMusic(videoId);
//         musicController.setCurrentMusicId(videoId);
//       } else {
//         console.warn('No background music ID for movies page');
//       }
//       // Then start TTS, and when TTS ends, stop background music as well
//       const currentYear = new Date().getFullYear();
//       const movieCount = movies.length;
//       const currentDate = getCurrentDateString();
//       const speakText = `Movies page. Browse the latest movies from ${currentYear}. Currently showing ${movieCount} movies. Updated as of ${currentDate}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
//       voiceManager.speak(speakText, true, true, () => {
//         // TTS ended naturally – stop background music too
//         voiceManager.stopBackgroundMusic();
//         setIsSpeaking(false);
//       });
//       setIsSpeaking(true);
//     }
//   };

//   // ---------- Fetch latest movies from current year ----------
//   const getCurrentYearMovies = async (pageNum: number): Promise<Movie[]> => {
//     try {
//       const currentYear = new Date().getFullYear();
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;

//       const response = await fetch(url);
//       const data = await response.json();

//       // If no results for current year, fallback to previous year
//       if (data.results.length === 0 && pageNum === 1) {
//         const fallbackUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear - 1}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;
//         const fallbackRes = await fetch(fallbackUrl);
//         const fallbackData = await fallbackRes.json();
//         setHasMore(fallbackData.page < fallbackData.total_pages);
//         return fallbackData.results || [];
//       }

//       setHasMore(data.page < data.total_pages);
//       return data.results || [];
//     } catch (error) {
//       console.error('Failed to fetch current year movies:', error);
//       // Fallback to regular popular movies if discover fails
//       const fallback = await getMovies('popular', pageNum);
//       setHasMore(fallback.length > 0);
//       return fallback;
//     }
//   };
//   // ----------------------------------------------------------------

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

//     setIsSearching(true);
//     setShowResults(true);
//     try {
//       const results = await searchContent(searchQuery);
//       const withPoster = results.filter(item => item.poster_path);
//       setSearchResults(withPoster);
//     } catch (error) {
//       console.error('Search failed:', error);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setShowResults(false);
//   };

//   // Initial load – get current year movies
//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         const data = await getCurrentYearMovies(1);
//         const withPoster = data.filter((movie: Movie) => movie.poster_path);
//         setMovies(withPoster);
//         setPage(1);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);

//   // Load more – same filter (current year)
//   const loadMore = async () => {
//     if (loadingMore || !hasMore) return;
//     setLoadingMore(true);
//     try {
//       const nextPage = page + 1;
//       const data = await getCurrentYearMovies(nextPage);
//       const withPoster = data.filter((movie: Movie) => movie.poster_path);
//       setMovies((prev) => [...prev, ...withPoster]);
//       setPage(nextPage);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "name": "Latest Movies",
//     "description": "Watch the newest movie releases from the current year on Movie & TV trailers.",
//     "url": "https://movie-tv-trailers.vercel.app/Movies"
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20 flex items-center justify-center bg-miraj-black">
//         <div className="w-10 h-10 border-4 border-miraj-gold border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">
//       {/* Read Aloud button – controls both TTS and background music */}
//       <button
//   onClick={handleSpeakerClick}
//   className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 font-semibold ${
//     isSpeaking
//       ? 'bg-red-600 text-white hover:bg-red-700'
//       : 'bg-yellow-400 text-black hover:bg-yellow-500'
//   }`}
//   title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
// >
//   {isSpeaking ? <VolumeX size={22} /> : <Volume2 size={22} />}
//   <span className="text-sm">Read Aloud</span>
// </button>

//       <SEO 
//         title="Latest Movies - Movie & TV trailers" 
//         description="Watch the newest movie releases from this year in HD." 
//         schema={schema}
//         path="/movies"
//       />

//       {/* SEARCH SECTION */}
//       <div className="container mx-auto px-4 md:px-6 relative z-20 mt-8 md:mt-12">
//         <div className="max-w-4xl mx-auto">
//           <form onSubmit={handleSearch} className="relative">
//             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-2xl transition-all duration-300 focus-within:border-miraj-gold focus-within:bg-white/15">
//               <Search className="text-gray-400 ml-4" size={20} />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search movies, TV shows, sports, live TV..."
//                 className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2 py-3 text-sm md:text-base"
//               />
//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={clearSearch}
//                   className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                   aria-label="Clear search"
//                 >
//                   <X className="text-gray-400" size={18} />
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={isSearching || searchQuery.trim().length < 2}
//                 className="bg-miraj-gold hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 {isSearching ? 'Searching...' : 'Find'}
//               </button>
//             </div>
//           </form>

//           {/* SEARCH RESULTS */}
//           {showResults && (
//             <div className="mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl md:text-2xl font-bold text-white">
//                   Search Results {searchResults.length > 0 && (
//                     <span className="text-miraj-gold ml-2">({searchResults.length})</span>
//                   )}
//                 </h2>
//                 <button
//                   onClick={clearSearch}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {isSearching ? (
//                 <div className="flex flex-col items-center justify-center py-16">
//                   <div className="w-12 h-12 border-4 border-white/10 border-t-miraj-gold rounded-full animate-spin mb-4"></div>
//                   <p className="text-gray-400">Searching...</p>
//                 </div>
//               ) : searchResults.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
//                   {searchResults.map((item) => (
//                     <MovieCard key={`search-${item.media_type}-${item.id}`} item={item as any} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-16">
//                   <Search className="text-gray-600 mb-4" size={48} />
//                   <p className="text-gray-400 text-center">
//                     No results found for "<span className="text-white font-semibold">{searchQuery}</span>"
//                   </p>
//                   <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-3 bg-miraj-gray rounded-full border border-white/10">
//             <Film className="text-miraj-gold" size={24} />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white">Movies</h1>
//             <p className="text-gray-400 text-sm">Newest releases from {new Date().getFullYear()}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
//           {movies.map((movie) => (
//             <MovieCard key={movie.id} item={movie} />
//           ))}
//         </div>

//         {hasMore && (
//           <div className="mt-12 text-center">
//             <button
//               onClick={loadMore}
//               disabled={loadingMore}
//               className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all disabled:opacity-50"
//             >
//               {loadingMore ? 'Loading...' : 'Load More Movies'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Movies;



























































// // pages/Movies.tsx
// import React, { useEffect, useState, useCallback } from 'react';
// import { getMovies, searchContent, UNIQUE_MOVIES } from '../services/tmdb';
// import MovieCard from '../components/MovieCard';
// import SEO from '../components/SEO';
// import { Movie, MediaItem } from '../types';
// import { Film, Search, X, Volume2, VolumeX } from 'lucide-react';

// // ========== IMPORT THE AUDIO/TTS MODULES ==========
// import { voiceManager } from '../lib/core/VoiceManager';
// import { musicController } from '../lib/core/MusicController';
// import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

// /* ─── Translation-safe style helpers ────────────────────────────────────────
//  *
//  * Google Translate rewrites the DOM and injects translated strings that can be
//  * significantly longer than the English originals. These helpers defend against
//  * overflow at every text node so the layout never breaks regardless of language.
//  *
//  *  TEXT_SAFE  – applied to every element that renders text
//  *  fluidFont  – CSS clamp() size that interpolates between minPx @ 320 vw and
//  *               maxPx @ 1280 vw so text scales proportionally on any device
//  * ─────────────────────────────────────────────────────────────────────────── */

// const TEXT_SAFE: React.CSSProperties = {
//   overflowWrap: 'anywhere',
//   wordBreak: 'break-word',
//   hyphens: 'auto',
//   minWidth: 0,
// };

// function fluidFont(minPx: number, maxPx: number): React.CSSProperties {
//   const slope     = (maxPx - minPx) / (1280 - 320);
//   const intercept = minPx - slope * 320;
//   return {
//     fontSize: `clamp(${minPx}px, calc(${intercept.toFixed(2)}px + ${(slope * 100).toFixed(4)}vw), ${maxPx}px)`,
//     ...TEXT_SAFE,
//   };
// }

// /* ─── Fisher-Yates shuffle ───────────────────────────────────────────────── */

// function shuffleArray<T>(arr: T[]): T[] {
//   const a = [...arr];
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

// /**
//  * Merges UNIQUE_MOVIES (static custom items from tmdb.ts) with the live TMDB
//  * API results and shuffles the combined list so custom movies surface randomly
//  * throughout the grid rather than all appearing at the top or bottom.
//  *
//  * Deduplication is done by `id` so a movie that exists in both sources is only
//  * shown once — the static version wins so streams are always present.
//  *
//  * Every time you add a new entry to UNIQUE_MOVIES in tmdb.ts and redeploy,
//  * it will automatically appear in the shuffled grid on the next build.
//  */
// function mergeAndShuffle(apiMovies: Movie[], customMovies: MediaItem[]): MediaItem[] {
//   const seenIds = new Set<string | number>();
//   const merged: MediaItem[] = [];

//   // Custom movies win on id conflict — register them first
//   for (const movie of customMovies) {
//     seenIds.add(String(movie.id));
//     merged.push(movie as MediaItem);
//   }

//   // Append API movies only when their id is not already represented
//   for (const movie of apiMovies) {
//     if (!seenIds.has(String(movie.id))) {
//       seenIds.add(String(movie.id));
//       merged.push(movie as unknown as MediaItem);
//     }
//   }

//   return shuffleArray(merged);
// }

// /* ─── Component ─────────────────────────────────────────────────────────── */

// const Movies: React.FC = () => {
//   const [movies, setMovies]             = useState<MediaItem[]>([]);
//   const [page, setPage]                 = useState(1);
//   const [loading, setLoading]           = useState(true);
//   const [loadingMore, setLoadingMore]   = useState(false);
//   const [hasMore, setHasMore]           = useState(true);

//   const [searchQuery, setSearchQuery]     = useState('');
//   const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
//   const [isSearching, setIsSearching]     = useState(false);
//   const [showResults, setShowResults]     = useState(false);

//   // ========== TTS PLAY/STOP STATE ==========
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   // Background music ID for movies page
//   const getBgMusicId = useCallback((): string | null => {
//     return DEFAULT_BG_MUSIC_IDS.movies || DEFAULT_BG_MUSIC_IDS.home;
//   }, []);

//   // Stop music on unmount
//   useEffect(() => {
//     return () => {
//       voiceManager.stopBackgroundMusic();
//       musicController.setCurrentMusicId(null);
//     };
//   }, []);

//   // Unlock audio on first user interaction (any click on the page)
//   useEffect(() => {
//     const unlockOnce = () => {
//       voiceManager.onUserInteraction();
//       document.removeEventListener('click', unlockOnce);
//     };
//     document.addEventListener('click', unlockOnce);
//     return () => document.removeEventListener('click', unlockOnce);
//   }, []);

//   // Helper to format current date as "Month Day, Year"
//   const getCurrentDateString = (): string => {
//     const date = new Date();
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   // TTS: play/stop toggle (controls both TTS and background music)
//   const handleSpeakerClick = () => {
//     if (isSpeaking) {
//       voiceManager.cancelSpeech();
//       voiceManager.stopBackgroundMusic();
//       setIsSpeaking(false);
//     } else {
//       const videoId = getBgMusicId();
//       if (videoId) {
//         voiceManager.playBackgroundMusic(videoId);
//         musicController.setCurrentMusicId(videoId);
//       } else {
//         console.warn('No background music ID for movies page');
//       }
//       const currentYear = new Date().getFullYear();
//       const movieCount  = movies.length;
//       const currentDate = getCurrentDateString();
//       const speakText   = `Movies page. Browse the latest movies from ${currentYear}. Currently showing ${movieCount} movies. Updated as of ${currentDate}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
//       voiceManager.speak(speakText, true, true, () => {
//         voiceManager.stopBackgroundMusic();
//         setIsSpeaking(false);
//       });
//       setIsSpeaking(true);
//     }
//   };

//   // ── Fetch latest movies from current year ────────────────────────────────

//   const getCurrentYearMovies = async (pageNum: number): Promise<Movie[]> => {
//     try {
//       const currentYear = new Date().getFullYear();
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;

//       const response = await fetch(url);
//       const data     = await response.json();

//       // Fallback to previous year if no results on first page
//       if (data.results.length === 0 && pageNum === 1) {
//         const fallbackUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear - 1}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;
//         const fallbackRes  = await fetch(fallbackUrl);
//         const fallbackData = await fallbackRes.json();
//         setHasMore(fallbackData.page < fallbackData.total_pages);
//         return fallbackData.results || [];
//       }

//       setHasMore(data.page < data.total_pages);
//       return data.results || [];
//     } catch (error) {
//       console.error('Failed to fetch current year movies:', error);
//       // Fallback to regular popular movies if discover fails
//       const fallback = await getMovies('popular', pageNum);
//       setHasMore(fallback.length > 0);
//       return fallback;
//     }
//   };

//   // ── Search ────────────────────────────────────────────────────────────────

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

//     setIsSearching(true);
//     setShowResults(true);
//     try {
//       const results    = await searchContent(searchQuery);
//       const withPoster = results.filter((item) => item.poster_path);
//       setSearchResults(withPoster);
//     } catch (error) {
//       console.error('Search failed:', error);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setShowResults(false);
//   };

//   // ── Initial load – merge UNIQUE_MOVIES with API results and shuffle ───────

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         const apiData  = await getCurrentYearMovies(1);
//         const filtered = apiData.filter((movie: Movie) => movie.poster_path);

//         // Merge ALL UNIQUE_MOVIES with API results and shuffle together.
//         // Every new entry added to UNIQUE_MOVIES in tmdb.ts will automatically
//         // appear here after the next deployment — no changes needed in this file.
//         const merged = mergeAndShuffle(filtered, UNIQUE_MOVIES);
//         setMovies(merged);
//         setPage(1);
//       } catch (error) {
//         console.error(error);
//         // Fallback: show the custom movies shuffled so the page is never empty
//         setMovies(shuffleArray([...UNIQUE_MOVIES]));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);

//   // ── Load more – appends next API page; custom movies are already displayed ─

//   const loadMore = async () => {
//     if (loadingMore || !hasMore) return;
//     setLoadingMore(true);
//     try {
//       const nextPage = page + 1;
//       const data     = await getCurrentYearMovies(nextPage);
//       const filtered = data.filter((movie: Movie) => movie.poster_path);

//       // De-duplicate against already-shown ids before appending
//       const existingIds = new Set(movies.map((m) => String(m.id)));
//       const newMovies   = shuffleArray(
//         filtered.filter(
//           (m: Movie) => !existingIds.has(String(m.id))
//         ) as unknown as MediaItem[]
//       );

//       setMovies((prev) => [...prev, ...newMovies]);
//       setPage(nextPage);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const schema = {
//     '@context': 'https://schema.org',
//     '@type': 'CollectionPage',
//     name: 'Latest Movies',
//     description: 'Watch the newest movie releases from the current year on Movie & TV trailers.',
//     url: 'https://movie-tv-trailers.vercel.app/Movies',
//   };

//   /* ── Loading state ───────────────────────────────────────────────────── */

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20 flex items-center justify-center bg-miraj-black">
//         <div className="w-10 h-10 border-4 border-miraj-gold border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   /* ── Render ──────────────────────────────────────────────────────────── */

//   return (
//     <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">

//       {/* ── Read Aloud FAB ──────────────────────────────────────────────── */}
//       <button
//         onClick={handleSpeakerClick}
//         className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 font-semibold touch-manipulation ${
//           isSpeaking
//             ? 'bg-red-600 text-white hover:bg-red-700'
//             : 'bg-yellow-400 text-black hover:bg-yellow-500'
//         }`}
//         style={{
//           padding: 'clamp(10px,2.5vw,14px) clamp(14px,4vw,22px)',
//           minHeight: 48,
//           minWidth: 48,
//         }}
//         title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
//       >
//         {isSpeaking
//           ? <VolumeX size={22} className="shrink-0" />
//           : <Volume2 size={22} className="shrink-0" />}
//         <span style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}>Read Aloud</span>
//       </button>

//       <SEO
//         title="Latest Movies - Movie & TV trailers"
//         description="Watch the newest movie releases from this year in HD."
//         schema={schema}
//         path="/movies"
//       />

//       {/* ── Search Section ──────────────────────────────────────────────── */}
//       <div
//         className="container mx-auto relative z-20"
//         style={{
//           paddingLeft:  'clamp(12px,4vw,24px)',
//           paddingRight: 'clamp(12px,4vw,24px)',
//           marginTop:    'clamp(24px,5vw,48px)',
//         }}
//       >
//         <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
//           <form onSubmit={handleSearch} className="relative">
//             <div
//               className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl transition-all duration-300 focus-within:border-miraj-gold focus-within:bg-white/15 flex-wrap"
//               style={{ padding: 'clamp(6px,1.5vw,8px)' }}
//             >
//               <Search
//                 className="text-gray-400 shrink-0"
//                 size={20}
//                 style={{ marginLeft: 'clamp(8px,2vw,16px)' }}
//               />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search movies, TV shows, sports, live TV..."
//                 className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
//                 style={{
//                   padding: 'clamp(8px,2vw,12px) clamp(6px,1.5vw,8px)',
//                   ...fluidFont(13, 16),
//                   minWidth: 0,
//                 }}
//               />
//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={clearSearch}
//                   className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
//                   aria-label="Clear search"
//                 >
//                   <X className="text-gray-400" size={18} />
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={isSearching || searchQuery.trim().length < 2}
//                 className="bg-miraj-gold hover:bg-yellow-500 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
//                 style={{
//                   padding: 'clamp(8px,2vw,12px) clamp(14px,4vw,24px)',
//                   ...fluidFont(13, 15),
//                   whiteSpace: 'normal',
//                   ...TEXT_SAFE,
//                 }}
//               >
//                 <span style={TEXT_SAFE}>{isSearching ? 'Searching...' : 'Find'}</span>
//               </button>
//             </div>
//           </form>

//           {/* ── Search Results ──────────────────────────────────────────── */}
//           {showResults && (
//             <div
//               className="mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
//               style={{ padding: 'clamp(16px,4vw,32px)' }}
//             >
//               {/* Results header */}
//               <div
//                 className="flex items-center justify-between flex-wrap gap-3 mb-6"
//                 style={{ minWidth: 0 }}
//               >
//                 <h2
//                   className="font-bold text-white"
//                   style={{ ...fluidFont(16, 24), ...TEXT_SAFE, flex: '1 1 auto' }}
//                 >
//                   Search Results{' '}
//                   {searchResults.length > 0 && (
//                     <span className="text-miraj-gold" style={{ marginLeft: '0.5em' }}>
//                       ({searchResults.length})
//                     </span>
//                   )}
//                 </h2>
//                 <button
//                   onClick={clearSearch}
//                   className="text-gray-400 hover:text-white transition-colors shrink-0"
//                   aria-label="Close search results"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {isSearching ? (
//                 <div className="flex flex-col items-center justify-center py-16">
//                   <div className="w-12 h-12 border-4 border-white/10 border-t-miraj-gold rounded-full animate-spin mb-4" />
//                   <p className="text-gray-400" style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}>
//                     Searching...
//                   </p>
//                 </div>
//               ) : searchResults.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
//                   {searchResults.map((item) => (
//                     <MovieCard
//                       key={`search-${item.media_type}-${item.id}`}
//                       item={item as any}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-16 text-center">
//                   <Search className="text-gray-600 mb-4" size={48} />
//                   <p className="text-gray-400" style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}>
//                     No results found for &ldquo;
//                     <span className="text-white font-semibold" style={TEXT_SAFE}>
//                       {searchQuery}
//                     </span>
//                     &rdquo;
//                   </p>
//                   <p
//                     className="text-gray-500 mt-2"
//                     style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
//                   >
//                     Try a different search term
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Main Grid ───────────────────────────────────────────────────── */}
//       <div
//         className="container mx-auto"
//         style={{
//           paddingLeft:  'clamp(12px,4vw,24px)',
//           paddingRight: 'clamp(12px,4vw,24px)',
//           marginTop:    'clamp(24px,5vw,40px)',
//         }}
//       >
//         {/* Section header */}
//         <div
//           className="flex items-center gap-3 flex-wrap"
//           style={{ marginBottom: 'clamp(16px,4vw,32px)', minWidth: 0 }}
//         >
//           <div className="p-3 bg-miraj-gray rounded-full border border-white/10 shrink-0">
//             <Film className="text-miraj-gold" size={24} />
//           </div>
//           <div style={{ minWidth: 0, flex: 1 }}>
//             <h1
//               className="font-bold text-white"
//               style={{ ...fluidFont(20, 30), ...TEXT_SAFE }}
//             >
//               Movies
//             </h1>
//             <p
//               className="text-gray-400"
//               style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
//             >
//               Newest releases from {new Date().getFullYear()} · Including exclusive titles
//             </p>
//           </div>
//         </div>

//         {/* Movies grid — UNIQUE_MOVIES are shuffled throughout the API results.
//             Any new movie added to UNIQUE_MOVIES in tmdb.ts will automatically
//             appear here after the next deployment. */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
//           {movies.map((movie) => (
//             <MovieCard key={String(movie.id)} item={movie as any} />
//           ))}
//         </div>

//         {/* Load more */}
//         {hasMore && (
//           <div
//             className="text-center"
//             style={{ marginTop: 'clamp(32px,6vw,48px)' }}
//           >
//             <button
//               onClick={loadMore}
//               disabled={loadingMore}
//               className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all disabled:opacity-50"
//               style={{
//                 padding: 'clamp(10px,2.5vw,14px) clamp(24px,6vw,36px)',
//                 ...fluidFont(13, 15),
//                 ...TEXT_SAFE,
//               }}
//             >
//               <span style={TEXT_SAFE}>{loadingMore ? 'Loading...' : 'Load More Movies'}</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Movies;










// // pages/Movies.tsx
// import React, { useEffect, useState, useCallback } from 'react';
// import { getMovies, searchContent, UNIQUE_MOVIES } from '../services/tmdb';
// import MovieCard from '../components/MovieCard';
// import SEO from '../components/SEO';
// import { Movie, MediaItem } from '../types';
// import { Film, Search, X, Volume2, VolumeX } from 'lucide-react';

// // ========== IMPORT THE AUDIO/TTS MODULES ==========
// import { voiceManager } from '../lib/core/VoiceManager';
// import { musicController } from '../lib/core/MusicController';
// import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

// /* ─── Translation-safe style helpers ────────────────────────────────────────
//  *
//  * Google Translate rewrites the DOM and injects translated strings that can be
//  * significantly longer than the English originals. These helpers defend against
//  * overflow at every text node so the layout never breaks regardless of language.
//  *
//  *  TEXT_SAFE  – applied to every element that renders text
//  *  fluidFont  – CSS clamp() size that interpolates between minPx @ 320 vw and
//  *               maxPx @ 1280 vw so text scales proportionally on any device
//  * ─────────────────────────────────────────────────────────────────────────── */

// const TEXT_SAFE: React.CSSProperties = {
//   overflowWrap: 'anywhere',
//   wordBreak: 'break-word',
//   hyphens: 'auto',
//   minWidth: 0,
// };

// function fluidFont(minPx: number, maxPx: number): React.CSSProperties {
//   const slope     = (maxPx - minPx) / (1280 - 320);
//   const intercept = minPx - slope * 320;
//   return {
//     fontSize: `clamp(${minPx}px, calc(${intercept.toFixed(2)}px + ${(slope * 100).toFixed(4)}vw), ${maxPx}px)`,
//     ...TEXT_SAFE,
//   };
// }

// /* ─── Fisher-Yates shuffle ───────────────────────────────────────────────── */

// function shuffleArray<T>(arr: T[]): T[] {
//   const a = [...arr];
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

// /**
//  * Merges UNIQUE_MOVIES (static custom items from tmdb.ts) with the live TMDB
//  * API results and shuffles the combined list so custom movies surface randomly
//  * throughout the grid rather than all appearing at the top or bottom.
//  *
//  * Deduplication is done by `id` so a movie that exists in both sources is only
//  * shown once — the static version wins so streams are always present.
//  *
//  * Every time you add a new entry to UNIQUE_MOVIES in tmdb.ts and redeploy,
//  * it will automatically appear in the shuffled grid on the next build.
//  */
// function mergeAndShuffle(apiMovies: Movie[], customMovies: MediaItem[]): MediaItem[] {
//   const seenIds = new Set<string | number>();
//   const merged: MediaItem[] = [];

//   // Custom movies win on id conflict — register them first
//   for (const movie of customMovies) {
//     seenIds.add(String(movie.id));
//     merged.push(movie as MediaItem);
//   }

//   // Append API movies only when their id is not already represented
//   for (const movie of apiMovies) {
//     if (!seenIds.has(String(movie.id))) {
//       seenIds.add(String(movie.id));
//       merged.push(movie as unknown as MediaItem);
//     }
//   }

//   return shuffleArray(merged);
// }

// /* ─── Component ─────────────────────────────────────────────────────────── */

// const Movies: React.FC = () => {
//   const [movies, setMovies]             = useState<MediaItem[]>([]);
//   const [page, setPage]                 = useState(1);
//   const [loading, setLoading]           = useState(true);
//   const [loadingMore, setLoadingMore]   = useState(false);
//   const [hasMore, setHasMore]           = useState(true);

//   const [searchQuery, setSearchQuery]     = useState('');
//   const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
//   const [isSearching, setIsSearching]     = useState(false);
//   const [showResults, setShowResults]     = useState(false);

//   // ========== TTS PLAY/STOP STATE ==========
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   // Background music ID for movies page
//   const getBgMusicId = useCallback((): string | null => {
//     return DEFAULT_BG_MUSIC_IDS.movies || DEFAULT_BG_MUSIC_IDS.home;
//   }, []);

//   // Stop music on unmount
//   useEffect(() => {
//     return () => {
//       voiceManager.stopBackgroundMusic();
//       musicController.setCurrentMusicId(null);
//     };
//   }, []);

//   // Unlock audio on first user interaction (any click on the page)
//   useEffect(() => {
//     const unlockOnce = () => {
//       voiceManager.onUserInteraction();
//       document.removeEventListener('click', unlockOnce);
//     };
//     document.addEventListener('click', unlockOnce);
//     return () => document.removeEventListener('click', unlockOnce);
//   }, []);

//   // Helper to format current date as "Month Day, Year"
//   const getCurrentDateString = (): string => {
//     const date = new Date();
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   // TTS: play/stop toggle (controls both TTS and background music)
//   const handleSpeakerClick = () => {
//     if (isSpeaking) {
//       voiceManager.cancelSpeech();
//       voiceManager.stopBackgroundMusic();
//       setIsSpeaking(false);
//     } else {
//       const videoId = getBgMusicId();
//       if (videoId) {
//         voiceManager.playBackgroundMusic(videoId);
//         musicController.setCurrentMusicId(videoId);
//       } else {
//         console.warn('No background music ID for movies page');
//       }
//       const currentYear = new Date().getFullYear();
//       const movieCount  = movies.length;
//       const currentDate = getCurrentDateString();
//       const speakText   = `Movies page. Browse the latest movies from ${currentYear}. Currently showing ${movieCount} movies. Updated as of ${currentDate}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
//       voiceManager.speak(speakText, true, true, () => {
//         voiceManager.stopBackgroundMusic();
//         setIsSpeaking(false);
//       });
//       setIsSpeaking(true);
//     }
//   };

//   // ── Fetch latest movies from current year ────────────────────────────────

//   const getCurrentYearMovies = async (pageNum: number): Promise<Movie[]> => {
//     try {
//       const currentYear = new Date().getFullYear();
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;

//       const response = await fetch(url);
//       const data     = await response.json();

//       // Fallback to previous year if no results on first page
//       if (data.results.length === 0 && pageNum === 1) {
//         const fallbackUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear - 1}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;
//         const fallbackRes  = await fetch(fallbackUrl);
//         const fallbackData = await fallbackRes.json();
//         setHasMore(fallbackData.page < fallbackData.total_pages);
//         return fallbackData.results || [];
//       }

//       setHasMore(data.page < data.total_pages);
//       return data.results || [];
//     } catch (error) {
//       console.error('Failed to fetch current year movies:', error);
//       // Fallback to regular popular movies if discover fails
//       const fallback = await getMovies('popular', pageNum);
//       setHasMore(fallback.length > 0);
//       return fallback;
//     }
//   };

//   // ── Search ────────────────────────────────────────────────────────────────

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

//     setIsSearching(true);
//     setShowResults(true);
//     try {
//       const results    = await searchContent(searchQuery);
//       const withPoster = results.filter((item) => item.poster_path);
//       setSearchResults(withPoster);
//     } catch (error) {
//       console.error('Search failed:', error);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setShowResults(false);
//   };

//   // ── Initial load – merge UNIQUE_MOVIES with API results and shuffle ───────

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         const apiData  = await getCurrentYearMovies(1);
//         const filtered = apiData.filter((movie: Movie) => movie.poster_path);

//         // Merge ALL UNIQUE_MOVIES with API results and shuffle together.
//         // Every new entry added to UNIQUE_MOVIES in tmdb.ts will automatically
//         // appear here after the next deployment — no changes needed in this file.
//         const merged = mergeAndShuffle(filtered, UNIQUE_MOVIES);
//         setMovies(merged);
//         setPage(1);
//       } catch (error) {
//         console.error(error);
//         // Fallback: show the custom movies shuffled so the page is never empty
//         setMovies(shuffleArray([...UNIQUE_MOVIES]));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);

//   // ── Load more – appends next API page; custom movies are already displayed ─

//   const loadMore = async () => {
//     if (loadingMore || !hasMore) return;
//     setLoadingMore(true);
//     try {
//       const nextPage = page + 1;
//       const data     = await getCurrentYearMovies(nextPage);
//       const filtered = data.filter((movie: Movie) => movie.poster_path);

//       // De-duplicate against already-shown ids before appending
//       const existingIds = new Set(movies.map((m) => String(m.id)));
//       const newMovies   = shuffleArray(
//         filtered.filter(
//           (m: Movie) => !existingIds.has(String(m.id))
//         ) as unknown as MediaItem[]
//       );

//       setMovies((prev) => [...prev, ...newMovies]);
//       setPage(nextPage);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const schema = {
//     '@context': 'https://schema.org',
//     '@type': 'CollectionPage',
//     name: 'Latest Movies',
//     description: 'Watch the newest movie releases from the current year on Movie & TV trailers.',
//     url: 'https://movie-tv-trailers.vercel.app/Movies',
//   };

//   /* ── Loading state ───────────────────────────────────────────────────── */

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20 flex items-center justify-center bg-miraj-black">
//         <div className="w-10 h-10 border-4 border-miraj-gold border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   /* ── Render ──────────────────────────────────────────────────────────── */

//   return (
//     <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">

//       {/* ── Read Aloud FAB ──────────────────────────────────────────────── */}
//       <button
//         onClick={handleSpeakerClick}
//         className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 font-semibold touch-manipulation ${
//           isSpeaking
//             ? 'bg-red-600 text-white hover:bg-red-700'
//             : 'bg-yellow-400 text-black hover:bg-yellow-500'
//         }`}
//         style={{
//           padding: 'clamp(10px,2.5vw,14px) clamp(14px,4vw,22px)',
//           minHeight: 48,
//           minWidth: 48,
//         }}
//         title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
//       >
//         {isSpeaking
//           ? <VolumeX size={22} className="shrink-0" />
//           : <Volume2 size={22} className="shrink-0" />}
//         <span style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}>Read Aloud</span>
//       </button>

//       <SEO
//         title="Latest Movies - Movie & TV trailers"
//         description="Watch the newest movie releases from this year in HD."
//         schema={schema}
//         path="/movies"
//       />

//       {/* ── Search Section ──────────────────────────────────────────────── */}
//       <div
//         className="container mx-auto relative z-20"
//         style={{
//           paddingLeft:  'clamp(12px,4vw,24px)',
//           paddingRight: 'clamp(12px,4vw,24px)',
//           marginTop:    'clamp(24px,5vw,48px)',
//         }}
//       >
//         <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
//           <form onSubmit={handleSearch} className="relative">
//             <div
//               className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl transition-all duration-300 focus-within:border-miraj-gold focus-within:bg-white/15 flex-wrap"
//               style={{ padding: 'clamp(6px,1.5vw,8px)' }}
//             >
//               <Search
//                 className="text-gray-400 shrink-0"
//                 size={20}
//                 style={{ marginLeft: 'clamp(8px,2vw,16px)' }}
//               />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search movies, TV shows, sports, live TV..."
//                 className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
//                 style={{
//                   padding: 'clamp(8px,2vw,12px) clamp(6px,1.5vw,8px)',
//                   ...fluidFont(13, 16),
//                   minWidth: 0,
//                 }}
//               />
//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={clearSearch}
//                   className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
//                   aria-label="Clear search"
//                 >
//                   <X className="text-gray-400" size={18} />
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={isSearching || searchQuery.trim().length < 2}
//                 className="bg-miraj-gold hover:bg-yellow-500 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
//                 style={{
//                   padding: 'clamp(8px,2vw,12px) clamp(14px,4vw,24px)',
//                   ...fluidFont(13, 15),
//                   whiteSpace: 'normal',
//                   ...TEXT_SAFE,
//                 }}
//               >
//                 <span style={TEXT_SAFE}>{isSearching ? 'Searching...' : 'Find'}</span>
//               </button>
//             </div>
//           </form>

//           {/* ── Search Results ──────────────────────────────────────────── */}
//           {showResults && (
//             <div
//               className="mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
//               style={{ padding: 'clamp(16px,4vw,32px)' }}
//             >
//               {/* Results header */}
//               <div
//                 className="flex items-center justify-between flex-wrap gap-3 mb-6"
//                 style={{ minWidth: 0 }}
//               >
//                 <h2
//                   className="font-bold text-white"
//                   style={{ ...fluidFont(16, 24), ...TEXT_SAFE, flex: '1 1 auto' }}
//                 >
//                   Search Results{' '}
//                   {searchResults.length > 0 && (
//                     <span className="text-miraj-gold" style={{ marginLeft: '0.5em' }}>
//                       ({searchResults.length})
//                     </span>
//                   )}
//                 </h2>
//                 <button
//                   onClick={clearSearch}
//                   className="text-gray-400 hover:text-white transition-colors shrink-0"
//                   aria-label="Close search results"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {isSearching ? (
//                 <div className="flex flex-col items-center justify-center py-16">
//                   <div className="w-12 h-12 border-4 border-white/10 border-t-miraj-gold rounded-full animate-spin mb-4" />
//                   <p className="text-gray-400" style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}>
//                     Searching...
//                   </p>
//                 </div>
//               ) : searchResults.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
//                   {searchResults.map((item) => (
//                     <MovieCard
//                       key={`search-${item.media_type}-${item.id}`}
//                       item={item as any}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-16 text-center">
//                   <Search className="text-gray-600 mb-4" size={48} />
//                   <p className="text-gray-400" style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}>
//                     No results found for &ldquo;
//                     <span className="text-white font-semibold" style={TEXT_SAFE}>
//                       {searchQuery}
//                     </span>
//                     &rdquo;
//                   </p>
//                   <p
//                     className="text-gray-500 mt-2"
//                     style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
//                   >
//                     Try a different search term
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Main Grid ───────────────────────────────────────────────────── */}
//       <div
//         className="container mx-auto"
//         style={{
//           paddingLeft:  'clamp(12px,4vw,24px)',
//           paddingRight: 'clamp(12px,4vw,24px)',
//           marginTop:    'clamp(24px,5vw,40px)',
//         }}
//       >
//         {/* Section header */}
//         <div
//           className="flex items-center gap-3 flex-wrap"
//           style={{ marginBottom: 'clamp(16px,4vw,32px)', minWidth: 0 }}
//         >
//           <div className="p-3 bg-miraj-gray rounded-full border border-white/10 shrink-0">
//             <Film className="text-miraj-gold" size={24} />
//           </div>
//           <div style={{ minWidth: 0, flex: 1 }}>
//             <h1
//               className="font-bold text-white"
//               style={{ ...fluidFont(20, 30), ...TEXT_SAFE }}
//             >
//               Movies
//             </h1>
//             <p
//               className="text-gray-400"
//               style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
//             >
//               Newest releases from {new Date().getFullYear()} · Including exclusive titles
//             </p>
//           </div>
//         </div>

//         {/* Movies grid — UNIQUE_MOVIES are shuffled throughout the API results.
//             Any new movie added to UNIQUE_MOVIES in tmdb.ts will automatically
//             appear here after the next deployment. */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
//           {movies.map((movie) => (
//             <MovieCard key={String(movie.id)} item={movie as any} />
//           ))}
//         </div>

//         {/* Load more */}
//         {hasMore && (
//           <div
//             className="text-center"
//             style={{ marginTop: 'clamp(32px,6vw,48px)' }}
//           >
//             <button
//               onClick={loadMore}
//               disabled={loadingMore}
//               className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all disabled:opacity-50"
//               style={{
//                 padding: 'clamp(10px,2.5vw,14px) clamp(24px,6vw,36px)',
//                 ...fluidFont(13, 15),
//                 ...TEXT_SAFE,
//               }}
//             >
//               <span style={TEXT_SAFE}>{loadingMore ? 'Loading...' : 'Load More Movies'}</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Movies;












// pages/Movies.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { getMovies, searchContent, UNIQUE_MOVIES } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';
import { Movie, MediaItem } from '../types';
import { Film, Search, X, Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

/* ─── Translation-safe style helpers ────────────────────────────────────────
 *
 * Google Translate rewrites the DOM and injects translated strings that can be
 * significantly longer than the English originals. These helpers defend against
 * overflow at every text node so the layout never breaks regardless of language.
 *
 *  TEXT_SAFE  – applied to every element that renders text
 *  fluidFont  – CSS clamp() size that interpolates between minPx @ 320 vw and
 *               maxPx @ 1280 vw so text scales proportionally on any device
 * ─────────────────────────────────────────────────────────────────────────── */

const TEXT_SAFE: React.CSSProperties = {
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
  hyphens: 'auto',
  minWidth: 0,
};

function fluidFont(minPx: number, maxPx: number): React.CSSProperties {
  const slope     = (maxPx - minPx) / (1280 - 320);
  const intercept = minPx - slope * 320;
  return {
    fontSize: `clamp(${minPx}px, calc(${intercept.toFixed(2)}px + ${(slope * 100).toFixed(4)}vw), ${maxPx}px)`,
    ...TEXT_SAFE,
  };
}

/* ─── Fisher-Yates shuffle ───────────────────────────────────────────────── */

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Merges UNIQUE_MOVIES (static custom items from tmdb.ts) with the live TMDB
 * API results and shuffles the combined list so custom movies surface randomly
 * throughout the grid rather than all appearing at the top or bottom.
 *
 * Deduplication is done by `id` so a movie that exists in both sources is only
 * shown once — the static version wins so streams are always present.
 *
 * Every time you add a new entry to UNIQUE_MOVIES in tmdb.ts and redeploy,
 * it will automatically appear in the shuffled grid on the next build.
 */
function mergeAndShuffle(apiMovies: Movie[], customMovies: MediaItem[]): MediaItem[] {
  const seenIds = new Set<string | number>();
  const merged: MediaItem[] = [];

  // Custom movies win on id conflict — register them first
  for (const movie of customMovies) {
    seenIds.add(String(movie.id));
    merged.push(movie as MediaItem);
  }

  // Append API movies only when their id is not already represented
  for (const movie of apiMovies) {
    if (!seenIds.has(String(movie.id))) {
      seenIds.add(String(movie.id));
      merged.push(movie as unknown as MediaItem);
    }
  }

  return shuffleArray(merged);
}

/* ─── Component ─────────────────────────────────────────────────────────── */

const Movies: React.FC = () => {
  const [movies, setMovies]             = useState<MediaItem[]>([]);
  const [page, setPage]                 = useState(1);
  const [loading, setLoading]           = useState(true);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [hasMore, setHasMore]           = useState(true);

  const [searchQuery, setSearchQuery]     = useState('');
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [isSearching, setIsSearching]     = useState(false);
  const [showResults, setShowResults]     = useState(false);

  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for movies page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.movies || DEFAULT_BG_MUSIC_IDS.home;
  }, []);

  // Stop music on unmount
  useEffect(() => {
    return () => {
      voiceManager.stopBackgroundMusic();
      musicController.setCurrentMusicId(null);
    };
  }, []);

  // Unlock audio on first user interaction (any click on the page)
  useEffect(() => {
    const unlockOnce = () => {
      voiceManager.onUserInteraction();
      document.removeEventListener('click', unlockOnce);
    };
    document.addEventListener('click', unlockOnce);
    return () => document.removeEventListener('click', unlockOnce);
  }, []);

  // Helper to format current date as "Month Day, Year"
  const getCurrentDateString = (): string => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // TTS: play/stop toggle (controls both TTS and background music)
  const handleSpeakerClick = () => {
    if (isSpeaking) {
      voiceManager.cancelSpeech();
      voiceManager.stopBackgroundMusic();
      setIsSpeaking(false);
    } else {
      const videoId = getBgMusicId();
      if (videoId) {
        voiceManager.playBackgroundMusic(videoId);
        musicController.setCurrentMusicId(videoId);
      } else {
        console.warn('No background music ID for movies page');
      }
      const currentYear = new Date().getFullYear();
      const movieCount  = movies.length;
      const currentDate = getCurrentDateString();
      const speakText   = `Movies page. Browse the latest movies from ${currentYear}. Currently showing ${movieCount} movies. Updated as of ${currentDate}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
      voiceManager.speak(speakText, true, true, () => {
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  // ── Fetch latest movies from current year ────────────────────────────────

  const getCurrentYearMovies = async (pageNum: number): Promise<Movie[]> => {
    try {
      const currentYear = new Date().getFullYear();
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;

      const response = await fetch(url);
      const data     = await response.json();

      // Fallback to previous year if no results on first page
      if (data.results.length === 0 && pageNum === 1) {
        const fallbackUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${currentYear - 1}-01-01&sort_by=primary_release_date.desc&page=${pageNum}&with_original_language=en&vote_count.gte=10`;
        const fallbackRes  = await fetch(fallbackUrl);
        const fallbackData = await fallbackRes.json();
        setHasMore(fallbackData.page < fallbackData.total_pages);
        return fallbackData.results || [];
      }

      setHasMore(data.page < data.total_pages);
      return data.results || [];
    } catch (error) {
      console.error('Failed to fetch current year movies:', error);
      // Fallback to regular popular movies if discover fails
      const fallback = await getMovies('popular', pageNum);
      setHasMore(fallback.length > 0);
      return fallback;
    }
  };

  // ── Search ────────────────────────────────────────────────────────────────

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

    setIsSearching(true);
    setShowResults(true);
    try {
      const results    = await searchContent(searchQuery);
      const withPoster = results.filter((item) => item.poster_path);
      setSearchResults(withPoster);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // ── Initial load – merge UNIQUE_MOVIES with API results and shuffle ───────

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const apiData  = await getCurrentYearMovies(1);
        const filtered = apiData.filter((movie: Movie) => movie.poster_path);

        // Merge ALL UNIQUE_MOVIES with API results and shuffle together.
        // Every new entry added to UNIQUE_MOVIES in tmdb.ts will automatically
        // appear here after the next deployment — no changes needed in this file.
        const merged = mergeAndShuffle(filtered, UNIQUE_MOVIES);
        setMovies(merged);
        setPage(1);
      } catch (error) {
        console.error(error);
        // Fallback: show the custom movies shuffled so the page is never empty
        setMovies(shuffleArray([...UNIQUE_MOVIES]));
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // ── Load more – appends next API page; custom movies are already displayed ─

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data     = await getCurrentYearMovies(nextPage);
      const filtered = data.filter((movie: Movie) => movie.poster_path);

      // De-duplicate against already-shown ids before appending
      const existingIds = new Set(movies.map((m) => String(m.id)));
      const newMovies   = shuffleArray(
        filtered.filter(
          (m: Movie) => !existingIds.has(String(m.id))
        ) as unknown as MediaItem[]
      );

      setMovies((prev) => [...prev, ...newMovies]);
      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  // ========== DEFAULT OPEN GRAPH IMAGE FOR THE MOVIES PAGE ==========
  // Using an absolute URL ensures social crawlers can fetch it.
  // Replace with your actual default OG image path if different.
  const defaultOgImage = 'https://movie-tv-trailers.vercel.app/og-image-movies.jpg';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Latest Movies',
    description: 'Watch the newest movie releases from the current year on Movie & TV trailers.',
    url: 'https://movie-tv-trailers.vercel.app/Movies',
  };

  /* ── Loading state ───────────────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-miraj-black">
        <div className="w-10 h-10 border-4 border-miraj-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">

      {/* ── Read Aloud FAB ──────────────────────────────────────────────── */}
      <button
        onClick={handleSpeakerClick}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 font-semibold touch-manipulation ${
          isSpeaking
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-yellow-400 text-black hover:bg-yellow-500'
        }`}
        style={{
          padding: 'clamp(10px,2.5vw,14px) clamp(14px,4vw,22px)',
          minHeight: 48,
          minWidth: 48,
        }}
        title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
      >
        {isSpeaking
          ? <VolumeX size={22} className="shrink-0" />
          : <Volume2 size={22} className="shrink-0" />}
        <span style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}>Read Aloud</span>
      </button>

      {/* ========== UPDATED SEO WITH OG IMAGE AND RICH DESCRIPTION ========== */}
      <SEO
        title="Latest Movies - Movie & TV trailers"
        description={`Watch the newest movie releases from ${new Date().getFullYear()} in HD. Browse exclusive titles and the latest releases from ${new Date().getFullYear()}. All content is free and in HD quality.`}
        image={defaultOgImage}            // ← Added OG image
        schema={schema}
        path="/Movies"
      />

      {/* ── Search Section ──────────────────────────────────────────────── */}
      <div
        className="container mx-auto relative z-20"
        style={{
          paddingLeft:  'clamp(12px,4vw,24px)',
          paddingRight: 'clamp(12px,4vw,24px)',
          marginTop:    'clamp(24px,5vw,48px)',
        }}
      >
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <form onSubmit={handleSearch} className="relative">
            <div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl transition-all duration-300 focus-within:border-miraj-gold focus-within:bg-white/15 flex-wrap"
              style={{ padding: 'clamp(6px,1.5vw,8px)' }}
            >
              <Search
                className="text-gray-400 shrink-0"
                size={20}
                style={{ marginLeft: 'clamp(8px,2vw,16px)' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows, sports, live TV..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                style={{
                  padding: 'clamp(8px,2vw,12px) clamp(6px,1.5vw,8px)',
                  ...fluidFont(13, 16),
                  minWidth: 0,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                  aria-label="Clear search"
                >
                  <X className="text-gray-400" size={18} />
                </button>
              )}
              <button
                type="submit"
                disabled={isSearching || searchQuery.trim().length < 2}
                className="bg-miraj-gold hover:bg-yellow-500 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
                style={{
                  padding: 'clamp(8px,2vw,12px) clamp(14px,4vw,24px)',
                  ...fluidFont(13, 15),
                  whiteSpace: 'normal',
                  ...TEXT_SAFE,
                }}
              >
                <span style={TEXT_SAFE}>{isSearching ? 'Searching...' : 'Find'}</span>
              </button>
            </div>
          </form>

          {/* ── Search Results ──────────────────────────────────────────── */}
          {showResults && (
            <div
              className="mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
              style={{ padding: 'clamp(16px,4vw,32px)' }}
            >
              {/* Results header */}
              <div
                className="flex items-center justify-between flex-wrap gap-3 mb-6"
                style={{ minWidth: 0 }}
              >
                <h2
                  className="font-bold text-white"
                  style={{ ...fluidFont(16, 24), ...TEXT_SAFE, flex: '1 1 auto' }}
                >
                  Search Results{' '}
                  {searchResults.length > 0 && (
                    <span className="text-miraj-gold" style={{ marginLeft: '0.5em' }}>
                      ({searchResults.length})
                    </span>
                  )}
                </h2>
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  aria-label="Close search results"
                >
                  <X size={24} />
                </button>
              </div>

              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-white/10 border-t-miraj-gold rounded-full animate-spin mb-4" />
                  <p className="text-gray-400" style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}>
                    Searching...
                  </p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                  {searchResults.map((item) => (
                    <MovieCard
                      key={`search-${item.media_type}-${item.id}`}
                      item={item as any}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="text-gray-600 mb-4" size={48} />
                  <p className="text-gray-400" style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}>
                    No results found for &ldquo;
                    <span className="text-white font-semibold" style={TEXT_SAFE}>
                      {searchQuery}
                    </span>
                    &rdquo;
                  </p>
                  <p
                    className="text-gray-500 mt-2"
                    style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
                  >
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div
        className="container mx-auto"
        style={{
          paddingLeft:  'clamp(12px,4vw,24px)',
          paddingRight: 'clamp(12px,4vw,24px)',
          marginTop:    'clamp(24px,5vw,40px)',
        }}
      >
        {/* Section header */}
        <div
          className="flex items-center gap-3 flex-wrap"
          style={{ marginBottom: 'clamp(16px,4vw,32px)', minWidth: 0 }}
        >
          <div className="p-3 bg-miraj-gray rounded-full border border-white/10 shrink-0">
            <Film className="text-miraj-gold" size={24} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1
              className="font-bold text-white"
              style={{ ...fluidFont(20, 30), ...TEXT_SAFE }}
            >
              Movies
            </h1>
            <p
              className="text-gray-400"
              style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
            >
              Newest releases from {new Date().getFullYear()} · Including exclusive titles
            </p>
          </div>
        </div>

        {/* Movies grid — UNIQUE_MOVIES are shuffled throughout the API results.
            Any new movie added to UNIQUE_MOVIES in tmdb.ts will automatically
            appear here after the next deployment. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={String(movie.id)} item={movie as any} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div
            className="text-center"
            style={{ marginTop: 'clamp(32px,6vw,48px)' }}
          >
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all disabled:opacity-50"
              style={{
                padding: 'clamp(10px,2.5vw,14px) clamp(24px,6vw,36px)',
                ...fluidFont(13, 15),
                ...TEXT_SAFE,
              }}
            >
              <span style={TEXT_SAFE}>{loadingMore ? 'Loading...' : 'Load More Movies'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;