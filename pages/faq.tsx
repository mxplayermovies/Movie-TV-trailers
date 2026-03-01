// // import React, { useEffect } from 'react';
// // import Head from 'next/head';
// // import { useRouter } from 'next/router';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import { voiceManager } from '../lib/core/VoiceManager';
// // import { Volume2, ArrowLeft, Download } from 'lucide-react';

// // export default function FAQPage() {
// //   const router = useRouter();

// //   useEffect(() => {
// //     voiceManager.speak("You are on the Frequently Asked Questions page. Click the speaker icon to hear answers to common questions, including info about our Android app.");
// //   }, []);

// //   const readPageContent = () => {
// //     const text = `
// //       Frequently Asked Questions about Movie & TV trailers.
      
// //       Is Movie & TV trailers really free? Yes! All content is completely free. No subscription, no credit card required.
      
// //       Do I need to create an account? No account needed. Just visit and start watching.
      
// //       What devices can I use? Movie & TV trailers works on any device with a modern browser – desktop, laptop, tablet, or smartphone. We also have an Android app for a better mobile experience.
      
// //       Do you have an Android app? Yes! Download our official Android app from our website.
      
// //       How do you make money? We display non‑intrusive ads to cover our server costs. We never sell your data.
      
// //       Can I download movies to watch offline? With our Android app, you'll have offline access to select content.
      
// //       What should I do if a video doesn't play? Try refreshing the page, switching to another server, or clearing your browser cache.
      
// //       Why do some links not work? We rely on third‑party servers; occasionally they may go down. Try a different server from the list.
      
// //       Is it legal to watch here? We only link to publicly available content. However, laws vary by country; you are responsible for your own use.
// //     `;
// //     voiceManager.speak(text, true);
// //   };

// //   const faqs = [
// //     { q: "Is Movie & TV trailers really free?", a: "Yes! All content on Movie & TV trailers is completely free. No subscription, no credit card required." },
// //     { q: "Do I need to create an account?", a: "No account needed. Just visit the site and start watching." },
// //     { q: "What devices can I use?", a: "Movie & TV trailers works on any device with a modern web browser – desktop, laptop, tablet, or smartphone. We also have an Android app for a better mobile experience." },
// //     { q: "Do you have an Android app?", a: "Yes! Download our official Android app from our website. " },
// //     { q: "How do you make money?", a: "We display non‑intrusive ads to cover our server costs. We never sell your data." },
// //     { q: "Can I download movies to watch offline?", a: "With our Android app, you'll have offline access to select content." },
// //     { q: "What should I do if a video doesn't play?", a: "Try refreshing the page, switching to another server, or clearing your browser cache." },
// //     { q: "Why do some links not work?", a: "We rely on third‑party servers; occasionally they may go down. Try a different server from the list." },
// //     { q: "Is it legal to watch here?", a: "We only link to publicly available content. However, laws vary by country; you are responsible for your own use." },
// //   ];

// //   const faqSchema = {
// //     "@context": "https://schema.org",
// //     "@type": "FAQPage",
// //     "mainEntity": faqs.map((item, index) => ({
// //       "@type": "Question",
// //       "name": item.q,
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": item.a
// //       }
// //     }))
// //   };

// //   return (
// //     <>
// //       <Head>
// //         <title>FAQ – Movie & TV trailers</title>
// //         <meta name="description" content="Frequently asked questions about Movie & TV trailers. Learn about our service, how to watch, troubleshooting, and our Android app." />
// //         <meta name="keywords" content="streaming FAQ, free movies help, video not playing, account free, Android app" />
// //         <meta property="og:title" content="FAQ – Movie & TV trailers" />
// //         <meta property="og:description" content="Get answers to common questions about our free streaming platform, including our Android app." />
// //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
// //       </Head>

// //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans transition-colors duration-300">
// //         <Header />
        
// //         <main className="pt-28 pb-20 relative">
// //           {/* Back Button */}
// //           <div className="container mx-auto px-4 mb-6">
// //             <button
// //               onClick={() => router.push('/')}
// //               className="flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-lg transition text-slate-700 dark:text-slate-300"
// //             >
// //               <ArrowLeft size={18} />
// //               Home
// //             </button>
// //           </div>

// //           <div className="container mx-auto px-4 max-w-4xl">
// //             <div className="text-center mb-16 relative">
// //               <button 
// //                 onClick={readPageContent}
// //                 className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
// //                 title="Read Full Content"
// //               >
// //                 <Volume2 size={20} />
// //               </button>
// //               <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
// //               <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
// //                 Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Questions</span>
// //               </h1>
// //               <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
// //                 Everything you need to know about Movie & TV trailers – answered.
// //               </p>
// //             </div>

