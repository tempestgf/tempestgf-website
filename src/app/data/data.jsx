import React from 'react';
import { FaShieldAlt, FaRobot, FaSatellite, FaBrain, FaLock, FaChartLine } from 'react-icons/fa';

export const statsData = [
  { number: 99.9, suffix: '%', label: 'Detección de Amenazas en Tiempo Real' },
  { number: 12, suffix: 'ns', label: 'Latencia de Respuesta Cuántica' },
  { number: 256, suffix: 'bit', label: 'Encriptación Polimórfica' }
];

export const solutionsData = [
  {
    icon: <FaShieldAlt className="text-6xl" aria-hidden="true" />,
    title: "Escudo de Entrelazamiento Cuántico",
    features: [
      "Defensa de múltiples capas contra amenazas persistentes",
      "Análisis en tiempo real de patrones cuánticos",
      "Integración segura con infraestructuras globales"
    ],
    badge: "NIST Certified"
  },
  {
    icon: <FaRobot className="text-6xl" aria-hidden="true" />,
    title: "Sentinela Neural Cuántica",
    features: [
      "Algoritmos de IA adaptativa y optimizados",
      "Procesamiento en 9 dimensiones para mayor precisión",
      "Evolución dinámica del sistema de defensa"
    ],
    badge: "AI Core v4.2"
  },
  {
    icon: <FaSatellite className="text-6xl" aria-hidden="true" />,
    title: "Red Orbital de Seguridad",
    features: [
      "Cobertura total mediante satélites cuánticos avanzados",
      "Transmisión encriptada de datos en tiempo real",
      "Respaldo seguro a través de redes interdimensionales"
    ],
    badge: "SpaceForce Approved"
  }
];

export const architectureData = [
  {
    title: "Memoria Holográfica",
    content: "Almacenamiento cuántico escalable que integra múltiples dimensiones para optimizar la recuperación de datos críticos y facilitar el acceso instantáneo a información vital.",
    icon: <FaBrain className="text-4xl" aria-hidden="true" />
  },
  {
    title: "Firewall de Pliegue Temporal",
    content: "Sistema avanzado que reconfigura el flujo temporal de datos, permitiendo una protección retroactiva eficaz contra ataques y garantizando la integridad de la información.",
    icon: <FaLock className="text-4xl" aria-hidden="true" />
  },
  {
    title: "Red de Conciencia Artificial",
    content: "Estructura inteligente de múltiples capas que aprende y se adapta en tiempo real para contrarrestar amenazas emergentes, maximizando la resiliencia del sistema.",
    icon: <FaChartLine className="text-4xl" aria-hidden="true" />
  }
];
