"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BlogHeader({ progress = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      {/* Progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--color-button-bg)] to-orange-400"
        style={{ width: `${progress * 100}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Left: Back to Home */}
          <Link 
            href="/" 
            className="group flex items-center gap-3 text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors"
          >
            <span className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-button-bg)] group-hover:bg-[var(--color-button-bg)]/10 transition-all">
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="hidden sm:block text-sm font-medium tracking-wide">
              Volver al Inicio
            </span>
          </Link>

          {/* Center: Blog Title */}
          <Link href="/blog" className="group">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xs font-mono text-[var(--color-button-bg)] tracking-widest uppercase">
                //
              </span>
              <span className="text-lg font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors tracking-tight">
                Journal
              </span>
            </motion.div>
          </Link>

          {/* Right: Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/blog" 
              className="text-sm text-[var(--color-primary)] hover:text-[var(--color-foreground)] transition-colors hidden sm:block"
            >
              Todos los artículos
            </Link>
            <Link 
              href="/#contact" 
              className="px-4 py-2 text-sm font-medium bg-[var(--color-button-bg)] text-white rounded-full hover:bg-[var(--color-button-bg-hover)] transition-colors"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
