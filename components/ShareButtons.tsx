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
}

const ShareButtons: React.FC<Props> = ({ url, title, image }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shareProps = {
    url,
    title,
    media: image,
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <FacebookShareButton {...shareProps} className="transition-transform hover:scale-105">
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton {...shareProps} className="transition-transform hover:scale-105">
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <WhatsappShareButton {...shareProps} className="transition-transform hover:scale-105">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <TelegramShareButton {...shareProps} className="transition-transform hover:scale-105">
        <TelegramIcon size={40} round />
      </TelegramShareButton>
      <LinkedinShareButton {...shareProps} className="transition-transform hover:scale-105">
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <EmailShareButton {...shareProps} className="transition-transform hover:scale-105">
        <EmailIcon size={40} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;