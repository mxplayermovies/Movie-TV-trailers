// // // pages/index.tsx
// // import React, { useEffect } from 'react';
// // import Head from 'next/head';
// // import Link from 'next/link';
// // import Header from '../components/Header';
// // import Hero from '../components/Hero';
// // import Footer from '../components/Footer';
// // import { voiceManager } from '../lib/core/VoiceManager';
// // import {
// //   Volume2,
// //   Send,
// //   Film,
// //   Tv,
// //   Trophy,
// //   Radio,
// //   Users,
// //   Globe,
// //   Download,
// // } from 'lucide-react';

// // const BASE_URL = 'https://movie-tv-trailers.vercel.app';
// // const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID || 'YOUR_FB_APP_ID';

// // const OG_IMAGE = `${BASE_URL}/og-image.jpg`;
// // const SITE_NAME = 'Movie & TV Trailers';
// // const SITE_TITLE = 'Movie & TV Trailers – Free Movies, TV & Live Sports';
// // const SITE_DESC =
// //   'Watch free movies, TV shows, live sports, and more online. No sign‑up required.';

// // export default function Home() {
// //   useEffect(() => {
// //     voiceManager.speak(
// //       'Welcome to Movie & TV trailers. Your ultimate destination for movies, TV shows, live sports, and more. Scroll down and click the speaker icon to explore our categories.'
// //     );
// //   }, []);

// //   const readPageContent = () => {
// //     const text = `
// //       Movie & TV trailers. Your one-stop streaming platform.
// //       We offer Movies, TV Shows, Live Sports, Live TV, Hindi Dubbed Movies, and Adult Content.
// //       Browse our categories below and start watching instantly.
// //       Want to request a specific movie or TV show? Join our Telegram channel.
// //       You can also download our Android app for the best mobile experience.
// //     `;
// //     voiceManager.speak(text, true);
// //   };

// //   const structuredData = {
// //     '@context': 'https://schema.org',
// //     '@type': 'WebSite',
// //     name: SITE_NAME,
// //     url: BASE_URL,
// //     description: SITE_DESC,
// //     potentialAction: {
// //       '@type': 'SearchAction',
// //       target: `${BASE_URL}/search?q={search_term_string}`,
// //       'query-input': 'required name=search_term_string',
// //     },
// //   };

// //   const categories = [
// //     {
// //       href: '/movies',
// //       icon: Film,
// //       title: 'Movies',
// //       desc: 'Hollywood, Bollywood & more',
// //       color: 'from-blue-500 to-blue-700',
// //     },
// //     {
// //       href: '/tv',
// //       icon: Tv,
// //       title: 'TV Shows',
// //       desc: 'Latest series & classics',
// //       color: 'from-purple-500 to-purple-700',
// //     },
// //     {
// //       href: '/sports',
// //       icon: Trophy,
// //       title: 'Live Sports',
// //       desc: 'Cricket, football & action',
// //       color: 'from-green-500 to-green-700',
// //     },
// //     {
// //       href: '/live',
// //       icon: Radio,
// //       title: 'Live TV',
// //       desc: 'News, entertainment 24/7',
// //       color: 'from-red-500 to-red-700',
// //     },
// //     {
// //       href: '/hindi-dubbed',
// //       icon: Globe,
// //       title: 'Hindi Dubbed',
// //       desc: 'Blockbusters in Hindi',
// //       color: 'from-orange-500 to-orange-700',
// //     },
// //     {
// //       href: '/adult',
// //       icon: Users,
// //       title: 'Adult',
// //       desc: '18+ exclusive content',
// //       color: 'from-pink-500 to-pink-700',
// //     },
// //   ];

// //   return (
// //     <>
// //       <Head>
// //         {/* ── Basic ─────────────────────────────────────────────────────── */}
// //         <title>{SITE_TITLE}</title>
// //         <meta name="description" content={SITE_DESC} />
// //         <meta
// //           name="keywords"
// //           content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed"
// //         />
// //         <link rel="canonical" href={BASE_URL} />
// //         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

