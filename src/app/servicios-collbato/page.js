"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function CollbatoPage() {
  const { t } = useTranslation();

  const services = [
    {
      title: "Desarrollo de Páginas Web en Collbató",
      description: "Creación de sitios web profesionales y tiendas online para empresas de Collbató",
      icon: "🌐"
    },
    {
      title: "Ciberseguridad Empresarial",
      description: "Auditorías de seguridad y protección de datos para negocios en Collbató",
      icon: "🛡️"
    },
    {
      title: "Consultoría en Inteligencia Artificial",
      description: "Implementación de soluciones IA para automatizar procesos empresariales",
      icon: "🤖"
    },
    {
      title: "Optimización SEO Local",
      description: "Posicionamiento web para aparecer en las búsquedas de Collbató",
      icon: "📈"
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
            Programador en Collbató
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] max-w-4xl mx-auto mb-8">
            <span className="text-[var(--color-button-bg)] font-semibold">Tempestgf</span> - 
            Servicios profesionales de desarrollo web, ciberseguridad e inteligencia artificial 
            para empresas y particulares en Collbató
          </p>
          
          <div className="flex items-center justify-center text-[var(--color-primary)] mb-8">
            <MapPinIcon className="w-6 h-6 mr-2" />
            <span className="text-lg">Collbató, Barcelona - Cataluña</span>
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
            Servicios Tecnológicos en Collbató
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

        {/* Por qué Tempestgf en Collbató */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[var(--color-card)] p-8 rounded-lg border border-[var(--color-button-bg)]/20 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            ¿Por qué elegir Tempestgf en Collbató?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold mb-2">Experiencia Local</h3>
              <p className="text-[var(--color-secondary)]">
                Conocimiento profundo del mercado local de Collbató y sus necesidades específicas
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Respuesta Rápida</h3>
              <p className="text-[var(--color-secondary)]">
                Atención personalizada y soporte técnico inmediato para empresas de Collbató
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-lg font-semibold mb-2">Soluciones Completas</h3>
              <p className="text-[var(--color-secondary)]">
                Desde páginas web hasta ciberseguridad, todo en un solo proveedor de confianza
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
            ¿Necesitas servicios tecnológicos en Collbató?
          </h2>
          
          <p className="text-xl mb-8 text-[var(--color-secondary)]">
            Contacta con Tempestgf para una consulta gratuita sobre tu proyecto
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center">
              <EnvelopeIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>contact@tempestgf.es</span>
            </div>
            
            <div className="flex items-center">
              <PhoneIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>Consulta telefónica disponible</span>
            </div>
          </div>
          
          <Link
            href="/#contact"
            className="inline-block bg-[var(--color-button-bg)] text-[var(--color-button-text)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-button-bg)]/80 transition-colors"
          >
            Solicitar Presupuesto Gratuito
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
