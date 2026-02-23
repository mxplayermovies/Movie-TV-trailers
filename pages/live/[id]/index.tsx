// pages/live/[id]/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UNIQUE_TV_LIVE, getDetails } from '../../../services/tmdb';
import { ContentDetails, MediaItem } from '../../../types';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import YouTubePlayer from '../../../components/YouTubePlayer';
import { voiceManager } from '../../../lib/core/VoiceManager';
import { Play, Volume2 } from 'lucide-react';
import { sanitizeMediaItem } from '../../../lib/core/sanitize';
import Recommendations from '../../../components/Recommendations';
import { getOgImageUrl } from '../../../lib/ogImage';

const BASE_URL = 'https://movie-tv-trailers.vercel.app';

interface Props {
  item: Omit<ContentDetails, 'streams'>;
  recommendations: Omit<MediaItem, 'streams'>[];
  ogImage: string;
}

export default function LiveTvDetail({ item, recommendations, ogImage }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = item.title || item.name || 'Live TV';
  const ytId = item.yt_id;
  const shareUrl = `${BASE_URL}/live/${item.id}`;
  const description = item.overview?.slice(0, 160) || `Watch ${title} live stream online.`;
  const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;
  const youtubeEmbedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;

  useEffect(() => {
    if (title) {
      voiceManager.speak(`Now viewing ${title}. Click the speaker icon to learn about the latest updated news.`);
    }
  }, [title]);

  const readDetails = () => {
    voiceManager.speak(`${title}. ${item.overview || ''}`, true);
  };

  const handlePlay = () => {
    setLoading(true);
    router.push(`/watch/${item.id}?type=tv_live`);
  };

  return (
    <>
      <Head>
        <title>{title} - Watch Live | Movie & TV Trailers</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={shareUrl} />

        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={`${title} - Watch Live`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="780" />
        <meta property="og:image:height" content="438" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="Movie & TV Trailers" />
        {youtubeWatchUrl && <meta property="og:video" content={youtubeWatchUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:url" content={youtubeEmbedUrl} />}
        {youtubeEmbedUrl && <meta property="og:video:secure_url" content={youtubeEmbedUrl} />}
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Watch Live`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={title} />
        {youtubeEmbedUrl && <meta name="twitter:player" content={youtubeEmbedUrl} />}
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={readDetails}
              className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              <Volume2 size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{item.overview}</p>
              <div className="flex items-center gap-4 mb-6">
                {item.duration && <span>{item.duration}</span>}
              </div>
              <button
                onClick={handlePlay}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50"
              >
                <Play size={20} />
                {loading ? 'Loading...' : 'Watch Live'}
              </button>
            </div>
            <div>
              <YouTubePlayer videoId={ytId} title={title} autoplay loop />
            </div>
          </div>

          <Recommendations items={recommendations} basePath="/live" title="More Live Channels" />
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = UNIQUE_TV_LIVE.map((item) => ({
    params: { id: String(item.id) },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const item = await getDetails('tv_live', id);
    const sanitizedItem = sanitizeMediaItem(item);
    const ogImage = getOgImageUrl(sanitizedItem.poster_path);

    const allItems = UNIQUE_TV_LIVE.map(sanitizeMediaItem);
    const recommendations = allItems
      .filter(m => String(m.id) !== String(id))
      .slice(0, 6);

    return {
      props: { item: sanitizedItem, recommendations, ogImage },
      revalidate: 3600,
    };
  } catch {
    return { notFound: true };
  }
};