// //         {/* ── Facebook / Open Graph ─────────────────────────────────────── */}
// //         <meta property="fb:app_id" content={FB_APP_ID} />
// //         <meta property="og:site_name" content={SITE_NAME} />
// //         <meta property="og:type" content="website" />
// //         <meta property="og:url" content={BASE_URL} />
// //         <meta property="og:title" content={SITE_TITLE} />
// //         <meta property="og:description" content={SITE_DESC} />
// //         <meta property="og:image" content={OG_IMAGE} />
// //         <meta property="og:image:secure_url" content={OG_IMAGE} />
// //         <meta property="og:image:type" content="image/jpeg" />
// //         <meta property="og:image:width" content="1200" />
// //         <meta property="og:image:height" content="630" />
// //         <meta property="og:image:alt" content={SITE_NAME} />

// //         {/* ── Twitter Card ──────────────────────────────────────────────── */}
// //         <meta name="twitter:card" content="summary_large_image" />
// //         <meta name="twitter:site" content="@MovieTVTrailers" />
// //         <meta name="twitter:creator" content="@MovieTVTrailers" />
// //         <meta name="twitter:title" content={SITE_TITLE} />
// //         <meta name="twitter:description" content={SITE_DESC} />
// //         <meta name="twitter:image" content={OG_IMAGE} />
// //         <meta name="twitter:image:alt" content={SITE_NAME} />

// //         {/* ── Structured data ───────────────────────────────────────────── */}
// //         <script
// //           type="application/ld+json"
// //           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
// //         />
// //       </Head>

// //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
// //         <Header />

// //         <main>
// //           <Hero />

// //           {/* Category Navigation */}
// //           <section className="py-16 md:py-24 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-none transition-colors relative">
// //             <div className="container mx-auto px-4 text-center relative">
// //               <button
// //                 onClick={readPageContent}
// //                 className="absolute top-0 right-4 md:right-0 p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all z-10"
// //                 title="Read page overview"
// //               >
// //                 <Volume2 size={20} />
// //               </button>

// //               <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
// //                 Unlimited Entertainment
// //               </h2>
// //               <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
// //                 Choose from thousands of titles across every genre. Start watching
// //                 instantly – no registration required.
// //               </p>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
// //                 {categories.map((cat) => {
// //                   const Icon = cat.icon;
// //                   return (
// //                     <Link key={cat.href} href={cat.href}>
// //                       <div
// //                         className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
// //                       >
// //                         <div className="flex flex-col items-center text-white">
// //                           <Icon
// //                             size={48}
// //                             className="mb-4 group-hover:scale-110 transition-transform"
// //                           />
// //                           <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
// //                           <p className="text-sm opacity-90">{cat.desc}</p>
// //                         </div>
// //                       </div>
// //                     </Link>
// //                   );
// //                 })}
// //               </div>
// //             </div>

// //             {/* Telegram Request */}
// //             <div className="max-w-2xl mx-auto mt-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 text-center">
// //               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
// //                 🎬 Request a Movie or TV Show
// //               </h3>
// //               <p className="text-slate-600 dark:text-slate-300 mb-4">
// //                 Can't find what you're looking for? Join our Telegram channel and send
// //                 your request directly. We'll do our best to add it.
// //               </p>
// //               <a
// //                 href="https://t.me/movieandtvshowondemand"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-2 px-5 py-2 bg-[#26A5E4] hover:bg-[#1e8bc3] text-white font-semibold rounded-lg transition"
// //               >
// //                 <Send size={18} />
// //                 Request on Telegram
// //               </a>
// //             </div>

// //             {/* Android App */}
// //             <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-500/20 text-center">
// //               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
// //                 📱 Get Our Android App
// //               </h3>
// //               <p className="text-slate-600 dark:text-slate-300 mb-4">
// //                 Download the official Movie & TV trailers app for Android and enjoy
// //                 seamless streaming on the go.
// //               </p>
// //               <a
// //                 href="https://median.co/share/bnlpkdo"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
// //               >
// //                 <Download size={18} />
// //                 Download APK
// //               </a>
// //             </div>
// //           </section>
// //         </main>

// //         <Footer />
// //       </div>
// //     </>
// //   );
// // }








// // pages/index.tsx
// import React, { useEffect, useCallback } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import Footer from '../components/Footer';
// import { voiceManager } from '../lib/core/VoiceManager';
// import {
//   Volume2,
//   Send,
//   Film,
//   Tv,
//   Trophy,
//   Radio,
//   Users,
//   Globe,
//   Download,
// } from 'lucide-react';

