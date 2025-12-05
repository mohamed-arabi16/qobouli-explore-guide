import { createWriteStream } from 'node:fs';
import { SitemapStream } from 'sitemap';

const BASE = 'https://qobouli.com';

// Add every public route you want indexed.
// Start with these; we’ll expand as you add pages.
const routes = [
  '/',                     // homepage
  '/ar/turkish-private-universities',
  '/en/turkish-private-universities',
  '/ar/study-in-turkey',
  '/en/study-in-turkey',
  '/ar/tuition-fees-turkey-2025',
  '/en/tuition-fees-turkey-2025',
];

const smStream = new SitemapStream({ hostname: BASE });
const writeStream = createWriteStream('dist/sitemap.xml');
smStream.pipe(writeStream);

routes.forEach((url) => {
  smStream.write({ url, changefreq: 'weekly', priority: url === '/' ? 1.0 : 0.8 });
});

smStream.end();
writeStream.on('finish', () => console.log('✅ sitemap.xml generated'));
