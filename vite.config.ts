import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// A multi-page build rather than a router. Each page becomes a real HTML file
// at its own key in the bucket, so /privacy is a document with a URL that will
// not move when the marketing copy around it is rewritten. That matters for a
// legal page: the URL goes in app store listings and in other people's records.
//
// Directory-style keys (privacy/index.html) rather than privacy.html, so the
// published URL is /privacy. CloudFront needs a viewer-request function to
// append index.html to those paths; see deploy/cloudfront-rewrite.js.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        terms: resolve(import.meta.dirname, 'terms/index.html'),
        // Linked from inside the app (SUPPORT_URL in gwart-mobile's
        // src/links.ts), so this URL is one that must not move.
        support: resolve(import.meta.dirname, 'support/index.html'),
        // Account deletion is a section of Privacy, at #delete, not a page of
        // its own. /delete still works: CloudFront redirects it to the anchor,
        // so there is a short URL to hand out without a second copy of the
        // words to keep in step. See deploy/cloudfront-rewrite.js.
      },
    },
  },
});
