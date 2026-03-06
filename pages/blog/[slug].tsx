// // import React, { useEffect, useState, useCallback } from 'react';
// // import Link from 'next/link';
// // import { GetStaticProps, GetStaticPaths } from 'next';
// // import { useRouter } from 'next/router';
// // import {
// //   Calendar,
// //   User,
// //   Tag,
// //   ArrowLeft,
// //   Volume2,
// //   VolumeX,
// //   Share2,
// //   X,
// //   Copy,
// //   Check,
// // } from 'lucide-react';

// // import SEO from '../../components/SEO';
// // import { blogPosts } from '../../data/blogPosts';
// // import { BlogPost } from '../../types';

// // // ========== IMPORT THE AUDIO/TTS MODULES ==========
// // import { voiceManager } from '../../lib/core/VoiceManager';
// // import { musicController } from '../../lib/core/MusicController';
// // import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

// // interface Props {
// //   post: BlogPost;
// //   relatedPosts: BlogPost[];
// // }

// // const BlogPostPage: React.FC<Props> = ({ post, relatedPosts }) => {
// //   const router = useRouter();
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const [isShareOpen, setIsShareOpen] = useState(false);
// //   const [copiedLink, setCopiedLink] = useState(false);

// //   // Background music ID for blog post page
// //   const getBgMusicId = useCallback((): string | null => {
// //     return DEFAULT_BG_MUSIC_IDS.blog || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
// //   }, []);

// //   // Stop music on unmount
// //   useEffect(() => {
// //     return () => {
// //       voiceManager.stopBackgroundMusic();
// //       musicController.setCurrentMusicId(null);
// //     };
// //   }, []);

// //   // Unlock audio on first user interaction
// //   useEffect(() => {
// //     const unlockOnce = () => {
// //       voiceManager.onUserInteraction();
// //       document.removeEventListener('click', unlockOnce);
// //     };
// //     document.addEventListener('click', unlockOnce);
// //     return () => document.removeEventListener('click', unlockOnce);
// //   }, []);

// //   // Build spoken description of the blog post
// //   const buildSpeakText = (): string => {
// //     const date = new Date(post.date).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //     });
// //     return `${post.title}. ${post.excerpt} Written by ${post.author} on ${date}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
// //   };

// //   // TTS: play/stop toggle
// //   const handleSpeakerClick = () => {
// //     if (isSpeaking) {
// //       voiceManager.cancelSpeech();
// //       voiceManager.stopBackgroundMusic();
// //       setIsSpeaking(false);
// //     } else {
// //       const videoId = getBgMusicId();
// //       if (videoId) {
// //         voiceManager.playBackgroundMusic(videoId);
// //         musicController.setCurrentMusicId(videoId);
// //       } else {
// //         console.warn('No background music ID for blog post page');
// //       }
// //       const speakText = buildSpeakText();
// //       voiceManager.speak(speakText, true, true, () => {
// //         voiceManager.stopBackgroundMusic();
// //         setIsSpeaking(false);
// //       });
// //       setIsSpeaking(true);
// //     }
// //   };

// //   // Copy link to clipboard
// //   const handleCopyLink = () => {
// //     if (typeof window !== 'undefined') {
// //       navigator.clipboard.writeText(window.location.href);
// //       setCopiedLink(true);
// //       setTimeout(() => setCopiedLink(false), 2000);
// //     }
// //   };

// //   if (router.isFallback) {
// //     return (
// //       <div className="min-h-screen bg-miraj-black text-white flex items-center justify-center">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   const formattedDate = (() => {
// //     try {
// //       return new Date(post.date).toLocaleDateString('en-US', {
// //         year: 'numeric',
// //         month: 'long',
// //         day: 'numeric',
// //       });
// //     } catch {
// //       return post.date;
// //     }
// //   })();

// //   const articleSchema = {
// //     '@context': 'https://schema.org',
// //     '@type': 'BlogPosting',
// //     headline: post.title,
// //     description: post.excerpt,
// //     image: post.image,
// //     datePublished: post.date,
// //     author: { '@type': 'Person', name: post.author },
// //     publisher: {
// //       '@type': 'Organization',
// //       name: 'Movie & TV trailers',
// //       logo: { '@type': 'ImageObject', url: 'https://movie-tv-trailers.vercel.app/logo.png' },
// //     },
// //     mainEntityOfPage: { '@type': 'WebPage', '@id': `https://movie-tv-trailers.vercel.app/blog/${post.slug}` },
// //   };

// //   return (
// //     <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">
// //       {/* Read Aloud button (fixed) */}
// //       <button
// //         onClick={handleSpeakerClick}
// //         className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 font-semibold ${
// //           isSpeaking
// //             ? 'bg-red-600 text-white hover:bg-red-700'
// //             : 'bg-yellow-400 text-black hover:bg-yellow-500'
// //         }`}
// //         title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
// //       >
// //         {isSpeaking ? <VolumeX size={22} /> : <Volume2 size={22} />}
// //         <span className="text-sm">Read Aloud</span>
// //       </button>

