import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import CyberTerminal from './CyberTerminal';
import { useTranslation } from '../../hooks/useTranslation';

// Optimized wrapper that ensures terminal renders properly
const HeroTerminalWrapper = ({
  rotateX,
  rotateY,
  activeAttention,
  terminalRef,
  terminalComponent,
  isMobile,
  isLowResourceMode
}) => {
  const { t } = useTranslation();
  
  // Estado para el progreso de la animación inicial
  const [typingProgress, setTypingProgress] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // Líneas iniciales para la terminal - memoizadas para evitar re-renderizados
  const initialLines = useMemo(() => 
    t('terminal.lines'), 
  [t]);
  
  // Avanzar automáticamente por las líneas iniciales - optimizado
  useEffect(() => {
    if (isLowResourceMode) {
      // Saltar la animación en modo de recursos bajos
      setTypingProgress(initialLines.length);
      setIsTypingComplete(true);
      return;
    }
    
    // Usar tiempo más corto en móvil para mejorar la UX
    const interval = isMobile ? 600 : 800;
    
    const timer = setTimeout(() => {
      if (typingProgress < initialLines.length) {
        setTypingProgress(prev => prev + 1);
      } else if (!isTypingComplete) {
        // Marcar como completo cuando todas las líneas se han mostrado
        setIsTypingComplete(true);
      }
    }, interval);
    
    return () => clearTimeout(timer);
  }, [typingProgress, initialLines.length, isTypingComplete, isLowResourceMode, isMobile]);

  // Simplified variants for better performance
  const attentionVariants = useMemo(() => ({
    attention: {
      boxShadow: [
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "0 25px 50px -12px rgba(var(--color-button-bg-rgb), 0.3)",
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      ],
      scale: [1, 1.02, 1],
      transition: { duration: 2 }
    }
  }), []);

  // Solo loguear en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log("HeroTerminalWrapper rendering, terminalComponent exists:", !!terminalComponent);
  }

  return (
    <motion.div 
      ref={terminalRef}
      className="flex-1 w-full lg:w-1/2 relative z-20 min-h-[450px]"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      animate={activeAttention === "terminal" && !isLowResourceMode ? "attention" : "visible"}
      variants={attentionVariants}
    >
      {/* Simple decorative background for non-mobile */}
      {!isMobile && !isLowResourceMode && (
        <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-button-bg)]/10 to-transparent rounded-2xl blur-md -z-10 opacity-70"></div>
      )}
      
      {/* Glass morphism effect container */}
      <div className="backdrop-blur-sm rounded-2xl border border-[var(--color-border)]/30 overflow-hidden h-full flex flex-col">
        {/* Render terminal component or fallback */}
        <div className="flex-1 flex items-stretch">
          {terminalComponent ? terminalComponent : (
            <CyberTerminal 
              lines={initialLines}
              currentLine={typingProgress}
              typingComplete={isTypingComplete}
              skipInitialAnimations={isMobile || isLowResourceMode}
              isMobile={isMobile}
              className="w-full h-full"
              height="450px"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(HeroTerminalWrapper);