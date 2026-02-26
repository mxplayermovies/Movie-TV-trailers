// // // // pages/blog/[slug].tsx
// // // import React from 'react';
// // // import Head from 'next/head';
// // // import { GetStaticPaths, GetStaticProps } from 'next';
// // // import { useRouter } from 'next/router';
// // // import { blogPosts } from '../../data/blogPosts'; // now .js
// // // import { BlogPost } from '../../types/blog';
// // // import Header from '../../components/Header';
// // // import Footer from '../../components/Footer';
// // // import YouTubePlayer from '../../components/YouTubePlayer';
// // // import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
// // // import Link from 'next/link';

// // // const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// // // const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// // // interface Props {
// // //   post: BlogPost;
// // // }

// // // export default function BlogPostPage({ post }: Props) {
// // //   const router = useRouter();

// // //   if (router.isFallback) {
// // //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// // //   }

// // //   const blogPostingSchema = {
// // //     "@context": "https://schema.org",
// // //     "@type": "BlogPosting",
// // //     "headline": post.title,
// // //     "description": post.excerpt,
// // //     "image": post.image,
// // //     "datePublished": post.date,
// // //     "dateModified": post.date,
// // //     "author": {
// // //       "@type": "Person",
// // //       "name": post.author
// // //     },
// // //     "publisher": {
// // //       "@type": "Organization",
// // //       "name": "Movie & TV trailers",
// // //       "logo": {
// // //         "@type": "ImageObject",
// // //         "url": `${BASE_URL}/logo.png`
// // //       }
// // //     },
// // //     "mainEntityOfPage": {
// // //       "@type": "WebPage",
// // //       "@id": `${BASE_URL}/blog/${post.slug}`
// // //     },
// // //     ...(post.videoId ? {
// // //       "video": {
// // //         "@type": "VideoObject",
// // //         "name": `${post.title} - Trailer`,
// // //         "description": post.excerpt,
// // //         "thumbnailUrl": post.image,
// // //         "uploadDate": post.date,
// // //         "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
// // //       }
// // //     } : {})
// // //   };

// // //   return (
// // //     <>
// // //       <Head>
// // //         <title>{post.title} – Movie & TV trailers Blog</title>
// // //         <meta name="description" content={post.excerpt} />
// // //         <link rel="canonical" href={`${BASE_URL}/blog/${post.slug}`} />
// // //         <meta property="fb:app_id" content={FB_APP_ID} />
// // //         <meta property="og:site_name" content="Movie & TV trailers" />
// // //         <meta property="og:type" content="article" />
// // //         <meta property="og:url" content={`${BASE_URL}/blog/${post.slug}`} />
// // //         <meta property="og:title" content={post.title} />
// // //         <meta property="og:description" content={post.excerpt} />
// // //         <meta property="og:image" content={post.image} />
// // //         <meta property="og:image:width" content="1200" />
// // //         <meta property="og:image:height" content="630" />
// // //         <meta property="article:published_time" content={post.date} />
// // //         <meta property="article:author" content={post.author} />
// // //         <meta property="article:section" content={post.category} />
// // //         <meta property="article:tag" content={post.tags.join(', ')} />
// // //         <meta name="twitter:card" content="summary_large_image" />
// // //         <meta name="twitter:site" content="@MovieTVTrailers" />
// // //         <meta name="twitter:creator" content="@MovieTVTrailers" />
// // //         <meta name="twitter:title" content={post.title} />
// // //         <meta name="twitter:description" content={post.excerpt} />
// // //         <meta name="twitter:image" content={post.image} />
// // //         {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}
// // //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
// // //       </Head>

// // //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
// // //         <Header />
// // //         <main className="container mx-auto px-4 py-8 max-w-4xl">
// // //           <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
// // //             <ArrowLeft size={18} /> Back to Blog
// // //           </Link>

// // //           <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
// // //             <header className="mb-6">
// // //               <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
// // //               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // //                 <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
// // //                 <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
// // //                 <span className="flex items-center gap-1"><Tag size={16} /> {post.category}</span>
// // //               </div>
// // //               <div className="flex flex-wrap gap-2 mt-3">
// // //                 {post.tags.map(tag => (
// // //                   <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">#{tag}</span>
// // //                 ))}
// // //               </div>
// // //             </header>