// //       {/* Share Modal */}
// //       {isShareOpen && (
// //         <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
// //           <div className="bg-miraj-gray border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
// //             <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
// //               <h3 className="text-lg font-bold text-white flex items-center gap-2">Share this post</h3>
// //               <button onClick={() => setIsShareOpen(false)}>
// //                 <X size={24} className="text-gray-400 hover:text-white" />
// //               </button>
// //             </div>
// //             <div className="p-6">
// //               <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
// //                 <input
// //                   className="bg-transparent text-gray-300 text-sm flex-1 outline-none"
// //                   readOnly
// //                   value={typeof window !== 'undefined' ? window.location.href : ''}
// //                 />
// //                 <button
// //                   onClick={handleCopyLink}
// //                   className="p-2 bg-white/10 rounded hover:bg-white/20 transition"
// //                 >
// //                   {copiedLink ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-white" />}
// //                 </button>
// //               </div>
// //               <p className="text-xs text-gray-500 mt-4 text-center">
// //                 {copiedLink ? 'Link copied!' : 'Click the copy button to share'}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <SEO
// //         title={`${post.title} – Movie & TV trailers Blog`}
// //         description={post.excerpt}
// //         schema={articleSchema}
// //         path={`/blog/${post.slug}`}
// //         image={post.image}
// //       />

// //       <div className="container mx-auto px-4 md:px-6 max-w-4xl">
// //         <div className="flex justify-between items-center mb-8">
// //           <Link
// //             href="/blog"
// //              className='flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-black/95 backdrop-blur-md rounded-lg sm:rounded-xl border-2 border-white/20 sm:border hover:bg-red-600 text-white transition-all duration-300 shadow-2xl hover:shadow-2xl hover:scale-105 active:scale-95 group touch-manipulation min-h-[48px] sm:min-h-0'
// //           >
// //             <ArrowLeft size={18} /> Blog
// //           </Link>
// //         </div>

// //         <article className="bg-miraj-gray border border-white/5 rounded-2xl p-6 md:p-10">
// //           <div className="aspect-video mb-8 overflow-hidden rounded-xl bg-black/40">
// //             {post.videoId ? (
// //               <iframe
// //                 src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&mute=1&loop=1&playlist=${post.videoId}&rel=0`}
// //                 className="w-full h-full"
// //                 allow="autoplay; fullscreen"
// //                 allowFullScreen
// //                 title={post.title}
// //               />
// //             ) : (
// //               <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
// //             )}
// //           </div>

// //           <div className="flex justify-between items-start flex-wrap gap-4">
// //             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
// //               <span className="flex items-center gap-1">
// //                 <Calendar size={14} /> {formattedDate}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <User size={14} /> {post.author}
// //               </span>
// //               {post.tags?.map((tag) => (
// //                 <span key={tag} className="flex items-center gap-1">
// //                   <Tag size={14} /> {tag}
// //                 </span>
// //               ))}
// //             </div>

// //             {/* Share button inside the content area */}
// //             <button
// //               onClick={() => setIsShareOpen(true)}
// //               className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-miraj-gold hover:text-black transition-colors border border-white/5"
// //             >
// //               <Share2 size={18} />
// //               <span className="hidden sm:inline font-bold text-sm">Share</span>
// //             </button>
// //           </div>

// //           <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
// //             {post.title}
// //           </h1>

// //           <div
// //             className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
// //             dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
// //           />
// //         </article>

// //         {relatedPosts.length > 0 && (
// //           <section className="mt-12">
// //             <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               {relatedPosts.map((related) => (
// //                 <Link key={related.id} href={`/blog/${related.slug}`}>
// //                   <div className="bg-miraj-gray border border-white/5 rounded-xl overflow-hidden hover:border-miraj-gold/30 transition-all cursor-pointer">
// //                     <div className="aspect-video bg-black/40">
// //                       <img
// //                         src={related.image}
// //                         alt={related.title}
// //                         className="w-full h-full object-cover"
// //                         loading="lazy"
// //                       />
// //                     </div>
// //                     <div className="p-4">
// //                       <h3 className="font-bold text-white line-clamp-2">{related.title}</h3>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           </section>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   const paths = blogPosts.map((post) => ({ params: { slug: post.slug } }));
// //   return { paths, fallback: false };
// // };

// // export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
// //   const slug = params?.slug as string;
// //   const post = blogPosts.find((p) => p.slug === slug);
// //   if (!post) return { notFound: true };

// //   const relatedPosts = blogPosts
// //     .filter(
// //       (p) =>
// //         p.id !== post.id &&
// //         p.tags?.some((tag) => post.tags?.includes(tag))
// //     )
// //     .slice(0, 3);

// //   return {
// //     props: { post, relatedPosts },
// //     revalidate: 3600,
// //   };
// // };

