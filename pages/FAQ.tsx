import React, { useState, useEffect, useCallback } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl bg-miraj-gray overflow-hidden">
      <button 
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-white text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-miraj-gold" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 md:p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Is Movie & TV trailers free to use?",
      answer: "Yes, Movie & TV trailers is completely free to use. You can watch movies, TV shows, and live channels without paying any subscription fees."
    },
    {
      question: "Do I need to register to watch content?",
      answer: "No, you do not need to create an account or register to watch any content on our platform. Just browse and click play."
    },
    {
      question: "Why is the video buffering?",
      answer: "Buffering can be caused by a slow internet connection or high server load. Try pausing the video for a moment to let it buffer, or switch to a different server using the server selector below the player."
    },
    {
      question: "How do I download movies?",
      answer: "Currently, we do not support direct downloading of content. Our platform is designed for streaming purposes only."
    },
    {
      question: "Is it legal to watch movies here?",
      answer: "Movie & TV trailers operates as a search engine for streaming links. We DO NOT host nor transmit any audiovisual content itself and DO NOT control nor influence such content. We cannot accept any liability for the content transmitted by others."
    },
    {
      question: "How can I request a specific movie or show?",
      answer: "You can use the 'Contact Us' page to send us a request. Please include the full title and release year of the content you are looking for."
    },
    { 
      question: "What devices are supported?",
      answer: "Our platform is accessible on most modern web browsers and mobile devices. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers."
    }
  ];

  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for FAQ page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.faq || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
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

  // Build a spoken version of all FAQs
  const buildSpeakText = (): string => {
    const intro = "Frequently Asked Questions page. ";
    const qaText = faqs.map(f => `Question: ${f.question} Answer: ${f.answer}`).join('. ');
    const date = getCurrentDateString();
    return `${intro}${qaText}. Updated as of ${date}. All content is free and in HD quality.`;
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
        console.warn('No background music ID for FAQ page');
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
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
        title={isSpeaking ? 'Stop reading and music' : 'Read all FAQs aloud with background music'}
      >
        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="text-sm text-gray-300 dark:text-gray-300">Read aloud</span>
      </button>

      <SEO 
        title="Frequently Asked Questions - Movie & TV trailers" 
        description="Find answers to common questions about Movie & TV trailers, streaming, and our service." 
        schema={schema}
        path="/faq"
      />
      
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-miraj-gold">Questions</span>
          </h1>
          <p className="text-gray-400">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;