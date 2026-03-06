// // import React, { useState, useCallback, useEffect } from 'react';
// // import Link from 'next/link';
// // import { GetStaticProps } from 'next';
// // import { Calendar, User, Tag, Volume2, VolumeX, Share2 } from 'lucide-react';

// // import SEO from '../../components/SEO';
// // import { blogPosts } from '../../data/blogPosts';
// // import { BlogPost } from '../../types';

// // // ========== IMPORT THE AUDIO/TTS MODULES ==========
// // import { voiceManager } from '../../lib/core/VoiceManager';
// // import { musicController } from '../../lib/core/MusicController';
// // import { DEFAULT_BG_MUSIC_IDS } from '../../lib/core/musicConfig';

// // interface Props {
// //   posts: BlogPost[];
// //   buildDateString: string;
// // }

// // const BlogIndex: React.FC<Props> = ({ posts, buildDateString }) => {
// //   const [visibleCount, setVisibleCount] = useState(15);
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const [copied, setCopied] = useState(false);

// //   // Background music ID for blog index page
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

// //   // Build spoken description of the blog index
// //   const buildSpeakText = (): string => {
// //     const date = new Date().toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //     });
// //     return `Blog page. Read the latest news, reviews, and guides about movies, TV shows, live sports, and more. We have ${posts.length} blog posts. Updated as of ${date}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
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
// //         console.warn('No background music ID for blog index page');
// //       }
// //       const speakText = buildSpeakText();
// //       voiceManager.speak(speakText, true, true, () => {
// //         voiceManager.stopBackgroundMusic();
// //         setIsSpeaking(false);
// //       });
// //       setIsSpeaking(true);
// //     }
// //   };

// //   // Share the blog index page
// //   const handleShare = async () => {
// //     const url = 'https://movie-tv-trailers.vercel.app/blog';
// //     const title = 'Movie & TV trailers Blog';
// //     const text = 'Read the latest news, reviews, and guides about movies, TV shows, live sports, and more.';

// //     if (navigator.share) {
// //       try {
// //         await navigator.share({ title, text, url });
// //       } catch (error) {
// //         console.log('Share cancelled');
// //       }
// //     } else {
// //       navigator.clipboard.writeText(url).then(() => {
// //         setCopied(true);
// //         setTimeout(() => setCopied(false), 2000);
// //       });
// //     }
// //   };

// //   const loadMore = () => setVisibleCount((prev) => Math.min(prev + 15, posts.length));
// //   const visiblePosts = posts.slice(0, visibleCount);

// //   const schema = {
// //     '@context': 'https://schema.org',
// //     '@type': 'Blog',
// //     name: 'Movie & TV trailers Blog',
// //     description: 'Latest news, reviews, and guides about movies, TV shows, live sports, and more.',
// //     url: 'https://movie-tv-trailers.vercel.app/blog',
// //     blogPost: posts.map((post) => ({
// //       '@type': 'BlogPosting',
// //       headline: post.title,
// //       url: `https://movie-tv-trailers.vercel.app/blog/${post.slug}`,
// //       datePublished: post.date,
// //       author: { '@type': 'Person', name: post.author },
// //     })),
// //   };

// //   return (
// //     <div className="min-h-screen bg-miraj-black pt-24 pb-20 relative">
// //       {/* Read Aloud button */}
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

// //       {/* Share button */}
// //       <button
// //         onClick={handleShare}
// //         className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/10"
// //         title={copied ? 'Copied!' : 'Share this page'}
// //       >
// //         {copied ? <Check size={22} /> : <Share2 size={22} />}
// //         <span className="text-sm">{copied ? 'Copied!' : 'Share'}</span>
// //       </button>

// //       <SEO
// //         title="Blog – Movie & TV trailers"
// //         description="Read the latest news, reviews, and guides about movies, TV shows, live sports, and more."
// //         schema={schema}
// //         path="/blog"
// //       />

// //       <div className="container mx-auto px-4 md:px-6">
// //         <div className="text-center mb-12">
// //           <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
// //             Movie & TV <span className="text-miraj-red">Blog</span>
// //           </h1>
// //           <p className="text-gray-400 text-lg">News, reviews, and guides for entertainment lovers.</p>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {visiblePosts.map((post) => {
// //             const formattedDate = (() => {
// //               try {
// //                 return new Date(post.date).toLocaleDateString('en-US', {
// //                   year: 'numeric',
// //                   month: 'short',
// //                   day: 'numeric',
// //                 });
// //               } catch {
// //                 return post.date;
// //               }
// //             })();