// const BASE_URL = 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID || 'YOUR_FB_APP_ID';

// const OG_IMAGE = `${BASE_URL}/og-image.jpg`;
// const SITE_NAME = 'Movie & TV Trailers';
// const SITE_TITLE = 'Movie & TV Trailers – Free Movies, TV & Live Sports';
// const SITE_DESC =
//   'Watch free movies, TV shows, live sports, and more online. No sign‑up required.';

// export default function Home() {
//   const getPageText = useCallback((): string => {
//     const container = document.querySelector('main .container');
//     if (!container) return '';
//     const elements = container.querySelectorAll('h2, p:not(.absolute)');
//     let text = '';
//     elements.forEach(el => {
//       const content = el.textContent?.trim();
//       if (content) text += content + '. ';
//     });
//     return text;
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const text = getPageText();
//       if (text) {
//         voiceManager.speak(text);
//       } else {
//         voiceManager.speak(
//           'Welcome to Movie & TV trailers. Your ultimate destination for movies, TV shows, live sports, and more.'
//         );
//       }
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, [getPageText]);

//   const readPageContent = () => {
//     const text = getPageText();
//     if (text) {
//       voiceManager.speak(text, true);
//     }
//   };

//   const structuredData = {
//     '@context': 'https://schema.org',
//     '@type': 'WebSite',
//     name: SITE_NAME,
//     url: BASE_URL,
//     description: SITE_DESC,
//     potentialAction: {
//       '@type': 'SearchAction',
//       target: `${BASE_URL}/search?q={search_term_string}`,
//       'query-input': 'required name=search_term_string',
//     },
//   };

//   const categories = [
//     {
//       href: '/movies',
//       icon: Film,
//       title: 'Movies',
//       desc: 'Hollywood, Bollywood & more',
//       color: 'from-blue-500 to-blue-700',
//     },
//     {
//       href: '/tv',
//       icon: Tv,
//       title: 'TV Shows',
//       desc: 'Latest series & classics',
//       color: 'from-purple-500 to-purple-700',
//     },
//     {
//       href: '/sports',
//       icon: Trophy,
//       title: 'Live Sports',
//       desc: 'Cricket, football & action',
//       color: 'from-green-500 to-green-700',
//     },
//     {
//       href: '/live',
//       icon: Radio,
//       title: 'Live TV',
//       desc: 'News, entertainment 24/7',
//       color: 'from-red-500 to-red-700',
//     },
//     {
//       href: '/hindi-dubbed',
//       icon: Globe,
//       title: 'Hindi Dubbed',
//       desc: 'Blockbusters in Hindi',
//       color: 'from-orange-500 to-orange-700',
//     },
//     {
//       href: '/adult',
//       icon: Users,
//       title: 'Adult',
//       desc: '18+ exclusive content',
//       color: 'from-pink-500 to-pink-700',
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>{SITE_TITLE}</title>
//         <meta name="description" content={SITE_DESC} />
//         <meta
//           name="keywords"
//           content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed"
//         />
//         <link rel="canonical" href={BASE_URL} />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content={SITE_NAME} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={BASE_URL} />
//         <meta property="og:title" content={SITE_TITLE} />
//         <meta property="og:description" content={SITE_DESC} />
//         <meta property="og:image" content={OG_IMAGE} />
//         <meta property="og:image:secure_url" content={OG_IMAGE} />
//         <meta property="og:image:type" content="image/jpeg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:image:alt" content={SITE_NAME} />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:creator" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content={SITE_TITLE} />
//         <meta name="twitter:description" content={SITE_DESC} />
//         <meta name="twitter:image" content={OG_IMAGE} />
//         <meta name="twitter:image:alt" content={SITE_NAME} />

//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
//         <Header />

//         <main>
//           <Hero />

//           <section className="py-16 md:py-24 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-none transition-colors relative">
//             <div className="container mx-auto px-4 text-center relative">
//               <button
//                 onClick={readPageContent}
//                 className="absolute top-0 right-4 md:right-0 p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all z-10"
//                 title="Read page overview"
//               >
//                 <Volume2 size={20} />
//               </button>

