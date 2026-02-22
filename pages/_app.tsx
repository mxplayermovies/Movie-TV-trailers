// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import Head from 'next/head';
// import Script from 'next/script';
// import { useEffect, useState } from 'react';
// import { ThemeContext } from '../context/ThemeContext'; // ✅ correct import
// import Header from '../components/Header';
// import { voiceManager } from '../lib/core/VoiceManager';
// import { AlertTriangle } from 'lucide-react';

// declare global {
//   interface Window {
//     google: any;
//     googleTranslateElementInit: any;
//   }
// }

// export default function App({ Component, pageProps }: AppProps) {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  

//   useEffect(() => {
//     // Check local storage or preference
//     const storedTheme = localStorage.getItem('theme');
//     if (storedTheme === 'light') {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove('dark');
//     } else {
//       setIsDarkMode(true);
//       document.documentElement.classList.add('dark');
//     }
//   }, []);

//   // --- GOOGLE TRANSLATE & VOICE MANAGER SETUP ---
//   useEffect(() => {
//     // 1. Define the initialization function globally
//     window.googleTranslateElementInit = () => {
//       if (window.google && window.google.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
//             autoDisplay: false,
//           },
//           'google_translate_element'
//         );
//       }
//     };

//     // 2. Check if already loaded (navigation case)
//     if (window.google && window.google.translate) {
//       window.googleTranslateElementInit();
//     }

//     // 3. Language Detection for VoiceManager
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
//           const newLang = document.documentElement.lang;
//           if (newLang) {
//             // console.log('Detected language change:', newLang);
//             voiceManager.setLanguage(newLang);
//           }
//         }
//       });
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['lang'],
//     });

//     return () => observer.disconnect();
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     if (newMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//     useEffect(() => {
//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//       setShowSecurityWarning(true);
//       setTimeout(() => setShowSecurityWarning(false), 2000);
//     };

//     document.addEventListener('contextmenu', handleContextMenu);
//     return () => {
//       document.removeEventListener('contextmenu', handleContextMenu);
//     };
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       <>
//         <Head>
//           {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" /> */}
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//         <meta name="theme-color" content="#0a0a0a" />
//         <meta name="robots" content="index, follow" />
//         <link rel="icon" href="/logo.png" type="image/png" />      
//         </Head>
        
//         {/* Google Translate Script */}
//         <Script
//           src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//           strategy="afterInteractive"
//         />

//         {/* Fixed Floating Widget */}
//         <div 
//           id="google_translate_element" 
//           className="fixed bottom-4 right-4 z-[9999] bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
//           style={{ minHeight: '40px', minWidth: '160px' }}
//         />
//   {/* Google Analytics */}
//         <script async src="https://www.googletagmanager.com/gtag/js?id=G-QV663BPPEH"></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-QV663BPPEH');
//             `,
//           }}
//         />
//               {/* Security Warning Toast */}
//       <div 
//         className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${
//           showSecurityWarning ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
//         }`}
//       >
//         <div className="bg-red-600/95 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl border border-white/20 flex items-center gap-3">
//            <AlertTriangle size={20} className="text-white" />
//            <span className="text-sm md:text-base">Right click is disabled</span>
//         </div>
//       </div>

        
//         <Component {...pageProps} />
//       </>
//     </ThemeContext.Provider>
//   );
// }







// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
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

  // Theme initialization
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

  // Google Translate & Voice Manager
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          const newLang = document.documentElement.lang;
          if (newLang) {
            voiceManager.setLanguage(newLang);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  // Right‑click protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowSecurityWarning(true);
      setTimeout(() => setShowSecurityWarning(false), 2000);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Load ad & tracking scripts after page load (exact method from working example)
  useEffect(() => {
    const loadAdScripts = () => {
      // Ad 1 (nap5k)
      const adScript1 = document.createElement('script');
      adScript1.innerHTML = `(function(s){s.dataset.zone='10641698',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
      document.head.appendChild(adScript1);

      // Ad 2 (gizokraijaw)
      const adScript2 = document.createElement('script');
      adScript2.innerHTML = `(function(s){s.dataset.zone='10641706',s.src='https://gizokraijaw.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
      document.head.appendChild(adScript2);

      // Clicky tracking 1
      const clickyScript1 = document.createElement('script');
      clickyScript1.async = true;
      clickyScript1.setAttribute('data-id', '101501713');
      clickyScript1.src = '//static.getclicky.com/js';
      document.head.appendChild(clickyScript1);

      // Clicky tracking 2 (local)
      const clickyScript2 = document.createElement('script');
      clickyScript2.async = true;
      clickyScript2.setAttribute('data-id', '101501713');
      clickyScript2.src = '/7d6e5c4e347dc.js';
      document.head.appendChild(clickyScript2);
    };

    if (document.readyState === 'complete') {
      loadAdScripts();
    } else {
      window.addEventListener('load', loadAdScripts);
    }
    return () => window.removeEventListener('load', loadAdScripts);
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
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="theme-color" content="#0a0a0a" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/logo.png" type="image/png" />
        </Head>

        {/* Google Translate Script */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QV663BPPEH"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QV663BPPEH');
            `,
          }}
        />

        {/* Fixed Floating Translate Widget */}
        <div
          id="google_translate_element"
          className="fixed bottom-4 right-4 z-[9999] bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
          style={{ minHeight: '40px', minWidth: '160px' }}
        />

        {/* Security Warning Toast */}
        <div
          className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${
            showSecurityWarning ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="bg-red-600/95 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl border border-white/20 flex items-center gap-3">
            <AlertTriangle size={20} className="text-white" />
            <span className="text-sm md:text-base">Right click is disabled</span>
          </div>
        </div>

        <Component {...pageProps} />
      </>
    </ThemeContext.Provider>
  );
}