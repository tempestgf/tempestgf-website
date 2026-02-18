// layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../hooks/useTranslation";
import ClientWrapper from "../components/ClientWrapper";
import seoConfig from "../lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

export const metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | Tempestgf - Programador Especialista`
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords,
  authors: [
    { name: "Guillem Farriols", url: seoConfig.siteUrl },
    { name: "Tempestgf", url: seoConfig.siteUrl },
  ],
  creator: "Tempestgf - Guillem Farriols",
  publisher: "Tempestgf",
  category: "Technology, Programming, Cybersecurity",
  classification: "Professional Services",
  
  // Metadatos específicos para el contenido
  applicationName: "Tempestgf Portfolio",
  referrer: "origin-when-cross-origin",

  // Open Graph optimizado
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["ca_ES", "en_US"],
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: "/logo.gif",
        width: 1200,
        height: 630,
        alt: "Tempestgf - Programador y Especialista en Ciberseguridad en Collbató, Esparreguera, Igualada, Barcelona",
        type: "image/gif"
      },
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Tempestgf - Servicios de Desarrollo Web y Ciberseguridad",
        type: "image/png"
      }
    ],
    locale: "es_ES",
    emails: ["contact@tempestgf.es"],
    phoneNumbers: ["+34-XXX-XXX-XXX"],
    countryName: "España",
    region: "Cataluña"
  },
  
  // Twitter Card optimizado
  twitter: {
    card: "summary_large_image",
    site: "@tempestgf",
    creator: "@tempestgf",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: {
      url: "/logo.gif",
      alt: "Tempestgf - Programador Especialista en Ciberseguridad"
    }
  },
  
  // Robots mejorado
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    bingBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  
  // Verificación mejorada
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    bing: process.env.BING_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION,
    },
  },
  
  // Alternates optimizado para multiidioma
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: {
      "es-ES": seoConfig.siteUrl,
      "ca-ES": `${seoConfig.siteUrl}?lang=ca`,
      "en-US": `${seoConfig.siteUrl}?lang=en`,
      "x-default": seoConfig.siteUrl,
    },
    types: {
      "application/rss+xml": `${seoConfig.siteUrl}/feed.xml`,
    },
  },
  
  // Apple específico
  appleWebApp: {
    capable: true,
    title: "Tempestgf",
    statusBarStyle: "black-translucent",
  },
  
  // Formato JSON-LD
  other: {
    "format-detection": "telephone=no",
  },
  
  // Other
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.structuredData),
          }}
        />
        
        {/* Additional SEO Tags */}
        <meta name="geo.region" content="ES-CT" />
        <meta name="geo.placename" content="Barcelona, Cataluña" />
        <meta name="geo.position" content="41.3851;2.1734" />
        <meta name="ICBM" content="41.3851, 2.1734" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Tempestgf",
              "alternateName": "Tempest",
              "description": "Servicios de desarrollo web, ciberseguridad e inteligencia artificial",
              "url": "https://tempestgf.es",
              "telephone": "+34-XXX-XXX-XXX",
              "email": "tempestgf@protonmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Barcelona",
                "addressRegion": "Cataluña",
                "addressCountry": "ES"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.3851,
                "longitude": 2.1734
              },
              "areaServed": [
                "Barcelona", "Collbató", "Esparreguera", "Igualada", "Cataluña"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 41.3851,
                  "longitude": 2.1734
                },
                "geoRadius": "100000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Tempestgf",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Desarrollo de páginas web",
                      "description": "Desarrollo web profesional y responsive"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Ciberseguridad",
                      "description": "Servicios de seguridad informática y consultoría"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Inteligencia Artificial",
                      "description": "Consultoría e implementación de soluciones IA"
                    }
                  }
                ]
              }
            }),
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.gif" />
        
        {/* Language alternates */}
        <link rel="alternate" hrefLang="es" href={seoConfig.siteUrl} />
        <link rel="alternate" hrefLang="ca" href={`${seoConfig.siteUrl.replace(/\/$/, '')}?lang=ca`} />
        <link rel="alternate" hrefLang="en" href={`${seoConfig.siteUrl.replace(/\/$/, '')}?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={seoConfig.siteUrl} />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <ClientWrapper />
        </LanguageProvider>
      </body>
    </html>
  );
}