// // //             {post.videoId && (
// // //               <div className="mb-6">
// // //                 <YouTubePlayer videoId={post.videoId} title={post.title} autoplay={false} loop={false} />
// // //               </div>
// // //             )}

// // //             <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

// // //             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
// // //               <h3 className="text-lg font-semibold mb-2">Share this post</h3>
// // //               {/* Social share buttons can be added here */}
// // //             </div>
// // //           </article>
// // //         </main>
// // //         <Footer />
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // export const getStaticPaths: GetStaticPaths = async () => {
// // //   const paths = blogPosts.map((post) => ({
// // //     params: { slug: post.slug },
// // //   }));
// // //   return { paths, fallback: 'blocking' };
// // // };

// // // export const getStaticProps: GetStaticProps = async ({ params }) => {
// // //   const post = blogPosts.find((p) => p.slug === params?.slug);
// // //   if (!post) {
// // //     return { notFound: true };
// // //   }
// // //   return {
// // //     props: { post },
// // //     revalidate: 3600,
// // //   };
// // // };



// // // pages/blog/[slug].tsx
// // import React from 'react';
// // import Head from 'next/head';
// // import { GetStaticPaths, GetStaticProps } from 'next';
// // import { useRouter } from 'next/router';
// // import { blogPosts } from '../../data/blogPosts';
// // import { BlogPost } from '../../types/index';
// // import Header from '../../components/Header';
// // import Footer from '../../components/Footer';
// // import YouTubePlayer from '../../components/YouTubePlayer';
// // import ShareButtons from '../../components/ShareButtons';
// // import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
// // import Link from 'next/link';

// // const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// // const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// // interface Props {
// //   post: BlogPost;
// // }

// // export default function BlogPostPage({ post }: Props) {
// //   const router = useRouter();

// //   if (router.isFallback) {
// //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// //   }

// //   const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

// //   const blogPostingSchema = {
// //     "@context": "https://schema.org",
// //     "@type": "BlogPosting",
// //     "headline": post.title,
// //     "description": post.excerpt,
// //     "image": post.image,
// //     "datePublished": post.date,
// //     "dateModified": post.date,
// //     "author": {
// //       "@type": "Person",
// //       "name": post.author
// //     },
// //     "publisher": {
// //       "@type": "Organization",
// //       "name": "Movie & TV trailers",
// //       "logo": {
// //         "@type": "ImageObject",
// //         "url": `${BASE_URL}/logo.png`
// //       }
// //     },
// //     "mainEntityOfPage": {
// //       "@type": "WebPage",
// //       "@id": canonicalUrl
// //     },
// //     ...(post.videoId ? {
// //       "video": {
// //         "@type": "VideoObject",
// //         "name": `${post.title} - Trailer`,
// //         "description": post.excerpt,
// //         "thumbnailUrl": post.image,
// //         "uploadDate": post.date,
// //         "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
// //       }
// //     } : {})
// //   };

// //   return (
// //     <>
// //       <Head>
// //         <title>{post.title} – Movie & TV trailers Blog</title>
// //         <meta name="description" content={post.excerpt} />
// //         <link rel="canonical" href={canonicalUrl} />
// //         <meta property="fb:app_id" content={FB_APP_ID} />
// //         <meta property="og:site_name" content="Movie & TV trailers" />
// //         <meta property="og:type" content="article" />
// //         <meta property="og:url" content={canonicalUrl} />
// //         <meta property="og:title" content={post.title} />
// //         <meta property="og:description" content={post.excerpt} />
// //         <meta property="og:image" content={post.image} />
// //         <meta property="og:image:width" content="1200" />
// //         <meta property="og:image:height" content="630" />
// //         <meta property="article:published_time" content={post.date} />
// //         <meta property="article:author" content={post.author} />
// //         <meta property="article:section" content={post.category} />
// //         <meta property="article:tag" content={post.tags.join(', ')} />
// //         <meta name="twitter:card" content="summary_large_image" />
// //         <meta name="twitter:site" content="@MovieTVTrailers" />
// //         <meta name="twitter:creator" content="@MovieTVTrailers" />
// //         <meta name="twitter:title" content={post.title} />
// //         <meta name="twitter:description" content={post.excerpt} />
// //         <meta name="twitter:image" content={post.image} />
// //         {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}
// //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
// //       </Head>

// //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
// //         <Header />
// //         <main className="container mx-auto px-4 py-8 max-w-4xl">
// //           <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
// //             <ArrowLeft size={18} /> Back to Blog
// //           </Link>

// //           <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
// //             <header className="mb-6">
// //               <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
// //               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// //                 <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
// //                 <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
// //                 <span className="flex items-center gap-1"><Tag size={16} /> {post.category}</span>
// //               </div>
// //               <div className="flex flex-wrap gap-2 mt-3">
// //                 {post.tags.map(tag => (
// //                   <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">#{tag}</span>
// //                 ))}
// //               </div>
// //             </header>

// //             {post.videoId && (
// //               <div className="mb-6">
// //                 <YouTubePlayer videoId={post.videoId} title={post.title} autoplay={false} loop={false} />
// //               </div>
// //             )}

// //             <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

// //             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
// //               <h3 className="text-lg font-semibold mb-4">Share this post</h3>
// //               <ShareButtons url={canonicalUrl} title={post.title} description={post.excerpt} />
// //             </div>
// //           </article>
// //         </main>
// //         <Footer />
// //       </div>
// //     </>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   const paths = blogPosts.map((post) => ({
// //     params: { slug: post.slug },
// //   }));
// //   return { paths, fallback: 'blocking' };
// // };

// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   const post = blogPosts.find((p) => p.slug === params?.slug);
// //   if (!post) {
// //     return { notFound: true };
// //   }
// //   return {
// //     props: { post },
// //     revalidate: 3600,
// //   };
// // };



// // // import React from 'react';
// // // import Head from 'next/head';
// // // import { GetStaticPaths, GetStaticProps } from 'next';
// // // import { useRouter } from 'next/router';
// // // import { getBlogPosts, getBlogPostBySlug } from '../../lib/blog';
// // // import { BlogPost } from '../../types/blog';
// // // import Header from '../../components/Header';
// // // import Footer from '../../components/Footer';
// // // import YouTubePlayer from '../../components/YouTubePlayer';
// // // import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
// // // import Link from 'next/link';

// // // const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// // // const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// // // interface Props {
// // //   post: BlogPost;
// // // }

// // // export default function BlogPostPage({ post }: Props) {
// // //   const router = useRouter();

// // //   if (router.isFallback) {
// // //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// // //   }

// // //   const blogPostingSchema = {
// // //     "@context": "https://schema.org",
// // //     "@type": "BlogPosting",
// // //     "headline": post.title,
// // //     "description": post.excerpt,
// // //     "image": post.image,
// // //     "datePublished": post.date,
// // //     "dateModified": post.date,
// // //     "author": {
// // //       "@type": "Person",
// // //       "name": post.author
// // //     },
// // //     "publisher": {
// // //       "@type": "Organization",
// // //       "name": "Movie & TV trailers",
// // //       "logo": {
// // //         "@type": "ImageObject",
// // //         "url": `${BASE_URL}/logo.png`
// // //       }
// // //     },
// // //     "mainEntityOfPage": {
// // //       "@type": "WebPage",
// // //       "@id": `${BASE_URL}/blog/${post.slug}`
// // //     },
// // //     ...(post.videoId ? {
// // //       "video": {
// // //         "@type": "VideoObject",
// // //         "name": `${post.title} - Trailer`,
// // //         "description": post.excerpt,
// // //         "thumbnailUrl": post.image,
// // //         "uploadDate": post.date,
// // //         "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
// // //       }
// // //     } : {})
// // //   };

// // //   return (
// // //     <>
// // //       <Head>
// // //         <title>{post.title} – Movie & TV trailers Blog</title>
// // //         <meta name="description" content={post.excerpt} />
// // //         <link rel="canonical" href={`${BASE_URL}/blog/${post.slug}`} />
// // //         <meta property="fb:app_id" content={FB_APP_ID} />
// // //         <meta property="og:site_name" content="Movie & TV trailers" />
// // //         <meta property="og:type" content="article" />
// // //         <meta property="og:url" content={`${BASE_URL}/blog/${post.slug}`} />
// // //         <meta property="og:title" content={post.title} />
// // //         <meta property="og:description" content={post.excerpt} />
// // //         <meta property="og:image" content={post.image} />
// // //         <meta property="og:image:width" content="1200" />
// // //         <meta property="og:image:height" content="630" />
// // //         <meta property="article:published_time" content={post.date} />
// // //         <meta property="article:author" content={post.author} />
// // //         <meta property="article:section" content={post.category} />
// // //         <meta property="article:tag" content={post.tags.join(', ')} />
// // //         <meta name="twitter:card" content="summary_large_image" />
// // //         <meta name="twitter:site" content="@MovieTVTrailers" />
// // //         <meta name="twitter:creator" content="@MovieTVTrailers" />
// // //         <meta name="twitter:title" content={post.title} />
// // //         <meta name="twitter:description" content={post.excerpt} />
// // //         <meta name="twitter:image" content={post.image} />
// // //         {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}
// // //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
// // //       </Head>

// // //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
// // //         <Header />
// // //         <main className="container mx-auto px-4 py-8 max-w-4xl">
// // //           <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
// // //             <ArrowLeft size={18} /> Back to Blog
// // //           </Link>

// // //           <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
// // //             <header className="mb-6">
// // //               <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
// // //               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // //                 <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
// // //                 <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
// // //                 <span className="flex items-center gap-1"><Tag size={16} /> {post.category}</span>
// // //               </div>
// // //               <div className="flex flex-wrap gap-2 mt-3">
// // //                 {post.tags.map(tag => (
// // //                   <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">#{tag}</span>
// // //                 ))}
// // //               </div>
// // //             </header>

// // //             {post.videoId && (
// // //               <div className="mb-6">
// // //                 <YouTubePlayer videoId={post.videoId} title={post.title} autoplay={false} loop={false} />
// // //               </div>
// // //             )}

// // //             <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

// // //             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
// // //               <h3 className="text-lg font-semibold mb-2">Share this post</h3>
// // //               {/* Social share buttons can be added here */}
// // //             </div>
// // //           </article>
// // //         </main>
// // //         <Footer />
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // export const getStaticPaths: GetStaticPaths = async () => {
// // //   const posts = getBlogPosts();
// // //   const paths = posts.map((post) => ({
// // //     params: { slug: post.slug },
// // //   }));
// // //   return { paths, fallback: 'blocking' };
// // // };

// // // export const getStaticProps: GetStaticProps = async ({ params }) => {
// // //   const post = getBlogPostBySlug(params?.slug as string);
// // //   if (!post) {
// // //     return { notFound: true };
// // //   }
// // //   return {
// // //     props: { post },
// // //     revalidate: 3600,
// // //   };
// // // };



// // // pages/blog/[slug].tsx
// // import React from 'react';
// // import Head from 'next/head';
// // import { GetStaticPaths, GetStaticProps } from 'next';
// // import { useRouter } from 'next/router';
// // import { blogPosts } from '../../data/blogPosts';
// // import { BlogPost } from '../../types';          // fixed import
// // import Header from '../../components/Header';
// // import Footer from '../../components/Footer';
// // import YouTubePlayer from '../../components/YouTubePlayer';
// // import ShareButtons from '../../components/ShareButtons';
// // import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
// // import Link from 'next/link';

// // const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// // const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// // interface Props {
// //   post: BlogPost;
// // }

// // export default function BlogPostPage({ post }: Props) {
// //   const router = useRouter();

// //   if (router.isFallback) {
// //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// //   }

// //   const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

