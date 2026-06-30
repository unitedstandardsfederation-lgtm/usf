import site from '../content/site.json';

const DEFAULT_IMAGE = site.site?.seo?.ogImage || '/logo/6.png';

function absoluteUrl(path = '/') {
  const base = (site.site?.siteUrl || '').replace(/\/$/, '');
  if (!base) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function setMeta(selector, attributes) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
}

function setLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let tag = document.head.querySelector(`script[data-seo-json="${id}"]`);
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.setAttribute('data-seo-json', id);
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

export function buildOrganizationSchema() {
  const seo = site.site?.seo || {};
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.site.name,
    alternateName: site.site.shortName,
    url: absoluteUrl('/'),
    logo: absoluteUrl(DEFAULT_IMAGE),
    description: site.site.metaDescription,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressCountry: 'US',
    },
    sameAs: seo.sameAs || [],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.site.name,
    alternateName: site.site.shortName,
    url: absoluteUrl('/'),
    description: site.site.metaDescription,
    inLanguage: 'en',
  };
}

export function buildServiceSchema({ title, description, path, services = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: absoluteUrl(path),
    provider: {
      '@type': 'Organization',
      name: site.site.name,
      url: absoluteUrl('/'),
    },
    areaServed: 'International',
    serviceType: services,
  };
}

export function applySeo({
  title = site.site.metaTitle,
  description = site.site.metaDescription,
  path = '/',
  image = DEFAULT_IMAGE,
  type = site.site?.seo?.ogType || 'website',
  jsonLd = [],
} = {}) {
  const seo = site.site?.seo || {};
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  document.title = title;
  setMeta('meta[name="description"]', { name: 'description', content: description });
  setMeta('meta[name="robots"]', { name: 'robots', content: seo.robots || 'index, follow' });
  setMeta('meta[name="keywords"]', { name: 'keywords', content: (seo.keywords || []).join(', ') });

  setLink('canonical', url);

  setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
  setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  setMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
  setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: site.site.name });
  setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });

  setMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: seo.twitterCard || 'summary_large_image',
  });
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

  setJsonLd('organization', buildOrganizationSchema());
  setJsonLd('website', buildWebSiteSchema());
  jsonLd.forEach((schema, index) => setJsonLd(`page-${index}`, schema));
}

