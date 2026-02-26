import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { voiceManager } from '../lib/core/VoiceManager';
import { Volume2, ArrowLeft, Download } from 'lucide-react';

export default function DMCAPage() {
  const router = useRouter();

  useEffect(() => {
    voiceManager.speak("You are on the DMCA page. Click the speaker icon to hear our copyright compliance information and about our Android app.");
  }, []);

  const readPageContent = () => {
    const text = `
      DMCA Compliance for Movie & TV trailers.
      
      Movie & TV trailers respects the intellectual property rights of others and expects its users to do the same.
      
      We do not host any content on our servers. All videos are embedded from third‑party services. However, if you believe that any material available on or through the site infringes your copyright, you may submit a DMCA notification.
      
      How to Submit a Claim:
      Please send an email to dmca@mediastream.example with the following information:
      • Your contact information (name, address, phone, email).
      • Identification of the copyrighted work you claim has been infringed.
      • The URL of the infringing material on our site.
      • A statement that you have a good‑faith belief that use is not authorized.
      • A statement, under penalty of perjury, that the information is accurate and you are the rights owner.
      • Your physical or electronic signature.
      
      We will respond promptly to valid DMCA requests and remove or disable access to the material.
      
      Our Android app, available at our website, is also subject to this policy.
    `;
    voiceManager.speak(text, true);
  };

  const dmcaSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DMCA – Movie & TV trailers",
    "description": "Digital Millennium Copyright Act notice and takedown procedure for Movie & TV trailers, including our Android app.",
    "url": "https://movie-tv-trailers.vercel.app/dmca"
  };

  return (
    <>
           <Head>
        <title>DMCA – Movie & TV trailers</title>
        <meta name="description" content="Digital Millennium Copyright Act notice and takedown procedure for Movie & TV trailers, including our Android app." />
        <meta name="keywords" content="DMCA, copyright infringement, takedown, Android app" />
        <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
        <meta property="og:title" content="DMCA – Movie & TV trailers" />
        <meta property="og:description" content="How to report copyright infringement on Movie & TV trailers." />
        <meta property="og:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://movie-tv-trailers.vercel.app/dmca" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DMCA – Movie & TV trailers" />
        <meta name="twitter:description" content="How to report copyright infringement." />
        <meta name="twitter:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dmcaSchema) }} />
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
            <div className="text-center mb-16 relative">
              <button 
                onClick={readPageContent}
                className="absolute top-0 right-0 md:-right-12 p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                title="Read Full Content"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Copyright</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                DMCA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Compliance</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                How to report copyright infringement on Movie & TV trailers.
              </p>
            </div>

            <div className="prose prose-lg mx-auto dark:prose-invert">
              <p>Movie & TV trailers respects the intellectual property rights of others and expects its users to do the same.</p>
              <p>We do not host any content on our servers. All videos are embedded from third‑party services. However, if you believe that any material available on or through the site infringes your copyright, you may submit a DMCA notification.</p>

              <h2>How to Submit a Claim</h2>
              <p>Please send an email to <strong>dmca@mediastream.example</strong> with the following information:</p>
              <ul>
                <li>Your contact information (name, address, phone, email).</li>
                <li>Identification of the copyrighted work you claim has been infringed.</li>
                <li>The URL of the infringing material on our site.</li>
                <li>A statement that you have a good‑faith belief that use is not authorized.</li>
                <li>A statement, under penalty of perjury, that the information is accurate and you are the rights owner.</li>
                <li>Your physical or electronic signature.</li>
              </ul>
              <p>We will respond promptly to valid DMCA requests and remove or disable access to the material. This policy also applies to our Android app.</p>
            </div>

            {/* Android App Callout */}
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