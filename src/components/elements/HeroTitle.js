import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle = ({ isMobile }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -10, filter: "blur(2px)" },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.07 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    attention: {
      textShadow: [
        '0 0 5px rgba(255, 102, 0, 0.3)',
        '0 0 10px rgba(255, 102, 0, 0.6)',
        '0 0 5px rgba(255, 102, 0, 0.3)'
      ],
      scale: [1, 1.03, 1],
      transition: { duration: 2, times: [0, 0.5, 1], repeat: 1 }
    }
  };

  return (
    <>
      {/* Enhanced cyberpunk badge */}
      <motion.div 
        className="inline-block px-4 py-2 relative"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[var(--color-button-bg)]/10 rounded-lg border-l-2 border-[var(--color-button-bg)]"></div>
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[var(--color-button-bg)]"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-button-bg)] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[var(--color-button-bg)] rounded-full"></div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <motion.span 
              className="inline-block w-3 h-3 bg-[var(--color-button-bg)]"
              animate={{ rotate: [0, 180] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.span 
              className="absolute inset-0 w-3 h-3 bg-[var(--color-button-bg)]" 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <span className="text-sm font-mono text-[var(--color-button-bg)] relative z-10 tracking-wider">
            ADVANCED CYBER PLATFORM
          </span>
          
          <motion.div 
            className="flex space-x-1"
            animate={{ 
              x: [0, 3, 0, -3, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {[1, 2, 3].map(i => (
              <span 
                key={i} 
                className="block w-1 h-1 rounded-full bg-[var(--color-button-bg)]"
              ></span>
            ))}
          </motion.div>
        </div>
        
        {/* Data scan effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>
      
      {/* Ultra-enhanced title with individual letter animations */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight relative">
        <div className="relative mb-2 z-20">
          <div className="flex items-baseline">
            {/* Main title with enhanced individual letter animations */}
            <div className="flex">
              {Array.from("Tempest").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block relative"
                  custom={idx}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    y: -7, 
                    color: "var(--color-button-bg)", 
                    transition: { duration: 0.2 } 
                  }}
                >
                  {letter}
                  
                  {/* Optional dots above on hover */}
                  <motion.span 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--color-button-bg)] rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              ))}
            </div>
            
            {/* Enhanced GF with advanced glow effects */}
            <motion.div
              className="text-[var(--color-button-bg)] relative ml-2 inline-block group"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(255,102,0,0.5)', 
                  '0 0 20px rgba(255,102,0,0.8)', 
                  '0 0 10px rgba(255,102,0,0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="relative z-10">gf</span>
              
              {/* Enhanced cyber decorations */}
              <motion.span 
                className="absolute -top-1 -right-1 block w-2 h-2 bg-[var(--color-button-bg)] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Circuit patterns around the letters */}
              <svg className="absolute -inset-4 z-0 opacity-70" viewBox="0 0 100 60" fill="none">
                <motion.path 
                  d="M20,10 L80,10 L80,50 L20,50 Z" 
                  stroke="var(--color-button-bg)" 
                  strokeWidth="1" 
                  strokeDasharray="3,3"
                  strokeOpacity="0.6" 
                  fill="none"
                  animate={{ strokeDashoffset: [0, 100] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="20" cy="10" r="2" fill="var(--color-button-bg)" fillOpacity="0.5" />
                <circle cx="80" cy="10" r="2" fill="var(--color-button-bg)" fillOpacity="0.5" />
                <circle cx="80" cy="50" r="2" fill="var(--color-button-bg)" fillOpacity="0.5" />
                <circle cx="20" cy="50" r="2" fill="var(--color-button-bg)" fillOpacity="0.5" />
              </svg>
              
              {/* Enhanced glow on hover */}
              <motion.div 
                className="absolute inset-0 rounded-xl bg-[var(--color-button-bg)]/0 filter blur-lg"
                whileHover={{ backgroundColor: 'rgba(255, 102, 0, 0.3)' }}
              />
            </motion.div>
          </div>
          
          {/* Animated underline effect */}
          <motion.div
            className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[var(--color-button-bg)] via-[var(--color-button-bg-hover)] to-[var(--color-button-bg)] bg-size-200"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(to right, var(--color-button-bg), var(--color-button-bg-hover), var(--color-button-bg))"
              }}
            />
          </motion.div>
        </div>
        
        {/* Enhanced subtitle with animation pattern */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 text-2xl sm:text-3xl font-bold">
            {['Secure', 'Fast', 'Innovative'].map((word, idx) => (
              <motion.div 
                key={word} 
                className="flex items-center group"
                whileHover={{ scale: 1.05 }}
              >
                {idx > 0 && <span className="text-[var(--color-button-bg)] mx-2">•</span>}
                <span className="text-[var(--color-primary)] group-hover:text-[var(--color-foreground)] transition-colors">
                  {word}
                </span>
                
                {/* Badge indicator for each feature */}
                <motion.div 
                  className="ml-1 bg-[var(--color-button-bg)]/10 rounded-full flex items-center justify-center h-5 w-5 text-xs text-[var(--color-button-bg)]"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: idx * 0.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {idx + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Animated pattern below subtitle */}
          <div className="absolute left-0 -bottom-2 w-full overflow-hidden h-[6px] opacity-50">
            <motion.div
              className="absolute inset-y-0 left-0 w-10 bg-[var(--color-button-bg)]/60"
              animate={{ x: ["0%", "1000%"] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
            />
          </div>
        </motion.div>
      </h1>
    </>
  );
};

export default HeroTitle;