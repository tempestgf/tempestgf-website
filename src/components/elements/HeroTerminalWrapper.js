import React from 'react';
import { motion } from 'framer-motion';
import CyberTerminal from './CyberTerminal';

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
  // Simplified variants for better performance
  const attentionVariants = {
    attention: {
      boxShadow: [
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "0 25px 50px -12px rgba(var(--color-button-bg-rgb), 0.3)",
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      ],
      scale: [1, 1.02, 1],
      transition: { duration: 2 }
    }
  };

  console.log("HeroTerminalWrapper rendering, terminalComponent exists:", !!terminalComponent);

  return (
    <motion.div 
      ref={terminalRef}
      className="flex-1 w-full lg:max-w-[50%] relative z-20"
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
      <div className="backdrop-blur-sm rounded-2xl border border-[var(--color-border)]/30 overflow-hidden h-full">
        {/* Render terminal component or fallback */}
        <div className="h-full">
          {terminalComponent ? terminalComponent : (
            <CyberTerminal 
              lines={[
                "Initializing secure connection...",
                "Establishing quantum-encrypted channel...",
                "Loading portfolio assets...",
                "Running system diagnostics...",
                "Verifying digital signatures...",
                "Connection secure. Welcome to TempestGF's portfolio."
              ]}
              currentLine={3}
              typingComplete={true}
              skipInitialAnimations={isMobile || isLowResourceMode}
              isMobile={isMobile}
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(HeroTerminalWrapper);