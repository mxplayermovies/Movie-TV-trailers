import React from 'react';
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        aria-label="Copy link"
      >
        <Link2 size={18} />
      </button>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import { Facebook, Twitter, Linkedin, Link2, ExternalLink } from 'lucide-react';
// import { blogPosts } from '../data/blogPosts';
// import {
//   UNIQUE_MOVIES,
//   UNIQUE_TV_SHOWS,
//   UNIQUE_SPORTS,
//   UNIQUE_TV_LIVE,
//   UNIQUE_HINDI_DUBBED,
//   UNIQUE_ADULT,
//   UNIQUE_DOCUMENTARY,
//   getImageUrl,
// } from '../services/tmdb';

// interface Props {
//   contentType: 'blog' | 'movie' | 'tv' | 'sports' | 'tv_live' | 'hindi-dubbed' | 'adult' | 'documentary';
//   contentId: string;           // slug for blog, id string for others
//   shareUrl: string;            // URL used for sharing (you want the image URL here)
//   pageUrl: string;             // actual page URL for the "Watch Now" button
// }

// export default function ShareButtons({ contentType, contentId, shareUrl, pageUrl }: Props) {
//   const [title, setTitle] = useState<string>('');
//   const [image, setImage] = useState<string>('');

//   useEffect(() => {
//     if (contentType === 'blog') {
//       const post = blogPosts.find(p => p.id === contentId || p.slug === contentId);
//       if (post) {
//         setTitle(post.title);
//         setImage(post.image);
//       }
//     } else {
//       let dataArray: any[] = [];
//       switch (contentType) {
//         case 'movie':
//           dataArray = UNIQUE_MOVIES;
//           break;
//         case 'tv':
//           dataArray = UNIQUE_TV_SHOWS;
//           break;
//         case 'sports':
//           dataArray = UNIQUE_SPORTS;
//           break;
//         case 'tv_live':
//           dataArray = UNIQUE_TV_LIVE;
//           break;
//         case 'hindi-dubbed':
//           dataArray = UNIQUE_HINDI_DUBBED;
//           break;
//         case 'adult':
//           dataArray = UNIQUE_ADULT;
//           break;
//         case 'documentary':
//           dataArray = UNIQUE_DOCUMENTARY;
//           break;
//       }

//       const item = dataArray.find(i => String(i.id) === contentId);
//       if (item) {
//         setTitle(item.title || item.name || '');
//         const imgPath = item.backdrop_path || item.poster_path;
//         setImage(getImageUrl(imgPath, 'w500'));
//       }
//     }
//   }, [contentType, contentId]);

//   const encodedShareUrl = encodeURIComponent(shareUrl);
//   const encodedTitle = encodeURIComponent(title);

//   if (!title) return null; // loading or not found

//   return (
//     <div className="flex flex-col gap-4">
//       {/* Thumbnail preview */}
//       {image && (
//         <div className="w-24 h-24 rounded overflow-hidden border border-white/10">
//           <img src={image} alt={title} className="w-full h-full object-cover" />
//         </div>
//       )}

//       {/* Social share buttons – using shareUrl (image URL) as the link */}
//       <div className="flex gap-3">
//         <a
//           href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           aria-label="Share on Facebook"
//         >
//           <Facebook size={18} />
//         </a>
//         <a
//           href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600"
//           aria-label="Share on Twitter"
//         >
//           <Twitter size={18} />
//         </a>
//         <a
//           href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800"
//           aria-label="Share on LinkedIn"
//         >
//           <Linkedin size={18} />
//         </a>
//         <button
//           onClick={() => navigator.clipboard.writeText(shareUrl)}
//           className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//           aria-label="Copy image link"
//         >
//           <Link2 size={18} />
//         </button>
//       </div>

//       {/* "Watch Now" button – links to the actual movie page */}
//       <a
//         href={pageUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
//       >
//         <ExternalLink size={18} />
//         Watch Now on Movie & TV Trailers
//       </a>
//     </div>
//   );
// }




