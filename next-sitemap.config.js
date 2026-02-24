/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://movie-tv-trailers.vercel.app', // Change to your domain
  generateRobotsTxt: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
    ],
  },
  exclude: ['/404', '/api/*'],
  transform: async (config, path) => {
    if (path === '/') return { loc: path, changefreq: 'daily', priority: 1.0 }
    if (
      path.startsWith('/movies/') ||
      path.startsWith('/tv/') ||
      path.startsWith('/sports/') ||
      path.startsWith('/live/') ||
      path.startsWith('/adult/') ||
      path.startsWith('/hindi-dubbed/') ||
      path.startsWith('/documentary/')
    ) {
      return { loc: path, changefreq: 'monthly', priority: 0.7 }
    }
    if (
      ['/about', '/contact', '/dmca', '/faq', '/privacy', '/terms'].includes(path)
    ) {
      return { loc: path, changefreq: 'monthly', priority: 0.8 }
    }
    if (
      ['/movies', '/tv', '/sports', '/live', '/adult', '/hindi-dubbed', '/documentary'].includes(path)
    ) {
      return { loc: path, changefreq: 'daily', priority: 0.9 }
    }
    return { loc: path, changefreq: 'monthly', priority: 0.7 }
  },
}