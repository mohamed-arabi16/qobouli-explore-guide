import { createCanvas, registerFont } from 'canvas';
import path from 'path';
// Adjust the import path based on the final location of BadgeMap.ts relative to api/og-image.ts
// Assuming api/ is at the root, and BadgeMap.ts is in src/configs/
import { getBadgeForMajor, BadgeDetail } from '../src/configs/BadgeMap';
import http from 'http'; // Using http module for req/res types for a generic Node server

// Ensure the 'api/fonts' directory is created and Amiri-Regular.ttf is placed there.
const fontPath = path.join(__dirname, 'fonts/Amiri-Regular.ttf');
try {
  registerFont(fontPath, { family: 'Amiri' });
  console.log("Registered font Amiri from:", fontPath);
} catch (error) {
  console.warn("Could not register Amiri font. Ensure 'api/fonts/Amiri-Regular.ttf' exists. Falling back to default fonts.", error);
}


// This is a basic structure for a Node HTTP server handler.
// If using Express or another framework, req/res types would come from that.
export default async function ogImageHandler(req: http.IncomingMessage, res: http.ServerResponse) {
  // Basic query parameter parsing from URL for a vanilla Node HTTP server
  const urlParams = new URL(req.url || '', `http://${req.headers.host}`).searchParams;
  const slug = urlParams.get('slug') || 'default';
  const lang = urlParams.get('lang') || 'en';

  const badge = getBadgeForMajor(slug as string); // Cast slug as string

  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#E9F4F4'; // Light teal background
  ctx.fillRect(0, 0, W, H);

  // Emoji - Larger and slightly higher
  ctx.font = '220px serif'; // Increased emoji size
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge.emoji, W / 2, H / 2 - 100); // Centered horizontally, adjusted vertically

  // Label - Using Amiri if available, otherwise sans-serif
  ctx.font = 'bold 70px "Amiri", sans-serif';
  ctx.fillStyle = '#0C1439'; // Dark blue text
  const label = lang === 'ar' ? badge.label_ar : badge.label_en;
  // Adjust text position based on text direction for Arabic
  if (lang === 'ar') {
    ctx.textAlign = 'center'; // Keep center for Arabic single line
    ctx.fillText(label, W / 2, H / 2 + 100, W - 100); // Provide maxWidth
  } else {
    ctx.textAlign = 'center';
    ctx.fillText(label, W / 2, H / 2 + 100, W - 100); // Provide maxWidth
  }

  // Site footer - Smaller and subtle
  ctx.font = 'italic 30px sans-serif';
  ctx.fillStyle = '#555'; // Grey color for footer
  ctx.fillText('qobouli.com', W / 2, H - 50);


  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate'); // Cache for 1 day
  canvas.pngStream().pipe(res);
}