// //   const blogPostingSchema = {
// //     "@context": "https://schema.org",
// //     "@type": "BlogPosting",
// //     "headline": post.title,
// //     "description": post.excerpt,
// //     "image": post.image,
// //     "datePublished": post.date,
// //     "dateModified": post.date,
// //     "author": {
// //       "@type": "Person",
// //       "name": post.author
// //     },
// //     "publisher": {
// //       "@type": "Organization",
// //       "name": "Movie & TV trailers",
// //       "logo": {
// //         "@type": "ImageObject",
// //         "url": `${BASE_URL}/logo.png`
// //       }
// //     },
// //     "mainEntityOfPage": {
// //       "@type": "WebPage",
// //       "@id": canonicalUrl
// //     },
// //     ...(post.videoId ? {
// //       "video": {
// //         "@type": "VideoObject",
// //         "name": `${post.title} - Trailer`,
// //         "description": post.excerpt,
// //         "thumbnailUrl": post.image,
// //         "uploadDate": post.date,
// //         "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
// //       }
// //     } : {})
// //   };

// //   return (
// //     <>
// //       <Head>
// //         <title>{post.title} – Movie & TV trailers Blog</title>
// //         <meta name="description" content={post.excerpt} />
// //         <link rel="canonical" href={canonicalUrl} />
// //         <meta property="fb:app_id" content={FB_APP_ID} />
// //         <meta property="og:site_name" content="Movie & TV trailers" />
// //         <meta property="og:type" content="article" />
// //         <meta property="og:url" content={canonicalUrl} />
// //         <meta property="og:title" content={post.title} />
// //         <meta property="og:description" content={post.excerpt} />
// //         <meta property="og:image" content={post.image} />
// //         <meta property="og:image:width" content="1200" />
// //         <meta property="og:image:height" content="630" />
// //         <meta property="article:published_time" content={post.date} />
// //         <meta property="article:author" content={post.author} />
// //         {/* Use first tag as article:section if available */}
// //         {post.tags && post.tags.length > 0 && (
// //           <meta property="article:section" content={post.tags[0]} />
// //         )}
// //         <meta property="article:tag" content={post.tags.join(', ')} />
// //         <meta name="twitter:card" content="summary_large_image" />
// //         <meta name="twitter:site" content="@MovieTVTrailers" />
// //         <meta name="twitter:creator" content="@MovieTVTrailers" />
// //         <meta name="twitter:title" content={post.title} />
// //         <meta name="twitter:description" content={post.excerpt} />
// //         <meta name="twitter:image" content={post.image} />
// //         {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}
// //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
// //       </Head>

// //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
// //         <Header />
// //         <main className="container mx-auto px-4 py-8 max-w-4xl">
// //           <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
// //             <ArrowLeft size={18} /> Back to Blog
// //           </Link>

// //           <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
// //             <header className="mb-6">
// //               <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
// //               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// //                 <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
// //                 <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
// //                 {/* Use first tag as category if available */}
// //                 {post.tags && post.tags.length > 0 && (
// //                   <span className="flex items-center gap-1"><Tag size={16} /> {post.tags[0]}</span>
// //                 )}
// //               </div>
// //               <div className="flex flex-wrap gap-2 mt-3">
// //                 {post.tags.map(tag => (
// //                   <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">#{tag}</span>
// //                 ))}
// //               </div>
// //             </header>

// //             {post.videoId && (
// //               <div className="mb-6">
// //                 <YouTubePlayer videoId={post.videoId} title={post.title} autoplay={false} loop={false} />
// //               </div>
// //             )}

// //             <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

// //             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
// //               <h3 className="text-lg font-semibold mb-4">Share this post</h3>
// //               <ShareButtons url={canonicalUrl} title={post.title} description={post.excerpt} />
// //             </div>
// //           </article>
// //         </main>
// //         <Footer />
// //       </div>
// //     </>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   const paths = blogPosts.map((post) => ({
// //     params: { slug: post.slug },
// //   }));
// //   return { paths, fallback: 'blocking' };
// // };

// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   const post = blogPosts.find((p) => p.slug === params?.slug);
// //   if (!post) {
// //     return { notFound: true };
// //   }
// //   return {
// //     props: { post },
// //     revalidate: 3600,
// //   };
// // };