//               <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
//                 Unlimited Entertainment
//               </h2>
//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
//                 Choose from thousands of titles across every genre. Start watching
//                 instantly – no registration required.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                 {categories.map((cat) => {
//                   const Icon = cat.icon;
//                   return (
//                     <Link key={cat.href} href={cat.href}>
//                       <div
//                         className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
//                       >
//                         <div className="flex flex-col items-center text-white">
//                           <Icon
//                             size={48}
//                             className="mb-4 group-hover:scale-110 transition-transform"
//                           />
//                           <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
//                           <p className="text-sm opacity-90">{cat.desc}</p>
//                         </div>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="max-w-2xl mx-auto mt-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 text-center">
//               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
//                 🎬 Request a Movie or TV Show
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Can't find what you're looking for? Join our Telegram channel and send
//                 your request directly. We'll do our best to add it.
//               </p>
//               <a
//                 href="https://t.me/movieandtvshowondemand"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-[#26A5E4] hover:bg-[#1e8bc3] text-white font-semibold rounded-lg transition"
//               >
//                 <Send size={18} />
//                 Request on Telegram
//               </a>
//             </div>

//             <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-500/20 text-center">
//               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
//                 📱 Get Our Android App
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Download the official Movie & TV trailers app for Android and enjoy
//                 seamless streaming on the go.
//               </p>
//               <a
//                 href="https://median.co/share/bnlpkdo"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
//               >
//                 <Download size={18} />
//                 Download APK
//               </a>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }






// // pages/index.tsx
// import React, { useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import Footer from '../components/Footer';
// import { voiceManager } from '../lib/core/VoiceManager';
// import {
//   Volume2,
//   Send,
//   Film,
//   Tv,
//   Trophy,
//   Radio,
//   Users,
//   Globe,
//   Download,
// } from 'lucide-react';

// const BASE_URL = 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID || 'YOUR_FB_APP_ID';

// const OG_IMAGE = `${BASE_URL}/og-image.jpg`;
// const SITE_NAME = 'Movie & TV Trailers';
// const SITE_TITLE = 'Movie & TV Trailers – Free Movies, TV & Live Sports';
// const SITE_DESC =
//   'Watch free movies, TV shows, live sports, and more online. No sign‑up required.';

// export default function Home() {
//   useEffect(() => {
//     voiceManager.speak(
//       'Welcome to Movie & TV trailers. Your ultimate destination for movies, TV shows, live sports, and more. Scroll down and click the speaker icon to explore our categories.'
//     );
//   }, []);

//   const readPageContent = () => {
//     const text = `
//       Movie & TV trailers. Your one-stop streaming platform.
//       We offer Movies, TV Shows, Live Sports, Live TV, Hindi Dubbed Movies, and Adult Content.
//       Browse our categories below and start watching instantly.
//       Want to request a specific movie or TV show? Join our Telegram channel.
//       You can also download our Android app for the best mobile experience.
//     `;
//     voiceManager.speak(text, true);
//   };

//   const structuredData = {
//     '@context': 'https://schema.org',
//     '@type': 'WebSite',
//     name: SITE_NAME,
//     url: BASE_URL,
//     description: SITE_DESC,
//     potentialAction: {
//       '@type': 'SearchAction',
//       target: `${BASE_URL}/search?q={search_term_string}`,
//       'query-input': 'required name=search_term_string',
//     },
//   };

