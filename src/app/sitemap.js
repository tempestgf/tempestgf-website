// sitemap.js - Sitemap dinámico para SEO
export default function sitemap() {
  const baseUrl = 'https://tempestgf.es';
  const currentDate = new Date().toISOString();

  return [
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
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          ca: `${baseUrl}/blog?lang=ca`,
          en: `${baseUrl}/blog?lang=en`,
        },
      },
    },
    // Páginas específicas para SEO local
    {
      url: `${baseUrl}/servicios-collbato`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios-esparreguera`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios-igualada`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios-barcelona`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
