"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-[var(--color-button-bg)]/5"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Grid lines */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="blog-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="40" fill="none" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.1" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
        </motion.div>
        
        {/* Decorative borders */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[var(--color-button-bg)] opacity-10"></div>
        <div className="absolute top-40 left-10 w-20 h-20 border-t-2 border-l-2 border-[var(--color-button-bg)] opacity-10"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative icon */}
          <motion.div 
            className="w-24 h-24 mx-auto mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--color-button-bg)]/20 to-transparent"></div>
            <div className="absolute inset-2 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-button-bg)]/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[var(--color-button-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-foreground)] to-[var(--color-button-bg)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('blog.comingSoon.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-[var(--color-primary)] mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('blog.comingSoon.description')}
          </motion.p>

          {/* Features preview */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: "🔐", title: t('blog.comingSoon.features.security'), desc: t('blog.comingSoon.features.securityDesc') },
              { icon: "🤖", title: t('blog.comingSoon.features.ai'), desc: t('blog.comingSoon.features.aiDesc') },
              { icon: "💻", title: t('blog.comingSoon.features.development'), desc: t('blog.comingSoon.features.developmentDesc') }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-[var(--color-background)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-button-bg)]/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">{feature.title}</h3>
                <p className="text-[var(--color-primary)] text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/">
              <motion.button
                className="bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white px-8 py-4 rounded-lg font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {t('blog.comingSoon.backHome')}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.7 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Progress indicator */}
          <motion.div 
            className="mt-12 max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex justify-between text-sm text-[var(--color-primary)] mb-2">
              <span>{t('blog.comingSoon.progress')}</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-[var(--color-border)] rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