// //             return (
// //               <article
// //                 key={post.id}
// //                 className="bg-miraj-gray border border-white/5 rounded-xl overflow-hidden hover:border-miraj-gold/30 transition-all hover:shadow-xl"
// //               >
// //                 <Link href={`/blog/${post.slug}`}>
// //                   <div className="cursor-pointer">
// //                     <div className="aspect-video relative overflow-hidden bg-black/40">
// //                       <img
// //                         src={post.image}
// //                         alt={post.title}
// //                         className="w-full h-full object-cover hover:scale-105 transition duration-300"
// //                         loading="lazy"
// //                       />
// //                       {post.videoId && (
// //                         <span className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
// //                           🎬 Trailer
// //                         </span>
// //                       )}
// //                     </div>
// //                     <div className="p-5">
// //                       <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
// //                         <span className="flex items-center gap-1">
// //                           <Calendar size={12} /> {formattedDate}
// //                         </span>
// //                         <span className="flex items-center gap-1">
// //                           <User size={12} /> {post.author}
// //                         </span>
// //                       </div>
// //                       <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h2>
// //                       <p className="text-gray-400 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
// //                       <div className="flex items-center gap-2 text-xs text-gray-500">
// //                         {post.tags?.slice(0, 2).map((tag) => (
// //                           <span key={tag} className="flex items-center gap-1">
// //                             <Tag size={12} /> {tag}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               </article>
// //             );
// //           })}
// //         </div>

