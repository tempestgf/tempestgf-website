// src/components/elements/HeroBackground.js

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const HeroBackground = ({
  isMobile,
  isLowPowerDevice,
  particleSystem,
  pulseFrequency,
}) => {

  // Create hacker HUD elements
  const hudElements = useMemo(() => {
    if (isLowPowerDevice || isMobile) return [];
    
    return [
      { type: "corner", position: "top-left", size: isMobile ? 80 : 120 },
      { type: "corner", position: "top-right", size: isMobile ? 80 : 120 },
      { type: "corner", position: "bottom-left", size: isMobile ? 80 : 120 },
      { type: "corner", position: "bottom-right", size: isMobile ? 80 : 120 },
    ];
  }, [isMobile, isLowPowerDevice]);


  return (
    <div className="absolute inset-0 overflow-hidden"> 
      {/* Grid pattern - efecto hacker */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,102,0,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Optimized animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        style={{ 
          background: "radial-gradient(ellipse at 30% 40%, rgba(255,102,0,0.35) 0%, transparent 70%)",
        }}
      />
      
      {/* Animación de pulso - solo en desktop */}
      {!isMobile && !isLowPowerDevice && (
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: "radial-gradient(circle at 70% 60%, rgba(255,102,0,0.25) 0%, transparent 60%)",
            scale: pulseFrequency
          }}
          animate={{ 
            scale: [1, pulseFrequency, 1],
            opacity: [0.3, 0.35, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Cyberpunk HUD elements - solo en desktop */}
      {!isMobile && !isLowPowerDevice && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {hudElements.map((element, i) => (
            <div 
              key={`hud-${i}`}
              className={element.type === "corner" ? `absolute ${
                element.position === "top-left" ? "top-0 left-0" :
                element.position === "top-right" ? "top-0 right-0" :
                element.position === "bottom-left" ? "bottom-0 left-0" :
                element.position === "bottom-right" ? "bottom-0 right-0" : ""
              }` : `absolute`}
              style={element.type !== "corner" ? {
                left: element.position.x,
                top: element.position.y,
                transform: "translate(-50%, -50%)"
              } : {}}
            >
              {element.type === "corner" && (
                <svg width={element.size} height={element.size} viewBox="0 0 100 100" fill="none">
                  <motion.path
                    d={
                      element.position === "top-left" ? "M0,30 L0,0 L30,0" :
                      element.position === "top-right" ? "M70,0 L100,0 L100,30" :
                      element.position === "bottom-left" ? "M0,70 L0,100 L30,100" :
                      "M70,100 L100,100 L100,70"
                    }
                    stroke="var(--color-button-bg)"
                    strokeWidth="1.5"
                    strokeDasharray="5,5"
                    fill="none"
                    animate={{ strokeDashoffset: [0, 20] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle 
                    cx={element.position.includes("right") ? 85 : 15}
                    cy={element.position.includes("bottom") ? 85 : 15}
                    r="4"
                    fill="var(--color-button-bg)"
                    fillOpacity="0.8"
                    animate={{ r: [3, 5, 3], fillOpacity: [0.8, 0.9, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroBackground;