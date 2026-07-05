import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisedellacademy.vercel.app';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/academics`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/teachers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/admissions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/apply`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/student-life`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Fetch dynamic content from Supabase
  const dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // News articles
    const { data: news } = await supabase
      .from('news')
      .select('id, updated_at')
      .eq('published', true);

    if (news) {
      news.forEach((article) => {
        dynamicPages.push({
          url: `${SITE_URL}/news/${article.id}`,
          lastModified: new Date(article.updated_at),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      });
    }

    // Events
    const { data: events } = await supabase
      .from('events')
      .select('id, updated_at')
      .eq('published', true);

    if (events) {
      events.forEach((event) => {
        dynamicPages.push({
          url: `${SITE_URL}/events/${event.id}`,
          lastModified: new Date(event.updated_at),
          changeFrequency: 'daily',
          priority: 0.7,
        });
      });
    }

    // Teachers
    const { data: teachers } = await supabase
      .from('teachers')
      .select('id, updated_at');

    if (teachers) {
      teachers.forEach((teacher) => {
        dynamicPages.push({
          url: `${SITE_URL}/teachers/${teacher.id}`,
          lastModified: new Date(teacher.updated_at),
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching dynamic content for sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}
