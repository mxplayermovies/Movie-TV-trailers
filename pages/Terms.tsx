import React, { useEffect, useState, useCallback } from 'react';
import SEO from '../components/SEO';
import { Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const Terms: React.FC = () => {
  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for Terms page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.terms || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
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

  // Build a spoken version of the Terms of Use page
  const buildSpeakText = (): string => {
    const intro = "Terms of Use page. ";
    const sections = [
      "Section 1: Agreement to Terms. By accessing or using Movie & TV trailers, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, then you may not access the service.",
      "Section 2: Content Disclaimer. Important Legal Notice. We do not host nor transmit any audiovisual content itself and do not control nor influence such content. We cannot accept any liability for the content transmitted by others. Any responsibility for this content lies with those who host or transmit it. We are not affiliated nor claim to be affiliated with any of the owners of streams or videos. All content is copyright of their respective owners.",
      "Section 3: Use of Service. You agree to use the Service only for purposes that are permitted by the Terms and any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions. You agree not to access any of the Services by any means other than through the interface provided by Movie & TV trailers.",
      "Section 4: Intellectual Property. The Service and its original content, features, and functionality are and will remain the exclusive property of Movie & TV trailers and its licensors.",
      "Section 5: Termination. We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms.",
      "Section 6: Changes. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.",
    ];
    const lastUpdated = `Last updated: ${getCurrentDateString()}.`;
    return `${intro}${sections.join(' ')} ${lastUpdated}`;
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
        console.warn('No background music ID for Terms page');
      }
      const speakText = buildSpeakText();
      voiceManager.speak(speakText, true, true, () => {
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

      <SEO title="Terms of Use - Movie & TV trailers" description="Terms of Use and DMCA Disclaimer for Movie & TV trailers." />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4">Terms of Use</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-miraj-gold mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using Movie & TV trailers, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, then you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-miraj-gold mb-3">2. Content Disclaimer</h2>
            <div className="bg-red-900/20 border-l-4 border-miraj-red p-6 rounded-r-xl">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Important Legal Notice</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                We DO NOT host nor transmit any audiovisual content itself and DO NOT control nor influence such content.
                We cannot accept any liability for the content transmitted by others. Any responsibility for this content lies with those who host or transmit it.
                We are not affiliated nor claim to be affiliated with any of the owners of streams and/or videos. All content is copyright of their respective owners.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-miraj-gold mb-3">3. Use of Service</h2>
            <p>
              You agree to use the Service only for purposes that are permitted by (a) the Terms and (b) any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
              You agree not to access (or attempt to access) any of the Services by any means other than through the interface that is provided by Movie & TV trailers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-miraj-gold mb-3">4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by third parties), features, and functionality are and will remain the exclusive property of Movie & TV trailers and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-miraj-gold mb-3">5. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-miraj-gold mb-3">6. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
            <p className="mt-4 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;