// // import React from 'react';
// // import Head from 'next/head';
// // import { GetStaticPaths, GetStaticProps } from 'next';
// // import { useRouter } from 'next/router';
// // import { blogPosts } from '../../data/blogPosts';
// // import { BlogPost } from '../../types';
// // import Header from '../../components/Header';
// // import Footer from '../../components/Footer';
// // import YouTubePlayer from '../../components/YouTubePlayer';
// // import ShareButtons from '../../components/ShareButtons';
// // import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
// // import Link from 'next/link';

// // const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// // const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// // interface Props {
// //   post: BlogPost | null;
// // }

// // export default function BlogPostPage({ post }: Props) {
// //   const router = useRouter();

// //   if (router.isFallback) {
// //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// //   }

// //   if (!post) {
// //     return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
// //   }

// //   const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

// //   const blogPostingSchema = {
// //     "@context": "https://schema.org",
// //     "@type": "BlogPosting",
// //     "headline": post.title,
// //     "description": post.excerpt,
// //     "image": post.image,
// //     "datePublished": post.date,
// //     "dateModified": post.date,
// //     "author": {
// //       "@type": "Person",
// //       "name": post.author
// //     },
// //     "publisher": {
// //       "@type": "Organization",
// //       "name": "Movie & TV trailers",
// //       "logo": {
// //         "@type": "ImageObject",
// //         "url": `${BASE_URL}/logo.png`
// //       }
// //     },
// //     "mainEntityOfPage": {
// //       "@type": "WebPage",
// //       "@id": canonicalUrl
// //     },
// //     ...(post.videoId ? {
// //       "video": {
// //         "@type": "VideoObject",
// //         "name": `${post.title} - Trailer`,
// //         "description": post.excerpt,
// //         "thumbnailUrl": post.image,
// //         "uploadDate": post.date,
// //         "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
// //       }
// //     } : {})
// //   };

// //   // Safely format date
// //   const formattedDate = (() => {
// //     try {
// //       return new Date(post.date).toLocaleDateString('en-US', {
// //         year: 'numeric',
// //         month: 'long',
// //         day: 'numeric'
// //       });
// //     } catch {
// //       return post.date;
// //     }
// //   })();

// //   return (
// //     <>
// //       <Head>
// //         <title>{post.title} – Movie & TV trailers Blog</title>
// //         <meta name="description" content={post.excerpt} />
// //         <link rel="canonical" href={canonicalUrl} />
// //         <meta property="fb:app_id" content={FB_APP_ID} />
// //         <meta property="og:site_name" content="Movie & TV trailers" />
// //         <meta property="og:type" content="article" />
// //         <meta property="og:url" content={canonicalUrl} />
// //         <meta property="og:title" content={post.title} />
// //         <meta property="og:description" content={post.excerpt} />
// //         <meta property="og:image" content={post.image} />
// //         <meta property="og:image:width" content="1200" />
// //         <meta property="og:image:height" content="630" />
// //         <meta property="article:published_time" content={post.date} />
// //         <meta property="article:author" content={post.author} />
// //         {post.tags && post.tags.length > 0 && (
// //           <meta property="article:section" content={post.tags[0]} />
// //         )}
// //         <meta property="article:tag" content={post.tags.join(', ')} />
// //         <meta name="twitter:card" content="summary_large_image" />
// //         <meta name="twitter:site" content="@MovieTVTrailers" />
// //         <meta name="twitter:creator" content="@MovieTVTrailers" />
// //         <meta name="twitter:title" content={post.title} />
// //         <meta name="twitter:description" content={post.excerpt} />
// //         <meta name="twitter:image" content={post.image} />
// //         {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}
// //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
// //       </Head>

// //       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
// //         <Header />
// //         <main className="container mx-auto px-4 py-8 max-w-4xl">
// //           <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
// //             <ArrowLeft size={18} /> Back to Blog
// //           </Link>

// //           <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
// //             <header className="mb-6">
// //               <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
// //               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// //                 <span className="flex items-center gap-1"><Calendar size={16} /> {formattedDate}</span>
// //                 <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
// //                 {post.tags && post.tags.length > 0 && (
// //                   <span className="flex items-center gap-1"><Tag size={16} /> {post.tags[0]}</span>
// //                 )}
// //               </div>
// //               <div className="flex flex-wrap gap-2 mt-3">
// //                 {post.tags.map(tag => (
// //                   <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">#{tag}</span>
// //                 ))}
// //               </div>
// //             </header>

