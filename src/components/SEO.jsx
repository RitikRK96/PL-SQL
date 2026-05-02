import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '' }) {
  const siteUrl = 'https://pl-sql.ritik.world';
  const fullUrl = `${siteUrl}${path}`;
  const siteName = 'PL/SQL Masterclass';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = 'A structured, mentor-guided PL/SQL curriculum covering every concept you need — from your first SELECT query to advanced performance tuning.';
  const finalDesc = description || defaultDesc;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={finalDesc} />
    </Helmet>
  );
}