// //         {visibleCount < posts.length && (
// //           <div className="flex justify-center mt-12">
// //             <button
// //               onClick={loadMore}
// //               className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all hover:scale-105"
// //             >
// //               Load More ({visibleCount} / {posts.length})
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export const getStaticProps: GetStaticProps<Props> = async () => {
// //   try {
// //     const sorted = [...blogPosts].sort(
// //       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
// //     );
// //     const buildDateString = new Date().toLocaleDateString('en-GB', {
// //       day: 'numeric',
// //       month: 'long',
// //       year: 'numeric',
// //     });
// //     return {
// //       props: { posts: sorted, buildDateString },
// //       revalidate: 3600,
// //     };
// //   } catch {
// //     return {
// //       props: { posts: [], buildDateString: '' },
// //       revalidate: 3600,
// //     };
// //   }
// // };

// // export default BlogIndex;











// import React, { useState, useCallback, useEffect } from 'react';
// import Link from 'next/link';
// import { GetStaticProps } from 'next';
// import {
//   Calendar,
//   User,
//   Tag,
//   Volume2,
//   VolumeX,
//   Share2,
//   Check,
//   ArrowRight,
//   Clapperboard,
//   TrendingUp,
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
//   posts: BlogPost[];
//   buildDateString: string;
// }

// const BlogIndex: React.FC<Props> = ({ posts, buildDateString }) => {
//   const [visibleCount, setVisibleCount] = useState(15);
//   const [isSpeaking, setIsSpeaking]     = useState(false);
//   const [copied, setCopied]             = useState(false);

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
//     const date = new Date().toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric',
//     });
//     return `Blog page. Read the latest news, reviews, and guides about movies, TV shows, live sports, and more. We have ${posts.length} blog posts. Updated as of ${date}. All content is free and in HD quality. For the best viewing experience, download our mobile app on your smartphone and enjoy better performance, smoother streaming, and daily notifications for the latest updates and new trailers.`;
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
//         console.warn('No background music ID for blog index page');
//       }
//       voiceManager.speak(buildSpeakText(), true, true, () => {
//         voiceManager.stopBackgroundMusic();
//         setIsSpeaking(false);
//       });
//       setIsSpeaking(true);
//     }
//   };

//   const handleShare = async () => {
//     const url   = 'https://movie-tv-trailers.vercel.app/blog';
//     const title = 'Movie & TV trailers Blog';
//     const text  = 'Read the latest news, reviews, and guides about movies, TV shows, live sports, and more.';
//     if (navigator.share) {
//       try { await navigator.share({ title, text, url }); } catch {}
//     } else {
//       navigator.clipboard.writeText(url).then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       });
//     }
//   };

//   const loadMore       = () => setVisibleCount((prev) => Math.min(prev + 15, posts.length));
//   const visiblePosts   = posts.slice(0, visibleCount);
//   const featuredPost   = visiblePosts[0];
//   const remainingPosts = visiblePosts.slice(1);

//   const schema = {
//     '@context': 'https://schema.org',
//     '@type': 'Blog',
//     name: 'Movie & TV trailers Blog',
//     description: 'Latest news, reviews, and guides about movies, TV shows, live sports, and more.',
//     url: 'https://movie-tv-trailers.vercel.app/blog',
//     blogPost: posts.map((post) => ({
//       '@type': 'BlogPosting',
//       headline: post.title,
//       url: `https://movie-tv-trailers.vercel.app/blog/${post.slug}`,
//       datePublished: post.date,
//       author: { '@type': 'Person', name: post.author },
//     })),
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

//       {/* Glow blob top-right */}
//       <div
//         aria-hidden
//         style={{
//           position: 'fixed', top: '-10%', right: '-5%', width: '40vw', height: '40vw',
//           borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
//           background: 'radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)',
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

//       {/* ── Share FAB ────────────────────────────────────────────────── */}
//       <button
//         onClick={handleShare}
//         className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/10 touch-manipulation"
//         style={{ padding: 'clamp(10px,2.5vw,14px) clamp(14px,4vw,20px)', minHeight: 48, minWidth: 48 }}
//         title={copied ? 'Copied!' : 'Share this page'}
//       >
//         {copied ? <Check size={20} className="shrink-0" /> : <Share2 size={20} className="shrink-0" />}
//         <span style={{ ...fluidFont(12, 14), ...TEXT_SAFE }}>{copied ? 'Copied!' : 'Share'}</span>
//       </button>

//       <SEO
//         title="Blog – Movie & TV trailers"
//         description="Read the latest news, reviews, and guides about movies, TV shows, live sports, and more."
//         schema={schema}
//         path="/blog"
//       />

//       <div
//         className="relative z-10 container mx-auto"
//         style={{ paddingLeft: 'clamp(12px,4vw,24px)', paddingRight: 'clamp(12px,4vw,24px)' }}
//       >
//         {/* ── Hero header ────────────────────────────────────────────── */}
//         <div className="text-center" style={{ marginBottom: 'clamp(32px,6vw,64px)' }}>
//           {/* Eyebrow pill */}
//           <div
//             className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-gray-400 mb-5"
//             style={{ padding: '6px 18px', ...fluidFont(10, 12) }}
//           >
//             <Clapperboard size={13} className="shrink-0 text-red-500" />
//             <span style={TEXT_SAFE}>Entertainment · News · Reviews · Guides</span>
//           </div>

//           <h1
//             className="font-black text-white leading-none tracking-tight"
//             style={{ ...fluidFont(34, 72), marginBottom: 'clamp(12px,2vw,20px)' }}
//           >
//             The{' '}
//             <span
//               style={{
//                 backgroundImage: 'linear-gradient(90deg,#e63946 0%,#f4a261 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               Blog
//             </span>
//           </h1>

//           <p
//             className="text-gray-400 mx-auto"
//             style={{ ...fluidFont(13, 17), maxWidth: '34rem', ...TEXT_SAFE }}
//           >
//             News, reviews, and streaming guides for entertainment lovers.
//           </p>

//           {/* Stats strip */}
//           <div className="flex items-center justify-center flex-wrap gap-8 mt-8">
//             {[
//               { label: 'Total Posts', value: String(posts.length), icon: <TrendingUp size={14} /> },
//               { label: 'Last Updated', value: buildDateString || 'Today', icon: <Calendar size={14} /> },
//             ].map((stat) => (
//               <div key={stat.label} className="flex flex-col items-center gap-1">
//                 <div className="flex items-center gap-1 text-red-500">{stat.icon}</div>
//                 <span className="font-black text-white" style={{ ...fluidFont(20, 28), ...TEXT_SAFE }}>
//                   {stat.value}
//                 </span>
//                 <span
//                   className="text-gray-600 uppercase tracking-widest"
//                   style={{ ...fluidFont(8, 10), ...TEXT_SAFE }}
//                 >
//                   {stat.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── Featured post ───────────────────────────────────────────── */}
//         {featuredPost && (
//           <Link href={`/blog/${featuredPost.slug}`} className="block group" style={{ marginBottom: 'clamp(24px,5vw,48px)' }}>
//             <article
//               className="relative overflow-hidden rounded-2xl border border-white/8 transition-all duration-500 group-hover:border-red-500/40 group-hover:shadow-2xl"
//               style={{ background: 'rgba(255,255,255,0.025)' }}
//             >
//               <div className="relative" style={{ aspectRatio: '21/9', minHeight: 180, maxHeight: 500 }}>
//                 <img
//                   src={featuredPost.image}
//                   alt={featuredPost.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
//                   style={{ filter: 'brightness(0.38)' }}
//                 />
//                 {/* Scrim */}
//                 <div
//                   className="absolute inset-0"
//                   style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.2) 65%, transparent 100%)' }}
//                 />

//                 {/* Featured badge */}
//                 <div
//                   className="absolute font-black uppercase tracking-widest text-black bg-red-500 rounded-full"
//                   style={{ top: 'clamp(10px,2vw,20px)', left: 'clamp(10px,2vw,20px)', padding: '5px 14px', ...fluidFont(8, 10) }}
//                 >
//                   ★ Featured
//                 </div>

//                 {featuredPost.videoId && (
//                   <div
//                     className="absolute bg-black/70 text-white font-bold rounded-full border border-white/20"
//                     style={{ top: 'clamp(10px,2vw,20px)', right: 'clamp(10px,2vw,20px)', padding: '5px 12px', ...fluidFont(9, 11) }}
//                   >
//                     🎬 Trailer
//                   </div>
//                 )}

//                 {/* Text overlay */}
//                 <div
//                   className="absolute bottom-0 left-0 right-0"
//                   style={{ padding: 'clamp(16px,4vw,40px)' }}
//                 >
//                   {/* Tags row */}
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {featuredPost.tags?.slice(0, 3).map((tag) => (
//                       <span
//                         key={tag}
//                         className="text-red-400 font-bold uppercase border border-red-500/30 rounded-full bg-red-500/10"
//                         style={{ padding: '3px 10px', ...fluidFont(8, 10), letterSpacing: '0.1em', ...TEXT_SAFE }}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <h2
//                     className="font-black text-white leading-tight group-hover:text-red-400 transition-colors"
//                     style={{ ...fluidFont(18, 36), ...TEXT_SAFE, marginBottom: 'clamp(8px,1.5vw,14px)' }}
//                   >
//                     {featuredPost.title}
//                   </h2>

//                   <p
//                     className="text-gray-300"
//                     style={{ ...fluidFont(12, 16), ...TEXT_SAFE, maxWidth: '52rem',
//                       display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
//                   >
//                     {featuredPost.excerpt}
//                   </p>

//                   {/* Meta + CTA row */}
//                   <div
//                     className="flex items-center justify-between flex-wrap gap-3 mt-4"
//                     style={{ minWidth: 0 }}
//                   >
//                     <div
//                       className="flex items-center flex-wrap gap-3 text-gray-400"
//                       style={{ ...fluidFont(11, 13), ...TEXT_SAFE }}
//                     >
//                       <span className="flex items-center gap-1">
//                         <Calendar size={12} className="shrink-0" />
//                         <span style={TEXT_SAFE}>
//                           {(() => { try { return new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return featuredPost.date; } })()}
//                         </span>
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <User size={12} className="shrink-0" />
//                         <span style={TEXT_SAFE}>{featuredPost.author}</span>
//                       </span>
//                     </div>
//                     <div
//                       className="flex items-center gap-2 text-red-400 font-black group-hover:gap-3 transition-all"
//                       style={{ ...fluidFont(12, 15) }}
//                     >
//                       Read Article <ArrowRight size={16} className="shrink-0" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           </Link>
//         )}

//         {/* ── Divider ─────────────────────────────────────────────────── */}
//         <div className="flex items-center gap-4" style={{ marginBottom: 'clamp(16px,3vw,32px)' }}>
//           <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
//           <span
//             className="font-black uppercase tracking-widest text-gray-600"
//             style={{ ...fluidFont(8, 11) }}
//           >
//             All Posts
//           </span>
//           <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
//         </div>

//         {/* ── Posts grid ──────────────────────────────────────────────── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
//           {remainingPosts.map((post) => {
//             const formattedDate = (() => {
//               try {
//                 return new Date(post.date).toLocaleDateString('en-US', {
//                   year: 'numeric', month: 'short', day: 'numeric',
//                 });
//               } catch { return post.date; }
//             })();

//             return (
//               <article
//                 key={post.id}
//                 className="group relative rounded-xl overflow-hidden border border-white/6 transition-all duration-300 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-xl"
//                 style={{ background: 'rgba(255,255,255,0.022)' }}
//               >
//                 <Link href={`/blog/${post.slug}`} className="block">
//                   {/* Thumbnail */}
//                   <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       style={{ filter: 'brightness(0.75)' }}
//                       loading="lazy"
//                     />
//                     <div
//                       className="absolute inset-0"
//                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }}
//                     />

//                     {/* Video badge */}
//                     {post.videoId && (
//                       <span
//                         className="absolute bottom-2 right-2 bg-red-600 text-white font-bold rounded"
//                         style={{ padding: '2px 8px', ...fluidFont(9, 11) }}
//                       >
//                         🎬 Trailer
//                       </span>
//                     )}

//                     {/* Tag chip */}
//                     {post.tags?.[0] && (
//                       <span
//                         className="absolute top-2 left-2 bg-black/75 text-red-400 font-bold uppercase rounded-full border border-red-500/25"
//                         style={{ padding: '3px 10px', ...fluidFont(7, 10), letterSpacing: '0.1em' }}
//                       >
//                         {post.tags[0]}
//                       </span>
//                     )}
//                   </div>

//                   {/* Card body */}
//                   <div style={{ padding: 'clamp(12px,3vw,20px)' }}>
//                     {/* Meta row */}
//                     <div
//                       className="flex items-center flex-wrap gap-2 mb-2"
//                       style={{ ...fluidFont(10, 12), color: 'rgba(255,255,255,0.35)', ...TEXT_SAFE }}
//                     >
//                       <span className="flex items-center gap-1">
//                         <Calendar size={11} className="shrink-0" />
//                         <span style={TEXT_SAFE}>{formattedDate}</span>
//                       </span>
//                       <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
//                       <span className="flex items-center gap-1">
//                         <User size={11} className="shrink-0" />
//                         <span style={TEXT_SAFE}>{post.author}</span>
//                       </span>
//                     </div>

//                     {/* Title */}
//                     <h2
//                       className="font-black text-white leading-snug group-hover:text-red-400 transition-colors"
//                       style={{
//                         ...fluidFont(14, 18), ...TEXT_SAFE,
//                         display: '-webkit-box', WebkitLineClamp: 2,
//                         WebkitBoxOrient: 'vertical', overflow: 'hidden',
//                         marginBottom: 'clamp(6px,1vw,10px)',
//                       }}
//                     >
//                       {post.title}
//                     </h2>

//                     {/* Excerpt */}
//                     <p
//                       className="text-gray-500"
//                       style={{
//                         ...fluidFont(11, 13), ...TEXT_SAFE,
//                         display: '-webkit-box', WebkitLineClamp: 3,
//                         WebkitBoxOrient: 'vertical', overflow: 'hidden',
//                         marginBottom: 'clamp(10px,2vw,14px)',
//                       }}
//                     >
//                       {post.excerpt}
//                     </p>

//                     {/* Read more */}
//                     <div
//                       className="flex items-center gap-1 font-bold text-red-500 group-hover:gap-2 transition-all"
//                       style={{ ...fluidFont(11, 13) }}
//                     >
//                       Read more <ArrowRight size={13} className="shrink-0" />
//                     </div>
//                   </div>
//                 </Link>
//               </article>
//             );
//           })}
//         </div>

//         {/* ── Load more ───────────────────────────────────────────────── */}
//         {visibleCount < posts.length && (
//           <div className="flex justify-center" style={{ marginTop: 'clamp(32px,6vw,56px)' }}>
//             <button
//               onClick={loadMore}
//               className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95"
//               style={{ padding: 'clamp(10px,2.5vw,14px) clamp(24px,6vw,40px)', ...fluidFont(13, 15), ...TEXT_SAFE }}
//             >
//               <span style={TEXT_SAFE}>Load More</span>
//               <span
//                 className="font-black text-red-400"
//                 style={{ ...fluidFont(13, 15), ...TEXT_SAFE }}
//               >
//                 ({visibleCount} / {posts.length})
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   try {
//     const sorted = [...blogPosts].sort(
//       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//     );
//     const buildDateString = new Date().toLocaleDateString('en-GB', {
//       day: 'numeric', month: 'long', year: 'numeric',
//     });
//     return { props: { posts: sorted, buildDateString }, revalidate: 3600 };
//   } catch {
//     return { props: { posts: [], buildDateString: '' }, revalidate: 3600 };
//   }
// };

// export default BlogIndex;









import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import {
  Calendar, User, Tag, Volume2, VolumeX,
  Share2, Check, ArrowRight, Clapperboard, TrendingUp, Clock,
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
function fmtDate(d: string): string {
  try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return d; }
}

interface Props { posts: BlogPost[]; buildDateString: string; }

const BlogIndex: React.FC<Props> = ({ posts, buildDateString }) => {
  const [visibleCount, setVisibleCount] = useState(15);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [copied, setCopied]             = useState(false);

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
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      voiceManager.speak(
        `Blog page. Streaming guides, movie reviews, web series picks and live sports schedules — all free. We have ${posts.length} posts. Updated ${date}.`,
        true, true, () => { voiceManager.stopBackgroundMusic(); setIsSpeaking(false); }
      );
      setIsSpeaking(true);
    }
  };

  const handleShare = async () => {
    const url = 'https://movie-tv-trailers.vercel.app/blog';
    if (navigator.share) {
      try { await navigator.share({ title: 'Movie & TV trailers Blog', text: 'Free streaming guides, movie reviews and live sports schedules.', url }); } catch {}
    } else {
      navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    }
  };

  const visiblePosts   = posts.slice(0, visibleCount);
  const featuredPost   = visiblePosts[0];
  const remainingPosts = visiblePosts.slice(1);

  /* ── Schema.org BlogPosting list ── */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Movie & TV trailers Blog – Free Streaming Guides, Reviews & News',
    description: 'Streaming guides, movie reviews, web series recommendations, live sports schedules, Hindi dubbed picks and documentary lists — all free on Movie & TV trailers.',
    url: 'https://movie-tv-trailers.vercel.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Movie & TV trailers',
      logo: { '@type': 'ImageObject', url: 'https://movie-tv-trailers.vercel.app/logo.png' },
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      image: p.image,
      url: `https://movie-tv-trailers.vercel.app/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author },
      keywords: p.tags?.join(', '),
    })),
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative"
      style={{ background: 'linear-gradient(160deg,#080808 0%,#0d0d0d 50%,#090b10 100%)' }}>

      {/* Dot-grid texture */}
      <div aria-hidden style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage:'radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
      {/* Red glow */}
      <div aria-hidden style={{ position:'fixed', top:'-10%', right:'-5%', width:'40vw', height:'40vw',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle,rgba(230,57,70,0.07) 0%,transparent 70%)' }} />

      {/* ── Read Aloud FAB ── */}
      <button onClick={handleSpeakerClick}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-2xl font-semibold touch-manipulation transition-all duration-300 ${
          isSpeaking ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-yellow-400 text-black hover:bg-yellow-500'}`}
        style={{ padding:'clamp(10px,2.5vw,14px) clamp(14px,4vw,20px)', minHeight:48, minWidth:48 }}
        title={isSpeaking ? 'Stop' : 'Read Aloud'}>
        {isSpeaking ? <VolumeX size={20} className="shrink-0" /> : <Volume2 size={20} className="shrink-0" />}
        <span style={{ ...fluidFont(12,14), ...TEXT_SAFE }}>Read Aloud</span>
      </button>

      {/* ── Share FAB ── */}
      <button onClick={handleShare}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full shadow-2xl font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/10 touch-manipulation transition-all duration-300"
        style={{ padding:'clamp(10px,2.5vw,14px) clamp(14px,4vw,20px)', minHeight:48, minWidth:48 }}
        title={copied ? 'Copied!' : 'Share'}>
        {copied ? <Check size={20} className="shrink-0" /> : <Share2 size={20} className="shrink-0" />}
        <span style={{ ...fluidFont(12,14), ...TEXT_SAFE }}>{copied ? 'Copied!' : 'Share'}</span>
      </button>

      <SEO
        title="Blog – Free Movies, TV Shows & Live Sports Guides | Movie & TV trailers"
        description="Latest free streaming guides, new movie reviews, Hindi dubbed picks, web series recommendations and live sports schedules. No subscription needed — Movie & TV trailers."
        schema={schema}
        path="/blog"
      />

      <div className="relative z-10 container mx-auto"
        style={{ paddingLeft:'clamp(12px,4vw,24px)', paddingRight:'clamp(12px,4vw,24px)' }}>

        {/* ── Hero header ── */}
        <div className="text-center" style={{ marginBottom:'clamp(32px,6vw,64px)' }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-gray-400 mb-5"
            style={{ padding:'6px 18px', ...fluidFont(10,12) }}>
            <Clapperboard size={13} className="shrink-0 text-red-500" />
            <span style={TEXT_SAFE}>Free Streaming · News · Reviews · Guides</span>
          </div>

          <h1 className="font-black text-white leading-none tracking-tight"
            style={{ ...fluidFont(34,72), marginBottom:'clamp(12px,2vw,20px)' }}>
            The{' '}
            <span style={{ backgroundImage:'linear-gradient(90deg,#e63946 0%,#f4a261 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Blog
            </span>
          </h1>

          <p className="text-gray-400 mx-auto" style={{ ...fluidFont(13,17), maxWidth:'34rem', ...TEXT_SAFE }}>
            Streaming guides, movie reviews, web series picks and live sports — all free.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center flex-wrap gap-8 mt-8">
            {[
              { label:'Total Posts', value:String(posts.length), icon:<TrendingUp size={14} /> },
              { label:'Last Updated', value:buildDateString || 'Today', icon:<Calendar size={14} /> },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-red-500">{s.icon}</div>
                <span className="font-black text-white" style={{ ...fluidFont(20,28), ...TEXT_SAFE }}>{s.value}</span>
                <span className="text-gray-600 uppercase tracking-widest" style={{ ...fluidFont(8,10), ...TEXT_SAFE }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured post ── */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="block group" style={{ marginBottom:'clamp(24px,5vw,48px)' }}>
            <article className="relative overflow-hidden rounded-2xl border border-white/8 transition-all duration-500 group-hover:border-red-500/40 group-hover:shadow-2xl"
              style={{ background:'rgba(255,255,255,0.025)' }}>
              <div className="relative" style={{ aspectRatio:'21/9', minHeight:180, maxHeight:500 }}>
                <img src={featuredPost.image} alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter:'brightness(0.38)' }} />
                <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.2) 65%,transparent 100%)' }} />

                {/* Badges */}
                <div className="absolute font-black uppercase tracking-widest text-black bg-red-500 rounded-full"
                  style={{ top:'clamp(10px,2vw,20px)', left:'clamp(10px,2vw,20px)', padding:'5px 14px', ...fluidFont(8,10) }}>
                  ★ Featured
                </div>
                {featuredPost.videoId && (
                  <div className="absolute bg-black/70 text-white font-bold rounded-full border border-white/20"
                    style={{ top:'clamp(10px,2vw,20px)', right:'clamp(10px,2vw,20px)', padding:'5px 12px', ...fluidFont(9,11) }}>
                    🎬 Trailer
                  </div>
                )}

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0" style={{ padding:'clamp(16px,4vw,40px)' }}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredPost.tags?.slice(0,3).map((t) => (
                      <span key={t} className="text-red-400 font-bold uppercase border border-red-500/30 rounded-full bg-red-500/10"
                        style={{ padding:'3px 10px', ...fluidFont(8,10), letterSpacing:'0.1em', ...TEXT_SAFE }}>{t}</span>
                    ))}
                  </div>
                  <h2 className="font-black text-white leading-tight group-hover:text-red-400 transition-colors"
                    style={{ ...fluidFont(18,36), ...TEXT_SAFE, marginBottom:'clamp(8px,1.5vw,14px)' }}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300"
                    style={{ ...fluidFont(12,16), ...TEXT_SAFE, maxWidth:'52rem',
                      display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-3 mt-4" style={{ minWidth:0 }}>
                    <div className="flex items-center flex-wrap gap-3 text-gray-400" style={{ ...fluidFont(11,13), ...TEXT_SAFE }}>
                      <span className="flex items-center gap-1"><Calendar size={12} className="shrink-0" /><span style={TEXT_SAFE}>{fmtDate(featuredPost.date)}</span></span>
                      <span className="flex items-center gap-1"><User size={12} className="shrink-0" /><span style={TEXT_SAFE}>{featuredPost.author}</span></span>
                      {featuredPost.content && (
                        <span className="flex items-center gap-1"><Clock size={12} className="shrink-0" /><span style={TEXT_SAFE}>{readingTime(featuredPost.content)} min read</span></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-red-400 font-black group-hover:gap-3 transition-all" style={{ ...fluidFont(12,15) }}>
                      Read Article <ArrowRight size={16} className="shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* ── Divider ── */}
        <div className="flex items-center gap-4" style={{ marginBottom:'clamp(16px,3vw,32px)' }}>
          <div className="h-px flex-1" style={{ background:'rgba(255,255,255,0.06)' }} />
          <span className="font-black uppercase tracking-widest text-gray-600" style={{ ...fluidFont(8,11) }}>All Posts</span>
          <div className="h-px flex-1" style={{ background:'rgba(255,255,255,0.06)' }} />
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {remainingPosts.map((post) => {
            const mins = post.content ? readingTime(post.content) : null;
            return (
              <article key={post.id}
                className="group relative rounded-xl overflow-hidden border border-white/6 transition-all duration-300 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-xl"
                style={{ background:'rgba(255,255,255,0.022)' }}>
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden" style={{ aspectRatio:'16/9' }}>
                    <img src={post.image} alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter:'brightness(0.75)' }} loading="lazy" />
                    <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)' }} />
                    {post.videoId && (
                      <span className="absolute bottom-2 right-2 bg-red-600 text-white font-bold rounded"
                        style={{ padding:'2px 8px', ...fluidFont(9,11) }}>🎬 Trailer</span>
                    )}
                    {post.tags?.[0] && (
                      <span className="absolute top-2 left-2 bg-black/75 text-red-400 font-bold uppercase rounded-full border border-red-500/25"
                        style={{ padding:'3px 10px', ...fluidFont(7,10), letterSpacing:'0.1em' }}>
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding:'clamp(12px,3vw,20px)' }}>
                    {/* Meta */}
                    <div className="flex items-center flex-wrap gap-2 mb-2"
                      style={{ ...fluidFont(10,12), color:'rgba(255,255,255,0.35)', ...TEXT_SAFE }}>
                      <span className="flex items-center gap-1"><Calendar size={11} className="shrink-0" /><span style={TEXT_SAFE}>{fmtDate(post.date)}</span></span>
                      {mins && <><span style={{ color:'rgba(255,255,255,0.12)' }}>·</span>
                        <span className="flex items-center gap-1"><Clock size={11} className="shrink-0" /><span style={TEXT_SAFE}>{mins} min read</span></span></>}
                    </div>

                    {/* Title */}
                    <h2 className="font-black text-white leading-snug group-hover:text-red-400 transition-colors"
                      style={{ ...fluidFont(14,18), ...TEXT_SAFE, display:'-webkit-box', WebkitLineClamp:2,
                        WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:'clamp(6px,1vw,10px)' }}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500"
                      style={{ ...fluidFont(11,13), ...TEXT_SAFE, display:'-webkit-box', WebkitLineClamp:3,
                        WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:'clamp(10px,2vw,14px)' }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0,2).map((t) => (
                          <span key={t} className="flex items-center gap-1 text-gray-600" style={{ ...fluidFont(9,11), ...TEXT_SAFE }}>
                            <Tag size={10} className="shrink-0" /><span style={TEXT_SAFE}>{t}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center gap-1 font-bold text-red-500 group-hover:gap-2 transition-all" style={{ ...fluidFont(11,13) }}>
                      Read more <ArrowRight size={13} className="shrink-0" />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* ── Load More ── */}
        {visibleCount < posts.length && (
          <div className="flex justify-center" style={{ marginTop:'clamp(32px,6vw,56px)' }}>
            <button onClick={() => setVisibleCount((p) => Math.min(p + 15, posts.length))}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95"
              style={{ padding:'clamp(10px,2.5vw,14px) clamp(24px,6vw,40px)', ...fluidFont(13,15), ...TEXT_SAFE }}>
              <span style={TEXT_SAFE}>Load More</span>
              <span className="font-black text-red-400" style={{ ...fluidFont(13,15), ...TEXT_SAFE }}>
                ({visibleCount} / {posts.length})
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const buildDateString = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
    return { props: { posts: sorted, buildDateString }, revalidate: 3600 };
  } catch {
    return { props: { posts: [], buildDateString: '' }, revalidate: 3600 };
  }
};

export default BlogIndex;