// //             {post.videoId && (
// //               <div className="mb-6">
// //                 <YouTubePlayer videoId={post.videoId} title={post.title} autoplay={false} loop={false} />
// //               </div>
// //             )}

// //             <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

// //             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
// //               <h3 className="text-lg font-semibold mb-4">Share this post</h3>
// //               <ShareButtons url={canonicalUrl} title={post.title} description={post.excerpt} />
// //             </div>
// //           </article>
// //         </main>
// //         <Footer />
// //       </div>
// //     </>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   try {
// //     const paths = blogPosts.map((post) => ({
// //       params: { slug: post.slug },
// //     }));
// //     return { paths, fallback: 'blocking' };
// //   } catch (error) {
// //     console.error('Error in getStaticPaths:', error);
// //     return { paths: [], fallback: 'blocking' };
// //   }
// // };

// // export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
// //   try {
// //     const post = blogPosts.find((p) => p.slug === params?.slug);
// //     if (!post) {
// //       return { notFound: true };
// //     }
// //     return {
// //       props: { post },
// //       revalidate: 3600, // 1 hour
// //     };
// //   } catch (error) {
// //     console.error('Error in getStaticProps:', error);
// //     return {
// //       props: { post: null },
// //       revalidate: 3600,
// //     };
// //   }
// // };








// import React from 'react';
// import Head from 'next/head';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { blogPosts } from '../../data/blogPosts';
// import { BlogPost } from '../../types';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import ShareButtons from '../../components/ShareButtons';
// import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
// import Link from 'next/link';

// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
// const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

// interface Props {
//   post: BlogPost | null;
// }

// export default function BlogPostPage({ post }: Props) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   if (!post) {
//     return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
//   }

//   const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

//   // Structured data for SEO
//   const blogPostingSchema = {
//     "@context": "https://schema.org",
//     "@type": "BlogPosting",
//     "headline": post.title,
//     "description": post.excerpt,
//     "image": post.image,
//     "datePublished": post.date,
//     "dateModified": post.date,
//     "author": {
//       "@type": "Person",
//       "name": post.author
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "Movie & TV trailers",
//       "logo": {
//         "@type": "ImageObject",
//         "url": `${BASE_URL}/logo.png`
//       }
//     },
//     "mainEntityOfPage": {
//       "@type": "WebPage",
//       "@id": canonicalUrl
//     },
//     ...(post.videoId ? {
//       "video": {
//         "@type": "VideoObject",
//         "name": `${post.title} - Trailer`,
//         "description": post.excerpt,
//         "thumbnailUrl": post.image,
//         "uploadDate": post.date,
//         "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
//       }
//     } : {})
//   };

//   // Safely format date
//   const formattedDate = (() => {
//     try {
//       return new Date(post.date).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch {
//       return post.date;
//     }
//   })();

//   return (
//     <>
//       <Head>
//         <title>{post.title} – Movie & TV trailers Blog</title>
//         <meta name="description" content={post.excerpt} />
//         <link rel="canonical" href={canonicalUrl} />

//         {/* Facebook / Open Graph */}
//         <meta property="fb:app_id" content={FB_APP_ID} />
//         <meta property="og:site_name" content="Movie & TV trailers" />
//         <meta property="og:type" content="article" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:title" content={post.title} />
//         <meta property="og:description" content={post.excerpt} />
//         <meta property="og:image" content={post.image} />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="article:published_time" content={post.date} />
//         <meta property="article:author" content={post.author} />
//         {post.tags && post.tags.length > 0 && (
//           <meta property="article:section" content={post.tags[0]} />
//         )}
//         <meta property="article:tag" content={post.tags.join(', ')} />

//         {/* Twitter */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@MovieTVTrailers" />
//         <meta name="twitter:creator" content="@MovieTVTrailers" />
//         <meta name="twitter:title" content={post.title} />
//         <meta name="twitter:description" content={post.excerpt} />
//         <meta name="twitter:image" content={post.image} />
//         {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}

//         {/* Structured data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
//         />
//       </Head>

