import express from 'express';
import path from 'path'; // Import path
import ogImageHandler from './og-image'; // Default export from og-image.ts

const app = express();
const port = process.env.PORT || 3001; // Different from Vite's default 5173

// Middleware to serve files from the source 'api/fonts' directory
// This path is relative from where server.js will run (dist/api) back to the source (api/fonts)
// The registerFont in og-image.ts uses path.join(__dirname, 'fonts/Amiri-Regular.ttf'),
// which will resolve to dist/api/fonts/Amiri-Regular.ttf.
// The static server here is mostly for reference or if client-side needed to access fonts,
// but registerFont directly loads from file system.
// The crucial part is that Amiri-Regular.ttf must be in api/fonts for development,
// and copied to dist/api/fonts for the build to work if registerFont is to find it there.

// For registerFont to work from dist/api/og-image.js, it needs the font file in dist/api/fonts.
// The simplest way is to ensure api/fonts/Amiri-Regular.ttf exists.
// The build:api script should be augmented to copy ./api/fonts to ./dist/api/fonts.
// For now, the code in og-image.ts tries to load from path.join(__dirname, 'fonts/Amiri-Regular.ttf').
// If __dirname is dist/api, it looks for dist/api/fonts/Amiri-Regular.ttf.

// Let's assume the font is correctly placed in api/fonts and will be copied to dist/api/fonts.
// No specific express.static needed for server-side font registration if path is correct.

app.get('/api/og-image', (req, res) => {
  // Express passes req, res that are compatible with http.IncomingMessage/ServerResponse
  // but it's better to use Express's own Request, Response types if refactoring ogImageHandler
  ogImageHandler(req, res);
});

app.listen(port, () => {
  console.log(`[API Server] Listening on http://localhost:${port}`);
  console.log(`OG Image endpoint: http://localhost:${port}/api/og-image?slug=computer&lang=en`);
});
