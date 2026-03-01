import React, { useEffect, useCallback, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
// ✅ FIX: no top-level voiceManager import
import { Volume2, Send, ArrowLeft, Briefcase, Megaphone, Download, Mail } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const voiceRef = useRef<{ speak: (text: string, interrupt?: boolean) => void } | null>(null);

  const getPageText = useCallback((): string => {
    if (typeof document === 'undefined') return '';
    try {
      const heading = document.querySelector('h1');
      const pageTextEl = document.querySelector('.page-text');
      let text = '';
      if (heading?.textContent) text += heading.textContent + '. ';
      if (pageTextEl?.textContent) text += pageTextEl.textContent + '. ';
      return text;
    } catch { return ''; }
  }, []);

  const readPageContent = useCallback(() => {
    try {
      const text = getPageText();
      voiceRef.current?.speak(
        text || 'You are on the Contact page. Click the speaker icon to hear how to get in touch with us.',
        true
      );
    } catch { /* ignore */ }
  }, [getPageText]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    import('../lib/core/VoiceManager').then(({ voiceManager }) => {
      if (cancelled) return;
      voiceRef.current = voiceManager;
      timer = setTimeout(() => { if (!cancelled) readPageContent(); }, 1500);
    }).catch(() => {});
    return () => { cancelled = true; clearTimeout(timer); };
  }, [readPageContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact Us – Movie &amp; TV trailers | Support, Business &amp; Advertising</title>
        <meta name="description" content="Get in touch with Movie & TV trailers for customer support, business partnerships, or advertising opportunities. Request movies/TV shows via Telegram." />
        <meta name="keywords" content="contact, support, business inquiries, advertising, partnerships, Movie & TV trailers, Telegram" />
        <meta property="og:title" content="Contact Movie & TV trailers – Support, Business & Advertising" />
        <meta property="og:description" content="Reach out to us for any questions, business collaborations, or advertising on our platform." />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans transition-colors duration-300">
        <Header />

        <main className="pt-28 pb-20 relative">
          <div className="container mx-auto px-4 mb-6">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-lg transition text-slate-700 dark:text-slate-300"
            >
              <ArrowLeft size={18} />
              Home
            </button>
          </div>

          <div className="container mx-auto px-4 max-w-5xl">
            <p className="page-text hidden">
              Contact Movie &amp; TV trailers. We'd love to hear from you.
              For general support or feedback, use the contact form below or email us at movie-tv-trailers@protonmail.com.
              For business partnerships, collaborations, or media inquiries, please contact our business team.
              Want to request a specific movie or TV show? Join our Telegram channel.
              Download our Android app from our website for the best mobile experience.
            </p>

            <div className="text-center mb-16 relative">
              <button
                onClick={readPageContent}
                className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                title="Read Full Content"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Us</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Whether you need support, want to partner with us, or are interested in advertising, we're here for you.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">🎬 Request a Movie or TV Show</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Can't find what you're looking for? Join our Telegram channel and send your request directly.
              </p>
              <a
                href="https://t.me/movieandtvshowondemand"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#26A5E4] hover:bg-[#1e8bc3] text-white font-semibold rounded-lg transition"
              >
                <Send size={18} />
                Request on Telegram
              </a>
            </div>

            <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-500/20 text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">📱 Get Our Android App</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Download the official Movie & TV trailers app for Android and enjoy seamless streaming on the go.
              </p>
              <a
                href="https://median.co/share/bnlpkdo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                <Download size={18} />
                Download APK
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow border border-slate-200 dark:border-white/5 flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Business Inquiries</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">Partnerships, collaborations, media</p>
                  <a href="mailto:movie-tv-trailers@protonmail.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
                    <Mail size={16} /> movie-tv-trailers@protonmail.com
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow border border-slate-200 dark:border-white/5 flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                  <Megaphone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Advertising</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">Advertise on Movie & TV trailers</p>
                  <a href="mailto:movie-tv-trailers@protonmail.com" className="text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center gap-1">
                    <Mail size={16} /> movie-tv-trailers@protonmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">General Support &amp; Feedback</h2>
              {submitted ? (
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-8 rounded-lg text-center">
                  <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                  <p>Your message has been sent. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow border border-slate-200 dark:border-white/5">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <input type="text" id="name" required className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input type="email" id="email" required className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Message</label>
                    <textarea id="message" rows={5} required className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl mx-auto">
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}