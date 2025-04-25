import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const ScrollIndicator = ({ scrollToAbout, isLowResourceMode }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="flex flex-col items-center opacity-70 cursor-pointer mx-auto w-max"
      animate={{ y: isLowResourceMode ? 0 : [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      onClick={scrollToAbout}
      role="button"
      aria-label={t('heroSection.scrollDown')}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToAbout();
        }
      }}
    >
      <div className="text-sm text-[var(--color-primary)] mb-2">{t('heroSection.scrollDown')}</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--color-button-bg)]">
        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
};

export default ScrollIndicator;
