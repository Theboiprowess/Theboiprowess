import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisedellacademy.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/login',
          '/apply/success',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/login',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
