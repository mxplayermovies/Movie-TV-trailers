import React, { useEffect, useState, useCallback } from 'react';
import SEO from '../components/SEO';
import { Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const Privacy: React.FC = () => {
  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for Privacy page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.privacy || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
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

  // Build a spoken version of the privacy policy
  const buildSpeakText = (): string => {
    const intro = "Privacy Policy page. ";
    const sections = [
      "We respect your privacy and are committed to protecting your personal data.",
      "We may collect technical data such as IP address, browser type, and usage data to improve our service.",
      "We do not sell, trade, or rent your personal information to others.",
      "Our website uses cookies to enhance your browsing experience.",
      "This site may contain links to third-party websites with their own privacy policies.",
      "We may update this policy from time to time.",
      "All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers."
    ];
    const lastUpdated = `Last updated: ${getCurrentDateString()}.`;
    return `${intro}${sections.join(' ')} ${lastUpdated} All content is free and in HD quality.`;
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
        console.warn('No background music ID for Privacy page');
      }
      // Then start TTS, and when TTS ends, stop background music as well
      const speakText = buildSpeakText();
      voiceManager.speak(speakText, true, true, () => {
        // TTS ended naturally – stop background music too
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  return (
    <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">
      {/* Read Aloud button – controls both TTS and background music */}
      <button
  onClick={handleSpeakerClick}
  className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 font-semibold ${
    isSpeaking
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-yellow-400 text-black hover:bg-yellow-500'
  }`}
  title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
>
  {isSpeaking ? <VolumeX size={22} /> : <Volume2 size={22} />}
  <span className="text-sm">Read Aloud</span>
</button>

      <SEO title="Privacy Policy - Movie & TV trailers" description="Privacy Policy for Movie & TV trailers." />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-miraj-gold mb-3">1. Introduction</h2>
                <p>
                    Welcome to Movie & TV trailers. We respect your privacy and are committed to protecting your personal data. 
                    This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-miraj-gold mb-3">2. Information We Collect</h2>
                <p className="mb-2">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                    <li><strong>Usage Data:</strong> Includes information about how you use our website, products, and services.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-miraj-gold mb-3">3. How We Use Your Information</h2>
                <p>
                    We collect your data to improve our service, analyze usage trends, and enhance the performance of our platform. 
                    We do not sell, trade, or rent your personal identification information to others.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-miraj-gold mb-3">4. Cookies</h2>
                <p>
                    Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-miraj-gold mb-3">5. Third-Party Links</h2>
                <p>
                    This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. 
                    We do not control these third-party websites and are not responsible for their privacy statements.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-miraj-gold mb-3">6. Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p className="mt-4 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;