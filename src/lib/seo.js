// SEO metadata configuration optimizado para posicionamiento local y profesional
export const seoConfig = {
  siteName: "Tempestgf - Desarrollo Web y Ciberseguridad",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://tempestgf.es",
  defaultTitle: "Tempestgf | Programador y Especialista en Ciberseguridad en Collbató, Esparreguera, Igualada, Barcelona",
  defaultDescription: "🔥 Tempestgf - Guillem Farriols, programador especialista en desarrollo web, ciberseguridad e inteligencia artificial. Servicios profesionales en Collbató, Esparreguera, Igualada y Barcelona. Creación de páginas web, aplicaciones, consultoría IT y penetration testing.",
  
  // SEO estratégico con keywords long-tail y geolocalización
  keywords: [
    // Marca personal (prioridad máxima)
    "Tempestgf", "Tempest", "Guillem Farriols", "Guillem Farriols programador",
    "Tempestgf Collbató", "Tempestgf Esparreguera", "Tempestgf Igualada", "Tempestgf Barcelona",
    
    // Long-tail keywords geográficos (alta conversión)
    "programador en Collbató", "desarrollador web Collbató", "servicios informáticos Collbató",
    "programador en Esparreguera", "desarrollador web Esparreguera", "diseñador web Esparreguera",
    "programador en Igualada", "desarrollador web Igualada", "página web Igualada",
    "programador Barcelona", "desarrollador full stack Barcelona", "ciberseguridad Barcelona",
    
    // Servicios principales con geolocalización
    "creación páginas web Collbató", "desarrollo aplicaciones web Esparreguera",
    "diseño web responsive Igualada", "consultoría informática Barcelona",
    "tienda online Collbató", "e-commerce Esparreguera", "página web empresa Igualada",
    
    // Ciberseguridad especializada
    "pentesting Barcelona", "auditoría seguridad informática", "consultor ciberseguridad",
    "especialista seguridad web", "penetration testing Cataluña",
    
    // Inteligencia Artificial y tecnologías avanzadas
    "consultor inteligencia artificial", "automatización procesos", "OCR desarrollo",
    "fine tuning modelos AI", "Claude AI desarrollo", "MCP implementación",
    
    // Tecnologías y frameworks
    "React developer Barcelona", "Next.js programador", "JavaScript especialista",
    "Python developer", "Node.js Barcelona", "full stack developer Cataluña",
    
    // Servicios específicos de alto valor
    "desarrollo aplicaciones empresariales", "consultoría digital", "transformación digital",
    "optimización SEO técnico", "arquitectura software", "DevOps consultoría",
    
    // Términos locales y variaciones
    "informático Collbató", "técnico sistemas Esparreguera", "consultor IT Igualada",
    "freelancer programación Barcelona", "servicios tecnológicos Cataluña",
    
    // Barcelona distritos y zonas específicas
    "programador Eixample", "desarrollador web Gràcia", "servicios IT Sant Martí",
    "consultor tecnológico Ciutat Vella", "programador zona Sants", "developer Barcelona centro",
    "startup Barcelona", "empresa tecnológica Barcelona", "scaleup Barcelona"
  ],
  
  // Datos estructurados optimizados para Rich Snippets y búsqueda local
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://tempestgf.es/#person",
        "name": "Guillem Farriols",
        "alternateName": ["Tempestgf", "Tempest", "Guillem Farriols Programador"],
        "url": "https://tempestgf.es",
        "image": {
          "@type": "ImageObject",
          "url": "https://tempestgf.es/logo.gif",
          "width": 400,
          "height": 400
        },
        "jobTitle": "Full Stack Developer & Cybersecurity Specialist",
        "description": "Programador especialista en desarrollo web, ciberseguridad e inteligencia artificial con experiencia en Collbató, Esparreguera, Igualada y Barcelona",
        "worksFor": {
          "@type": "Organization",
          "name": "Tempestgf",
          "url": "https://tempestgf.es"
        },
        "knowsAbout": [
          "Desarrollo Web Full Stack", "Ciberseguridad", "Inteligencia Artificial",
          "React", "Next.js", "Python", "JavaScript", "Penetration Testing",
          "OCR", "Fine Tuning", "Claude AI", "MCP Implementation"
        ],
        "homeLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Barcelona",
            "addressRegion": "Cataluña",
            "addressCountry": "ES",
            "postalCode": "08000"
          }
        },
        "areaServed": [
          {
            "@type": "Place",
            "name": "Collbató",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.5167",
              "longitude": "1.8333"
            }
          },
          {
            "@type": "Place", 
            "name": "Esparreguera",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.5333",
              "longitude": "1.8667"
            }
          },
          {
            "@type": "Place",
            "name": "Igualada",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.5833",
              "longitude": "1.6167"
            }
          },
          {
            "@type": "Place",
            "name": "Barcelona",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.3851",
              "longitude": "2.1734"
            }
          }
        ],
        "sameAs": [
          "https://github.com/tempestgf",
          "https://linkedin.com/in/tempestgf"
        ]
      },
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": "https://tempestgf.es/#organization", 
        "name": "Tempestgf",
        "alternateName": ["Tempest", "Tempestgf Servicios"],
        "url": "https://tempestgf.es",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tempestgf.es/logo.gif",
          "width": 400,
          "height": 400
        },
        "image": "https://tempestgf.es/logo.gif",
        "description": "Empresa especializada en desarrollo web, ciberseguridad e inteligencia artificial. Servicios profesionales en Collbató, Esparreguera, Igualada y Barcelona.",
        "founder": {
          "@id": "https://tempestgf.es/#person"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Barcelona",
          "addressRegion": "Cataluña", 
          "addressCountry": "ES",
          "postalCode": "08000"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "41.3851",
          "longitude": "2.1734"
        },
        "areaServed": [
          "Collbató", "Esparreguera", "Igualada", "Barcelona", "Cataluña", "España"
        ],
        "serviceType": [
          "Desarrollo de páginas web",
          "Desarrollo de aplicaciones web",
          "Ciberseguridad y pentesting", 
          "Consultoría en inteligencia artificial",
          "Optimización SEO",
          "Consultoría tecnológica",
          "Creación tiendas online",
          "Automatización de procesos"
        ],
        "knowsAbout": [
          "Desarrollo Web Full Stack", "Ciberseguridad", "Inteligencia Artificial",
          "Programación", "Diseño Web Responsive", "Consultoría Tecnológica",
          "React", "Next.js", "Python", "JavaScript", "Node.js"
        ],
        "priceRange": "€€",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
        "currenciesAccepted": "EUR",
        "openingHours": "Mo-Fr 09:00-18:00",
        "telephone": "+34-XXX-XXX-XXX",
        "email": "contact@tempestgf.es"
      },
      {
        "@type": "WebSite",
        "@id": "https://tempestgf.es/#website",
        "url": "https://tempestgf.es",
        "name": "Tempestgf - Programador y Especialista en Ciberseguridad",
        "description": "Servicios profesionales de desarrollo web, ciberseguridad e inteligencia artificial en Collbató, Esparreguera, Igualada y Barcelona",
        "publisher": {
          "@id": "https://tempestgf.es/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://tempestgf.es?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": ["es-ES", "ca-ES", "en-US"],
        "dateModified": new Date().toISOString(),
        "author": {
          "@id": "https://tempestgf.es/#person"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://tempestgf.es/#service",
        "name": "Servicios de Desarrollo Web y Ciberseguridad Tempestgf",
        "description": "Servicios profesionales de desarrollo web, ciberseguridad e inteligencia artificial para empresas y particulares",
        "provider": {
          "@id": "https://tempestgf.es/#organization"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Collbató"
          },
          {
            "@type": "City",
            "name": "Esparreguera"
          },
          {
            "@type": "City",
            "name": "Igualada"
          },
          {
            "@type": "City",
            "name": "Barcelona"
          }
        ],
        "serviceType": [
          "Desarrollo de páginas web empresariales",
          "Creación de tiendas online y e-commerce", 
          "Desarrollo de aplicaciones web personalizadas",
          "Auditorías de ciberseguridad y pentesting",
          "Consultoría en inteligencia artificial",
          "Optimización SEO técnico y de contenido",
          "Automatización de procesos empresariales",
          "Consultoría en transformación digital"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Tecnológicos",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desarrollo Web Profesional",
                "description": "Creación de páginas web responsive y optimizadas"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Ciberseguridad Empresarial",
                "description": "Auditorías de seguridad y pentesting profesional"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://tempestgf.es/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://tempestgf.es"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Servicios",
            "item": "https://geneon.es"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Blog",
            "item": "https://tempestgf.es/blog"
          }
        ]
      }
    ]
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocales: ["ca_ES", "en_US"],
    siteName: "Tempestgf"
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@tempestgf",
    creator: "@tempestgf"
  }
};

export default seoConfig;
