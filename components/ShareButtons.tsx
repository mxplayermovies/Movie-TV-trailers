// components/ShareButtons.tsx
import React from 'react';
import { Facebook, Twitter, Send, Link2 } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  image?: string; // kept for future use, not required
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
      onClick: () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(url).catch(() => {
            // fallback – alert or ignore
            alert('Failed to copy link. Please copy manually.');
          });
        } else {
          // fallback for older browsers / server-side (should never happen on click)
          alert('Copy not supported. Please copy manually.');
        }
      },
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  const handleClick = (item: typeof shareLinks[0]) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      if (typeof window !== 'undefined') {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {shareLinks.map((item) => (
        <button
          key={item.name}
          onClick={() => handleClick(item)}
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