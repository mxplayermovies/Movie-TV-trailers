// components/ShareButtons.tsx
import React from 'react';
import { Facebook, Twitter, Send, Link2 } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  image?: string;
}

const ShareButtons: React.FC<Props> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877f2] hover:bg-[#0e5fbf]',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]',
    },
    {
      name: 'WhatsApp',
      icon: Send,
      href: `https://wa.me/?text=${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#1da851]',
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#26A5E4] hover:bg-[#1e8bc3]',
    },
    {
      name: 'Copy Link',
      icon: Link2,
      onClick: () => navigator.clipboard.writeText(url),
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {shareLinks.map((item) => (
        <button
          key={item.name}
          onClick={item.onClick ? item.onClick : () => window.open(item.href, '_blank')}
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition ${item.color}`}
          title={`Share on ${item.name}`}
        >
          <item.icon size={18} />
          <span className="text-sm font-medium hidden sm:inline">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ShareButtons;