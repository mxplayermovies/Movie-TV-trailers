// import React, { useEffect } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { voiceManager } from '../lib/core/VoiceManager';
// import { Volume2, ArrowLeft, Download } from 'lucide-react';

// export default function AboutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     voiceManager.speak("You are on the About Page. Click the speaker icon to learn about our mission, technology, and how to download our Android app for the best experience.");
//   }, []);

//   const readPageContent = () => {
//     const text = `
//       About Movie & TV trailers. Free Entertainment for Everyone.
      
//       Our Mission. We believe that great movies, TV shows, and live sports should be accessible to everyone, anywhere, without barriers. That's why we built Movie & TV trailers – a completely free streaming platform that requires no registration, no credit card, and no hidden fees.
      
//       How It Works. We aggregate publicly available streaming links from across the web and present them in a clean, easy‑to‑use interface. We don't host any content ourselves; we simply help you find what you're looking for.
      
//       Our Technology. Movie & TV trailers is built on modern web technologies – Next.js, Tailwind CSS, and WebAssembly for video processing. We prioritize speed, privacy, and a seamless user experience across all devices.
      
//       Android App. For the best experience, download our official Android app from our website. Enjoy faster streaming, offline access, and exclusive features. Get it now download and use it.
      
//       Our Commitment. We are committed to keeping Movie & TV trailers free forever. We support our service through non‑intrusive ads that respect your privacy. We never sell your data.
      
//       Join millions of users who already enjoy unlimited entertainment. Start watching now! Toady.
//     `;
//     voiceManager.speak(text, true);
//   };

//   const organizationSchema = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     "name": "Movie & TV trailers",
//     "url": "https://movie-tv-trailers.vercel.app/",
//     "logo": "https://movie-tv-trailers.vercel.app//logo.png",
//     "sameAs": [
//       "https://twitter.com/movie-tv-trailers",
//       "https://facebook.com/movie-tv-trailers"
//     ],
//     "description": "Movie & TV trailers is a free streaming platform offering movies, TV shows, live sports, and more – all without registration.",
//     "foundingDate": "2026",
//     "contactPoint": {
//       "@type": "ContactPoint",
//       "email": "drtrailer2022@gmail.com",
//       "contactType": "customer support"
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>About Movie & TV trailers | Free Streaming Platform & Android App</title>
//         <meta name="description" content="Learn about Movie & TV trailers – our mission to provide free entertainment to everyone, our technology, and our commitment to privacy. Download our Android app for the best experience." />
//         <meta name="keywords" content="Movie & TV trailers, about us, free streaming, movies online, TV shows, live sports, Android app download" />
//         <meta property="og:type" content="website" />
//         <meta property="og:title" content="About Movie & TV trailers – Free Entertainment for All" />
//         <meta property="og:description" content="Discover how Movie & TV trailers brings you unlimited movies, TV, and sports for free – no sign‑up required. Get our Android app!" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
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
//             <div className="text-center mb-16 relative">
//               <button 
//                 onClick={readPageContent}
//                 className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
//                 title="Read Full Content"
//               >
//                 <Volume2 size={20} />
//               </button>
//               <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
//               <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
//                 Free Entertainment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">for Everyone</span>
//               </h1>
//               <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
//                 We believe great movies, TV shows, and live sports should be accessible to all – no barriers, no fees.
//               </p>
//             </div>
            
//             <div className="prose prose-lg mx-auto dark:prose-invert">
//               <div className="grid md:grid-cols-2 gap-12 my-16 not-prose">
//                 <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors shadow-sm">
//                   <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h3>
//                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
//                     We believe that great content should be accessible to everyone, anywhere, without barriers. That's why we built Movie & TV trailers – a completely free streaming platform that requires no registration, no credit card, and no hidden fees.
//                   </p>
//                 </div>
//                 <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-purple-500/30 transition-colors shadow-sm">
//                   <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h3>
//                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
//                     We aggregate publicly available streaming links from across the web and present them in a clean, easy‑to‑use interface. We don't host any content ourselves; we simply help you find what you're looking for.
//                   </p>
//                 </div>
//               </div>

//               <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Our Technology Stack</h2>
//               <p className="text-slate-600 dark:text-slate-300 text-center mb-12">
//                 We prioritize speed, privacy, and a seamless user experience across all devices.
//               </p>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-20">
//                 {['Next.js', 'Tailwind CSS', 'WebAssembly', 'HLS.js'].map((tech) => (
//                   <div key={tech} className="p-4 bg-white dark:bg-slate-900 rounded-lg text-center font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 shadow-sm">
//                     {tech}
//                   </div>
//                 ))}
//               </div>

//               {/* Android App Callout */}
//               <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center shadow-sm mb-10">
//                 <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
//                 <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
//                   For the best experience, download our official Android app. Enjoy faster streaming, offline access, and exclusive features.
//                 </p>
//                 <a
//                   href="https://median.co/share/bnlpkdo"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
//                 >
//                   <Download size={24} />
//                   Download APK
//                 </a>
//               </div>

