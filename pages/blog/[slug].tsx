import React, { useEffect, useCallback } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { blogPosts } from '../../data/blogPosts';
import { BlogPost } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import YouTubePlayer from '../../components/YouTubePlayer';
import ShareButtons from '../../components/ShareButtons';
import { voiceManager } from '../../lib/core/VoiceManager';
import { Calendar, User, Tag, ArrowLeft, Volume2 } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  post: BlogPost | null;
}

export default function BlogPostPage({ post }: Props) {
  const router = useRouter();

  // Extract translated text directly from the DOM (after Google Translate)
  const getPageText = useCallback((): string => {
    if (typeof document === 'undefined') return '';
    const titleEl = document.querySelector('h1');
    const contentEl = document.querySelector('.prose'); // main content area
    let text = '';
    if (titleEl?.textContent) {
      text += titleEl.textContent.trim() + '. ';
    }
    if (contentEl?.textContent) {
      text += contentEl.textContent.trim();
    }
    return text;
  }, []);

  // Auto‑speak the translated content after a delay (allows Google Translate to finish)
  useEffect(() => {
    if (!post) return;
    const timer = setTimeout(() => {
      const pageText = getPageText();
      if (pageText) {
        voiceManager.speak(pageText);
      } else {
        voiceManager.speak(`Now reading: ${post.title}`);
      }
    }, 3000); // increased delay for translation
    return () => clearTimeout(timer);
  }, [post, getPageText]);

  // Manual read – uses the current translated DOM content
  const readFullPost = useCallback(() => {
    const pageText = getPageText();
    if (pageText) {
      voiceManager.speak(pageText, true); // true = interrupt previous speech
    }
  }, [getPageText]);

  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  // Structured data for SEO (original English data – does not affect speech)
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
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm dark:text-gray-300 hidden sm:inline">Read full post</span>
                  <button
                    onClick={readFullPost}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
                    title="Read full post aloud"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
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

            {/* Blog content – this div will be translated by Google Translate */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-semibold mb-4">Share this post</h3>
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




