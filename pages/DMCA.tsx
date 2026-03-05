import React, { useEffect, useState, useCallback } from 'react';
import SEO from '../components/SEO';
import { Shield, AlertTriangle, Mail, FileText, Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const DMCA: React.FC = () => {
  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for DMCA page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.dmca || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
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
        console.warn('No background music ID for DMCA page');
      }
      // Then start TTS, and when TTS ends, stop background music as well
      const currentDate = getCurrentDateString();
      const speakText = `DMCA Policy page. Movies4U Official respects intellectual property rights. We do not host any content and are not responsible for third-party streams. If you are a copyright owner, you can submit a takedown notice including identification of the copyrighted work, the infringing material URL, your contact information, and a statement of good faith. Send your notice to dmca at movies4uofficial dot com with subject DMCA Takedown Request. Updated as of ${currentDate}. All content is free and in HD quality.`;
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
    "@type": "WebPage",
    "name": "DMCA Policy",
    "description": "Digital Millennium Copyright Act policy and takedown procedures for Movie & TV trailers.",
    "url": "https://movie-tv-trailers.vercel.app/dmca"
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
        title="DMCA Policy - Movie & TV trailers" 
        description="Digital Millennium Copyright Act (DMCA) Policy and Takedown Procedures." 
        schema={schema}
        path="/dmca"
      />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">DMCA <span className="text-miraj-red">Policy</span></h1>
          <p className="text-gray-400 text-lg">Digital Millennium Copyright Act Notice</p>
        </div>

        <div className="bg-miraj-gray border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl">
          
          <div className="flex items-start gap-4 mb-8 bg-black/40 p-6 rounded-xl border border-miraj-red/20">
            <AlertTriangle className="text-miraj-red flex-shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Copyright Infringement Notification</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Movie & TV trailers respects the intellectual property rights of others and expects its users to do the same. 
                In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website, 
                we will respond expeditiously to claims of copyright infringement committed using the Movie & TV trailers service and/or the Movie & TV trailers website if such claims are reported to our Designated Copyright Agent identified below.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="text-miraj-gold" size={20} /> 1. Disclaimer
              </h2>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-medium text-white">
                  We DO NOT host nor transmit any audiovisual content itself and DO NOT control nor influence such content. 
                  We cannot accept any liability for the content transmitted by others. Any responsibility for this content lies with those who host or transmit it. 
                  We are not affiliated nor claim to be affiliated with any of the owners of streams and/or videos. All content is copyright of their respective owners.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-miraj-gold" size={20} /> 2. Takedown Notice
              </h2>
              <p className="mb-4">
                If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
                <li>Identify the copyrighted work that you claim has been infringed.</li>
                <li>Identify the material or link you claim is infringing (or the subject of infringing activity) and that access to which is to be disabled, including at a minimum, the URL of the link shown on the Site.</li>
                <li>Provide your mailing address, telephone number, and, if available, email address.</li>
                <li>Include both of the following statements in the body of the Notice:
                  <ul className="list-disc pl-6 mt-2 italic">
                    <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
                    <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
                  </ul>
                </li>
                <li>Provide your full legal name and your electronic or physical signature.</li>
              </ul>
            </section>

            <section className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="text-miraj-gold" size={20} /> 3. Contact Information
              </h2>
              <p className="mb-4">
                Deliver this Notice, with all items completed, to Movie & TV trailers's Designated Copyright Agent:
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500 font-bold uppercase tracking-wider w-24 inline-block">Email:</span> <a href="mailto:dmca@movies4uofficial.com" className="text-miraj-red hover:text-white font-bold text-lg">dmca@movies4uofficial.com</a></p>
                <p><span className="text-gray-500 font-bold uppercase tracking-wider w-24 inline-block">Subject:</span> DMCA Takedown Request</p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DMCA;