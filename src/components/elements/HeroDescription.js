import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const HeroDescription = ({ isMobile }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      className="relative max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.4 : 0.7 }}
    >
      <div className="p-0.5 border border-[var(--color-border)]/30 rounded-lg">
        <p className="bg-[var(--color-background)]/50 backdrop-blur-md rounded-md p-4 text-base sm:text-xl text-[var(--color-primary)] leading-relaxed">
          {t('heroSection.description.text')}
          <motion.span 
            className="text-[var(--color-button-bg)] font-semibold px-1 relative inline-block"
            whileHover={!isMobile ? { scale: 1.05 } : {}}
          > 
            {t('heroSection.description.highlight')}
            {/* Cyber security pattern animation - solo en desktop */}
            {!isMobile && (
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px]"
                style={{
                  background: "repeating-linear-gradient(to right, var(--color-button-bg) 0%, var(--color-button-bg) 50%, transparent 50%, transparent 100%)",
                  backgroundSize: "8px 1px"
                }}
                animate={{ 
                  backgroundPosition: ["0px 0px", "16px 0px"] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            )}
            {/* Línea estática para móvil */}
            {isMobile && (
              <span 
                className="absolute -bottom-1 left-0 w-full h-[1px]"
                style={{
                  background: "var(--color-button-bg)"
                }}
              />
            )}
          </motion.span> 
          {t('heroSection.description.ending')}
        </p>
        <motion.div 
          className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"
          animate={{ width: "100%" }}
          transition={{ duration: isMobile ? 0.8 : 1.5, delay: isMobile ? 0.6 : 1, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default HeroDescription;
