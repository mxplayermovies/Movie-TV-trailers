import React, { useEffect, useState, useCallback } from 'react';
import { UNIQUE_HINDI_DUBBED } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';
import { MediaItem } from '../types';
import { Film, Search, X, Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const ITEMS_PER_PAGE = 20;

const HindiDubbed: React.FC = () => {
  const [allItems] = useState<MediaItem[]>(UNIQUE_HINDI_DUBBED);
  const [displayItems, setDisplayItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for Hindi dubbed page
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
      voiceManager.onUserInteraction(); // Unmutes YT player if needed
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
      // Stop both TTS and background music
      voiceManager.cancelSpeech();
      voiceManager.stopBackgroundMusic();
      setIsSpeaking(false);
    } else {
      // Start background music first
      const videoId = getBgMusicId();
      if (videoId) {
        voiceManager.playBackgroundMusic(videoId);
        musicController.setCurrentMusicId(videoId);
      } else {
        console.warn('No background music ID for Hindi dubbed page');
      }
      // Then start TTS, and when TTS ends, stop background music as well
      const itemCount = allItems.length;
      const currentDate = getCurrentDateString();
      const speakText = `Hindi Dubbed page. Browse the latest Hindi dubbed movies. Currently showing ${itemCount} titles. Updated as of ${currentDate}. All content is free and in HD quality.`;
      voiceManager.speak(speakText, true, true, () => {
        // TTS ended naturally – stop background music too
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  // Local search function (only within UNIQUE_HINDI_DUBBED)
  const performLocalSearch = (query: string): MediaItem[] => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    return allItems.filter(item => {
      const title = (item.title || '').toLowerCase();
      const overview = (item.overview || '').toLowerCase();
      const genreMatch = item.genres?.some(g => 
        (typeof g === 'string' ? g : g.name).toLowerCase().includes(lowerQuery)
      );
      return title.includes(lowerQuery) || overview.includes(lowerQuery) || genreMatch;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

    setIsSearching(true);
    setShowResults(true);
    // Simulate async search
    setTimeout(() => {
      const results = performLocalSearch(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // Initialize paginated display
  useEffect(() => {
    const initialItems = allItems.slice(0, ITEMS_PER_PAGE);
    setDisplayItems(initialItems);
    setHasMore(allItems.length > ITEMS_PER_PAGE);
    setLoading(false);
  }, [allItems]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = nextPage * ITEMS_PER_PAGE;
    const moreItems = allItems.slice(start, end);
    setDisplayItems(prev => [...prev, ...moreItems]);
    setPage(nextPage);
    setHasMore(end < allItems.length);
    setLoadingMore(false);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Hindi Dubbed Movies",
    "description": "Watch the latest Hindi dubbed movies in HD quality on Movie & TV trailers.",
    "url": "https://movie-tv-trailers.vercel.app/hindi-dubbed"
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-miraj-black">
        <div className="w-10 h-10 border-4 border-miraj-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const itemsToRender = showResults ? searchResults : displayItems;

  return (
    <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">
      {/* Read Aloud button – controls both TTS and background music */}
      <button
        onClick={handleSpeakerClick}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
          isSpeaking
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
            : 'bg-miraj-gold/20 text-miraj-gold hover:bg-miraj-gold hover:text-black'
        }`}
        title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
      >
        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="text-sm text-gray-300 dark:text-gray-300">Read aloud</span>
      </button>

      <SEO 
        title="Hindi Dubbed Movies - Movie & TV trailers" 
        description="Watch the latest Hindi dubbed movies in HD quality. Free streaming of blockbuster Hindi dubbed films." 
        schema={schema}
        path="/hindi-dubbed"
      />

      {/* SEARCH SECTION */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 mt-8 md:mt-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-2xl transition-all duration-300 focus-within:border-miraj-gold focus-within:bg-white/15">
              <Search className="text-gray-400 ml-4" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Hindi dubbed movies..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2 py-3 text-sm md:text-base"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X className="text-gray-400" size={18} />
                </button>
              )}
              <button
                type="submit"
                disabled={isSearching || searchQuery.trim().length < 2}
                className="bg-miraj-gold hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSearching ? 'Searching...' : 'Find'}
              </button>
            </div>
          </form>

          {/* SEARCH RESULTS */}
          {showResults && (
            <div className="mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Search Results {searchResults.length > 0 && (
                    <span className="text-miraj-gold ml-2">({searchResults.length})</span>
                  )}
                </h2>
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-white/10 border-t-miraj-gold rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {searchResults.map((item) => (
                    <MovieCard key={`search-${item.media_type}-${item.id}`} item={item} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <Search className="text-gray-600 mb-4" size={48} />
                  <p className="text-gray-400 text-center">
                    No results found for "<span className="text-white font-semibold">{searchQuery}</span>"
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-miraj-gray rounded-full border border-white/10">
            <Film className="text-miraj-gold" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Hindi Dubbed Movies</h1>
            <p className="text-gray-400 text-sm">Blockbuster movies dubbed in Hindi</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {itemsToRender.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>

        {!showResults && hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HindiDubbed;