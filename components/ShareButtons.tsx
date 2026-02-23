// components/ShareButtons.tsx
// Social crawlers (Facebook, WhatsApp etc.) scrape the share URL for OG tags.
// Dynamic pages like /movies/[id] can 500 during static generation.
// Solution: share /api/og?id=xxx&type=movie instead — that route uses only
// static data, never fails, and returns correct OG tags + redirects users
// to the real page automatically.

import React, { useEffect, useState } from 'react';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  TelegramShareButton, TelegramIcon,
  EmailShareButton, EmailIcon,
  LinkedinShareButton, LinkedinIcon,
} from 'react-share';

const BASE_URL = 'https://movie-tv-trailers.vercel.app';

interface Props {
  // Pass the item id and type — ShareButtons builds the og URL internally
  id: string | number;
  type?: 'movie' | 'tv' | 'sports' | 'tv_live';
  title: string;
  description?: string;
  // Also accept a direct url override if needed
  url?: string;
}

const ShareButtons: React.FC<Props> = ({ id, type = 'movie', title, description, url }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use /api/og route as the share URL — crawlers scrape this and get valid OG tags
  // Real users get instantly redirected to the actual page
  const shareUrl = url || `${BASE_URL}/api/og?id=${encodeURIComponent(String(id))}&type=${type}`;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <FacebookShareButton url={shareUrl} className="transition-transform hover:scale-105">
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title} className="transition-transform hover:scale-105">
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title} className="transition-transform hover:scale-105">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <TelegramShareButton url={shareUrl} title={title} className="transition-transform hover:scale-105">
        <TelegramIcon size={40} round />
      </TelegramShareButton>
      <LinkedinShareButton url={shareUrl} title={title} summary={description} className="transition-transform hover:scale-105">
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <EmailShareButton url={shareUrl} subject={title} body={`${description || ''}\n\n${shareUrl}`} className="transition-transform hover:scale-105">
        <EmailIcon size={40} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;