//   const categories = [
//     {
//       href: '/movies',
//       icon: Film,
//       title: 'Movies',
//       desc: 'Hollywood, Bollywood & more',
//       color: 'from-blue-500 to-blue-700',
//     },
//     {
//       href: '/tv',
//       icon: Tv,
//       title: 'TV Shows',
//       desc: 'Latest series & classics',
//       color: 'from-purple-500 to-purple-700',
//     },
//     {
//       href: '/sports',
//       icon: Trophy,
//       title: 'Live Sports',
//       desc: 'Cricket, football & action',
//       color: 'from-green-500 to-green-700',
//     },
//     {
//       href: '/live',
//       icon: Radio,
//       title: 'Live TV',
//       desc: 'News, entertainment 24/7',
//       color: 'from-red-500 to-red-700',
//     },
//     {
//       href: '/hindi-dubbed',
//       icon: Globe,
//       title: 'Hindi Dubbed',
//       desc: 'Blockbusters in Hindi',
//       color: 'from-orange-500 to-orange-700',
//     },
//     {
//       href: '/adult',
//       icon: Users,
//       title: 'Adult',
//       desc: '18+ exclusive content',
//       color: 'from-pink-500 to-pink-700',
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>{SITE_TITLE}</title>
//         <meta name="description" content={SITE_DESC} />
//         <meta
//           name="keywords"
//           content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed"
//         />
//         <link rel="canonical" href={BASE_URL} />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content={SITE_NAME} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={BASE_URL} />
//         <meta property="og:title" content={SITE_TITLE} />
//         <meta property="og:description" content={SITE_DESC} />
//         <meta property="og:image" content={OG_IMAGE} />
//         <meta property="og:image:secure_url" content={OG_IMAGE} />
//         <meta property="og:image:type" content="image/jpeg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:image:alt" content={SITE_NAME} />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:creator" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content={SITE_TITLE} />
//         <meta name="twitter:description" content={SITE_DESC} />
//         <meta name="twitter:image" content={OG_IMAGE} />
//         <meta name="twitter:image:alt" content={SITE_NAME} />

//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
//         <Header />

//         <main>
//           <Hero />

//           <section className="py-16 md:py-24 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-none transition-colors relative">
//             <div className="container mx-auto px-4 text-center relative">
//               <button
//                 onClick={readPageContent}
//                 className="absolute top-0 right-4 md:right-0 p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all z-10"
//                 title="Read page overview"
//               >
//                 <Volume2 size={20} />
//               </button>

//               <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
//                 Unlimited Entertainment
//               </h2>
//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
//                 Choose from thousands of titles across every genre. Start watching
//                 instantly – no registration required.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                 {categories.map((cat) => {
//                   const Icon = cat.icon;
//                   return (
//                     <Link key={cat.href} href={cat.href}>
//                       <div
//                         className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
//                       >
//                         <div className="flex flex-col items-center text-white">
//                           <Icon
//                             size={48}
//                             className="mb-4 group-hover:scale-110 transition-transform"
//                           />
//                           <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
//                           <p className="text-sm opacity-90">{cat.desc}</p>
//                         </div>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="max-w-2xl mx-auto mt-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 text-center">
//               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
//                 🎬 Request a Movie or TV Show
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Can't find what you're looking for? Join our Telegram channel and send
//                 your request directly. We'll do our best to add it.
//               </p>
//               <a
//                 href="https://t.me/movieandtvshowondemand"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-[#26A5E4] hover:bg-[#1e8bc3] text-white font-semibold rounded-lg transition"
//               >
//                 <Send size={18} />
//                 Request on Telegram
//               </a>
//             </div>

//             <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-500/20 text-center">
//               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
//                 📱 Get Our Android App
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Download the official Movie & TV trailers app for Android and enjoy
//                 seamless streaming on the go.
//               </p>
//               <a
//                 href="https://median.co/share/bnlpkdo"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
//               >
//                 <Download size={18} />
//                 Download APK
//               </a>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }








// // pages/index.tsx
// import React, { useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import Footer from '../components/Footer';
// import { voiceManager } from '../lib/core/VoiceManager';
// import {
//   Volume2,
//   Send,
//   Film,
//   Tv,
//   Trophy,
//   Radio,
//   Users,
//   Globe,
//   Download,
// } from 'lucide-react';

// const BASE_URL = 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID || 'YOUR_FB_APP_ID';

// const OG_IMAGE = `${BASE_URL}/og-image.jpg`;
// const SITE_NAME = 'Movie & TV Trailers';
// const SITE_TITLE = 'Movie & TV Trailers – Free Movies, TV & Live Sports';
// const SITE_DESC =
//   'Watch free movies, TV shows, live sports, and more online. No sign‑up required.';

