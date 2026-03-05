// import React, { useState } from 'react';
// import SEO from '../components/SEO';
// import { Mail, MessageSquare, Send } from 'lucide-react';

// const Contact: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', subject: '', message: '' });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "ContactPage",
//     "name": "Contact Movie & TV trailers",
//     "description": "Get in touch with the Movie & TV trailers team for support, requests, or DMCA inquiries.",
//     "url": "https://movie-tv-trailers.vercel.app/contact"
//   };

//   return (
//     <div className="min-h-screen bg-miraj-black pt-24 pb-20">
//       <SEO 
//         title="Contact Us - Movie & TV trailers" 
//         description="Get in touch with the Movie & TV trailers team." 
//         schema={schema}
//         path="/contact"
//       />
      
//       <div className="container mx-auto px-4 md:px-6 max-w-4xl">
//         <div className="text-center mb-12">
//             <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Contact <span className="text-miraj-red">Us</span></h1>
//             <p className="text-gray-400">We'd love to hear from you. Send us a message below.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="md:col-span-1 space-y-6">
//                 <div className="bg-miraj-gray border border-white/5 p-6 rounded-xl">
//                     <Mail className="text-miraj-gold mb-3" size={28} />
//                     <h3 className="font-bold text-white text-lg mb-1">Email Us</h3>
//                     <p className="text-gray-400 text-sm mb-2">For general inquiries and support.</p>
//                     <a href="mailto:support@movieandtvtrailers.com" className="text-miraj-red hover:underline font-medium">support@movieandtvtrailers.com</a>
//                 </div>
                
//                 <div className="bg-miraj-gray border border-white/5 p-6 rounded-xl">
//                     <MessageSquare className="text-miraj-gold mb-3" size={28} />
//                     <h3 className="font-bold text-white text-lg mb-1">DMCA / Legal</h3>
//                     <p className="text-gray-400 text-sm mb-2">For copyright related matters.</p>
//                     <a href="mailto:legal@movieandtvtrailers.com" className="text-miraj-red hover:underline font-medium">legal@movieandtvtrailers.com</a>
//                 </div>
//             </div>

//             <div className="md:col-span-2">
//                 <form onSubmit={handleSubmit} className="bg-miraj-gray border border-white/5 p-6 md:p-8 rounded-2xl shadow-xl">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
//                             <input 
//                                 type="text" 
//                                 name="name"
//                                 required
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
//                                 placeholder="John Doe"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
//                             <input 
//                                 type="email" 
//                                 name="email"
//                                 required
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
//                                 placeholder="john@example.com"
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
//                         <select 
//                             name="subject"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors"
//                         >
//                             <option value="">Select a topic</option>
//                             <option value="Support">General Support</option>
//                             <option value="Request">Content Request</option>
//                             <option value="Report">Report a Bug / Broken Link</option>
//                             <option value="Business">Business Inquiry</option>
//                             <option value="DMCA">DMCA Takedown</option>
//                         </select>
//                     </div>

//                     <div className="mb-8">
//                         <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
//                         <textarea 
//                             name="message"
//                             required
//                             value={formData.message}
//                             onChange={handleChange}
//                             rows={5}
//                             className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors resize-none"
//                             placeholder="How can we help you?"
//                         />
//                     </div>

//                     <button 
//                         type="submit"
//                         className="w-full bg-miraj-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
//                     >
//                         <Send size={20} /> Send Message
//                     </button>
//                 </form>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState, useEffect, useCallback, useRef } from 'react';
import SEO from '../components/SEO';
import { Mail, MessageSquare, Send, Volume2, VolumeX } from 'lucide-react';

import { voiceManager } from '../lib/core/VoiceManager';
import { musicController } from '../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../lib/core/musicConfig';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [ttsTitle, setTtsTitle] = useState('');
  const [ttsDesc, setTtsDesc] = useState('');

  const getBgMusicId = useCallback((): string | null => {
    return DEFAULT_BG_MUSIC_IDS.contact || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
  }, []);

  useEffect(() => {
    return () => {
      voiceManager.stopBackgroundMusic();
      musicController.setCurrentMusicId(null);
    };
  }, []);

  useEffect(() => {
    const unlockOnce = () => {
      voiceManager.onUserInteraction();
      document.removeEventListener('click', unlockOnce);
    };
    document.addEventListener('click', unlockOnce);
    return () => document.removeEventListener('click', unlockOnce);
  }, []);

  useEffect(() => {
    if (!titleRef.current || !descRef.current) return;
    setTtsTitle(titleRef.current.innerText);
    setTtsDesc(descRef.current.innerText);

    const observer = new MutationObserver(() => {
      if (titleRef.current) setTtsTitle(titleRef.current.innerText);
      if (descRef.current) setTtsDesc(descRef.current.innerText);
    });

    observer.observe(titleRef.current, { childList: true, subtree: true, characterData: true });
    observer.observe(descRef.current, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, []);

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
      }
      const textToSpeak = `${ttsTitle}. ${ttsDesc}`.trim();
      if (!textToSpeak) return;
      voiceManager.speak(textToSpeak, true, true, () => {
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Movies4U™ Official",
    "description": "Get in touch with the Movies4U™ Official team for support, requests, or DMCA inquiries.",
    "url": "https://movies4u-official.vercel.app/contact"
  };

  return (
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

      <SEO title="Contact Us - Movies4U™ Official" description="Get in touch with the Movies4U™ Official team." schema={schema} path="/contact" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-3xl md:text-5xl font-bold text-white mb-4">Contact <span className="text-miraj-red">Us</span></h1>
          <p ref={descRef} className="text-gray-400">We'd love to hear from you. Send us a message below. </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-miraj-gray border border-white/5 p-6 rounded-xl">
              <Mail className="text-miraj-gold mb-3" size={28} />
              <h3 className="font-bold text-white text-lg mb-1">Email Us</h3>
              <p className="text-gray-400 text-sm mb-2">For general inquiries and support.</p>
              <a href="mailto:support@movieandtvtrailers.com" className="text-miraj-red hover:underline font-medium">support@movieandtvtrailers.com</a>
            </div>
            <div className="bg-miraj-gray border border-white/5 p-6 rounded-xl">
              <MessageSquare className="text-miraj-gold mb-3" size={28} />
              <h3 className="font-bold text-white text-lg mb-1">DMCA / Legal</h3>
              <p className="text-gray-400 text-sm mb-2">For copyright related matters.</p>
              <a href="mailto:legal@movieandtvtrailers.com" className="text-miraj-red hover:underline font-medium">legal@movieandtvtrailers.com</a>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-miraj-gray border border-white/5 p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors">
                  <option value="">Select a topic</option>
                  <option value="Support">General Support</option>
                  <option value="Request">Content Request</option>
                  <option value="Report">Report a Bug / Broken Link</option>
                  <option value="Business">Business Inquiry</option>
                  <option value="DMCA">DMCA Takedown</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-miraj-gold focus:outline-none transition-colors resize-none" placeholder="How can we help you?" />
              </div>

              <button type="submit" className="w-full bg-miraj-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;