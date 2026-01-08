"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/tempestgf', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://github.com/tempestgf', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com/in/tempestgf', icon: FaLinkedin, label: 'LinkedIn' },
];

const QUICK_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/blog', label: 'Blog' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#contact', label: 'Contacto' },
];

export default function BlogFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] relative overflow-hidden">
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block group mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors">
                  TEMPEST
                </span>
                <span className="text-[var(--color-button-bg)]">.GF</span>
              </div>
            </Link>
            <p className="text-[var(--color-primary)] text-sm leading-relaxed mb-6 max-w-xs">
              Diseño y desarrollo web de alto impacto. Experiencias digitales que conectan marcas con personas.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] hover:border-[var(--color-button-bg)] hover:text-[var(--color-button-bg)] hover:bg-[var(--color-button-bg)]/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono text-[var(--color-button-bg)] uppercase tracking-widest mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-[var(--color-primary)] hover:text-[var(--color-foreground)] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-[var(--color-button-bg)] group-hover:w-3 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-xs font-mono text-[var(--color-button-bg)] uppercase tracking-widest mb-6">
              ¿Tienes un proyecto?
            </h4>
            <p className="text-[var(--color-primary)] text-sm mb-6 leading-relaxed">
              Hablemos sobre cómo puedo ayudarte a llevar tu idea al siguiente nivel.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-button-bg)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-button-bg-hover)] transition-colors group"
            >
              Iniciar conversación
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-primary)]">
            © {currentYear} Tempest.GF. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-[var(--color-primary)]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Disponible para proyectos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