// //             <div className="space-y-6">
// //               {faqs.map((faq, index) => (
// //                 <div key={index} className="bg-white dark:bg-[#1e293b] rounded-lg p-6 shadow border border-slate-200 dark:border-white/5">
// //                   <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{faq.q}</h3>
// //                   <p className="text-slate-600 dark:text-slate-300">{faq.a}</p>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Android App Callout */}
// //             <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
// //               <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
// //               <p className="text-slate-600 dark:text-slate-300 mb-6">
// //                 Enjoy faster streaming, offline access, and exclusive features with our official Android app.
// //               </p>
// //               <a
// //                 href="https://median.co/share/bnlpkdo"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl"
// //               >
// //                 <Download size={20} />
// //                 Download APK
// //               </a>
// //             </div>
// //           </div>
// //         </main>

// //         <Footer />
// //       </div>
// //     </>
// //   );
// // }

// import React, { useEffect, useCallback } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { voiceManager } from '../lib/core/VoiceManager';
// import { Volume2, ArrowLeft, Download } from 'lucide-react';

// export default function FAQPage() {
//   const router = useRouter();

//   const getPageText = useCallback((): string => {
//     const heading = document.querySelector('h1');
//     const pageTextEl = document.querySelector('.page-text');
//     let text = '';
//     if (heading?.textContent) text += heading.textContent + '. ';
//     if (pageTextEl?.textContent) text += pageTextEl.textContent + '. ';
//     return text;
//   }, []);

//   const readPageContent = () => {
//     const text = getPageText();
//     if (text) {
//       voiceManager.speak(text, true);
//     } else {
//       voiceManager.speak("You are on the Frequently Asked Questions page. Click the speaker icon to hear answers to common questions, including info about our Android app.");
//     }
//   };

//   // Auto‑speak after page load (1.5 second delay)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       readPageContent();
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const faqs = [
//     { q: "Is Movie & TV trailers really free?", a: "Yes! All content on Movie & TV trailers is completely free. No subscription, no credit card required." },
//     { q: "Do I need to create an account?", a: "No account needed. Just visit the site and start watching." },
//     { q: "What devices can I use?", a: "Movie & TV trailers works on any device with a modern web browser – desktop, laptop, tablet, or smartphone. We also have an Android app for a better mobile experience." },
//     { q: "Do you have an Android app?", a: "Yes! Download our official Android app from our website. " },
//     { q: "How do you make money?", a: "We display non‑intrusive ads to cover our server costs. We never sell your data." },
//     { q: "Can I download movies to watch offline?", a: "With our Android app, you'll have offline access to select content." },
//     { q: "What should I do if a video doesn't play?", a: "Try refreshing the page, switching to another server, or clearing your browser cache." },
//     { q: "Why do some links not work?", a: "We rely on third‑party servers; occasionally they may go down. Try a different server from the list." },
//     { q: "Is it legal to watch here?", a: "We only link to publicly available content. However, laws vary by country; you are responsible for your own use." },
//   ];

//   const faqSchema = {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": faqs.map((item, index) => ({
//       "@type": "Question",
//       "name": item.q,
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": item.a
//       }
//     }))
//   };

//   return (
//     <>
//       <Head>
//         <title>FAQ – Movie & TV trailers</title>
//         <meta name="description" content="Frequently asked questions about Movie & TV trailers. Learn about our service, how to watch, troubleshooting, and our Android app." />
//         <meta name="keywords" content="streaming FAQ, free movies help, video not playing, account free, Android app" />
//         <meta property="og:title" content="FAQ – Movie & TV trailers" />
//         <meta property="og:description" content="Get answers to common questions about our free streaming platform, including our Android app." />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans transition-colors duration-300">
//         <Header />
        
//         <main className="pt-28 pb-20 relative">
//           {/* Back Button */}
//           <div className="container mx-auto px-4 mb-6">
//             <button
//               onClick={() => router.push('/')}
//               className="flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-lg transition text-slate-700 dark:text-slate-300"
//             >
//               <ArrowLeft size={18} />
//               Home
//             </button>
//           </div>

//           <div className="container mx-auto px-4 max-w-4xl">
//             {/* Hidden paragraph containing full descriptive text */}
//             <p className="page-text hidden">
//               Frequently Asked Questions about Movie & TV trailers.
//               Is Movie & TV trailers really free? Yes! All content is completely free. No subscription, no credit card required.
//               Do I need to create an account? No account needed. Just visit and start watching.
//               What devices can I use? Movie & TV trailers works on any device with a modern browser – desktop, laptop, tablet, or smartphone. We also have an Android app for a better mobile experience.
//               Do you have an Android app? Yes! Download our official Android app from our website.
//               How do you make money? We display non‑intrusive ads to cover our server costs. We never sell your data.
//               Can I download movies to watch offline? With our Android app, you'll have offline access to select content.
//               What should I do if a video doesn't play? Try refreshing the page, switching to another server, or clearing your browser cache.
//               Why do some links not work? We rely on third‑party servers; occasionally they may go down. Try a different server from the list.
//               Is it legal to watch here? We only link to publicly available content. However, laws vary by country; you are responsible for your own use.
//             </p>

//             <div className="text-center mb-16 relative">
//               <button 
//                 onClick={readPageContent}
//                 className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
//                 title="Read Full Content"
//               >
//                 <Volume2 size={20} />
//               </button>
//               <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
//               <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
//                 Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Questions</span>
//               </h1>
//               <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
//                 Everything you need to know about Movie & TV trailers – answered.
//               </p>
//             </div>

//             <div className="space-y-6">
//               {faqs.map((faq, index) => (
//                 <div key={index} className="bg-white dark:bg-[#1e293b] rounded-lg p-6 shadow border border-slate-200 dark:border-white/5">
//                   <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{faq.q}</h3>
//                   <p className="text-slate-600 dark:text-slate-300">{faq.a}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Android App Callout */}
//             <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
//               <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
//               <p className="text-slate-600 dark:text-slate-300 mb-6">
//                 Enjoy faster streaming, offline access, and exclusive features with our official Android app.
//               </p>
//               <a
//                 href="https://median.co/share/bnlpkdo"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl"
//               >
//                 <Download size={20} />
//                 Download APK
//               </a>
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }





