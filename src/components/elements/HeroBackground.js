// src/components/elements/HeroBackground.js

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSphere } from './AnimatedSphere';

const HeroBackground = ({
  isMobile,
  isLowPowerDevice,
  particleSystem,
  scanLineActive,
  showFlare,
  glitchActive,
  showDataStream,
  hexGrid,
  pulseFrequency,
  bgLayer1X,
  bgLayer1Y,
  bgLayer2X,
  bgLayer2Y,
  bgLayer3X,
  bgLayer3Y,
  turbulence
}) => {
  // Pre-calculate visible particles
  const visibleParticles = useMemo(() => {
    // No particles for low resource mode
    if (isLowPowerDevice) return [];
    
    // Limit number of particles based on device
    const maxParticles = isMobile ? 3 : 6;
    return particleSystem?.particles?.slice(-maxParticles) || [];
  }, [particleSystem?.particles, isMobile, isLowPowerDevice]);

  // Reduce number of grid items based on device capability
  const gridItems = useMemo(() => 
    Array.from({ length: isMobile ? 10 : 20 }), 
    [isMobile]
  );
  
  // Dynamic decorative elements based on device
  const cyberElements = useMemo(() => {
    if (isLowPowerDevice) return []; // None for low resource mode
    
    const baseElements = [
      { type: "circuit", x: "5%", y: "15%", size: 120, rotation: 0 },
      { type: "circuit", x: "85%", y: "75%", size: 180, rotation: 45 },
    ];
    
    // Add more elements only for desktop
    if (!isMobile) {
      baseElements.push(
        { type: "nodes", x: "70%", y: "20%", size: 150, rotation: 0 },
        { type: "dataPoints", x: "40%", y: "90%", size: 200, rotation: 0 }
      );
    }
    
    return baseElements;
  }, [isLowPowerDevice, isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cursor trailing particles - only on desktop */}
      {!isMobile && !isLowPowerDevice && visibleParticles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / 100,
            filter: `blur(${(10 - particle.size/3)}px)`
          }}
        />
      ))}
      
      {/* Scanline effect overlay - reduced on mobile */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-scanline opacity-10"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-vignette opacity-50"></div>
      
      {/* Animated scan line - skip for low power */}
      {!isLowPowerDevice && (
        <AnimatePresence>
          {scanLineActive && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: [0, 0.3, 0], y: ["0%", "100%"] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "linear" }}
              className="absolute inset-x-0 h-px bg-[var(--color-button-bg)] z-20 pointer-events-none"
              style={{ filter: "blur(1px) brightness(1.5)" }}
            />
          )}
        </AnimatePresence>
      )}
      
      {/* Optimized background spheres */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <AnimatedSphere position={[-2, 1, -2]} size={1.2} color="#ff6600" isMobile={isMobile} />
        <AnimatedSphere position={[2, -1, -1]} size={0.9} color="#ff8800" isMobile={isMobile} />
        <AnimatedSphere position={[0, 0, -3]} size={3} color="#ff4400" isMobile={isMobile} />
      </div>
      
      {/* Optimized animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: "radial-gradient(ellipse at 30% 40%, rgba(255,102,0,0.3) 0%, transparent 70%)",
          x: bgLayer1X, 
          y: bgLayer1Y 
        }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: "radial-gradient(circle at 70% 60%, rgba(255,102,0,0.2) 0%, transparent 60%)",
          x: bgLayer2X, 
          y: bgLayer2Y,
          scale: !isLowPowerDevice ? pulseFrequency : 1
        }}
        animate={!isLowPowerDevice ? { 
          scale: [1, pulseFrequency, 1],
          opacity: [0.3, 0.35, 0.3] 
        } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Enhanced hexagonal grid pattern - reduced on mobile */}
      <div className="absolute inset-0">
        {Array.isArray(hexGrid) && hexGrid.map((hex, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: hex.x,
              top: hex.y,
              width: hex.size,
              height: hex.size,
              opacity: hex.opacity,
              rotate: hex.rotate
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: hex.rotate - 10 }}
            animate={{ 
              opacity: [hex.opacity, hex.opacity * 1.5, hex.opacity], 
              scale: [hex.scale, hex.scale * 1.1, hex.scale],
              rotate: [hex.rotate - 1, hex.rotate + 1, hex.rotate - 1]
            }}
            transition={{
              duration: hex.duration || 7,
              delay: hex.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <motion.polygon 
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
                stroke="var(--color-button-bg)" 
                strokeWidth="1" 
                strokeOpacity="0.6"
                fill="none"
                strokeDasharray="5,5"
                animate={{ strokeDashoffset: [0, 20] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="3" 
                fill="var(--color-button-bg)" 
                fillOpacity="0.5" 
                animate={{ r: [3, 5, 3] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {i % 3 === 0 && (
                <motion.line 
                  x1="50" 
                  y1="20" 
                  x2="50" 
                  y2="80" 
                  stroke="var(--color-button-bg)" 
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                  strokeDasharray="2,4"
                  animate={{ strokeDashoffset: [0, 30] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              )}
              
              {i % 5 === 0 && (
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="15" 
                  stroke="var(--color-button-bg)" 
                  strokeOpacity="0.2"
                  strokeWidth="0.5"
                  fill="none"
                  animate={{ 
                    r: [15, 20, 15],
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Advanced particles with glow and motion effects */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          x: bgLayer2X,
          y: bgLayer2Y,
          filter: glitchActive ? "hue-rotate(30deg)" : "none"
        }}
      >
        {gridItems.map((_, i) => {
          // Use consistent pseudo-random values
          const width = 200 + ((i * 53) % 150);
          const height = 200 + ((i * 37) % 150);
          const left = ((i * 17) % 100);
          const top = ((i * 23) % 100);
          const opacity = 0.07 + ((i * 3) % 5) / 100;
          const animX = ((i * 11) % 60) - 30;
          const animY = ((i * 13) % 60) - 30;
          const duration = 8 + (i % 15);
          const blur = i % 3 === 0 ? "30px" : "10px";
          const hue = i * 5;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `radial-gradient(
                  circle at center, 
                  hsl(${30 + hue}, 100%, 65%) 0%, 
                  hsla(${20 + hue}, 100%, 50%, 0.1) 30%, 
                  transparent 70%
                )`,
                filter: `blur(${blur})`,
                opacity: opacity
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [opacity, opacity * 1.8, opacity],
                x: [0, animX],
                y: [0, animY],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
      </motion.div>
      
      {/* High-tech cyberpunk decorative elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          x: bgLayer3X, 
          y: bgLayer3Y,
          opacity: showFlare ? 0.2 : 0.1 
        }}
      >
        {cyberElements.map((element, i) => (
          <motion.div
            key={`cyber-${i}`}
            className="absolute"
            style={{
              left: element.x,
              top: element.y,
              width: element.size,
              height: element.size,
              rotate: element.rotation,
              opacity: 0.1,
            }}
          >
            {element.type === "circuit" && (
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,20 L50,20 L50,50 L80,50 L80,80" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="5,5" />
                <circle cx="20" cy="20" r="5" fill="var(--color-button-bg)" fillOpacity="0.5" />
                <circle cx="50" cy="50" r="5" fill="var(--color-button-bg)" fillOpacity="0.5" />
                <circle cx="80" cy="80" r="5" fill="var(--color-button-bg)" fillOpacity="0.5" />
              </svg>
            )}
            {element.type === "nodes" && (
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="50" cy="50" r="30" stroke="var(--color-button-bg)" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="10" fill="var(--color-button-bg)" fillOpacity="0.3" />
              </svg>
            )}
            {element.type === "dataPoints" && (
              <motion.svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <line x1="0" y1="50" x2="100" y2="50" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.8" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.8" />
                <circle cx="50" cy="50" r="45" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="50" cy="50" r="30" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.6" />
                <circle cx="50" cy="50" r="15" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.8" />
                <circle cx="50" cy="50" r="5" fill="var(--color-button-bg)" fillOpacity="0.4" />
              </motion.svg>
            )}
          </motion.div>
        ))}
        
        {/* Dynamic animated cyber lines */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={`h-line-enhanced-${i}`}
            className="absolute h-px w-full"
            style={{ 
              top: `${20 * i}%`, 
              background: `linear-gradient(to ${i % 2 === 0 ? 'right' : 'left'}, transparent, var(--color-button-bg)/20, transparent)`
            }}
            animate={{ 
              x: i % 2 === 0 ? [-300, 300] : [300, -300], 
              opacity: [0.1, 0.3, 0.1],
              scaleY: [1, 2, 1],
              filter: ['blur(0px)', 'blur(1px)', 'blur(0px)']
            }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </motion.div>
      
      {/* Enhanced cyberspace data visualization */}
      <AnimatePresence>
        {showDataStream && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`stream-${i}`}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-[var(--color-button-bg)] to-transparent"
                style={{
                  left: `${(100 / 15) * i}%`,
                  opacity: 0.4,
                  height: '200%',
                  top: '-50%'
                }}
                animate={{
                  y: ['-50%', '50%'], // Moves downward
                  opacity: [0, 0.4, 0],
                  scaleY: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "linear"
                }}
              />
            ))}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-button-bg)]/5 to-transparent"
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroBackground;