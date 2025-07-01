"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function EsparregueraPage() {
  const { t } = useTranslation();

  const services = [
    {
      title: "Desarrollo Web Profesional en Esparreguera",
      description: "Creación de sitios web modernos y tiendas online para empresas de Esparreguera",
      icon: "💻"
    },
    {
      title: "Aplicaciones Web Personalizadas",
      description: "Desarrollo de software a medida para automatizar procesos empresariales",
      icon: "⚙️"
    },
    {
      title: "Seguridad Informática y Pentesting",
      description: "Auditorías de ciberseguridad y protección contra amenazas digitales",
      icon: "🔒"
    },
    {
      title: "Consultoría en Transformación Digital",
      description: "Asesoramiento tecnológico para modernizar tu negocio en Esparreguera",
      icon: "🚀"
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
            Desarrollador Web en Esparreguera
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] max-w-4xl mx-auto mb-8">
            <span className="text-[var(--color-button-bg)] font-semibold">Tempestgf</span> - 
            Tu especialista en desarrollo web, aplicaciones personalizadas y ciberseguridad 
            en Esparreguera y comarca
          </p>
          
          <div className="flex items-center justify-center text-[var(--color-primary)] mb-8">
            <MapPinIcon className="w-6 h-6 mr-2" />
            <span className="text-lg">Esparreguera, Barcelona - Cataluña</span>
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
            Servicios de Desarrollo en Esparreguera
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

        {/* Ventajas competitivas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[var(--color-card)] p-8 rounded-lg border border-[var(--color-button-bg)]/20 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Ventajas de trabajar con Tempestgf en Esparreguera
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Enfoque Local</h3>
              <p className="text-[var(--color-secondary)]">
                Entendemos las necesidades específicas de los negocios en Esparreguera
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold mb-2">Tecnología Avanzada</h3>
              <p className="text-[var(--color-secondary)]">
                Utilizamos las últimas tecnologías para crear soluciones innovadoras
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-lg font-semibold mb-2">Soporte Continuo</h3>
              <p className="text-[var(--color-secondary)]">
                Mantenimiento y soporte técnico para garantizar el éxito de tu proyecto
              </p>
            </div>
          </div>
        </motion.div>

        {/* Casos de éxito locales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Tipos de Proyectos en Esparreguera
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-button-bg)]">Comercios Locales</h3>
              <p className="text-[var(--color-secondary)]">Páginas web para tiendas, restaurantes y servicios locales</p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-button-bg)]">Industrias</h3>
              <p className="text-[var(--color-secondary)]">Aplicaciones web para gestión y automatización industrial</p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--color-button-bg)]/10 to-[var(--color-primary)]/10 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-button-bg)]">Servicios Profesionales</h3>
              <p className="text-[var(--color-secondary)]">Soluciones digitales para consultas, despachos y clínicas</p>
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
            ¿Tu negocio en Esparreguera necesita una web?
          </h2>
          
          <p className="text-xl mb-8 text-[var(--color-secondary)]">
            Hablemos sobre cómo Tempestgf puede ayudar a digitalizar tu empresa
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center">
              <EnvelopeIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>contact@tempestgf.es</span>
            </div>
            
            <div className="flex items-center">
              <PhoneIcon className="w-6 h-6 mr-2 text-[var(--color-button-bg)]" />
              <span>Consulta sin compromiso</span>
            </div>
          </div>
          
          <Link
            href="/#contact"
            className="inline-block bg-[var(--color-button-bg)] text-[var(--color-button-text)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-button-bg)]/80 transition-colors"
          >
            Contactar Ahora
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
