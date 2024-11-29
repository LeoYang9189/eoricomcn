import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description, keywords, path = '' }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  
  const defaultTitle = isZh ? 'EORI申请 - 专业的欧盟EORI注册服务' : 'EORI Application - Professional EU EORI Registration Service';
  const defaultDescription = isZh 
    ? 'EORI申请服务 - 专业快速办理欧盟EORI注册，一站式欧盟经济运营商注册服务，3-5个工作日快速办理，专业顾问团队提供全程服务。'
    : 'EORI Application Service - Professional and fast EU EORI registration, one-stop EU economic operator registration service, 3-5 working days processing, expert team provides full service.';
  const defaultKeywords = isZh
    ? 'EORI申请,EORI注册,欧盟EORI,欧盟经济运营商,欧盟VAT,欧盟贸易,欧盟进出口'
    : 'EORI Application,EORI Registration,EU EORI,EU Economic Operator,EU VAT,EU Trade,EU Import Export';

  const siteUrl = 'https://your-domain.com';
  
  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${siteUrl}${path}`} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />

      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": title || defaultTitle,
          "description": description || defaultDescription,
          "provider": {
            "@type": "Organization",
            "name": "Shanghai Bingyu Supplychain Management Co.,Ltd",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CN",
              "addressLocality": "Shanghai"
            }
          },
          "serviceType": "EORI Registration Service"
        })}
      </script>
    </Helmet>
  );
} 