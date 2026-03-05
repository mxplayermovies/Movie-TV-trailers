// pages/watch/[...slug].tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
  getDetails,
  getCast,
  getImageUrl,
  getRecommendations,
  getYouTubeTrailer,
  UNIQUE_MOVIES,
  UNIQUE_TV_SHOWS,
  UNIQUE_SPORTS,
  UNIQUE_TV_LIVE,
  UNIQUE_HINDI_DUBBED,
  UNIQUE_ADULT,
  UNIQUE_DOCUMENTARY,
} from '../../services/tmdb';
import VideoPlayer from '../../components/VideoPlayer';
import YouTubePlayer from '../../components/YouTubePlayer';
import SEO from '../../components/SEO';
import { ContentDetails, CastMember, MediaItem, StreamSource } from '../../types';
import {
  Calendar,
  Clock,
  Star,
  User,
  Share2,
  X,
  Copy,
  Check,
  Lock,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Link from 'next/link';

import { voiceManager } from '../../lib/core/VoiceManager';
import { musicController } from '../../lib/core/MusicController';

interface WatchPageProps {
  details: Omit<ContentDetails, 'streams'> | null;
  cast: CastMember[];
  initialRecommendations: MediaItem[];
  type: 'movie' | 'tv' | 'sports' | 'tv_live';
  id: string;
  youtubeTrailerId: string | null;
  initialStreams?: StreamSource[]; // ✅ NEW: pre‑resolved streams for custom items
}

const WatchPage: React.FC<WatchPageProps> = ({
  details,
  cast,
  initialRecommendations,
  type,
  id,
  youtubeTrailerId,
  initialStreams,
}) => {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<MediaItem[]>(
    initialRecommendations || []
  );
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [streams, setStreams] = useState<StreamSource[]>(initialStreams || []);
  const [loadingStreams, setLoadingStreams] = useState(!initialStreams);

  // ========== TTS PLAY/STOP STATE ==========
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ========== TTS TEXT ==========
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [ttsTitle, setTtsTitle] = useState<string>('');
  const [ttsDescription, setTtsDescription] = useState<string>('');

  // Compute the background music video ID (if any) – only from the details object
  const getBgMusicId = useCallback((): string | null => {
    if (!details) return null;
    // Check if the item has a custom yt_bg_music_id
    if ('yt_bg_music_id' in details && details.yt_bg_music_id) {
      return details.yt_bg_music_id as string;
    }
    // No default fallback – return null if not present
    return null;
  }, [details]);

  // Stop music on unmount (cleanup)
  useEffect(() => {
    return () => {
      voiceManager.stopBackgroundMusic();
      musicController.setCurrentMusicId(null);
    };
  }, []);

  // Unlock audio on first user interaction (any click on the page)
  useEffect(() => {
    const unlockOnce = () => {
      voiceManager.onUserInteraction(); // Unmutes YT player if needed
      document.removeEventListener('click', unlockOnce);
    };
    document.addEventListener('click', unlockOnce);
    return () => document.removeEventListener('click', unlockOnce);
  }, []);

  // TTS: play/stop toggle (now also controls background music if ID exists)
  const handleSpeakerClick = () => {
    if (isSpeaking) {
      // Stop both TTS and background music
      voiceManager.cancelSpeech();
      voiceManager.stopBackgroundMusic();
      setIsSpeaking(false);
    } else {
      // Start background music only if a video ID exists
      const videoId = getBgMusicId();
      if (videoId) {
        console.log(`[WatchPage] Starting background music: ${videoId}`);
        voiceManager.playBackgroundMusic(videoId);
        musicController.setCurrentMusicId(videoId);
      } else {
        console.log('[WatchPage] No background music ID for this content – TTS only');
      }
      // Then start TTS, and when TTS ends, stop background music as well
      const finalTitle = ttsTitle || details?.title || details?.name || '';
      const finalDescription = ttsDescription || details?.overview || '';
      if (!finalTitle && !finalDescription) return;
      const textToSpeak = `${finalTitle}. ${finalDescription}`.trim();
      if (!textToSpeak) return;

      voiceManager.speak(textToSpeak, true, true, () => {
        // TTS ended naturally – stop background music too
        voiceManager.stopBackgroundMusic();
        setIsSpeaking(false);
      });
      setIsSpeaking(true);
    }
  };

  // Update ttsTitle and ttsDescription when DOM changes (translation)
  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current) return;

    setTtsTitle(titleRef.current.innerText || details?.title || details?.name || '');
    setTtsDescription(descriptionRef.current.innerText || details?.overview || '');

    const observer = new MutationObserver(() => {
      if (titleRef.current) setTtsTitle(titleRef.current.innerText);
      if (descriptionRef.current) setTtsDescription(descriptionRef.current.innerText);
    });

    observer.observe(titleRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    observer.observe(descriptionRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [details]);

  // Fetch streams client-side only if not provided via initialStreams
  useEffect(() => {
    if (initialStreams || !details) return;
    const fetchStreams = async () => {
      try {
        const url = `/api/streams?id=${encodeURIComponent(id)}&type=${type}`; // use rawId
        const res = await fetch(url);
        if (!res.ok) {
          if (res.status === 404) setStreams([]);
          else throw new Error('Failed to fetch streams');
        } else {
          const data = await res.json();
          setStreams(data.streams || []);
        }
      } catch (error) {
        console.error('Error fetching streams:', error);
        setStreams([]);
      } finally {
        setLoadingStreams(false);
      }
    };
    fetchStreams();
  }, [id, type, details, initialStreams]);

  // Load recommendations if needed
  useEffect(() => {
    if ((!initialRecommendations || initialRecommendations.length === 0) && details) {
      getRecommendations(type, id).then(setRecommendations);
    }
  }, [type, id, details, initialRecommendations]);

  if (!details) {
    return (
      <div className="min-h-screen bg-miraj-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Content Not Found</h1>
          <Link href="/" className="text-miraj-gold hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const title = details.title || details.name || 'Unknown Title';
  const date = details.release_date || details.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const description = details.overview || `Watch ${title} online for free.`;

  let schemaType = 'Movie';
  if (type === 'tv') schemaType = 'TVSeries';
  else if (type === 'sports') schemaType = 'SportsEvent';
  else if (type === 'tv_live') schemaType = 'TVSeries';

  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: title,
    description,
    image: [getImageUrl(details.poster_path, 'original')],
    datePublished: date,
    aggregateRating: details.vote_average
      ? {
          '@type': 'AggregateRating',
          ratingValue: details.vote_average.toFixed(1),
          bestRating: '10',
          ratingCount: 100,
        }
      : undefined,
    genre: details.genres?.map((g) => (typeof g === 'string' ? g : g.name)),
    actor: cast.slice(0, 5).map((person) => ({
      '@type': 'Person',
      name: person.name,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://movie-tv-trailers.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: type === 'movie' ? 'Movies' : type === 'tv' ? 'TV Shows' : type === 'sports' ? 'Sports' : 'Live TV',
        item: `https://movie-tv-trailers.vercel.app/${
          type === 'movie' ? 'movies' : type === 'tv' ? 'tv' : type === 'sports' ? 'sports' : 'live'
        }`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ],
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePayNow = () => setShowPaymentModal(true);
  const handlePaymentComplete = () => {
    setIsPaidUser(true);
    setShowPaymentModal(false);
  };

  const getUnlockTitle = () => {
    switch (type) {
      case 'movie': return 'Unlock Full Movie';
      case 'tv': return 'Unlock Full TV Show';
      case 'sports': return 'Unlock Full Sports Event';
      case 'tv_live': return 'Unlock Live TV';
      default: return 'Unlock Full Content';
    }
  };

  const getUnlockDescription = () => {
    switch (type) {
      case 'movie': return 'Watch the complete movie in HD quality without interruptions';
      case 'tv': return 'Watch all episodes in HD quality without interruptions';
      case 'sports': return 'Watch the full sports event in HD quality without interruptions';
      case 'tv_live': return 'Watch live TV in HD quality without interruptions';
      default: return 'Watch full content in HD quality without interruptions';
    }
  };

  return (
    <div className="min-h-screen bg-miraj-black pt-20 md:pt-28 pb-20 relative">
      {/* Read Aloud button (speaker icon + text) – controls both TTS and optional background music */}
      {details.overview && (
        <button
          onClick={handleSpeakerClick}
          className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
            isSpeaking
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
              : 'bg-miraj-gold/20 text-miraj-gold hover:bg-miraj-gold hover:text-black'
          }`}
          title={isSpeaking ? 'Stop reading and music' : 'Read title and description aloud with background music (if available)'}
        >
          {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span className="text-sm text-gray-300 dark:text-gray-300">Read aloud</span>
        </button>
      )}

      {!isPaidUser && youtubeTrailerId ? (
        <>
          <SEO
            title={`${title} - Official Trailer | Watch Free on Movie & TV trailers`}
            description={`Watch the official trailer for ${title}. ${description.substring(0, 150)}... Unlock the full movie in HD quality.`}
            image={getImageUrl(details.backdrop_path || details.poster_path, 'original')}
            type="video.other"
            path={router.asPath}
            keywords={[`${title} trailer`, `${title} official trailer`, `watch ${title} trailer`, `${title} movie trailer`, `${title} preview`, 'movie trailers', 'film trailers', 'free stream Movies', 'free movie trailers', 'HD trailers']}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'VideoObject',
                name: `${title} - Official Trailer`,
                description: `Watch the official trailer for ${title}. ${description}`,
                thumbnailUrl: getImageUrl(details.backdrop_path || details.poster_path, 'original'),
                uploadDate: details.release_date || new Date().toISOString(),
                contentUrl: `https://www.youtube.com/watch?v=${youtubeTrailerId}`,
                embedUrl: `https://www.youtube.com/embed/${youtubeTrailerId}`,
                duration: 'PT2M30S',
                publisher: {
                  '@type': 'Organization',
                  name: 'Movie & TV trailers',
                  logo: { '@type': 'ImageObject', url: 'https://movie-tv-trailers.vercel.app/logo.png' },
                },
              }),
            }}
          />
        </>
      ) : (
        <SEO
          title={`${title} - Watch Free on Movie & TV trailers`}
          description={description}
          image={getImageUrl(details.poster_path, 'original')}
          type="video.movie"
          schema={schema}
          path={router.asPath}
        />
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Share Modal */}
      {isShareOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-miraj-gray border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">Share Content</h3>
              <button onClick={() => setIsShareOpen(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
                <input className="bg-transparent text-gray-300 text-sm flex-1 outline-none" readOnly value={typeof window !== 'undefined' ? window.location.href : ''} />
                <button onClick={handleCopyLink} className="p-2 bg-white/10 rounded hover:bg-white/20">
                  {copiedLink ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-miraj-gray border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Lock size={20} className="text-miraj-gold" /> Unlock Full Content</h3>
              <button onClick={() => setShowPaymentModal(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">Get unlimited access to watch full movies and TV shows in HD quality.</p>
              <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Premium Access</span>
                  <span className="text-2xl font-bold text-miraj-gold">Free for Now</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-1 mt-4">
                  <li>✓ Unlimited HD Streaming</li>
                  <li>✓ No Ads</li>
                  <li>✓ Download for Offline Viewing</li>
                  <li>✓ Access to Premium Content</li>
                </ul>
              </div>
              <button onClick={handlePaymentComplete} className="w-full bg-gradient-to-r from-miraj-gold to-yellow-500 text-black font-bold py-3 rounded-full hover:shadow-lg hover:shadow-miraj-gold/50 transition-all">Watch Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Player Section */}
      <div className="container mx-auto px-0 md:px-6 mb-8 mt-4 relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          {!isPaidUser && youtubeTrailerId ? (
            <YouTubePlayer videoId={youtubeTrailerId} title={`${title} - Trailer`} autoplay={true} loop={true} />
          ) : (
            <>
              {loadingStreams ? (
                <div className="aspect-video bg-miraj-gray rounded-xl flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-white/5 border-t-miraj-gold rounded-full animate-spin" />
                </div>
              ) : (
                <VideoPlayer
                  tmdbId={id}
                  type={type}
                  title={title}
                  season={season}
                  episode={episode}
                  customStreams={streams} // ✅ streams already include documentary streams
                />
              )}
            </>
          )}

          {!isPaidUser && youtubeTrailerId && (
            <div className="mt-6 bg-gradient-to-r from-miraj-red/20 to-miraj-gold/20 border-2 border-miraj-gold/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Lock size={20} className="text-miraj-gold" /> {getUnlockTitle()}</h3>
                  <p className="text-gray-300 text-sm">{getUnlockDescription()}</p>
                </div>
                <button onClick={handlePayNow} className="flex items-center gap-2 bg-gradient-to-r from-miraj-gold to-yellow-500 hover:from-yellow-500 hover:to-miraj-gold text-black font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-miraj-gold/50 whitespace-nowrap">
                  <Play size={20} fill="currentColor" /> <span>Pay Now</span>
                </button>
              </div>
            </div>
          )}

          {type === 'tv' && isPaidUser && (
            <div className="bg-miraj-gray border border-white/5 p-4 mt-4 rounded-xl flex items-center gap-4">
              <div className="flex flex-col">
                <label className="text-xs text-gray-400 font-bold mb-1">SEASON</label>
                <input type="number" min="1" value={season} onChange={(e) => setSeason(parseInt(e.target.value))} className="bg-black/50 border border-white/10 rounded px-3 py-2 text-white w-20 text-center font-bold focus:border-miraj-gold focus:outline-none" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-400 font-bold mb-1">EPISODE</label>
                <input type="number" min="1" value={episode} onChange={(e) => setEpisode(parseInt(e.target.value))} className="bg-black/50 border border-white/10 rounded px-3 py-2 text-white w-20 text-center font-bold focus:border-miraj-gold focus:outline-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details & Cast */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 max-w-7xl mx-auto">
          <div className="hidden md:block w-[300px] flex-shrink-0">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
              <img src={getImageUrl(details.poster_path)} alt={title} className="w-full h-full object-cover" style={{ filter: 'url(#ultraSharp) brightness(1.05) contrast(1.1) saturate(1.08) hue-rotate(5deg)' }} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <h1 ref={titleRef} className="text-2xl md:text-5xl font-bold text-white mb-2">
                {title}
              </h1>
              <button onClick={() => setIsShareOpen(true)} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-miraj-gold hover:text-black transition-colors border border-white/5">
                <Share2 size={18} /> <span className="hidden sm:inline font-bold text-sm">Share</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300 mb-6 flex-wrap">
              <span className="flex items-center gap-1 text-miraj-gold font-bold bg-miraj-gold/10 px-2 py-1 rounded"><Star size={14} fill="currentColor" /> {details.vote_average?.toFixed(1) || 'N/A'}</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> {year}</span>
              {details.runtime && <span className="flex items-center gap-1"><Clock size={16} /> {details.runtime}m</span>}
              <span className="border border-white/20 px-2 py-0.5 rounded text-xs uppercase font-bold">
                {type === 'tv_live' ? 'Live TV' : type.replace('_', ' ')}
              </span>
            </div>

            <p ref={descriptionRef} className="text-gray-400 leading-relaxed text-lg mb-8">
              {description}
            </p>

            {cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Cast</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {cast.slice(0, 5).map((person) => (
                    <div key={person.id} className="text-center group">
                      <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-white/5 border border-white/5 group-hover:border-miraj-gold/50 transition-colors">
                        {person.profile_path ? (
                          <img src={getImageUrl(person.profile_path)} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-full h-full p-4 text-gray-500" />
                        )}
                      </div>
                      <p className="text-xs font-bold text-white truncate">{person.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-6">You May Also Like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommendations.map((item) => (
                <Link key={item.id} href={`/watch/${item.media_type || 'movie'}/${item.id}`} className="group relative block">
                  <div className="aspect-[2/3] rounded-xl overflow-hidden bg-miraj-gray border border-white/5 shadow-lg">
                    <img src={getImageUrl(item.poster_path)} alt={item.title || item.name} className="w-full h-full object-cover group-hover:opacity-60 transition-opacity" style={{ filter: 'url(#ultraSharp) brightness(1.05) contrast(1.1) saturate(1.08) hue-rotate(5deg)' }} />
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-white truncate group-hover:text-miraj-gold transition-colors">{item.title || item.name}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (!slug || !Array.isArray(slug) || slug.length < 2) return { notFound: true };

  const type = slug[0] as 'movie' | 'tv' | 'sports' | 'tv_live';
  const rawId = slug[1]; // full ID (may be a string like "cheetahs-up-close...")
  let id = rawId;
  // For TMDB numeric IDs we may want to strip the slug suffix, but keep rawId for custom lookup
  if ((type === 'movie' || type === 'tv') && /^\d+/.test(rawId)) {
    id = rawId.split('-')[0]; // numeric part for TMDB API
  }

  try {
    let customItem: ContentDetails | null = null;
    let streamsForCustom: StreamSource[] | undefined;

    // Search all custom arrays for a match using both rawId and id (numeric part)
    const customArrays = {
      movie: [UNIQUE_MOVIES, UNIQUE_HINDI_DUBBED, UNIQUE_ADULT, UNIQUE_DOCUMENTARY],
      tv: [UNIQUE_TV_SHOWS],
      sports: [UNIQUE_SPORTS],
      tv_live: [UNIQUE_TV_LIVE],
    };

    const arrays = customArrays[type] || [];
    for (const arr of arrays) {
      const found = arr?.find((item) => String(item.id) === rawId || String(item.id) === id);
      if (found) {
        customItem = found as ContentDetails;
        // Convert streams to StreamSource[] if present
        if (found.streams) {
          if (Array.isArray(found.streams)) {
            streamsForCustom = found.streams as StreamSource[];
          } else {
            // Convert Record<string,string> to StreamSource[]
            streamsForCustom = Object.entries(found.streams).map(([name, url], i) => ({
              id: `srv-${i}`,
              name,
              url: String(url),
              quality: 'HD',
              type: String(url).includes('.m3u8') || String(url).includes('hls') ? 'hls' : 'iframe',
            }));
          }
        }
        break;
      }
    }

    let details: ContentDetails | null = null;
    let cast: CastMember[] = [];
    let recommendations: MediaItem[] = [];
    let youtubeTrailerId: string | null = null;

    if (customItem) {
      details = customItem;
      // For custom items, cast and recommendations are empty; we might still try to fetch from TMDB if numeric?
      // We'll keep them empty; the page will show just the details.
      if ('yt_id' in customItem && typeof customItem.yt_id === 'string') {
        youtubeTrailerId = customItem.yt_id;
      }
    } else {
      // Not a custom item – fetch from TMDB API
      try {
        details = await getDetails(type, id);
      } catch (e) {
        console.warn('TMDB details fetch failed:', e);
      }
      if (!details) return { notFound: true };

      if (type === 'movie' || type === 'tv') {
        try { cast = await getCast(type, id); } catch (e) { console.warn('Cast fetch failed'); }
        try { recommendations = await getRecommendations(type, id); } catch (e) { console.warn('Recs fetch failed'); }
        try { youtubeTrailerId = await getYouTubeTrailer(type, id); } catch (e) { console.warn('YouTube trailer fetch failed'); }
      }
    }

    if (!details) return { notFound: true };

    // Remove streams from details to avoid duplication (they will be passed separately)
    const { streams, ...detailsWithoutStreams } = details;

    return {
      props: {
        details: detailsWithoutStreams,
        cast,
        initialRecommendations: recommendations,
        type,
        id: rawId, // keep rawId for client‑side use (e.g., API calls)
        youtubeTrailerId,
        initialStreams: streamsForCustom || null, // ✅ pass streams for custom items
      },
    };
  } catch (error) {
    console.error('Critical Server Side Error', error);
    return { notFound: true };
  }
};

export default WatchPage;