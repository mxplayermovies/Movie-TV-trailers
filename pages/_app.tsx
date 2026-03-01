import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AlertTriangle } from 'lucide-react';

// ✅ FIX: VoiceManager is NOT imported at the top level.
// It accesses `window.speechSynthesis` at construction time, which does NOT
// exist on the Node.js SSR runtime → importing it at the top level causes a
// 5xx error on every page because Next.js tries to evaluate the module during
// server-side rendering.  We lazy-load it inside useEffect (client-only).

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const translateListenerAttached = useRef(false);

  // ── Theme ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // ── VoiceManager (client-only, dynamic import) ────────────────────────────
  useEffect(() => {
    // Dynamic import ensures this code NEVER runs on the server.
    import('../lib/core/VoiceManager')
      .then(({ voiceManager }) => {
        voiceManager.unlock();
      })
      .catch(() => {/* voice not critical */});
  }, []);

  // ── Google Translate init ─────────────────────────────────────────────────
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      }
    };
  }, []);

  // ── Right-click protection ────────────────────────────────────────────────
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowSecurityWarning(true);
      setTimeout(() => setShowSecurityWarning(false), 2000);
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QV663BPPEH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QV663BPPEH');
          `}
        </Script>

        {/* Google Translate */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Ads */}
        <Script id="ad-script-1" strategy="afterInteractive">
          {`
            (function(){
              var s=document.createElement('script');
              s.dataset.zone='10641698';
              s.src='https://nap5k.com/tag.min.js';
              document.body.appendChild(s);
            })();
          `}
        </Script>

        <Script id="ad-script-2" strategy="afterInteractive">
          {`
            (function(){
              var s=document.createElement('script');
              s.dataset.zone='10641706';
              s.src='https://gizokraijaw.net/vignette.min.js';
              document.body.appendChild(s);
            })();
          `}
        </Script>

        <Script
          src="//static.getclicky.com/js"
          strategy="afterInteractive"
          data-id="101501713"
        />

        <div
          id="google_translate_element"
          className="fixed bottom-4 right-4 z-[9999] bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
          style={{ minHeight: '40px', minWidth: '160px' }}
        />

        <div
          className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${
            showSecurityWarning
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="bg-red-600/95 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl border border-white/20 flex items-center gap-3">
            <AlertTriangle size={20} />
            <span className="text-sm md:text-base">Right click is disabled</span>
          </div>
        </div>

        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />
      </ThemeContext.Provider>
    </>
  );
}