// // export default BlogPostPage;










// import React, { useEffect, useState, useCallback } from 'react';
// import Link from 'next/link';
// import { GetStaticProps, GetStaticPaths } from 'next';
// import { useRouter } from 'next/router';
// import {
//   Calendar,
//   User,
//   Tag,
//   ArrowLeft,
//   Volume2,
//   VolumeX,
//   Share2,
//   X,
//   Copy,
//   Check,
//   ArrowRight,
// } from 'lucide-react';

// import SEO from '../../components/SEO';
// import { blogPosts } from '../../data/blogPosts';
// import { BlogPost } from '../../types';

// // ========== IMPORT THE AUDIO/TTS MODULES ==========
// import { voiceManager } from '../../lib/core/VoiceManager';
// import { musicController } from '../../lib/core/MusicController';
// import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

// /* ─── Translation-safe style helpers ──────────────────────────────────────── */
// const TEXT_SAFE: React.CSSProperties = {
//   overflowWrap: 'anywhere',
//   wordBreak: 'break-word',
//   hyphens: 'auto',
//   minWidth: 0,
// };

// function fluidFont(minPx: number, maxPx: number): React.CSSProperties {
//   const slope = (maxPx - minPx) / (1280 - 320);
//   const intercept = minPx - slope * 320;
//   return {
//     fontSize: `clamp(${minPx}px, calc(${intercept.toFixed(2)}px + ${(slope * 100).toFixed(4)}vw), ${maxPx}px)`,
//     ...TEXT_SAFE,
//   };
// }

// interface Props {
//   post: BlogPost;
//   relatedPosts: BlogPost[];
// }

// const BlogPostPage: React.FC<Props> = ({ post, relatedPosts }) => {
//   const router = useRouter();
//   const [isSpeaking, setIsSpeaking]   = useState(false);
//   const [isShareOpen, setIsShareOpen] = useState(false);
//   const [copiedLink, setCopiedLink]   = useState(false);

//   const getBgMusicId = useCallback((): string | null => {
//     return DEFAULT_BG_MUSIC_IDS.blog || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies;
//   }, []);

//   useEffect(() => {
//     return () => {
//       voiceManager.stopBackgroundMusic();
//       musicController.setCurrentMusicId(null);
//     };
//   }, []);

//   useEffect(() => {
//     const unlockOnce = () => {
//       voiceManager.onUserInteraction();
//       document.removeEventListener('click', unlockOnce);
//     };
//     document.addEventListener('click', unlockOnce);
//     return () => document.removeEventListener('click', unlockOnce);
//   }, []);

//   const buildSpeakText = (): string => {
//     const date = new Date(post.date).toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric',
//     });
//     return `${post.title}. ${post.excerpt} Written by ${post.author} on ${date}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
//   };

//   const handleSpeakerClick = () => {
//     if (isSpeaking) {
//       voiceManager.cancelSpeech();
//       voiceManager.stopBackgroundMusic();
//       setIsSpeaking(false);
//     } else {
//       const videoId = getBgMusicId();
//       if (videoId) {
//         voiceManager.playBackgroundMusic(videoId);
//         musicController.setCurrentMusicId(videoId);
//       } else {
//         console.warn('No background music ID for blog post page');
//       }
//       voiceManager.speak(buildSpeakText(), true, true, () => {
//         voiceManager.stopBackgroundMusic();
//         setIsSpeaking(false);
//       });
//       setIsSpeaking(true);
//     }
//   };

//   const handleCopyLink = () => {
//     if (typeof window !== 'undefined') {
//       navigator.clipboard.writeText(window.location.href);
//       setCopiedLink(true);
//       setTimeout(() => setCopiedLink(false), 2000);
//     }
//   };

//   if (router.isFallback) {
//     return (
//       <div
//         className="min-h-screen text-white flex items-center justify-center"
//         style={{ background: '#080808' }}
//       >
//         <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   const formattedDate = (() => {
//     try {
//       return new Date(post.date).toLocaleDateString('en-US', {
//         year: 'numeric', month: 'long', day: 'numeric',
//       });
//     } catch { return post.date; }
//   })();

//   const articleSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'BlogPosting',
//     headline: post.title,
//     description: post.excerpt,
//     image: post.image,
//     datePublished: post.date,
//     author: { '@type': 'Person', name: post.author },
//     publisher: {
//       '@type': 'Organization',
//       name: 'Movie & TV trailers',
//       logo: { '@type': 'ImageObject', url: 'https://movie-tv-trailers.vercel.app/logo.png' },
//     },
//     mainEntityOfPage: {
//       '@type': 'WebPage',
//       '@id': `https://movie-tv-trailers.vercel.app/blog/${post.slug}`,
//     },
//   };

