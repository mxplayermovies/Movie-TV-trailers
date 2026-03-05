import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  schema?: Record<string, any>;
  path?: string;
  keywords?: string[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Movie & TV trailers - Stream thousands of Movies, TV Shows, and Live Sports for free in HD quality. No registration required.",
  image = "https://movie-tv-trailers.vercel.app/logo.png",
  type = "website",
  schema,
  path = "",
  keywords = ['free','watch Free','free 2026','free streaming','free online','free movies','online movies','watch movies online','movie streaming','film','cinema','entertainment','hollywood movies','bollywood movies','hollywood dubbed movies','web Series Online','live sports','streaming','HD streaming']
}) => {
  const siteUrl = "https://movie-tv-trailers.vercel.app/";
  const url = `${siteUrl}${path}`;
  const formattedTitle = title.includes('Movie & TV trailers') ? title : `${title} | Premium Video Entertainment`;

  return (
    <Head>
      <>
        <title>{formattedTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="canonical" href={url} />
        <meta name="facebook-domain-verification" content="2sdb3y62ktx7aiib4gcr8ddhpf2sey" />
        <meta name="yandex-verification" content="58739946990bf4fe" />
        {/* Open Graph */}
        <meta property="og:site_name" content="Movie & TV trailers | Premium Video Entertainment" />
        <meta property="og:title" content={formattedTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={formattedTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@movieandtvtrailers" />
        <meta name="twitter:creator" content="@movieandtvtrailers" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Movie & TV trailers" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data (JSON-LD) */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </>
    </Head>
  );
};

export default SEO;