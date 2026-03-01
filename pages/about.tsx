import React, { useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
// ✅ FIX: no top-level voiceManager import — dynamic import inside useEffect
import { Volume2, ArrowLeft, Download } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();
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
        text || 'You are on the About Page. Click the speaker icon to learn about our mission, technology, and how to download our Android app for the best experience.',
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Movie & TV trailers",
    "url": "https://movie-tv-trailers.vercel.app/",
    "logo": "https://movie-tv-trailers.vercel.app/logo.png",
    "sameAs": [
      "https://twitter.com/movie-tv-trailers",
      "https://facebook.com/movie-tv-trailers"
    ],
    "description": "Movie & TV trailers is a free streaming platform offering movies, TV shows, live sports, and more – all without registration.",
    "foundingDate": "2026",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "drtrailer2022@gmail.com",
      "contactType": "customer support"
    }
  };

  return (
    <>
      <Head>
        <title>About Movie &amp; TV trailers | Free Streaming Platform &amp; Android App</title>
        <meta name="description" content="Learn about Movie & TV trailers – your free destination for movies, TV shows, live sports, and more. No registration required. Also available as an Android app." />
        <meta name="keywords" content="about, movie tv trailers, free streaming, android app" />
        <meta property="og:title" content="About Movie & TV trailers" />
        <meta property="og:description" content="Learn about Movie & TV trailers – free streaming for everyone." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
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

          <div className="container mx-auto px-4 max-w-4xl">
            <p className="page-text hidden">
              About Movie & TV trailers. We are a free streaming platform offering movies, TV shows, live sports, Hindi dubbed content, documentaries, and more – with no registration required. Our platform is powered by modern web technology and is also available as an Android app via our website.
            </p>

            <div className="text-center mb-16 relative">
              <button
                onClick={readPageContent}
                className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                title="Read Full Content"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Us</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Your ultimate free streaming destination – no sign-up required.
              </p>
            </div>

            <div className="prose prose-lg mx-auto dark:prose-invert">
              <h2>Our Mission</h2>
              <p>Movie & TV trailers is built to give everyone free access to the entertainment they love. We aggregate movies, TV shows, live sports, Hindi dubbed content, documentaries, and more – all in one place, completely free.</p>

              <h2>No Registration Required</h2>
              <p>We believe entertainment should be frictionless. Visit any page, pick your content, and start watching instantly. No account, no credit card, no spam.</p>

              <h2>Technology</h2>
              <p>Our platform is built with Next.js for blazing-fast performance, Tailwind CSS for a beautiful responsive UI, and is fully optimised for search engines so you can find your favourites easily.</p>

              <h2>Our Android App</h2>
              <p>Enjoy a native mobile experience with our Android app, available directly from our website. Get push notifications for new content and a smoother streaming experience on the go.</p>
            </div>

            <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Download the official Movie & TV trailers Android app for the best mobile experience.
              </p>
              <a
                href="https://median.co/share/bnlpkdo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl"
              >
                <Download size={20} />
                Download APK
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}