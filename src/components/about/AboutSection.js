"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileSection from './ProfileSection';
import TabsSection from './TabsSection';
import TechEnvironment from './TechEnvironment';

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      id="about"
      className="py-16 px-4 bg-[var(--color-background)] relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[var(--color-button-bg)] opacity-20"></div>
      <div className="absolute top-40 left-10 w-20 h-20 border-t-2 border-l-2 border-[var(--color-button-bg)] opacity-20"></div>
      
      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
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
      </div>
      
      <div className="container-responsive relative">
        <ProfileSection />
        <TabsSection />
        <TechEnvironment />
      </div>
    </section>
  );
}