//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-10 rounded-3xl border border-blue-200 dark:border-blue-500/20 text-center shadow-sm">
//                 <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white m-0">Start Watching Now</h2>
//                 <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
//                   Join millions of users who already enjoy unlimited entertainment – completely free.
//                 </p>
//                 <div className="flex justify-center gap-4">
//                   <a href="/movies" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">Browse Movies</a>
//                   <a href="/tv" className="px-8 py-3 bg-white dark:bg-transparent border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">TV Shows</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }






import React, { useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { voiceManager } from '../lib/core/VoiceManager';
import { Volume2, ArrowLeft, Download } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  const getPageText = useCallback((): string => {
    const heading = document.querySelector('h1');
    const pageTextEl = document.querySelector('.page-text');
    let text = '';
    if (heading?.textContent) text += heading.textContent + '. ';
    if (pageTextEl?.textContent) text += pageTextEl.textContent + '. ';
    return text;
  }, []);

  const readPageContent = () => {
    const text = getPageText();
    if (text) {
      voiceManager.speak(text, true);
    } else {
      voiceManager.speak("You are on the About Page. Click the speaker icon to learn about our mission, technology, and how to download our Android app for the best experience.");
    }
  };

  // Auto‑speak after page load (1.5 second delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      readPageContent();
    }, 1500);
    return () => clearTimeout(timer);
  }, []); // Empty array ensures this runs only once

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Movie & TV trailers",
    "url": "https://movie-tv-trailers.vercel.app/",
    "logo": "https://movie-tv-trailers.vercel.app//logo.png",
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
        <title>About Movie & TV trailers | Free Streaming Platform & Android App</title>
        <meta name="description" content="Learn about Movie & TV trailers – our mission to provide free entertainment to everyone, our technology, and our commitment to privacy. Download our Android app for the best experience." />
        <meta name="keywords" content="Movie & TV trailers, about us, free streaming, movies online, TV shows, live sports, Android app download" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Movie & TV trailers – Free Entertainment for All" />
        <meta property="og:description" content="Discover how Movie & TV trailers brings you unlimited movies, TV, and sports for free – no sign‑up required. Get our Android app!" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans transition-colors duration-300">
        <Header />
        
        <main className="pt-28 pb-20 relative">
          {/* Back Button */}
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
            {/* Hidden paragraph containing full descriptive text */}
            <p className="page-text hidden">
              About Movie & TV trailers. Free Entertainment for Everyone.
              Our Mission. We believe that great movies, TV shows, and live sports should be accessible to everyone, anywhere, without barriers. That's why we built Movie & TV trailers – a completely free streaming platform that requires no registration, no credit card, and no hidden fees.
              How It Works. We aggregate publicly available streaming links from across the web and present them in a clean, easy‑to‑use interface. We don't host any content ourselves; we simply help you find what you're looking for.
              Our Technology. Movie & TV trailers is built on modern web technologies – Next.js, Tailwind CSS, and WebAssembly for video processing. We prioritize speed, privacy, and a seamless user experience across all devices.
              Android App. For the best experience, download our official Android app from our website. Enjoy faster streaming, offline access, and exclusive features. Get it now download and use it.
              Our Commitment. We are committed to keeping Movie & TV trailers free forever. We support our service through non‑intrusive ads that respect your privacy. We never sell your data.
              Join millions of users who already enjoy unlimited entertainment. Start watching now!
            </p>

            <div className="text-center mb-16 relative">
              <button 
                onClick={readPageContent}
                className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                title="Read Full Content"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                Free Entertainment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">for Everyone</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                We believe great movies, TV shows, and live sports should be accessible to all – no barriers, no fees.
              </p>
            </div>
            
            <div className="prose prose-lg mx-auto dark:prose-invert">
              <div className="grid md:grid-cols-2 gap-12 my-16 not-prose">
                <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors shadow-sm">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We believe that great content should be accessible to everyone, anywhere, without barriers. That's why we built Movie & TV trailers – a completely free streaming platform that requires no registration, no credit card, and no hidden fees.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-purple-500/30 transition-colors shadow-sm">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We aggregate publicly available streaming links from across the web and present them in a clean, easy‑to‑use interface. We don't host any content ourselves; we simply help you find what you're looking for.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Our Technology Stack</h2>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-12">
                We prioritize speed, privacy, and a seamless user experience across all devices.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-20">
                {['Next.js', 'Tailwind CSS', 'WebAssembly', 'HLS.js'].map((tech) => (
                  <div key={tech} className="p-4 bg-white dark:bg-slate-900 rounded-lg text-center font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 shadow-sm">
                    {tech}
                  </div>
                ))}
              </div>

              {/* Android App Callout */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center shadow-sm mb-10">
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
                  For the best experience, download our official Android app. Enjoy faster streaming, offline access, and exclusive features.
                </p>
                <a
                  href="https://median.co/share/bnlpkdo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  <Download size={24} />
                  Download APK
                </a>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-10 rounded-3xl border border-blue-200 dark:border-blue-500/20 text-center shadow-sm">
                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white m-0">Start Watching Now</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
                  Join millions of users who already enjoy unlimited entertainment – completely free.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="/movies" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">Browse Movies</a>
                  <a href="/tv" className="px-8 py-3 bg-white dark:bg-transparent border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">TV Shows</a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}