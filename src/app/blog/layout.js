// Layout del blog con metadata SEO
import seoConfig from '@/lib/seo';

const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

export const metadata = {
  title: 'Blog | Tecnología, Desarrollo Web, IA y Ciberseguridad',
  description:
    'Artículos sobre desarrollo web, inteligencia artificial, ciberseguridad y tecnología. Tempestgf - insights y tutoriales por Guillem Farriols.',
  keywords: [
    'blog desarrollo web',
    'blog programación',
    'ciberseguridad blog',
    'inteligencia artificial artículos',
    'Tempestgf blog',
    'tecnología Barcelona',
  ],
  openGraph: {
    title: 'Blog Tempestgf | Tecnología, Desarrollo Web e IA',
    description:
      'Insights sobre desarrollo web, ciberseguridad e inteligencia artificial. Artículos por Guillem Farriols.',
    url: `${baseUrl}/blog`,
    siteName: seoConfig.siteName,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/logo.gif`,
        width: 1200,
        height: 630,
        alt: 'Blog Tempestgf - Tecnología y Desarrollo',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Tempestgf | Tecnología y Desarrollo',
    description: 'Artículos sobre desarrollo web, IA y ciberseguridad.',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
    languages: {
      es: `${baseUrl}/blog`,
      ca: `${baseUrl}/blog?lang=ca`,
      en: `${baseUrl}/blog?lang=en`,
      'x-default': `${baseUrl}/blog`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }) {
  return children;
}
