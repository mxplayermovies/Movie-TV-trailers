const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

try {
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ sitemap.xml not found. Run next-sitemap first.');
    process.exit(1);
  }

  let content = fs.readFileSync(sitemapPath, 'utf8');

  // Replace the root <urlset> tag with one containing all required namespaces
  const newRoot = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  content = content.replace(/<urlset[^>]*>/, newRoot);

  fs.writeFileSync(sitemapPath, content);
  console.log('✅ Namespaces added to sitemap.xml');
} catch (err) {
  console.error('❌ Failed to update sitemap:', err);
  process.exit(1);
}