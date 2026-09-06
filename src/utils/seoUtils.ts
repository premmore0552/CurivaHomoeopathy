import { SEO_CONFIG } from '../constants/seoConstants';

/**
 * Normalizes a URL to a canonical format.
 * Strips query parameters and ensures it uses the production domain.
 */
export const getCanonicalUrl = (path: string): string => {
  // If path is a full URL, we extract the pathname
  let cleanPath = path;
  try {
    const url = new URL(path.startsWith('http') ? path : `https://example.com${path}`);
    cleanPath = url.pathname;
  } catch (e) {
    // Fallback if URL parsing fails
    cleanPath = path.split('?')[0].split('#')[0];
  }

  // Ensure leading slash
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  // Remove trailing slash except for root
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  return `${SEO_CONFIG.domain}${cleanPath}`;
};

/**
 * Generates Organization Structured Data
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': SEO_CONFIG.siteName,
  'url': SEO_CONFIG.domain,
  'logo': `${SEO_CONFIG.domain}/curiva_logo.png`,
  'sameAs': [
    // Add social links here
  ]
});

/**
 * Generates WebSite Structured Data
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': SEO_CONFIG.siteName,
  'url': SEO_CONFIG.domain,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${SEO_CONFIG.domain}/lexicon?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

/**
 * Generates Breadcrumb Structured Data
 */
export const getBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.item.startsWith('http') ? item.item : getCanonicalUrl(item.item)
  }))
});
