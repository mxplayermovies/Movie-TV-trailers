// components/ShareButtons.tsx
import React, { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

interface Props {
  url: string;
  title: string;
  image?: string;
  description?: string;
}

const ShareButtons: React.FC<Props> = ({ url, title, image, description }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {/* Facebook reads og:image from page HEAD — it ignores props here.
          The fix is the og:image meta tag in the page, not props on this button. */}
      <FacebookShareButton url={url} className="transition-transform hover:scale-105">
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} className="transition-transform hover:scale-105">
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} className="transition-transform hover:scale-105">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={title} className="transition-transform hover:scale-105">
        <TelegramIcon size={40} round />
      </TelegramShareButton>
      <LinkedinShareButton url={url} title={title} summary={description} className="transition-transform hover:scale-105">
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <EmailShareButton url={url} subject={title} body={`${description || ''}\n\n${url}`} className="transition-transform hover:scale-105">
        <EmailIcon size={40} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;