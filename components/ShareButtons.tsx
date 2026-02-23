// components/ShareButtons.tsx
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Send, Link2, Check } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  image?: string; // kept for future use
}

const ShareButtons: React.FC<Props> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server or during the first client render
  // to prevent hydration mismatch
  if (!mounted) return null;

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
  ];

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => alert('Failed to copy link'));
    } else {
      alert('Copy not supported in this browser');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition ${item.color}`}
          title={`Share on ${item.name}`}
        >
          <item.icon size={18} />
          <span className="text-sm font-medium hidden sm:inline">{item.name}</span>
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition ${
          copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
        }`}
        title="Copy link"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
        <span className="text-sm font-medium hidden sm:inline">
          {copied ? 'Copied!' : 'Copy Link'}
        </span>
      </button>
    </div>
  );
};

export default ShareButtons;