//       <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//         <Header />
//         <main className="container mx-auto px-4 py-8 max-w-4xl">
//           <Link
//             href="/blog"
//             className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
//           >
//             <ArrowLeft size={18} /> Back to Blog
//           </Link>

//           <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
//             <header className="mb-6">
//               <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
//               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                 <span className="flex items-center gap-1">
//                   <Calendar size={16} /> {formattedDate}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <User size={16} /> {post.author}
//                 </span>
//                 {post.tags && post.tags.length > 0 && (
//                   <span className="flex items-center gap-1">
//                     <Tag size={16} /> {post.tags[0]}
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {post.tags.map(tag => (
//                   <span
//                     key={tag}
//                     className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </header>

//             {post.videoId && (
//               <div className="mb-6">
//                 <YouTubePlayer
//                   videoId={post.videoId}
//                   title={post.title}
//                   autoplay={false}
//                   loop={false}
//                 />
//               </div>
//             )}

//             <div
//               className="prose prose-lg dark:prose-invert max-w-none"
//               dangerouslySetInnerHTML={{ __html: post.content }}
//             />

//             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
//               <h3 className="text-lg font-semibold mb-4">Share this post</h3>
//               <ShareButtons
//                 contentType="blog"
//                 contentId={post.id}
//                 url={canonicalUrl}
//               />
//             </div>
//           </article>
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const paths = blogPosts.map(post => ({
//       params: { slug: post.slug },
//     }));
//     return { paths, fallback: 'blocking' };
//   } catch (error) {
//     console.error('Error in getStaticPaths:', error);
//     return { paths: [], fallback: 'blocking' };
//   }
// };

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   try {
//     const post = blogPosts.find(p => p.slug === params?.slug);
//     if (!post) {
//       return { notFound: true };
//     }
//     return {
//       props: { post },
//       revalidate: 3600, // 1 hour
//     };
//   } catch (error) {
//     console.error('Error in getStaticProps:', error);
//     return {
//       props: { post: null },
//       revalidate: 3600,
//     };
//   }
// };





import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { blogPosts } from '../../data/blogPosts';
import { BlogPost } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import YouTubePlayer from '../../components/YouTubePlayer';
import ShareButtons from '../../components/ShareButtons';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  post: BlogPost | null;
}

export default function BlogPostPage({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  // Structured data for SEO
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Movie & TV trailers",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    ...(post.videoId ? {
      "video": {
        "@type": "VideoObject",
        "name": `${post.title} - Trailer`,
        "description": post.excerpt,
        "thumbnailUrl": post.image,
        "uploadDate": post.date,
        "embedUrl": `https://www.youtube.com/embed/${post.videoId}`
      }
    } : {})
  };

  // Safely format date
  const formattedDate = (() => {
    try {
      return new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return post.date;
    }
  })();

  return (
    <>
      <Head>
        <title>{post.title} – Movie & TV trailers Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Facebook / Open Graph */}
        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content="Movie & TV trailers" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags && post.tags.length > 0 && (
          <meta property="article:section" content={post.tags[0]} />
        )}
        <meta property="article:tag" content={post.tags.join(', ')} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:creator" content="@MovieTVTrailers" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        {post.videoId && <meta name="twitter:player" content={`https://www.youtube.com/embed/${post.videoId}`} />}

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          <article className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 p-6 md:p-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <User size={16} /> {post.author}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Tag size={16} /> {post.tags[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            {post.videoId && (
              <div className="mb-6">
                <YouTubePlayer
                  videoId={post.videoId}
                  title={post.title}
                  autoplay={false}
                  loop={false}
                />
              </div>
            )}

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-semibold mb-4">Share this post</h3>
              {/* ✅ Fixed ShareButtons props – now using url, title, description */}
              <ShareButtons
                url={canonicalUrl}
                title={post.title}
                description={post.excerpt}
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = blogPosts.map(post => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const post = blogPosts.find(p => p.slug === params?.slug);
    if (!post) {
      return { notFound: true };
    }
    return {
      props: { post },
      revalidate: 3600, // 1 hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: { post: null },
      revalidate: 3600,
    };
  }
};