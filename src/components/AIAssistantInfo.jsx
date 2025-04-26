'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistantInfo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);

  // Verificar si está en el lado cliente y si el usuario ya ha cerrado el mensaje
  useEffect(() => {
    setIsMounted(true);
    const dismissed = localStorage.getItem('aiAssistantInfoDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Guardar preferencia del usuario en localStorage para no mostrar nuevamente
    localStorage.setItem('aiAssistantInfoDismissed', 'true');
  };

  // No renderizar nada durante SSR o si el usuario ha cerrado el mensaje
  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-20 right-4 z-40 max-w-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden backdrop-blur-sm"
      >
        {/* Efecto de destello en la esquina */}
        <motion.div 
          className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-button-bg)]/20"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            borderRadius: "50%",
            filter: "blur(10px)"
          }}
        />
        
        {/* Elementos decorativos en las esquinas con animación */}
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color-button-bg)]/40"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color-button-bg)]/40"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Fondo con patrón de grid animado */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -10, 0], 
              x: [0, 5, 0] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute inset-0"
          >
            <svg width="120%" height="120%">
              <pattern id="info-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="30" height="30" fill="none" stroke="var(--color-button-bg)" strokeOpacity="0.4" />
                <circle cx="15" cy="15" r="1" fill="var(--color-button-bg)" fillOpacity="0.3" />
              </pattern>
              <rect x="-10%" y="-10%" width="120%" height="120%" fill="url(#info-grid)" />
            </svg>
          </motion.div>
        </div>
        
        {/* Partículas flotantes */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.2,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
            style={{
              width: 4 + index * 2,
              height: 4 + index * 2,
              left: `${10 + (index * 20)}%`,
              top: `${10 + (index * 15)}%`,
              background: `var(--color-button-bg)`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        <div className="p-6 relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {/* Título con efecto de destello */}
              <div className="flex items-center mb-3 relative">
                <div className="w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-[var(--color-button-bg)]/30 to-[var(--color-button-bg)]/5 flex items-center justify-center text-[var(--color-button-bg)] relative overflow-hidden">
                  {/* Efecto de pulso */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--color-button-bg)]"
                    animate={{
                      scale: [0.85, 1.2, 0.85],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-foreground)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-foreground)] via-[var(--color-foreground)] to-[var(--color-button-bg)]">
                    ¡Nuevo Asistente de IA!
                  </h3>
                  {/* Línea decorativa animada */}
                  <motion.div 
                    className="h-0.5 w-full bg-gradient-to-r from-[var(--color-button-bg)] via-[var(--color-button-bg)]/50 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              
              {/* Contenido con ligera animación */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-sm text-[var(--color-primary)] mb-3 ml-2 leading-relaxed">
                  Hemos añadido un <span className="text-[var(--color-button-bg)] font-medium">asistente virtual</span> de Google Gemini que puede responder a todas tus preguntas sobre la página web.
                </p>
                
                <div className="ml-2 mb-4 flex items-center text-xs text-[var(--color-primary)]/80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[var(--color-button-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Haz clic en el botón de chat en la esquina inferior derecha para probarlo.
                </div>
              </motion.div>
              
              {/* Botón mejorado con efectos avanzados */}
              <motion.button
                onClick={handleDismiss}
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
                className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white text-sm font-medium flex items-center justify-center group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  Entendido
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={hoverButton ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 1, repeat: hoverButton ? Infinity : 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                </span>
                
                {/* Fondo del botón con efecto de brillo */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0, left: '-100%' }}
                  animate={hoverButton ? 
                    { left: ['-100%', '200%'], opacity: [0, 0.2, 0] } : 
                    { left: '-100%' }
                  }
                  transition={{ duration: 1.5, repeat: hoverButton ? Infinity : 0 }}
                />
                
                {/* Efecto de partículas en el botón */}
                {hoverButton && (
                  <>
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={`btn-particle-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          scale: 0,
                          opacity: 0.7
                        }}
                        animate={{ 
                          x: (Math.random() - 0.5) * 100, 
                          y: (Math.random() - 0.5) * 40,
                          scale: Math.random() * 3,
                          opacity: 0
                        }}
                        transition={{ 
                          duration: 0.8 + Math.random() * 0.5,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 0.2
                        }}
                        style={{
                          left: `${50 + (Math.random() - 0.5) * 50}%`,
                          top: `${50 + (Math.random() - 0.5) * 50}%`
                        }}
                      />
                    ))}
                  </>
                )}
                
                {/* Efecto de luz en los bordes */}
                <motion.div 
                  className="absolute inset-0 rounded-lg opacity-0"
                  animate={hoverButton ? { 
                    boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 8px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'],
                    opacity: [0, 1, 0]
                  } : {}}
                  transition={{ duration: 1.5, repeat: hoverButton ? Infinity : 0 }}
                />
              </motion.button>
            </div>
            
            {/* Botón de cierre mejorado */}
            <motion.button
              onClick={handleDismiss}
              className="text-[var(--color-primary)] hover:text-[var(--color-button-bg)] p-1.5 rounded-full relative"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 0 8px rgba(255,102,0,0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistantInfo; 