// // import React, { useEffect } from 'react';
// // import Head from 'next/head';
// // import { useRouter } from 'next/router';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import { voiceManager } from '../lib/core/VoiceManager';
// // import { Volume2, ArrowLeft, Download } from 'lucide-react';

// // export default function TermsPage() {
// //   const router = useRouter();

// //   useEffect(() => {
// //     voiceManager.speak("You are on the Terms of Service page. Click the speaker icon to hear our terms and conditions, including information about our Android app.");
// //   }, []);

// //   const readPageContent = () => {
// //     const text = `
// //       Terms of Service for Movie & TV trailers.
      
// //       Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
      
// //       By accessing or using our service, you agree to be bound by these Terms.
      
// //       Content: All content provided on Movie & TV trailers is for informational and entertainment purposes only. We do not host any files; we only link to third‑party services. We are not responsible for the accuracy or legality of external content.
      
// //       Intellectual Property: The Movie & TV trailers name and logo are our trademarks. Other trademarks are property of their respective owners.
      
// //       Limitation of Liability: We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
      
// //       Android App: Our Android app is provided as a convenience. The same terms apply to your use of the app.
      
// //       Changes: We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.
      
// //       Governing Law: These terms shall be governed by the laws of [Your Country/State].
      
// //       If you have any questions, please contact us.
// //     `;
// //     voiceManager.speak(text, true);
// //   };

// //   return (
// //     <>
// //       <Head>
// //         <title>Terms of Service – Movie & TV trailers</title>
// //         <meta name="description" content="Read the terms and conditions for using Movie & TV trailers, including our Android app." />
// //         <meta name="keywords" content="terms of service, terms, conditions, legal, Android app terms" />
// //         <meta property="og:title" content="Terms of Service – Movie & TV trailers" />
// //         <meta property="og:description" content="Legal terms governing your use of Movie & TV trailers." />
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
// //               <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
// //               <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
// //                 Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Service</span>
// //               </h1>
// //               <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
// //                 Please read these terms carefully before using our platform.
// //               </p>
// //             </div>

// //             <div className="prose prose-lg mx-auto dark:prose-invert">
// //               <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// //               <p>By accessing or using Movie & TV trailers, you agree to be bound by these Terms of Service. If you disagree, please do not use the service.</p>

// //               <h2>1. Content</h2>
// //               <p>All content provided on Movie & TV trailers is for informational and entertainment purposes only. We do not host any files; we only link to third‑party services. We are not responsible for the accuracy or legality of external content.</p>

// //               <h2>2. Intellectual Property</h2>
// //               <p>The Movie & TV trailers name and logo are our trademarks. Other trademarks are property of their respective owners.</p>

// //               <h2>3. Android App</h2>
// //               <p>Our Android app is provided as a convenience. The same terms apply to your use of the app. You may download it from our website at mediastream.example/download.</p>

// //               <h2>4. Limitation of Liability</h2>
// //               <p>We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

// //               <h2>5. Changes</h2>
// //               <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.</p>

// //               <h2>6. Governing Law</h2>
// //               <p>These terms shall be governed by the laws of [Your Country/State].</p>

// //               <p>If you have any questions, please <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>.</p>
// //             </div>

// //             {/* Android App Callout */}
// //             <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
// //               <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
// //               <p className="text-slate-600 dark:text-slate-300 mb-6">
// //                 Download the official Movie & TV trailers Android app for the best mobile experience.
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
// import { GetStaticProps } from 'next';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { voiceManager } from '../lib/core/VoiceManager';
// import { Volume2, ArrowLeft, Download } from 'lucide-react';

// interface Props {
//   buildDateString: string; // Pre‑formatted date from server
// }

// export default function TermsPage({ buildDateString }: Props) {
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
//       voiceManager.speak("You are on the Terms of Service page. Click the speaker icon to hear our terms and conditions, including information about our Android app.");
//     }
//   };

//   // Auto‑speak after page load (1.5 second delay)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       readPageContent();
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>Terms of Service – Movie & TV trailers</title>
//         <meta name="description" content="Read the terms and conditions for using Movie & TV trailers, including our Android app." />
//         <meta name="keywords" content="terms of service, terms, conditions, legal, Android app terms" />
//         <meta property="og:title" content="Terms of Service – Movie & TV trailers" />
//         <meta property="og:description" content="Legal terms governing your use of Movie & TV trailers." />
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
//               Terms of Service for Movie & TV trailers.
//               Last updated: {buildDateString}.
//               By accessing or using our service, you agree to be bound by these Terms.
//               Content: All content provided on Movie & TV trailers is for informational and entertainment purposes only. We do not host any files; we only link to third‑party services. We are not responsible for the accuracy or legality of external content.
//               Intellectual Property: The Movie & TV trailers name and logo are our trademarks. Other trademarks are property of their respective owners.
//               Limitation of Liability: We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
//               Android App: Our Android app is provided as a convenience. The same terms apply to your use of the app.
//               Changes: We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.
//               Governing Law: These terms shall be governed by the laws of [Your Country/State].
//               If you have any questions, please contact us.
//             </p>

