import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { voiceManager } from '../lib/core/VoiceManager';
import { Volume2, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    voiceManager.speak("You are on the Privacy Policy page. Click the speaker icon to hear how we protect your data.");
  }, []);

  const readPageContent = () => {
    const text = `
      Privacy Policy for Movie & TV trailers.
      
      Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
      
      Your privacy is important to us. This policy explains what information we collect and how we use it.
      
      Information Collection: We do not collect any personally identifiable information unless you voluntarily provide it (e.g., through our contact form). We may collect non‑personal data such as browser type, device, and pages visited to improve our service.
      
      Cookies: We use cookies to enhance your experience. You can disable cookies in your browser settings.
      
      Third‑Party Links: Our site contains links to external sites. We are not responsible for their privacy practices.
      
      Data Security: We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.
      
      Children's Privacy: Our service is not directed to children under 13. We do not knowingly collect information from children.
      
      Changes to This Policy: We may update this policy from time to time. Changes will be posted on this page.
      
      Contact Us: If you have any questions, please contact us through our contact page.
    `;
    voiceManager.speak(text, true);
  };

    const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy – Movie & TV trailers",
    "description": "Movie & TV trailers's privacy policy – how we handle your data and protect your privacy.",
    "url": "https://movie-tv-trailers.vercel.app/privacy"
  };

  return (
    <>
           <Head>
        <title>Privacy Policy – Movie & TV trailers</title>
        <meta name="description" content="Movie & TV trailers's privacy policy – how we handle your data and protect your privacy." />
        <meta name="keywords" content="privacy policy, data protection, cookies" />
        <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
        <meta property="og:title" content="Privacy Policy – Movie & TV trailers" />
        <meta property="og:description" content="Learn how Movie & TV trailers protects your personal information." />
        <meta property="og:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://movie-tv-trailers.vercel.app/privacy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy – Movie & TV trailers" />
        <meta name="twitter:description" content="Learn how we protect your data." />
        <meta name="twitter:image" content="https://movie-tv-trailers.vercel.app/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }} />
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
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Your Data</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Policy</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                How we collect, use, and protect your information.
              </p>
            </div>

            <div className="prose prose-lg mx-auto dark:prose-invert">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>Your privacy is important to us. This policy explains what information we collect and how we use it.</p>

              <h2>Information Collection</h2>
              <p>We do not collect any personally identifiable information unless you voluntarily provide it (e.g., through our contact form). We may collect non‑personal data such as browser type, device, and pages visited to improve our service.</p>

              <h2>Cookies</h2>
              <p>We use cookies to enhance your experience. You can disable cookies in your browser settings.</p>

              <h2>Third‑Party Links</h2>
              <p>Our site contains links to external sites. We are not responsible for their privacy practices.</p>

              <h2>Data Security</h2>
              <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

              <h2>Children's Privacy</h2>
              <p>Our service is not directed to children under 13. We do not knowingly collect information from children.</p>

              <h2>Changes to This Policy</h2>
              <p>We may update this policy from time to time. Changes will be posted on this page.</p>

              <h2>Contact Us</h2>
              <p>If you have any questions, please <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>.</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}