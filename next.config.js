// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'image.tmdb.org',
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.cricketnmore.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.slivcdn.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'www.vhv.rs',
//       },
//       {
//         protocol: 'https',
//         hostname: 'upload.wikimedia.org',
//       },
//       {
//         protocol: 'https',
//         hostname: 'm.media-amazon.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'media-files.atrangii.in',
//       },
//        {
//         protocol: 'https',
//         hostname: 'picsum.photos',
//       },
//         {
//         protocol: 'https',
//         hostname: 'shutterstock.com',
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-DNS-Prefetch-Control',
//             value: 'on'
//           },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=63072000; includeSubDomains; preload'
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff'
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'SAMEORIGIN'
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block'
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin'
//           },
//           {
//             key: 'Permissions-Policy',
//             value: 'camera=(), microphone=(), geolocation=()'
//           }
//         ],
//       },
//     ]
//   },
//   compress: true,
//   poweredByHeader: false,
//   generateEtags: true,
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'img.cricketnmore.com',
      },
      {
        protocol: 'https',
        hostname: 'images.slivcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vhv.rs',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'media-files.atrangii.in',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'shutterstock.com',
      },
      // ✅ Add all other domains your images come from:
      {
        protocol: 'https',
        hostname: 'english.dainikjagranmpcg.com',
      },
      {
        protocol: 'https',
        hostname: 'assets-in.bmscdn.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'femalecricket.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbor.prod.vidiocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static.flashscore.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cbssports.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fcbarcelona.com',
      },
      {
        protocol: 'https',
        hostname: 'mms.businesswire.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'image.roku.com',
      },
      {
        protocol: 'https',
        hostname: 'a-cdn.klowdtv.com',
      },
      {
        protocol: 'https',
        hostname: 'variety.com',
      },
      {
        protocol: 'https',
        hostname: 'images.justwatch.com',
      },
      {
        protocol: 'https',
        hostname: 'www.coolmoviez.baby',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
      },
      // Add any others you find missing
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}

module.exports = nextConfig