//             <div className="text-center mb-16 relative">
//               <button 
//                 onClick={readPageContent}
//                 className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
//                 title="Read Full Content"
//               >
//                 <Volume2 size={20} />
//               </button>
//               <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
//               <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
//                 Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Service</span>
//               </h1>
//               <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
//                 Please read these terms carefully before using our platform.
//               </p>
//             </div>

//             <div className="prose prose-lg mx-auto dark:prose-invert">
//               {/* Use server‑generated date for hydration consistency */}
//               <p>Last updated: {buildDateString}</p>
//               <p>By accessing or using Movie & TV trailers, you agree to be bound by these Terms of Service. If you disagree, please do not use the service.</p>

//               <h2>1. Content</h2>
//               <p>All content provided on Movie & TV trailers is for informational and entertainment purposes only. We do not host any files; we only link to third‑party services. We are not responsible for the accuracy or legality of external content.</p>

//               <h2>2. Intellectual Property</h2>
//               <p>The Movie & TV trailers name and logo are our trademarks. Other trademarks are property of their respective owners.</p>

//               <h2>3. Android App</h2>
//               <p>Our Android app is provided as a convenience. The same terms apply to your use of the app. You may download it from our website.</p>

//               <h2>4. Limitation of Liability</h2>
//               <p>We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

//               <h2>5. Changes</h2>
//               <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.</p>

//               <h2>6. Governing Law</h2>
//               <p>These terms shall be governed by the laws of [Your Country/State].</p>

//               <p>If you have any questions, please <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>.</p>
//             </div>

//             {/* Android App Callout */}
//             <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
//               <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
//               <p className="text-slate-600 dark:text-slate-300 mb-6">
//                 Download the official Movie & TV trailers Android app for the best mobile experience.
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

// export const getStaticProps: GetStaticProps = async () => {
//   // Generate the date on the server using a fixed locale (en-GB)
//   const buildDateString = new Date().toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });

//   return {
//     props: { buildDateString },
//     revalidate: 3600, // optional, revalidate every hour if desired
//   };
// };







import React, { useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
// ✅ FIX: no top-level voiceManager import
import { Volume2, ArrowLeft, Download } from 'lucide-react';

interface Props {
  buildDateString: string;
}

export default function TermsPage({ buildDateString }: Props) {
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
        getPageText() || 'You are on the Terms of Service page.',
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

  return (
    <>
      <Head>
        <title>Terms of Service – Movie &amp; TV trailers</title>
        <meta name="description" content="Read the terms and conditions for using Movie & TV trailers, including our Android app." />
        <meta name="keywords" content="terms of service, terms, conditions, legal, Android app terms" />
        <meta property="og:title" content="Terms of Service – Movie & TV trailers" />
        <meta property="og:description" content="Legal terms governing your use of Movie & TV trailers." />
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
              Terms of Service for Movie & TV trailers.
              Last updated: {buildDateString}.
              By accessing or using our service, you agree to be bound by these Terms.
              Content: All content provided on Movie & TV trailers is for informational and entertainment purposes only. We do not host any files; we only link to third‑party services. We are not responsible for the accuracy or legality of external content.
              Intellectual Property: The Movie & TV trailers name and logo are our trademarks. Other trademarks are property of their respective owners.
              Limitation of Liability: We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
              Android App: Our Android app is provided as a convenience. The same terms apply to your use of the app.
              Changes: We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.
              Governing Law: These terms shall be governed by the laws of [Your Country/State].
              If you have any questions, please contact us.
            </p>


            <div className="text-center mb-16 relative">
              <button
                onClick={readPageContent}
                className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                title="Read Full Content"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Service</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Please read these terms carefully before using our platform.
              </p>
            </div>

            <div className="prose prose-lg mx-auto dark:prose-invert">
              <p>Last updated: {buildDateString}</p>
              <p>By accessing or using Movie &amp; TV trailers, you agree to be bound by these Terms of Service. If you disagree, please do not use the service.</p>

              <h2>1. Content</h2>
              <p>All content provided on Movie &amp; TV trailers is for informational and entertainment purposes only. We do not host any files; we only link to third‑party services. We are not responsible for the accuracy or legality of external content.</p>

              <h2>2. Intellectual Property</h2>
              <p>The Movie &amp; TV trailers name and logo are our trademarks. Other trademarks are property of their respective owners.</p>

              <h2>3. Android App</h2>
              <p>Our Android app is provided as a convenience. The same terms apply to your use of the app. You may download it from our website.</p>

              <h2>4. Limitation of Liability</h2>
              <p>We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

              <h2>5. Changes</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.</p>

              <h2>6. Governing Law</h2>
              <p>These terms shall be governed by the applicable laws of your jurisdiction.</p>

              <p>If you have any questions, please <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>.</p>
            </div>

            <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-3xl border border-green-200 dark:border-green-500/20 text-center">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Get Our Android App</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Download the official Movie &amp; TV trailers Android app for the best mobile experience.
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

export const getStaticProps: GetStaticProps = async () => {
  const buildDateString = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return { props: { buildDateString }, revalidate: 3600 };
};