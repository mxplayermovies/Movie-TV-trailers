// import React, { useState } from 'react';
// import SEO from '../components/SEO';
// import { Send, MessageCircle, CheckCircle, Search } from 'lucide-react';

// const Request: React.FC = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     year: '',
//     type: 'movie',
//     notes: ''
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     // Logic to send to API would go here
//     setTimeout(() => {
//         setSubmitted(false);
//         setFormData({ title: '', year: '', type: 'movie', notes: '' });
//         alert("Request received! Check back in 24 hours.");
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-miraj-black pt-24 pb-20">
//       <SEO title="Request Content - Movie & TV trailers" description="Request movies and TV shows to be added to Movie & TV trailers." />
      
//       <div className="container mx-auto px-4 md:px-6 max-w-5xl">
//         <div className="text-center mb-16">
//             <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
//                 Request <span className="text-miraj-gold">Content</span>
//             </h1>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//                 Can't find what you're looking for? Let us know and we'll upload it as fast as possible.
//             </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
//             <div className="bg-gradient-to-br from-[#0088cc]/20 to-black border border-[#0088cc]/30 rounded-3xl p-8 relative overflow-hidden group hover:border-[#0088cc]/50 transition-all duration-300">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#0088cc]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
//                 <div className="relative z-10 flex flex-col items-center text-center">
//                     <div className="w-20 h-20 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg shadow-[#0088cc]/30 mb-6 group-hover:scale-110 transition-transform duration-300">
//                         <Send className="text-white ml-1" size={40} />
//                     </div>
                    
//                     <h2 className="text-2xl font-bold text-white mb-3">Fastest Method</h2>
//                     <p className="text-gray-300 mb-8 leading-relaxed">
//                         Join our official Telegram channel for instant requests, updates on new uploads, and direct chat with admins.
//                     </p>
                    
//                     <a 
//                         href="https://t.me/movieandtvshowondemand" 
//                         target="_blank" 
//                         rel="noreferrer"
//                         className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl"
//                     >
//                         <MessageCircle size={24} />
//                         Join Telegram Channel
//                     </a>
//                 </div>
//             </div>

//             <div className="bg-miraj-gray/50 border border-white/5 rounded-3xl p-8">
//                 <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                     <Search className="text-miraj-gold" /> Web Request Form
//                 </h2>
                
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-2">Content Title</label>
//                         <input 
//                             type="text" 
//                             required
//                             value={formData.title}
//                             onChange={(e) => setFormData({...formData, title: e.target.value})}
//                             className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
//                             placeholder="e.g. Avengers: Endgame"
//                         />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-2">Release Year</label>
//                             <input 
//                                 type="number" 
//                                 value={formData.year}
//                                 onChange={(e) => setFormData({...formData, year: e.target.value})}
//                                 className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
//                                 placeholder="e.g. 2019"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
//                             <select 
//                                 value={formData.type}
//                                 onChange={(e) => setFormData({...formData, type: e.target.value})}
//                                 className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors appearance-none"
//                             >
//                                 <option value="movie">Movie</option>
//                                 <option value="tv">TV Show</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-2">Additional Notes (Optional)</label>
//                         <textarea 
//                             value={formData.notes}
//                             onChange={(e) => setFormData({...formData, notes: e.target.value})}
//                             rows={3}
//                             className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors resize-none"
//                             placeholder="IMDB Link, Specific Season, etc."
//                         />
//                     </div>

//                     <button 
//                         type="submit"
//                         disabled={submitted}
//                         className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${submitted ? 'bg-green-600 text-white cursor-default' : 'bg-white/10 hover:bg-miraj-red text-white hover:scale-[1.02]'}`}
//                     >
//                         {submitted ? (
//                             <> <CheckCircle size={20} /> Request Sent </>
//                         ) : (
//                             <> <Send size={20} /> Submit Request </>
//                         )}
//                     </button>
//                 </form>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Request;





import React, { useEffect, useState, useCallback } from 'react';
import SEO from '../components/SEO';
import { Send, MessageCircle, CheckCircle, Search, Volume2, VolumeX } from 'lucide-react';

// ========== IMPORT THE AUDIO/TTS MODULES ==========
import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const Request: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    type: 'movie',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Background music ID for Request page
  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.request || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
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

  // Build a spoken version of the Request page content
  const buildSpeakText = (): string => {
    return (
      "Request Content page. " +
      "Can't find what you're looking for? Let us know and we'll upload it as fast as possible. " +
      "Fastest Method: Join our official Telegram channel for instant requests, updates on new uploads, and direct chat with admins. " +
      "You can also use the Web Request Form on this page. " +
      "Fill in the content title, release year, type — movie or TV show — and any additional notes such as an IMDB link or specific season. " +
      "Then click Submit Request and we will get back to you within 24 hours. " +
      "All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers."
    );
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
        console.warn('No background music ID for Request page');
      }
      const speakText = buildSpeakText();
      voiceManager.speak(speakText, true, true, () => {
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ title: '', year: '', type: 'movie', notes: '' });
      alert('Request received! Check back in 24 hours.');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-miraj-black pt-24 pb-20">
      {/* Read Aloud button – controls both TTS and background music */}
      <button
        onClick={handleSpeakerClick}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
          isSpeaking
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
            : 'bg-miraj-gold/20 text-miraj-gold hover:bg-miraj-gold hover:text-black'
        }`}
        title={isSpeaking ? 'Stop reading and music' : 'Read page aloud with background music'}
      >
        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="text-sm text-gray-300 dark:text-gray-300">Read aloud</span>
      </button>

      <SEO title="Request Content - Movie & TV trailers" description="Request movies and TV shows to be added to Movie & TV trailers." />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Request <span className="text-miraj-gold">Content</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Can't find what you're looking for? Let us know and we'll upload it as fast as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

          <div className="bg-gradient-to-br from-[#0088cc]/20 to-black border border-[#0088cc]/30 rounded-3xl p-8 relative overflow-hidden group hover:border-[#0088cc]/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0088cc]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg shadow-[#0088cc]/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Send className="text-white ml-1" size={40} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">Fastest Method</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Join our official Telegram channel for instant requests, updates on new uploads, and direct chat with admins.
              </p>

              <a
                href="https://t.me/movieandtvshowondemand"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl"
              >
                <MessageCircle size={24} />
                Join Telegram Channel
              </a>
            </div>
          </div>

          <div className="bg-miraj-gray/50 border border-white/5 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Search className="text-miraj-gold" /> Web Request Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
                  placeholder="e.g. Avengers: Endgame"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Release Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
                    placeholder="e.g. 2019"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors appearance-none"
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors resize-none"
                  placeholder="IMDB Link, Specific Season, etc."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  submitted
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-white/10 hover:bg-miraj-red text-white hover:scale-[1.02]'
                }`}
              >
                {submitted ? (
                  <><CheckCircle size={20} /> Request Sent</>
                ) : (
                  <><Send size={20} /> Submit Request</>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Request;





