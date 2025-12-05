import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:4173'; // vite preview default
const routes = ['/', '/ar/turkish-private-universities', '/en/turkish-private-universities'];

const htmlOut = (path) => `dist${path === '/' ? '/index' : path}.html`;

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const r of routes) {
    await page.goto(`${BASE}${r}`, { waitUntil: 'networkidle0' });
    const html = await page.content();
    const outputPath = htmlOut(r);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html);
    console.log('✅ prerendered', r);
  }
  await browser.close();
};
run();
