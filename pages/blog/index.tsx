import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { blogPosts } from '../../data/blogPosts';
import { BlogPost } from '../../types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { voiceManager } from '../../lib/core/VoiceManager';
import { Calendar, User, Tag, Volume2 } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-tv-trailers.vercel.app';
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

interface Props {
  posts: BlogPost[];
  buildDateString: string;
}

export default function BlogIndex({ posts, buildDateString }: Props) {
  // Auto‑speak the page content after a short delay (once on mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      readPageContent();
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      voiceManager.speak(
        'Blog page. Read the latest news, reviews, and guides about movies, TV shows, live sports, and more. Click the speaker icon to learn about the latest updates.'
      );
    }
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Movie & TV trailers Blog',
    description:
      'Latest news, reviews, and guides about movies, TV shows, sports, and more.',
    url: `${BASE_URL}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>Blog – Movie & TV trailers</title>
        <meta
          name="description"
          content="Read the latest news, reviews, and guides about movies, TV shows, live sports, and more."
        />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content="Movie & TV trailers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
        <meta property="og:title" content="Blog – Movie & TV trailers" />
        <meta
          property="og:description"
          content="Read the latest news, reviews, and guides about movies, TV shows, live sports, and more."
        />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MovieTVTrailers" />
        <meta name="twitter:title" content="Blog – Movie & TV trailers" />
        <meta
          name="twitter:description"
          content="Read the latest news, reviews, and guides."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
            {/* Hidden paragraph – using server‑generated date to avoid hydration mismatch */}
            <p className="page-text hidden">
              We have {posts.length} blog posts. Updated as on {buildDateString}.
            </p>
            <span className="p-2 dark:text-gray-300 mb-4">Read details aloud</span>
            <button
              onClick={readPageContent}
              className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
              title="Read page aloud"
            >
              <Volume2 size={20} />
            </button>
          </div>

          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            News, reviews, and guides from the world of entertainment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const formattedDate = (() => {
                try {
                  return new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                } catch {
                  return post.date;
                }
              })();

              return (
                <article
                  key={post.id}
                  className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/5 hover:shadow-xl transition"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="cursor-pointer">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          loading="lazy"
                        />
                        {post.videoId && (
                          <span className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            🎬 Trailer
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {formattedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={12} /> {post.author}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          {post.tags && post.tags.length > 0 && (
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                              {post.tags[0]}
                            </span>
                          )}
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
                            >
                              <Tag size={12} /> {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const sorted = [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Generate the date on the server using a fixed locale (en-GB)
    const buildDateString = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      props: { posts: sorted, buildDateString },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps (blog index):', error);
    const buildDateString = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return {
      props: { posts: [], buildDateString },
      revalidate: 3600,
    };
  }
};