"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function IgualadaPage() {
  const { t } = useTranslation();

  const services = [
    {
      title: "Páginas Web Empresariales en Igualada",
      description: "Diseño y desarrollo de sitios web corporativos para empresas de Igualada",
      icon: "🏢"
    },
    {
      title: "E-commerce y Tiendas Online",
      description: "Plataformas de venta online optimizadas para el mercado de Igualada",
      icon: "🛒"
    },
    {
      title: "SEO Local Igualada",
      description: "Posicionamiento web para aparecer en las búsquedas locales de Igualada",
      icon: "📍"
    },
    {
      title: "Automatización de Procesos",
      description: "Soluciones de inteligencia artificial para optimizar tu negocio",
      icon: "🤖"
    }
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
            Diseñador Web en Igualada
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] max-w-4xl mx-auto mb-8">
            <span className="text-[var(--color-button-bg)] font-semibold">Tempestgf</span> - 
            Especialista en diseño web, SEO local y comercio electrónico 
            para empresas de Igualada
          </p>
          
          <div className="flex items-center justify-center text-[var(--color-primary)] mb-8">
            <MapPinIcon className="w-6 h-6 mr-2" />
            <span className="text-lg">Igualada, Barcelona - Cataluña</span>
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
            Servicios Web Especializados en Igualada
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
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

        {/* Especialización en Igualada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[var(--color-card)] p-8 rounded-lg border border-[var(--color-button-bg)]/20 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            ¿Por qué Tempestgf es tu mejor opción en Igualada?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Diseño Profesional</h3>
              <p className="text-[var(--color-secondary)]">
                Creamos sitios web atractivos que reflejan la identidad de tu empresa
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Carga Rápida</h3>
              <p className="text-[var(--color-secondary)]">
                Optimización técnica para que tu web cargue en menos de 3 segundos
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
              <p className="text-[var(--color-secondary)]">
                Perfecta visualización en móviles, tablets y ordenadores
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sectores en Igualada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Sectores que Atendemos en Igualada
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🏭</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-button-bg)]">Textil y Piel</h3>
              <p className="text-sm text-[var(--color-secondary)]">Sector tradicional de Igualada</p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🏪</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-button-bg)]">Comercio Local</h3>
              <p className="text-sm text-[var(--color-secondary)]">Tiendas y servicios</p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-button-bg)]">Restauración</h3>
              <p className="text-sm text-[var(--color-secondary)]">Bares y restaurantes</p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">⚕️</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-button-bg)]">Salud</h3>
              <p className="text-sm text-[var(--color-secondary)]">Clínicas y consultas</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonios locales simulados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que Dicen en Igualada
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-card)] p-6 rounded-lg border border-[var(--color-button-bg)]/20">
              <p className="text-[var(--color-secondary)] mb-4 italic">
                "Tempestgf nos creó una tienda online que ha multiplicado nuestras ventas. 
                Su conocimiento del mercado local de Igualada fue clave."
              </p>
              <div className="text-[var(--color-button-bg)] font-semibold">
                - Empresa textil de Igualada
              </div>
            </div>
            
            <div className="bg-[var(--color-card)] p-6 rounded-lg border border-[var(--color-button-bg)]/20">
              <p className="text-[var(--color-secondary)] mb-4 italic">
                "El SEO local que implementó nos ha posicionado como líderes en las búsquedas 
                de nuestro sector en Igualada."
              </p>
              <div className="text-[var(--color-button-bg)] font-semibold">
                - Clínica dental Igualada
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center bg-gradient-to-r from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para destacar en Igualada?
          </h2>
          
          <p className="text-xl mb-8 text-[var(--color-secondary)]">
            Consigue más clientes online con una web profesional diseñada por Tempestgf
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center">
              <EnvelopeIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>contact@tempestgf.es</span>
            </div>
            
            <div className="flex items-center">
              <PhoneIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>Consulta gratuita disponible</span>
            </div>
          </div>
          
          <Link
            href="/#contact"
            className="inline-block bg-[var(--color-button-bg)] text-[var(--color-button-text)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-button-bg)]/80 transition-colors"
          >
            Empezar Mi Proyecto Web
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
