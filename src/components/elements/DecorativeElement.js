import React from 'react';
import { motion } from 'framer-motion';

const DecorativeElement = () => {
  return (
    <div className="absolute bottom-5 right-5 opacity-30 hidden lg:block">
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
        <motion.path 
          d="M10,90 L90,90 L90,10" 
          stroke="var(--color-button-bg)" 
          strokeWidth="1" 
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="90" cy="10" r="5" fill="var(--color-button-bg)" fillOpacity="0.5" />
        <circle cx="10" cy="90" r="5" fill="var(--color-button-bg)" fillOpacity="0.5" />
        <circle cx="90" cy="90" r="5" fill="var(--color-button-bg)" fillOpacity="0.5" />
      </svg>
    </div>
  );
};

export default DecorativeElement;
