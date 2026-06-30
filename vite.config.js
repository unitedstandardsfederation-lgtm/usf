import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, writeFileSync } from 'fs';
import site from './src/content/site.json';

const LOGO_FILES = [
  { src: 'logo/6.png', dest: 'public/logo/6.png' },
  { src: 'logo/favicon.png', dest: 'public/logo/favicon.png' },
];

function syncLogoFromFolder() {
  return {
    name: 'usf-sync-logo-from-folder',
    buildStart() {
      mkdirSync('public/logo', { recursive: true });
      for (const { src, dest } of LOGO_FILES) {
        copyFileSync(src, dest);
      }
    },
  };
}

const absoluteUrl = (path = '/') => {
  const base = (site.site?.siteUrl || '').replace(/\/$/, '');
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const pageRoutes = () => {
  const routes = new Set(['/', '/services', '/services/resourcing']);
  for (const service of site.services?.items || []) {
    if (service.href?.startsWith('/')) routes.add(service.href);
  }
  return [...routes].sort((a, b) => a.localeCompare(b));
};

const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.site.name,
  alternateName: site.site.shortName,
  url: absoluteUrl('/'),
  logo: absoluteUrl(site.site?.seo?.ogImage || '/logo/6.png'),
  description: site.site.metaDescription,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.contact.address,
    addressCountry: 'US',
  },
  sameAs: site.site?.seo?.sameAs || [],
});

const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.site.name,
  alternateName: site.site.shortName,
  url: absoluteUrl('/'),
  description: site.site.metaDescription,
  inLanguage: 'en',
});

const serviceCatalogSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${site.site.name} Services`,
  itemListElement: [
    ...(site.services?.items || []).map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      description: service.summary,
      url: absoluteUrl(service.href),
    })),
    ...(site.servicesPage?.services || []).map((service, index) => ({
      '@type': 'ListItem',
      position: (site.services?.items || []).length + index + 1,
      name: service.eyebrow,
      description: service.body,
      url: absoluteUrl(`/services#${service.id}`),
    })),
  ],
});

// Injects SEO tags from src/content/site.json into index.html at build time,
// so search engines and social-card scrapers see strong metadata immediately.
function syncMetaFromContent() {
  return {
    name: 'usf-sync-meta-from-content',
    transformIndexHtml(html) {
      let out = html;
      const seo = site.site?.seo || {};
      const title = site.site.metaTitle;
      const description = site.site.metaDescription;
      const url = absoluteUrl(seo.canonicalPath || '/');
      const image = absoluteUrl(seo.ogImage || '/logo/6.png');
      const keywords = (seo.keywords || []).join(', ');
      const jsonLd = [organizationSchema(), websiteSchema(), serviceCatalogSchema()];

      out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
      out = out.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(description)}" />`
      );

      const tags = `
    <meta name="robots" content="${escapeHtml(seo.robots || 'index, follow')}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${escapeHtml(seo.ogType || 'website')}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:site_name" content="${escapeHtml(site.site.name)}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="${escapeHtml(seo.twitterCard || 'summary_large_image')}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    ${jsonLd
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join('\n    ')}`;

      out = out.replace('</head>', `${tags}\n  </head>`);
      return out;
    },
  };
}

function syncCrawlerFiles() {
  return {
    name: 'usf-sync-crawler-files',
    buildStart() {
      mkdirSync('public', { recursive: true });
      const routes = pageRoutes();
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
        .map(
          (route) =>
            `  <url>\n    <loc>${absoluteUrl(route)}</loc>\n    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${route === '/' ? '1.0' : route === '/services' ? '0.9' : '0.7'}</priority>\n  </url>`
        )
        .join('\n')}\n</urlset>\n`;

      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;

      const llms = `# ${site.site.name}\n\n${site.site?.seo?.aiSummary || site.site.metaDescription}\n\n## Website\n${absoluteUrl('/')}\n\n## Primary Services\n${(site.services?.items || [])
        .map((service) => `- ${service.title}: ${service.summary} (${absoluteUrl(service.href)})`)
        .join('\n')}\n\n## Digital Services\n${(site.servicesPage?.services || [])
        .map((service) => `- ${service.eyebrow}: ${service.body} (${absoluteUrl(`/services#${service.id}`)})`)
        .join('\n')}\n\n## Search Intents\n${(site.site?.seo?.searchIntents || []).map((item) => `- ${item}`).join('\n')}\n\n## Contact\nEmail: ${site.contact.email}\nPhone: ${site.contact.phone}\nAddress: ${site.contact.address.replace(/\n/g, ', ')}\n`;

      writeFileSync('public/sitemap.xml', sitemap);
      writeFileSync('public/robots.txt', robots);
      writeFileSync('public/llms.txt', llms);
    },
  };
}

export default defineConfig({
  plugins: [react(), syncLogoFromFolder(), syncCrawlerFiles(), syncMetaFromContent()],
  server: {
    port: 5173,
    open: true,
  },
});
