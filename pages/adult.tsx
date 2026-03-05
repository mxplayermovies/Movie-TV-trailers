import React, { useEffect, useState, useCallback } from 'react';
import { UNIQUE_ADULT, searchContent } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';
import { MediaItem } from '../types';
import { Film, Search, X, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const Adults: React.FC = () => {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for adults page — key is 'adult' in DEFAULT_BG_MUSIC_IDS
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.adult || DEFAULT_BG_MUSIC_IDS.movies || DEFAULT_BG_MUSIC_IDS.home;
  }, []);

  // Stop music on unmount
  useEffect(() => {
    return () => {
      voiceManager.stopBackgroundMusic();
      musicController.setCurrentMusicId(null);
    };
  }, []);

  // Unlock audio on first user interaction
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

  // Build a spoken version of the Adults page
  const buildSpeakText = (): string => {
    const intro = "Adults section. ";
    const sections = [
      `Total there are${UNIQUE_ADULT.length} mature and adult-rated movies and web series.`,
      "Includes Hindi, Filipino, and international adult content.",
      "All titles are free and available in HD quality.",
      "You must be 18 or older to view this section.", 
      "For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.",
    ];
    const lastUpdated = `Last updated: ${getCurrentDateString()}.`;
    return `${intro}${sections.join(' ')} ${lastUpdated}`;
  };

  // TTS: play/stop toggle
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
        console.warn('No background music ID for adults page');
      }
      const speakText = buildSpeakText();
      voiceManager.speak(speakText, true, true, () => {
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  // Search handler
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return;
    setIsSearching(true);
    setShowResults(true);
    try {
      const results = await searchContent(searchQuery);
      const withPoster = results.filter(item => item.poster_path);
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Adults Section - Mature Content",
    "description": "Watch adult-rated movies and web series on Movie & TV trailers.",
    "url": "https://movie-tv-trailers.vercel.app/adults"
  };

  // ========== AGE GATE ==========
  if (!ageConfirmed) {
    return (
      <div className="min-h-screen bg-miraj-black flex items-center justify-center px-4">
        <SEO
          title="Adults Section - Movie & TV trailers"
          description="Mature and adult-rated movies on Movie & TV trailers."
          schema={schema}
          path="/adults"
        />
        <div className="bg-miraj-gray/60 border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-miraj-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="text-miraj-red" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Adults Only</h1>
          <p className="text-gray-400 mb-2 text-sm">
            This section contains mature and adult-rated content intended for viewers aged{' '}
            <span className="text-white font-semibold">18 and above</span>.
          </p>
          <p className="text-gray-500 text-xs mb-8">
            By continuing, you confirm that you are at least 18 years old and consent to viewing mature content.
          </p>
          <button
            onClick={() => setAgeConfirmed(true)}
            className="w-full bg-miraj-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] mb-3"
          >
            I am 18+ — Enter
          </button>
          <a
            href="/"
            className="block w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
          >
            Go Back
          </a>
        </div>
      </div>
    );
  }

  // ========== MAIN PAGE ==========
  return (
    <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">
      {/* Read Aloud button */}
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
        title="Adults Section - Movie & TV trailers"
        description="Mature and adult-rated movies on Movie & TV trailers."
        schema={schema}
        path="/adults"
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
                placeholder="Search adult movies, web series..."
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
                  Search Results{' '}
                  {searchResults.length > 0 && (
                    <span className="text-miraj-gold ml-2">({searchResults.length})</span>
                  )}
                </h2>
                <button onClick={clearSearch} className="text-gray-400 hover:text-white transition-colors">
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
                    <MovieCard key={`search-${item.media_type}-${item.id}`} item={item as any} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <Search className="text-gray-600 mb-4" size={48} />
                  <p className="text-gray-400 text-center">
                    No results found for "
                    <span className="text-white font-semibold">{searchQuery}</span>"
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="container mx-auto px-4 md:px-6 mt-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-miraj-gray rounded-full border border-white/10">
            <Film className="text-miraj-red" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Adults</h1>
            <p className="text-gray-400 text-sm">{UNIQUE_ADULT.length} titles — 18+ only</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {UNIQUE_ADULT.map((item) => (
            <MovieCard key={String(item.id)} item={item as any} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adults;