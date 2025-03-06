import React from 'react';
import { motion } from 'framer-motion';

const CursorEffect = ({ isMobile, isLowPowerDevice, cursorX, cursorY, cursorScale, mouseMoving, visibleParticles }) => {
  if (isMobile || isLowPowerDevice) {
    return null;
  }

  return (
    <>
      {/* Custom cursor effect */}
      <motion.div
        className="fixed w-20 h-20 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          backgroundColor: "rgba(255, 102, 0, 0.15)",
          scale: cursorScale,
          opacity: mouseMoving ? 0.7 : 0,
          boxShadow: "0 0 30px 10px rgba(255, 102, 0, 0.1)",
          filter: "blur(8px)"
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />
      
      {/* Cursor trailing particles */}
      {visibleParticles.map(particle => (
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
    </>
  );
};

export default CursorEffect;
