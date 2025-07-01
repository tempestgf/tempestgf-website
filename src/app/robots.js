// robots.js - Robots.txt dinámico
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: 'https://tempestgf.es/sitemap.xml',
    host: 'https://tempestgf.es',
  };
}
