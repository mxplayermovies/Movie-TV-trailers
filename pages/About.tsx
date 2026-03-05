import React, { useEffect, useState, useCallback } from 'react';
import SEO from '../components/SEO';
import { MonitorPlay, Zap, Globe, Shield, AlertCircle, Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const About: React.FC = () => {
  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for About page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.about || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
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
        console.warn('No background music ID for About page');
      }
      // Then start TTS, and when TTS ends, stop background music as well
      const currentDate = getCurrentDateString();
      const speakText = `About Movies4U Official. Our mission is to provide a seamless, high-quality, and accessible streaming experience for entertainment lovers worldwide. We offer a huge library of thousands of movies, TV shows, and live channels updated daily. Fast streaming with optimized servers ensures smooth playback. We provide global content from around the world with multiple subtitle options. Your privacy and security are prioritized – no registration required. Legal disclaimer: We do not host any content and are not responsible for third-party streams. Updated as of ${currentDate}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
      voiceManager.speak(speakText, true, true, () => {
        // TTS ended naturally – stop background music too
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Movie & TV trailers",
    "description": "Movie & TV trailers is a premier streaming platform for movies, TV shows, and live sports.",
    "url": "https://movie-tv-trailers.vercel.app/about",
    "publisher": {
      "@type": "Organization",
      "name": "Movie & TV trailers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://movie-tv-trailers.vercel.app/logo.png"
      }
    }
  };

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
        title="About Us - Movie & TV trailers" 
        description="Learn more about Movie & TV trailers, our mission, and our commitment to free HD streaming." 
        schema={schema}
        path="/about"
      />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-miraj-red">Movie & TV trailers</span>
          </h1>
          <p className="text-gray-400 text-lg">Redefining your streaming experience.</p>
        </div>

        <div className="bg-miraj-gray border border-white/5 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            At Movie & TV trailers, our mission is simple: to provide a seamless, high-quality, and accessible streaming experience for entertainment lovers worldwide. 
            We believe that great stories should be shared without barriers. Whether you're into the latest Hollywood blockbusters, trending TV series, or live sports action, 
            we strive to bring it all to your fingertips in stunning HD quality.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We are passionate about cinema and technology, constantly updating our platform to ensure fast loading times, minimal buffering, and a user-friendly interface that works perfectly across all your devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-miraj-gold/30 transition-colors">
            <MonitorPlay className="text-miraj-gold mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Huge Library</h3>
            <p className="text-gray-400 text-sm">Access thousands of Movies, TV Shows, and Live Channels updated daily.</p>
          </div>
          <div className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-miraj-gold/30 transition-colors">
            <Zap className="text-miraj-gold mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Fast Streaming</h3>
            <p className="text-gray-400 text-sm">Optimized servers ensure smooth playback with minimal buffering.</p>
          </div>
          <div className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-miraj-gold/30 transition-colors">
            <Globe className="text-miraj-gold mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Global Content</h3>
            <p className="text-gray-400 text-sm">Content from around the world, available with multiple subtitle options.</p>
          </div>
          <div className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-miraj-gold/30 transition-colors">
            <Shield className="text-miraj-gold mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Safe & Secure</h3>
            <p className="text-gray-400 text-sm">We prioritize user privacy and security. No registration required.</p>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex items-start gap-4 p-6 bg-red-900/10 border border-miraj-red/20 rounded-xl">
            <AlertCircle className="text-miraj-red flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Legal Disclaimer</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We DO NOT host nor transmit any audiovisual content itself and DO NOT control nor influence such content. 
                We cannot accept any liability for the content transmitted by others. Any responsibility for this content lies with those who host or transmit it. 
                We are not affiliated nor claim to be affiliated with any of the owners of streams and/or videos. All content is copyright of their respective owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;