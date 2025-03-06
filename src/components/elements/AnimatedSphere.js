import React from 'react';

// Simple optimized placeholder that avoids unnecessary rerenders
export const AnimatedSphere = React.memo(({ position, size, color, isMobile }) => {
  // Skip rendering some effects on mobile
  if (isMobile && size < 1) return null;
  
  return (
    <div 
      className="absolute rounded-full opacity-20"
      style={{
        width: size * (isMobile ? 70 : 100),
        height: size * (isMobile ? 70 : 100),
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        left: `${50 + position[0] * (isMobile ? 5 : 10)}%`,
        top: `${50 + position[1] * (isMobile ? 5 : 10)}%`,
        filter: 'blur(30px)',
        willChange: 'transform'
      }}
    />
  );
});

AnimatedSphere.displayName = 'AnimatedSphere';