//   return (
//     <div
//       className="min-h-screen pt-24 pb-20 relative"
//       style={{ background: 'linear-gradient(160deg,#080808 0%,#0d0d0d 50%,#090b10 100%)' }}
//     >
//       {/* Subtle dot-grid texture */}
//       <div
//         aria-hidden
//         style={{
//           position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
//           backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
//           backgroundSize: '28px 28px',
//         }}
//       />

//       {/* ── Read Aloud FAB ───────────────────────────────────────────── */}
//       <button
//         onClick={handleSpeakerClick}
//         className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 font-semibold touch-manipulation ${
//           isSpeaking ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-yellow-400 text-black hover:bg-yellow-500'
//         }`}
//         style={{ padding: 'clamp(10px,2.5vw,14px) clamp(14px,4vw,20px)', minHeight: 48, minWidth: 48 }}
//         title={isSpeaking ? 'Stop reading and music' : 'Read page description aloud with background music'}
//       >
//         {isSpeaking ? <VolumeX size={20} className="shrink-0" /> : <Volume2 size={20} className="shrink-0" />}
//         <span style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}>Read Aloud</span>
//       </button>

//       {/* ── Share Modal ─────────────────────────────────────────────── */}
//       {isShareOpen && (
//         <div
//           className="fixed inset-0 z-[150] flex items-center justify-center p-4"
//           style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
//         >
//           <div
//             className="w-full border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
//             style={{ maxWidth: `min(440px,96vw)`, background: '#111' }}
//           >
//             {/* Modal header */}
//             <div
//               className="flex items-center justify-between border-b border-white/8"
//               style={{ padding: 'clamp(14px,3vw,20px) clamp(16px,4vw,24px)', background: 'rgba(0,0,0,0.5)' }}
//             >
//               <h3
//                 className="font-black text-white flex items-center gap-2"
//                 style={{ ...fluidFont(14, 18), ...TEXT_SAFE }}
//               >
//                 <Share2 size={16} className="shrink-0 text-red-500" />
//                 Share this post
//               </h3>
//               <button
//                 onClick={() => setIsShareOpen(false)}
//                 className="p-1 rounded-full hover:bg-white/10 transition-colors"
//                 aria-label="Close share modal"
//               >
//                 <X size={22} className="text-gray-400 hover:text-white" />
//               </button>
//             </div>

//             {/* Modal body */}
//             <div style={{ padding: 'clamp(16px,4vw,28px)' }}>
//               <p className="text-gray-500 mb-4" style={{ ...fluidFont(11, 13), ...TEXT_SAFE }}>
//                 Copy the link below to share this post
//               </p>
//               <div
//                 className="flex items-center gap-2 border border-white/10 rounded-xl overflow-hidden"
//                 style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 8px 8px 14px' }}
//               >
//                 <input
//                   className="bg-transparent flex-1 outline-none text-gray-300"
//                   style={{ ...fluidFont(11, 13), ...TEXT_SAFE, minWidth: 0 }}
//                   readOnly
//                   value={typeof window !== 'undefined' ? window.location.href : ''}
//                 />
//                 <button
//                   onClick={handleCopyLink}
//                   className={`flex items-center gap-1 rounded-lg font-bold transition-all shrink-0 ${
//                     copiedLink
//                       ? 'bg-green-600 text-white'
//                       : 'bg-white/10 text-white hover:bg-white/20'
//                   }`}
//                   style={{ padding: '8px 14px', ...fluidFont(11, 13) }}
//                 >
//                   {copiedLink
//                     ? <><Check size={14} className="shrink-0" /> Copied!</>
//                     : <><Copy size={14} className="shrink-0" /> Copy</>}
//                 </button>
//               </div>
//               {copiedLink && (
//                 <p
//                   className="text-green-500 text-center font-bold mt-3"
//                   style={{ ...fluidFont(11, 13), ...TEXT_SAFE }}
//                 >
//                   ✓ Link copied to clipboard!
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <SEO
//         title={`${post.title} – Movie & TV trailers Blog`}
//         description={post.excerpt}
//         schema={articleSchema}
//         path={`/blog/${post.slug}`}
//         image={post.image}
//       />

//       <div
//         className="relative z-10 container mx-auto"
//         style={{
//           paddingLeft: 'clamp(12px,4vw,24px)',
//           paddingRight: 'clamp(12px,4vw,24px)',
//           maxWidth: '52rem',
//         }}
//       >
//         {/* ── Back nav ────────────────────────────────────────────────── */}
//         <div style={{ marginBottom: 'clamp(16px,3vw,28px)' }}>
//           <Link
//             href="/blog"
//             className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-colors group"
//             style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}
//           >
//             <ArrowLeft
//               size={16}
//               className="shrink-0 transition-transform group-hover:-translate-x-1"
//             />
//             <span style={TEXT_SAFE}>Back to Blog</span>
//           </Link>
//         </div>

