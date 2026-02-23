// components/ShareButtons.tsx
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
  url: string;           // direct page URL — required
  title: string;
  description?: string;
  id?: string | number;  // optional — used to build /api/og share URL
  type?: 'movie' | 'tv' | 'sports' | 'tv_live';
}

const ShareButtons: React.FC<Props> = ({ url, title, description, id, type = 'movie' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // If id provided, use /api/og so crawlers always get valid OG tags without 500
  // Otherwise fall back to the direct url
  const shareUrl = id
    ? `${BASE_URL}/api/og?id=${encodeURIComponent(String(id))}&type=${type}`
    : url;

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