// export default function Home() {
//   // Auto‑speak the welcome message after a short delay (once on mount)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       voiceManager.speak(
//         'Welcome to Movie & TV trailers. Your ultimate destination for movies, TV shows, live sports, and more. Scroll down and click the speaker icon to explore our categories.'
//       );
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const readPageContent = () => {
//     const text = `
//       Movie & TV trailers. Your one-stop streaming platform.
//       We offer Movies, TV Shows, Live Sports, Live TV, Hindi Dubbed Movies, and Adult Content.
//       Browse our categories below and start watching instantly.
//       Want to request a specific movie or TV show? Join our Telegram channel.
//       You can also download our Android app for the best mobile experience.
//     `;
//     voiceManager.speak(text, true);
//   };

//   const structuredData = {
//     '@context': 'https://schema.org',
//     '@type': 'WebSite',
//     name: SITE_NAME,
//     url: BASE_URL,
//     description: SITE_DESC,
//     potentialAction: {
//       '@type': 'SearchAction',
//       target: `${BASE_URL}/search?q={search_term_string}`,
//       'query-input': 'required name=search_term_string',
//     },
//   };

//   const categories = [
//     {
//       href: '/movies',
//       icon: Film,
//       title: 'Movies',
//       desc: 'Hollywood, Bollywood & more',
//       color: 'from-blue-500 to-blue-700',
//     },
//     {
//       href: '/tv',
//       icon: Tv,
//       title: 'TV Shows',
//       desc: 'Latest series & classics',
//       color: 'from-purple-500 to-purple-700',
//     },
//     {
//       href: '/sports',
//       icon: Trophy,
//       title: 'Live Sports',
//       desc: 'Cricket, football & action',
//       color: 'from-green-500 to-green-700',
//     },
//     {
//       href: '/live',
//       icon: Radio,
//       title: 'Live TV',
//       desc: 'News, entertainment 24/7',
//       color: 'from-red-500 to-red-700',
//     },
//     {
//       href: '/hindi-dubbed',
//       icon: Globe,
//       title: 'Hindi Dubbed',
//       desc: 'Blockbusters in Hindi',
//       color: 'from-orange-500 to-orange-700',
//     },
//     {
//       href: '/adult',
//       icon: Users,
//       title: 'Adult',
//       desc: '18+ exclusive content',
//       color: 'from-pink-500 to-pink-700',
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>{SITE_TITLE}</title>
//         <meta name="description" content={SITE_DESC} />
//         <meta
//           name="keywords"
//           content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed"
//         />
//         <link rel="canonical" href={BASE_URL} />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content={SITE_NAME} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={BASE_URL} />
//         <meta property="og:title" content={SITE_TITLE} />
//         <meta property="og:description" content={SITE_DESC} />
//         <meta property="og:image" content={OG_IMAGE} />
//         <meta property="og:image:secure_url" content={OG_IMAGE} />
//         <meta property="og:image:type" content="image/jpeg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:image:alt" content={SITE_NAME} />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:creator" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content={SITE_TITLE} />
//         <meta name="twitter:description" content={SITE_DESC} />
//         <meta name="twitter:image" content={OG_IMAGE} />
//         <meta name="twitter:image:alt" content={SITE_NAME} />

//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
//         <Header />

//         <main>
//           <Hero />

//           <section className="py-16 md:py-24 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-none transition-colors relative">
//             <div className="container mx-auto px-4 text-center relative">
//               <button
//                 onClick={readPageContent}
//                 className="absolute top-0 right-4 md:right-0 p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all z-10"
//                 title="Read page overview"
//               >
//                 <Volume2 size={20} />
//               </button>

//               <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
//                 Unlimited Entertainment
//               </h2>
//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
//                 Choose from thousands of titles across every genre. Start watching
//                 instantly – no registration required.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                 {categories.map((cat) => {
//                   const Icon = cat.icon;
//                   return (
//                     <Link key={cat.href} href={cat.href}>
//                       <div
//                         className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
//                       >
//                         <div className="flex flex-col items-center text-white">
//                           <Icon
//                             size={48}
//                             className="mb-4 group-hover:scale-110 transition-transform"
//                           />
//                           <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
//                           <p className="text-sm opacity-90">{cat.desc}</p>
//                         </div>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="max-w-2xl mx-auto mt-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 text-center">
//               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
//                 🎬 Request a Movie or TV Show
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Can't find what you're looking for? Join our Telegram channel and send
//                 your request directly. We'll do our best to add it.
//               </p>
//               <a
//                 href="https://t.me/movieandtvshowondemand"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-[#26A5E4] hover:bg-[#1e8bc3] text-white font-semibold rounded-lg transition"
//               >
//                 <Send size={18} />
//                 Request on Telegram
//               </a>
//             </div>

//             <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-500/20 text-center">
//               <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
//                 📱 Get Our Android App
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Download the official Movie & TV trailers app for Android and enjoy
//                 seamless streaming on the go.
//               </p>
//               <a
//                 href="https://median.co/share/bnlpkdo"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
//               >
//                 <Download size={18} />
//                 Download APK
//               </a>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }



// pages/index.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { voiceManager } from '../lib/core/VoiceManager';
import {
  Volume2,
  Send,
  Film,
  Tv,
  Trophy,
  Radio,
  Users,
  Globe,
  Download,
} from 'lucide-react';

const BASE_URL = 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID || 'YOUR_FB_APP_ID';

const OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Movie & TV Trailers';
const SITE_TITLE = 'Movie & TV Trailers – Free Movies, TV & Live Sports';
const SITE_DESC =
  'Watch free movies, TV shows, live sports, and more online. No sign‑up required.';

export default function Home() {
  // Auto‑speak after page load (2 second delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      voiceManager.speak(
        'Welcome to Movie & TV trailers. Your ultimate destination for movies, TV shows, live sports, and more. Scroll down and click the speaker icon to explore our categories.',
        true
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const readPageContent = () => {
    const text = `
      Movie & TV trailers. Your one-stop streaming platform.
      We offer Movies, TV Shows, Live Sports, Live TV, Hindi Dubbed Movies, and Adult Content.
      Browse our categories below and start watching instantly.
      Want to request a specific movie or TV show? Join our Telegram channel.
      You can also download our Android app for the best mobile experience.
    `;
    voiceManager.speak(text, true);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESC,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const categories = [
    {
      href: '/movies',
      icon: Film,
      title: 'Movies',
      desc: 'Hollywood, Bollywood & more',
      color: 'from-blue-500 to-blue-700',
    },
    {
      href: '/tv',
      icon: Tv,
      title: 'TV Shows',
      desc: 'Latest series & classics',
      color: 'from-purple-500 to-purple-700',
    },
    {
      href: '/sports',
      icon: Trophy,
      title: 'Live Sports',
      desc: 'Cricket, football & action',
      color: 'from-green-500 to-green-700',
    },
    {
      href: '/live',
      icon: Radio,
      title: 'Live TV',
      desc: 'News, entertainment 24/7',
      color: 'from-red-500 to-red-700',
    },
    {
      href: '/hindi-dubbed',
      icon: Globe,
      title: 'Hindi Dubbed',
      desc: 'Blockbusters in Hindi',
      color: 'from-orange-500 to-orange-700',
    },
    {
      href: '/adult',
      icon: Users,
      title: 'Adult',
      desc: '18+ exclusive content',
      color: 'from-pink-500 to-pink-700',
    },
  ];

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESC} />
        <meta
          name="keywords"
          content="free movies, watch online, tv shows, live sports, streaming, hindi dubbed"
        />
        <link rel="canonical" href={BASE_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={SITE_NAME} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:creator" content="@MovieTVTrailers" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={SITE_NAME} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
        <Header />

        <main>
          <Hero />

          <section className="py-16 md:py-24 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-none transition-colors relative">
            <div className="container mx-auto px-4 text-center relative">
              <button
                onClick={readPageContent}
                className="absolute top-0 right-4 md:right-0 p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all z-10"
                title="Read page overview"
              >
                <Volume2 size={20} />
              </button>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Unlimited Entertainment
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                Choose from thousands of titles across every genre. Start watching
                instantly – no registration required.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link key={cat.href} href={cat.href}>
                      <div
                        className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
                      >
                        <div className="flex flex-col items-center text-white">
                          <Icon
                            size={48}
                            className="mb-4 group-hover:scale-110 transition-transform"
                          />
                          <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                          <p className="text-sm opacity-90">{cat.desc}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="max-w-2xl mx-auto mt-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                🎬 Request a Movie or TV Show
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Can't find what you're looking for? Join our Telegram channel and send
                your request directly. We'll do our best to add it.
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
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                📱 Get Our Android App
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Download the official Movie & TV trailers app for Android and enjoy
                seamless streaming on the go.
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
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}