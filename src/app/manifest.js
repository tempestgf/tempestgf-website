// manifest.js - Web App Manifest para PWA y SEO
import seoConfig from '@/lib/seo';

const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

export default function manifest() {
  return {
    name: seoConfig.siteName,
    short_name: 'Tempestgf',
    description: seoConfig.defaultDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    orientation: 'portrait-primary',
    lang: 'es',
    categories: ['business', 'technology', 'productivity'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: '/logo.gif',
        sizes: '192x192',
        type: 'image/gif',
        purpose: 'any maskable',
      },
    ],
  };
}
