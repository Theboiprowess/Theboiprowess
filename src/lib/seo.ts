import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisedellacademy.vercel.app';
const CUSTOM_DOMAIN = 'https://wisedellacademy.co.zw';

export const SITE_CONFIG = {
  name: 'WISEDELL ACADEMY',
  description: 'WISEDELL ACADEMY is a premier private day secondary school in Masvingo, Zimbabwe. Empowering future leaders through academic excellence. With God We Work Hard and Shine.',
  url: SITE_URL,
  customDomain: CUSTOM_DOMAIN,
  locale: 'en_ZW',
  ogImage: '/og-image.jpg',
  twitterHandle: '@WisedellAcademy',
};

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export function generateMetadata(props: SEOProps): Metadata {
  const {
    title = SITE_CONFIG.name,
    description = SITE_CONFIG.description,
    keywords = [],
    ogImage = SITE_CONFIG.ogImage,
    ogType = 'website',
    canonical,
    noIndex = false,
    noFollow = false,
  } = props;

  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
  const url = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;
  const canonicalUrl = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_CONFIG.name }],
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
      },
    },
  };
}

export function generateJsonLd(data: any) {
  return {
    __html: JSON.stringify(data, null, 2),
  };
}

export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Masvingo',
      addressLocality: 'Masvingo',
      addressRegion: 'Masvingo',
      addressCountry: 'ZW',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+263-XXX-XXX-XXX',
      contactType: 'admissions',
    },
    sameAs: [
      // Add social media links when available
    ],
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  school: {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Masvingo',
      addressLocality: 'Masvingo',
      addressRegion: 'Masvingo',
      addressCountry: 'ZW',
    },
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: '+263-XXX-XXX-XXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Masvingo',
      addressLocality: 'Masvingo',
      addressRegion: 'Masvingo',
      addressCountry: 'ZW',
    },
    openingHours: 'Mo-Fr 07:00-17:00',
  },
};

export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.item}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}${url}`,
    },
  };
}

export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Masvingo',
        addressLocality: 'Masvingo',
        addressRegion: 'Masvingo',
        addressCountry: 'ZW',
      },
    },
    image,
    url: `${SITE_CONFIG.url}${url}`,
    organizer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };
}