//         {/* ── Article ─────────────────────────────────────────────────── */}
//         <article
//           className="rounded-2xl overflow-hidden border border-white/6"
//           style={{ background: 'rgba(255,255,255,0.022)' }}
//         >
//           {/* Hero media */}
//           <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
//             {post.videoId ? (
//               <iframe
//                 src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&mute=1&loop=1&playlist=${post.videoId}&rel=0`}
//                 className="w-full h-full"
//                 allow="autoplay; fullscreen"
//                 allowFullScreen
//                 title={post.title}
//                 style={{ border: 'none', display: 'block' }}
//               />
//             ) : (
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>

//           {/* Article body */}
//           <div style={{ padding: 'clamp(16px,5vw,40px)' }}>
//             {/* Tags */}
//             {post.tags && post.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2" style={{ marginBottom: 'clamp(12px,2vw,18px)' }}>
//                 {post.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="flex items-center gap-1 text-red-400 font-bold uppercase border border-red-500/25 rounded-full bg-red-500/8"
//                     style={{ padding: '4px 12px', ...fluidFont(8, 10), letterSpacing: '0.1em', ...TEXT_SAFE }}
//                   >
//                     <Tag size={10} className="shrink-0" />
//                     <span style={TEXT_SAFE}>{tag}</span>
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Title + Share row */}
//             <div
//               className="flex items-start justify-between gap-4 flex-wrap"
//               style={{ marginBottom: 'clamp(12px,2vw,20px)', minWidth: 0 }}
//             >
//               <h1
//                 className="font-black text-white leading-tight flex-1"
//                 style={{ ...fluidFont(20, 38), ...TEXT_SAFE }}
//               >
//                 {post.title}
//               </h1>
//               <button
//                 onClick={() => setIsShareOpen(true)}
//                 className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-500/15 hover:border-red-500/30 text-gray-300 hover:text-white font-bold transition-all shrink-0"
//                 style={{ padding: 'clamp(8px,2vw,10px) clamp(12px,3vw,18px)', ...fluidFont(12, 14) }}
//               >
//                 <Share2 size={15} className="shrink-0" />
//                 <span className="hidden sm:inline" style={TEXT_SAFE}>Share</span>
//               </button>
//             </div>

//             {/* Meta row */}
//             <div
//               className="flex items-center flex-wrap gap-4 border-b border-white/6 pb-5 mb-6"
//               style={{ ...fluidFont(11, 13), color: 'rgba(255,255,255,0.38)', ...TEXT_SAFE }}
//             >
//               <span className="flex items-center gap-1">
//                 <Calendar size={13} className="shrink-0" />
//                 <span style={TEXT_SAFE}>{formattedDate}</span>
//               </span>
//               <span className="flex items-center gap-1">
//                 <User size={13} className="shrink-0" />
//                 <span style={TEXT_SAFE}>{post.author}</span>
//               </span>
//             </div>

//             {/* Article content */}
//             <div
//               className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
//               style={{ ...fluidFont(14, 17) }}
//               dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
//             />
//           </div>
//         </article>

//         {/* ── Related posts ───────────────────────────────────────────── */}
//         {relatedPosts.length > 0 && (
//           <section style={{ marginTop: 'clamp(32px,6vw,56px)' }}>
//             {/* Section header */}
//             <div className="flex items-center gap-4" style={{ marginBottom: 'clamp(16px,3vw,28px)' }}>
//               <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
//               <h2
//                 className="font-black uppercase tracking-widest text-gray-500"
//                 style={{ ...fluidFont(9, 12), ...TEXT_SAFE }}
//               >
//                 Related Posts
//               </h2>
//               <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {relatedPosts.map((related) => (
//                 <Link
//                   key={related.id}
//                   href={`/blog/${related.slug}`}
//                   className="block group"
//                 >
//                   <div
//                     className="rounded-xl overflow-hidden border border-white/6 transition-all duration-300 hover:border-red-500/30 hover:-translate-y-1"
//                     style={{ background: 'rgba(255,255,255,0.022)' }}
//                   >
//                     <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                       <img
//                         src={related.image}
//                         alt={related.title}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         style={{ filter: 'brightness(0.7)' }}
//                         loading="lazy"
//                       />
//                       <div
//                         className="absolute inset-0"
//                         style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)' }}
//                       />
//                     </div>
//                     <div style={{ padding: 'clamp(10px,2.5vw,16px)' }}>
//                       <h3
//                         className="font-black text-white group-hover:text-red-400 transition-colors leading-snug"
//                         style={{
//                           ...fluidFont(12, 15), ...TEXT_SAFE,
//                           display: '-webkit-box', WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical', overflow: 'hidden',
//                           marginBottom: 8,
//                         }}
//                       >
//                         {related.title}
//                       </h3>
//                       <div
//                         className="flex items-center gap-1 text-red-500 font-bold group-hover:gap-2 transition-all"
//                         style={{ ...fluidFont(10, 12) }}
//                       >
//                         Read <ArrowRight size={12} className="shrink-0" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = blogPosts.map((post) => ({ params: { slug: post.slug } }));
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   const slug = params?.slug as string;
//   const post = blogPosts.find((p) => p.slug === slug);
//   if (!post) return { notFound: true };

