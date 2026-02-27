// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { voiceManager } from '../lib/core/VoiceManager';
import { AlertTriangle } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  const translateListenerAttached = useRef(false);

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

  useEffect(() => {
    voiceManager.unlock();

    const getDropdownLanguage = (): string | null => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      return combo?.value || null;
    };

    const updateLanguageFromDropdown = () => {
      const lang = getDropdownLanguage();
      if (lang) {
        console.log(`Google Translate language changed to: ${lang}`);
        voiceManager.setLanguage(lang);
      }
    };

    const attachDropdownListener = () => {
      if (translateListenerAttached.current) return;
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        updateLanguageFromDropdown();
        combo.addEventListener('change', updateLanguageFromDropdown);
        translateListenerAttached.current = true;
        console.log('Google Translate dropdown listener attached');
      }
    };

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
          },
          'google_translate_element'
        );
        attachDropdownListener();
      }
    };

    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    const observer = new MutationObserver(() => {
      attachDropdownListener();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('change', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('goog-te-combo')) {
        updateLanguageFromDropdown();
      }
    });

    const timeout = setTimeout(attachDropdownListener, 2000);

    return () => {
      observer.disconnect();
      document.removeEventListener('change', updateLanguageFromDropdown);
      clearTimeout(timeout);
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.removeEventListener('change', updateLanguageFromDropdown);
      }
    };
  }, []);

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
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
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
            <AlertTriangle size={20} className="text-white" />
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