import React, { useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
// ✅ FIX: no top-level voiceManager import
import { Volume2, ArrowLeft, Download } from 'lucide-react';

export default function FAQPage() {
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
      voiceRef.current?.speak(
        getPageText() || 'You are on the Frequently Asked Questions page.',
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

  const faqs = [
    { q: "Is Movie & TV trailers really free?", a: "Yes! All content on Movie & TV trailers is completely free. No subscription, no credit card required." },
    { q: "Do I need to create an account?", a: "No account needed. Just visit the site and start watching." },
    { q: "What devices can I use?", a: "Movie & TV trailers works on any device with a modern web browser – desktop, laptop, tablet, or smartphone. We also have an Android app for a better mobile experience." },
    { q: "Do you have an Android app?", a: "Yes! Download our official Android app from our website." },
    { q: "How do you make money?", a: "We display non‑intrusive ads to cover our server costs. We never sell your data." },
    { q: "Can I download movies to watch offline?", a: "With our Android app, you'll have offline access to select content." },
    { q: "What should I do if a video doesn't play?", a: "Try refreshing the page, switching to another server, or clearing your browser cache." },
    { q: "Why do some links not work?", a: "We rely on third‑party servers; occasionally they may go down. Try a different server from the list." },
    { q: "Is it legal to watch here?", a: "We only link to publicly available content. However, laws vary by country; you are responsible for your own use." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <>
      <Head>
        <title>FAQ – Movie &amp; TV trailers</title>
        <meta name="description" content="Frequently asked questions about Movie & TV trailers. Learn about our service, how to watch, troubleshooting, and our Android app." />
        <meta name="keywords" content="streaming FAQ, free movies help, video not playing, account free, Android app" />
        <meta property="og:title" content="FAQ – Movie & TV trailers" />
        <meta property="og:description" content="Get answers to common questions about our free streaming platform." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              Frequently Asked Questions about Movie & TV trailers.
              Is Movie & TV trailers really free? Yes! All content is completely free. No subscription, no credit card required.
              Do I need to create an account? No account needed. Just visit and start watching.
              What devices can I use? Movie & TV trailers works on any device with a modern browser – desktop, laptop, tablet, or smartphone. We also have an Android app for a better mobile experience.
              Do you have an Android app? Yes! Download our official Android app from our website.
              How do you make money? We display non‑intrusive ads to cover our server costs. We never sell your data.
              Can I download movies to watch offline? With our Android app, you'll have offline access to select content.
              What should I do if a video doesn't play? Try refreshing the page, switching to another server, or clearing your browser cache.
              Why do some links not work? We rely on third‑party servers; occasionally they may go down. Try a different server from the list.
              Is it legal to watch here? We only link to publicly available content. However, laws vary by country; you are responsible for your own use.
            </p>


            <div className="text-center mb-16 relative">
              <button
                onClick={readPageContent}
                className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                title="Read Full Content"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Questions</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about Movie &amp; TV trailers – answered.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-[#1e293b] rounded-lg p-6 shadow border border-slate-200 dark:border-white/5">
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Enjoy faster streaming, offline access, and exclusive features with our official Android app.
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