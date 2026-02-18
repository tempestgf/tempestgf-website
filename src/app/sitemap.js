// sitemap.js - Sitemap dinámico para SEO (Next.js 15)
import { blogDb } from '@/lib/redis';
import seoConfig from '@/lib/seo';

export default async function sitemap() {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const currentDate = new Date().toISOString();

  // Entradas del blog (solo publicadas)
  let blogPosts = [];
  try {
    blogPosts = await blogDb.getPublishedPosts();
  } catch (e) {
    console.warn('Sitemap: no se pudieron cargar posts del blog', e?.message);
  }

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : (post.createdAt ? new Date(post.createdAt).toISOString() : currentDate),
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: {
      languages: {
        es: `${baseUrl}/blog/${post.slug}`,
        ca: `${baseUrl}/blog/${post.slug}?lang=ca`,
        en: `${baseUrl}/blog/${post.slug}?lang=en`,
      },
    },
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          es: baseUrl,
          ca: `${baseUrl}?lang=ca`,
          en: `${baseUrl}?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          ca: `${baseUrl}/blog?lang=ca`,
          en: `${baseUrl}/blog?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios-collbato`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios-collbato`,
          ca: `${baseUrl}/servicios-collbato?lang=ca`,
          en: `${baseUrl}/servicios-collbato?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios-esparreguera`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios-esparreguera`,
          ca: `${baseUrl}/servicios-esparreguera?lang=ca`,
          en: `${baseUrl}/servicios-esparreguera?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios-igualada`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios-igualada`,
          ca: `${baseUrl}/servicios-igualada?lang=ca`,
          en: `${baseUrl}/servicios-igualada?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios-barcelona`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios-barcelona`,
          ca: `${baseUrl}/servicios-barcelona?lang=ca`,
          en: `${baseUrl}/servicios-barcelona?lang=en`,
        },
      },
    },
  ];

  return [...staticPages, ...blogUrls];
}
