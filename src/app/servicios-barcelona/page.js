"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function BarcelonaPage() {
  const { t } = useTranslation();

  const services = [
    {
      title: "Desarrollo de Páginas Web en Barcelona",
      description: "Creación de sitios web corporativos y e-commerce para empresas de Barcelona con tecnologías modernas",
      icon: "🌐"
    },
    {
      title: "Ciberseguridad Empresarial",
      description: "Auditorías de seguridad, pentesting y protección de datos para empresas en Barcelona",
      icon: "🛡️"
    },
    {
      title: "Consultoría en Inteligencia Artificial",
      description: "Implementación de IA y automatización para startups y empresas de Barcelona",
      icon: "🤖"
    },
    {
      title: "Desarrollo de Apps Móviles",
      description: "Aplicaciones móviles nativas y web apps para el mercado barcelonés",
      icon: "📱"
    },
    {
      title: "Optimización SEO Local Barcelona",
      description: "Posicionamiento web para aparecer en las búsquedas locales de Barcelona",
      icon: "📈"
    },
    {
      title: "Transformación Digital",
      description: "Digitalización completa de procesos empresariales en Barcelona",
      icon: "🚀"
    }
  ];

  const barcelonaDistricts = [
    "Eixample", "Ciutat Vella", "Gràcia", "Sants-Montjuïc", "Sant Martí", 
    "Sarrià-Sant Gervasi", "Horta-Guinardó", "Nou Barris", "Sant Andreu", "Les Corts"
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Header con navegación */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-primary)] bg-clip-text text-transparent">
            Programador en Barcelona
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] max-w-4xl mx-auto mb-8">
            <span className="text-[var(--color-button-bg)] font-semibold">Tempestgf</span> - 
            Servicios profesionales de desarrollo web, ciberseguridad e inteligencia artificial 
            para empresas y startups en Barcelona y área metropolitana
          </p>
          
          <div className="flex items-center justify-center text-[var(--color-primary)] mb-8">
            <MapPinIcon className="w-6 h-6 mr-2" />
            <span className="text-lg">Barcelona, Cataluña - Servicios en toda la ciudad</span>
          </div>
        </motion.div>

        {/* Servicios */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Servicios Tecnológicos en Barcelona
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--color-card)] p-8 rounded-lg border border-[var(--color-button-bg)]/20 hover:border-[var(--color-button-bg)]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-button-bg)]">
                  {service.title}
                </h3>
                <p className="text-[var(--color-secondary)]">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Distritos de Barcelona */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[var(--color-card)] p-8 rounded-lg border border-[var(--color-button-bg)]/20 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Cobertura en Todos los Distritos de Barcelona
          </h2>
          
          <p className="text-center text-[var(--color-secondary)] mb-8">
            Tempestgf ofrece servicios tecnológicos en todos los distritos de Barcelona
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {barcelonaDistricts.map((district, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gradient-to-r from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-3 rounded-lg text-center border border-[var(--color-button-bg)]/20"
              >
                <span className="text-sm font-medium">{district}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Por qué Tempestgf en Barcelona */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[var(--color-card)] p-8 rounded-lg border border-[var(--color-button-bg)]/20 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            ¿Por qué elegir Tempestgf en Barcelona?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-4">🏙️</div>
              <h3 className="text-lg font-semibold mb-2">Experiencia Metropolitana</h3>
              <p className="text-[var(--color-secondary)]">
                Amplia experiencia trabajando con empresas de todos los tamaños en el área metropolitana de Barcelona
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Innovación Tecnológica</h3>
              <p className="text-[var(--color-secondary)]">
                Aplicación de las últimas tecnologías y metodologías para el ecosistema startup de Barcelona
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">Perspectiva Global</h3>
              <p className="text-[var(--color-secondary)]">
                Soluciones escalables pensadas para el mercado internacional desde Barcelona
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sectores Especializados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Sectores Especializados en Barcelona
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-card)] p-6 rounded-lg border border-[var(--color-button-bg)]/20">
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-button-bg)]">Startups y Empresas Tecnológicas</h3>
              <p className="text-[var(--color-secondary)]">
                Desarrollo ágil, MVPs, plataformas SaaS y soluciones escalables para el vibrante ecosistema startup de Barcelona.
              </p>
            </div>
            
            <div className="bg-[var(--color-card)] p-6 rounded-lg border border-[var(--color-button-bg)]/20">
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-button-bg)]">E-commerce y Retail</h3>
              <p className="text-[var(--color-secondary)]">
                Tiendas online, marketplaces y soluciones de comercio electrónico para empresas de retail en Barcelona.
              </p>
            </div>
            
            <div className="bg-[var(--color-card)] p-6 rounded-lg border border-[var(--color-button-bg)]/20">
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-button-bg)]">Turismo y Hostelería</h3>
              <p className="text-[var(--color-secondary)]">
                Plataformas de reservas, gestión hotelera y experiencias digitales para el sector turístico barcelonés.
              </p>
            </div>
            
            <div className="bg-[var(--color-card)] p-6 rounded-lg border border-[var(--color-button-bg)]/20">
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-button-bg)]">Servicios Profesionales</h3>
              <p className="text-[var(--color-secondary)]">
                Webs corporativas, portales de clientes y automatización para despachos y consultorías en Barcelona.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">
            ¿Necesitas servicios tecnológicos en Barcelona?
          </h2>
          
          <p className="text-xl mb-8 text-[var(--color-secondary)]">
            Contacta con Tempestgf para una consulta gratuita sobre tu proyecto en Barcelona
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center">
              <EnvelopeIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>contact@tempestgf.es</span>
            </div>
            
            <div className="flex items-center">
              <PhoneIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>Reuniones presenciales en Barcelona</span>
            </div>
          </div>
          
          <Link
            href="/#contact"
            className="inline-block bg-[var(--color-button-bg)] text-[var(--color-button-text)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-button-bg)]/80 transition-colors"
          >
            Solicitar Consulta Gratuita
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
