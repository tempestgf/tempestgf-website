import React from 'react';
import { motion } from 'framer-motion';

const HeroDescription = ({ isMobile }) => {
  return (
    <motion.div
      className="relative max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="p-0.5 border border-[var(--color-border)]/30 rounded-lg">
        <p className="bg-[var(--color-background)]/50 backdrop-blur-md rounded-md p-4 text-xl text-[var(--color-primary)] leading-relaxed">
          Transforma tu visión digital con un enfoque de 
          <motion.span 
            className="text-[var(--color-button-bg)] font-semibold px-1 relative inline-block"
            whileHover={{ scale: 1.05 }}
          > 
            seguridad avanzada
            {/* Cyber security pattern animation */}
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
          </motion.span> 
          y tecnologías de próxima generación para el desarrollo moderno.
        </p>
        <motion.div 
          className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default HeroDescription;