//   const relatedPosts = blogPosts
//     .filter(
//       (p) =>
//         p.id !== post.id &&
//         p.tags?.some((tag) => post.tags?.includes(tag))
//     )
//     .slice(0, 3);

//   return { props: { post, relatedPosts }, revalidate: 3600 };
// };

// export default BlogPostPage;









import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import {
  Calendar, User, Tag, ArrowLeft, Volume2, VolumeX,
  Share2, X, Copy, Check, ArrowRight, Clock,
} from 'lucide-react';

import SEO from '../../components/SEO';
import { blogPosts } from '../../data/blogPosts';
import { BlogPost } from '../../types';

import { voiceManager } from '../../lib/core/VoiceManager';
import { musicController } from '../../lib/core/MusicController';
import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

/* ─── Translation-safe helpers ─────────────────────────────────────────────── */
const TEXT_SAFE: React.CSSProperties = {
  overflowWrap: 'anywhere', wordBreak: 'break-word', hyphens: 'auto', minWidth: 0,
};
function fluidFont(minPx: number, maxPx: number): React.CSSProperties {
  const slope = (maxPx - minPx) / 960;
  const intercept = minPx - slope * 320;
  return {
    fontSize: `clamp(${minPx}px, calc(${intercept.toFixed(2)}px + ${(slope * 100).toFixed(4)}vw), ${maxPx}px)`,
    ...TEXT_SAFE,
  };
}
function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
function fmtDateLong(d: string): string {
  try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
  catch { return d; }
}
function fmtDateShort(d: string): string {
  try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return d; }
}

interface Props { post: BlogPost; relatedPosts: BlogPost[]; }

