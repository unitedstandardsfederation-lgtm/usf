import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import site from './src/content/site.json';

const LOGO_SRC = 'logo/6.png';
const LOGO_PUBLIC = 'public/logo/6.png';

function syncLogoFromFolder() {
  return {
    name: 'usf-sync-logo-from-folder',
    buildStart() {
      mkdirSync('public/logo', { recursive: true });
      copyFileSync(LOGO_SRC, LOGO_PUBLIC);
    },
  };
}

// Injects the page title and meta description from src/content/site.json
// into index.html at build time, so search engines and social-card scrapers
// always see the latest copy without anyone needing to edit index.html.
function syncMetaFromContent() {
  return {
    name: 'usf-sync-meta-from-content',
    transformIndexHtml(html) {
      let out = html;
      if (site?.site?.metaTitle) {
        out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${site.site.metaTitle}</title>`);
      }
      if (site?.site?.metaDescription) {
        out = out.replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${site.site.metaDescription}" />`
        );
      }
      return out;
    },
  };
}

export default defineConfig({
  plugins: [react(), syncLogoFromFolder(), syncMetaFromContent()],
  server: {
    port: 5173,
    open: true,
  },
});
