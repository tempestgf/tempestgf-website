// Layout dinámico para cada entrada del blog - metadata SEO por artículo
import { blogDb } from '@/lib/redis';
import seoConfig from '@/lib/seo';

const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

/** Stripa HTML para usar como descripción en meta */
function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slug = typeof resolved?.slug === 'string' ? resolved.slug : resolved?.slug?.[0];
  if (!slug) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  let post = null;
  try {
    post = await blogDb.getPostBySlug(slug);
    if (post && post.status !== 'published') post = null;
  } catch (e) {
    console.warn('generateMetadata blog:', e?.message);
  }

  if (!post) {
    return {
      title: 'Artículo no encontrado',
      robots: { index: false, follow: true },
    };
  }

  const title = post.title || 'Sin título';
  const description = post.excerpt || stripHtml(post.content || '');
  const url = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith('http') ? post.image : post.image ? `${baseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}` : `${baseUrl}/logo.gif`;

  return {
    title,
    description,
    keywords: post.tags && post.tags.length ? post.tags : undefined,
    authors: post.author ? [{ name: post.author, url: baseUrl }] : undefined,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.createdAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      siteName: seoConfig.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@tempestgf',
    },
    alternates: {
      canonical: url,
      languages: {
        es: url,
        ca: `${url}?lang=ca`,
        en: `${url}?lang=en`,
        'x-default': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
    other: {
      'article:published_time': post.createdAt || undefined,
      'article:modified_time': post.updatedAt || undefined,
      'article:author': post.author || 'Guillem Farriols',
    },
  };
}

export default function BlogPostLayout({ children }) {
  return children;
}