const BlogPostPage: React.FC<Props> = ({ post, relatedPosts }) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking]   = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedLink, setCopiedLink]   = useState(false);

  const getBgMusicId = useCallback((): string | null =>
    DEFAULT_BG_MUSIC_IDS.blog || DEFAULT_BG_MUSIC_IDS.home || DEFAULT_BG_MUSIC_IDS.movies, []);

  useEffect(() => () => {
    voiceManager.stopBackgroundMusic();
    musicController.setCurrentMusicId(null);
  }, []);

  useEffect(() => {
    const u = () => { voiceManager.onUserInteraction(); document.removeEventListener('click', u); };
    document.addEventListener('click', u);
    return () => document.removeEventListener('click', u);
  }, []);

  const handleSpeakerClick = () => {
    if (isSpeaking) {
      voiceManager.cancelSpeech(); voiceManager.stopBackgroundMusic(); setIsSpeaking(false);
    } else {
      const vid = getBgMusicId();
      if (vid) { voiceManager.playBackgroundMusic(vid); musicController.setCurrentMusicId(vid); }
      voiceManager.speak(
        `${post.title}. ${post.excerpt} Written by ${post.author} on ${fmtDateLong(post.date)}.`,
        true, true, () => { voiceManager.stopBackgroundMusic(); setIsSpeaking(false); }
      );
      setIsSpeaking(true);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={{ background:'#080808' }}>
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const mins = post.content ? readingTime(post.content) : null;
  const postUrl = `https://movie-tv-trailers.vercel.app/blog/${post.slug}`;

  /* ── Schema: BlogPosting + BreadcrumbList ── */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': postUrl,
        headline: post.title,
        description: post.excerpt,
        image: { '@type': 'ImageObject', url: post.image, width: 1280, height: 720 },
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name: 'Movie & TV trailers',
          logo: { '@type': 'ImageObject', url: 'https://movie-tv-trailers.vercel.app/logo.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        keywords: post.tags?.join(', '),
        articleSection: post.category,
        wordCount: post.content
          ? post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length
          : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://movie-tv-trailers.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://movie-tv-trailers.vercel.app/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative"
      style={{ background:'linear-gradient(160deg,#080808 0%,#0d0d0d 50%,#090b10 100%)' }}>

      {/* Dot-grid texture */}
      <div aria-hidden style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage:'radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
      {/* Red glow blob */}
      <div aria-hidden style={{ position:'fixed', top:'-10%', right:'-5%', width:'40vw', height:'40vw',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle,rgba(230,57,70,0.07) 0%,transparent 70%)' }} />

      {/* ── Read Aloud FAB ── */}
      <button onClick={handleSpeakerClick}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-2xl font-semibold touch-manipulation transition-all duration-300 ${
          isSpeaking ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-yellow-400 text-black hover:bg-yellow-500'}`}
        style={{ padding:'clamp(10px,2.5vw,14px) clamp(14px,4vw,20px)', minHeight:48, minWidth:48 }}
        title={isSpeaking ? 'Stop reading and music' : 'Read aloud with background music'}>
        {isSpeaking ? <VolumeX size={20} className="shrink-0" /> : <Volume2 size={20} className="shrink-0" />}
        <span style={{ ...fluidFont(12,14), ...TEXT_SAFE }}>Read Aloud</span>
      </button>

      {/* ── Share Modal ── */}
      {isShareOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          style={{ background:'rgba(0,0,0,0.88)', backdropFilter:'blur(8px)' }}>
          <div className="w-full border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxWidth:'min(440px,96vw)', background:'#111' }}>
            <div className="flex items-center justify-between border-b border-white/8"
              style={{ padding:'clamp(14px,3vw,20px) clamp(16px,4vw,24px)', background:'rgba(0,0,0,0.5)' }}>
              <h3 className="font-black text-white flex items-center gap-2" style={{ ...fluidFont(14,18), ...TEXT_SAFE }}>
                <Share2 size={16} className="shrink-0 text-red-500" /> Share this article
              </h3>
              <button onClick={() => setIsShareOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Close">
                <X size={22} className="text-gray-400 hover:text-white" />
              </button>
            </div>
            <div style={{ padding:'clamp(16px,4vw,28px)' }}>
              <p className="text-gray-500 mb-4" style={{ ...fluidFont(11,13), ...TEXT_SAFE }}>Copy the link to share this article</p>
              <div className="flex items-center gap-2 border border-white/10 rounded-xl overflow-hidden"
                style={{ background:'rgba(255,255,255,0.04)', padding:'8px 8px 8px 14px' }}>
                <input className="bg-transparent flex-1 outline-none text-gray-300"
                  style={{ ...fluidFont(11,13), ...TEXT_SAFE, minWidth:0 }}
                  readOnly value={typeof window !== 'undefined' ? window.location.href : ''} />
                <button onClick={handleCopyLink}
                  className={`flex items-center gap-1 rounded-lg font-bold transition-all shrink-0 ${
                    copiedLink ? 'bg-green-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  style={{ padding:'8px 14px', ...fluidFont(11,13) }}>
                  {copiedLink ? <><Check size={14} className="shrink-0" /> Copied!</> : <><Copy size={14} className="shrink-0" /> Copy</>}
                </button>
              </div>
              {copiedLink && (
                <p className="text-green-500 text-center font-bold mt-3" style={{ ...fluidFont(11,13), ...TEXT_SAFE }}>
                  ✓ Link copied to clipboard!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <SEO
        title={`${post.title} | Movie & TV trailers Blog`}
        description={post.excerpt.slice(0, 155)}
        schema={articleSchema}
        path={`/blog/${post.slug}`}
        image={post.image}
      />

      <div className="relative z-10 container mx-auto"
        style={{ paddingLeft:'clamp(12px,4vw,24px)', paddingRight:'clamp(12px,4vw,24px)', maxWidth:'52rem' }}>

        {/* ── Breadcrumb (SEO + navigation) ── */}
        <nav className="flex items-center flex-wrap gap-2 mb-6" style={{ ...fluidFont(11,13), color:'rgba(255,255,255,0.35)', ...TEXT_SAFE }}
          aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors" style={TEXT_SAFE}>Home</Link>
          <span style={{ color:'rgba(255,255,255,0.2)' }}>/</span>
          <Link href="/blog" className="hover:text-white transition-colors" style={TEXT_SAFE}>Blog</Link>
          <span style={{ color:'rgba(255,255,255,0.2)' }}>/</span>
          <span className="text-gray-400 line-clamp-1" style={TEXT_SAFE}>{post.title}</span>
        </nav>

        {/* ── Back link ── */}
        <div style={{ marginBottom:'clamp(16px,3vw,28px)' }}>
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-colors group"
            style={{ ...fluidFont(12,14), ...TEXT_SAFE }}>
            <ArrowLeft size={16} className="shrink-0 transition-transform group-hover:-translate-x-1" />
            <span style={TEXT_SAFE}>Back to Blog</span>
          </Link>
        </div>

        {/* ── Article ── */}
        <article className="rounded-2xl overflow-hidden border border-white/6" style={{ background:'rgba(255,255,255,0.022)' }}
          itemScope itemType="https://schema.org/BlogPosting">

          {/* Hero media */}
          <div className="relative overflow-hidden" style={{ aspectRatio:'16/9' }}>
            {post.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&mute=1&loop=1&playlist=${post.videoId}&rel=0`}
                className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen title={post.title}
                style={{ border:'none', display:'block' }} />
            ) : (
              <img src={post.image} alt={post.title} className="w-full h-full object-cover"
                itemProp="image" />
            )}
          </div>

          {/* Body */}
          <div style={{ padding:'clamp(16px,5vw,40px)' }}>

            {/* Category + tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2" style={{ marginBottom:'clamp(12px,2vw,18px)' }}>
                {post.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 text-red-400 font-bold uppercase border border-red-500/25 rounded-full bg-red-500/8"
                    style={{ padding:'4px 12px', ...fluidFont(8,10), letterSpacing:'0.1em', ...TEXT_SAFE }}>
                    <Tag size={10} className="shrink-0" /><span style={TEXT_SAFE}>{t}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Title + share */}
            <div className="flex items-start justify-between gap-4 flex-wrap"
              style={{ marginBottom:'clamp(12px,2vw,20px)', minWidth:0 }}>
              <h1 className="font-black text-white leading-tight flex-1"
                style={{ ...fluidFont(20,38), ...TEXT_SAFE }} itemProp="headline">
                {post.title}
              </h1>
              <button onClick={() => setIsShareOpen(true)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-500/15 hover:border-red-500/30 text-gray-300 hover:text-white font-bold transition-all shrink-0"
                style={{ padding:'clamp(8px,2vw,10px) clamp(12px,3vw,18px)', ...fluidFont(12,14) }}>
                <Share2 size={15} className="shrink-0" />
                <span className="hidden sm:inline" style={TEXT_SAFE}>Share</span>
              </button>
            </div>

            {/* Meta bar */}
            <div className="flex items-center flex-wrap gap-4 border-b border-white/6 pb-5 mb-6"
              style={{ ...fluidFont(11,13), color:'rgba(255,255,255,0.38)', ...TEXT_SAFE }}>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="shrink-0" />
                <time dateTime={post.date} itemProp="datePublished" style={TEXT_SAFE}>{fmtDateLong(post.date)}</time>
              </span>
              <span className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                <User size={13} className="shrink-0" />
                <span itemProp="name" style={TEXT_SAFE}>{post.author}</span>
              </span>
              {mins && (
                <span className="flex items-center gap-1">
                  <Clock size={13} className="shrink-0" />
                  <span style={TEXT_SAFE}>{mins} min read</span>
                </span>
              )}
              {post.category && (
                <span className="border border-white/15 rounded-full font-bold uppercase"
                  style={{ padding:'2px 10px', ...fluidFont(8,10), letterSpacing:'0.1em', ...TEXT_SAFE }}>
                  {post.category}
                </span>
              )}
            </div>

            {/* Article content — blogPosts.js provides the full long-form HTML */}
            <div
              className="prose prose-invert max-w-none leading-relaxed"
              style={{
                ...fluidFont(14,17),
                color:'#d1d5db',
                '--tw-prose-headings': '#fff',
                '--tw-prose-links': '#f87171',
                '--tw-prose-bold': '#fff',
              } as React.CSSProperties}
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
            />
          </div>
        </article>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <section style={{ marginTop:'clamp(32px,6vw,56px)' }} aria-label="Related articles">
            <div className="flex items-center gap-4" style={{ marginBottom:'clamp(16px,3vw,28px)' }}>
              <div className="h-px flex-1" style={{ background:'rgba(255,255,255,0.06)' }} />
              <h2 className="font-black uppercase tracking-widest text-gray-500" style={{ ...fluidFont(9,12), ...TEXT_SAFE }}>
                Related Articles
              </h2>
              <div className="h-px flex-1" style={{ background:'rgba(255,255,255,0.06)' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="block group">
                  <article className="rounded-xl overflow-hidden border border-white/6 transition-all duration-300 hover:border-red-500/30 hover:-translate-y-1"
                    style={{ background:'rgba(255,255,255,0.022)' }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio:'16/9' }}>
                      <img src={related.image} alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter:'brightness(0.7)' }} loading="lazy" />
                      <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)' }} />
                    </div>
                    <div style={{ padding:'clamp(10px,2.5vw,16px)' }}>
                      <p className="text-gray-600 mb-1" style={{ ...fluidFont(9,11), ...TEXT_SAFE }}>{fmtDateShort(related.date)}</p>
                      <h3 className="font-black text-white group-hover:text-red-400 transition-colors leading-snug"
                        style={{ ...fluidFont(12,15), ...TEXT_SAFE, display:'-webkit-box', WebkitLineClamp:2,
                          WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:8 }}>
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1 text-red-500 font-bold group-hover:gap-2 transition-all"
                        style={{ ...fluidFont(10,12) }}>
                        Read <ArrowRight size={12} className="shrink-0" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Back to blog footer link ── */}
        <div className="text-center" style={{ marginTop:'clamp(32px,6vw,56px)' }}>
          <Link href="/blog"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-full text-white font-bold transition-all hover:scale-105"
            style={{ padding:'clamp(10px,2.5vw,14px) clamp(24px,6vw,36px)', ...fluidFont(13,15), ...TEXT_SAFE }}>
            <ArrowLeft size={16} className="shrink-0" />
            <span style={TEXT_SAFE}>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { notFound: true };

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3);

  return { props: { post, relatedPosts }, revalidate: 3600 };
};

export default BlogPostPage;