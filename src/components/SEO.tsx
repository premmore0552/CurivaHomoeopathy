import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../constants/seoConstants';
import { getCanonicalUrl } from '../utils/seoUtils';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = SEO_CONFIG.defaultDescription,
  keywords = 'homoeopathy, natural healing, holistic health, Homoeopathic remedies, curiva, BHMS study materials',
  image = `${SEO_CONFIG.domain}/curiva_logo.png`,
  url,
  type = 'website',
  noindex = false,
  schema
}) => {
  const location = useLocation();
  const siteName = SEO_CONFIG.siteName;
  
  // Use provided title or fall back to site name
  const displayTitle = title ? title : siteName;
  const fullTitle = displayTitle.includes(siteName) ? displayTitle : `${displayTitle} | ${siteName}`;

  // Normalize URL
  const canonicalUrl = getCanonicalUrl(url || location.pathname);

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Robots control */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Theme Color */}
      <meta name="theme-color" content={SEO_CONFIG.themeColor} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
