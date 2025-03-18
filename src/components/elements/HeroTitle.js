import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const HeroTitle = ({ isMobile }) => {
  // Optimize matrix generation using useMemo
  const matrix = useMemo(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const matrixSize = isMobile ? 15 : 30; // Reduced further for mobile
    return Array(matrixSize).fill().map(() => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.1
    }));
  }, [isMobile]);

  // Controls for synchronized animations
  const subtitleControls = useAnimation();
  
  // Start subtitle animation after main title
  useEffect(() => {
    const sequence = async () => {
      await subtitleControls.start('visible');
    };
    sequence();
  }, [subtitleControls]);

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
  };

  // Optimized matrix text animation variants
  const matrixCharVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.8 + (i * 0.03), 
        duration: 0.2
      }
    }),
    highlight: { 
      color: "var(--color-button-bg)", 
      textShadow: "0 0 8px var(--color-button-bg)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Cyberpunk badge - optimized */}
      <motion.div 
        className="inline-block px-3 sm:px-4 py-1 sm:py-2 relative mt-2 sm:mt-0" // Added margin-top for mobile
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[var(--color-button-bg)]/10 rounded-lg border-l-2 border-[var(--color-button-bg)]"></div>
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[var(--color-button-bg)]"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-button-bg)] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[var(--color-button-bg)] rounded-full"></div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="relative">
            <motion.span 
              className="inline-block w-2 sm:w-3 h-2 sm:h-3 bg-[var(--color-button-bg)]"
              animate={{ rotate: [0, 180] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.span 
              className="absolute inset-0 w-2 sm:w-3 h-2 sm:h-3 bg-[var(--color-button-bg)]" 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <span className="text-xs sm:text-sm font-mono text-[var(--color-button-bg)] relative z-10 tracking-wider">
            {isMobile ? "CYBER PLATFORM" : "ADVANCED CYBER PLATFORM"}
          </span>
          
          <motion.div 
            className="flex space-x-1"
            animate={{ x: [0, 3, 0, -3, 0] }}
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
      
      {/* Optimized matrix background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
        {matrix.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-[var(--color-button-bg)] font-mono text-sm"
            initial={{ x: `${item.x}%`, y: `${item.y}%`, opacity: item.opacity }}
            animate={{ y: [`${item.y}%`, `${item.y + 100}%`] }}
            transition={{ 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop" 
            }}
          >
            {item.char}
          </motion.div>
        ))}
      </div>
      
      {/* Ultra-enhanced title with individual letter animations */}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight relative mt-2 sm:mt-0">
        <div className="relative mb-2 z-20">
          <div className="flex items-baseline">
            {/* Main title with hardware-accelerated hover animations */}
            <div className="flex">
              {Array.from("Tempest").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block relative transform-gpu"
                  custom={idx}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ willChange: "transform" }}
                  whileHover={{ 
                    y: -7, 
                    color: "var(--color-button-bg)",
                    transition: {
                      duration: 0,
                      ease: "linear"
                    }
                  }}
                >
                  {letter}
                  
                  <motion.span 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--color-button-bg)] rounded-full transform-gpu"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { duration: 0 }
                    }}
                  />
                </motion.span>
              ))}
            </div>
            
            {/* Enhanced GF with matching hover animation as Tempest - REMOVED pulsation */}
            <motion.div
              className="text-[var(--color-button-bg)] relative ml-2 inline-block group transform-gpu"
              style={{ willChange: "transform" }}
              // Removed the pulsating textShadow animation
              whileHover={{ 
                y: -7, 
                color: "var(--color-button-bg)",
                transition: {
                  duration: 0,
                  ease: "linear"
                }
              }}
            >
              <motion.span className="relative z-10 inline-block transform-gpu">gf</motion.span>
              
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
                {[
                  { cx: 20, cy: 10, delay: 0 },
                  { cx: 80, cy: 10, delay: 0.5 },
                  { cx: 80, cy: 50, delay: 1 },
                  { cx: 20, cy: 50, delay: 1.5 }
                ].map((circle, idx) => (
                  <motion.circle 
                    key={idx}
                    cx={circle.cx} 
                    cy={circle.cy} 
                    r="2" 
                    fill="var(--color-button-bg)" 
                    fillOpacity="0.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: circle.delay }}  
                  />
                ))}
              </svg>
              
              {/* Enhanced glow on hover with immediate transition */}
              <motion.div 
                className="absolute inset-0 rounded-xl bg-[var(--color-button-bg)]/0 filter blur-lg transform-gpu"
                whileHover={{ 
                  backgroundColor: 'rgba(255, 102, 0, 0.3)',
                  transition: { duration: 0 }
                }}
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
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(to right, var(--color-button-bg), var(--color-button-bg-hover), var(--color-button-bg))"
              }}
            />
          </motion.div>
        </div>
        
        {/* ENHANCED "Think out the box (matrix)" subtitle */}
        <motion.div 
          className="relative z-10 mt-1 sm:mt-2"
          initial="hidden"
          animate={subtitleControls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.01,
                delayChildren: 0.6
              }
            }
          }}
        >
          {/* Professional container with enhanced 3D matrix design */}
          <div className="relative py-2 sm:py-4 px-2 sm:px-4 rounded border-l-2 border-r-2 border-[var(--color-button-bg)]/60 backdrop-blur-sm bg-gradient-to-r from-[rgba(255,102,0,0.05)] via-transparent to-[rgba(255,102,0,0.05)] matrix-container transform perspective-1000">
            {/* Matrix code rain effect in background */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              {Array(20).fill().map((_, idx) => (
                <motion.div 
                  key={`rain-${idx}`}
                  className="absolute bottom-0 text-[var(--color-button-bg)] font-mono text-xs w-4 text-center"
                  style={{ left: `${idx * 5 + Math.random() * 2}%` }}
                  initial={{ y: "-100%", opacity: 0.7 }}
                  animate={{ 
                    y: "100%", 
                    opacity: [0.7, 1, 0.7, 0.5, 0],
                    transition: { 
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2
                    }
                  }}
                >
                  {Array(8).fill().map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{
                        opacity: [1, 0.7, 1],
                        content: ["0", "1", "0", "1"],
                      }}
                      transition={{
                        opacity: { duration: 0.5 + Math.random(), repeat: Infinity },
                        content: { 
                          duration: Math.random() * 2 + 1, 
                          repeat: Infinity,
                          repeatType: "loop"
                        }
                      }}
                    >
                      {Math.round(Math.random())}
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Decorative digital grid patterns */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full border border-[var(--color-button-bg)]/30 grid grid-cols-12 grid-rows-6">
                {Array(12 * 6).fill().map((_, idx) => (
                  <div key={idx} className="border border-[var(--color-button-bg)]/10"></div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start relative z-10">
              {/* Enhanced header with hexadecimal display */}
              <div className="flex justify-between w-full mb-1 sm:mb-2">
                <div className="flex space-x-2 sm:space-x-3 opacity-80">
                  {/* Matrix coding numbers with random changes */}
                  {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="text-xs font-mono text-[var(--color-button-bg)]"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ 
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3
                      }}
                    >
                      {`0x${Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()}`}
                    </motion.div>
                  ))}
                </div>
                
                {/* Enhanced digital counter */}
                <motion.div
                  className="flex items-center space-x-2 text-xs font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <span className="text-[var(--color-foreground)]/60">MATRIX:</span>
                  <motion.span 
                    className="text-[var(--color-button-bg)]"
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      textShadow: [
                        '0 0 3px var(--color-button-bg)',
                        '0 0 8px var(--color-button-bg)',
                        '0 0 3px var(--color-button-bg)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    LOADED
                  </motion.span>
                </motion.div>
              </div>
              
              {/* Ultra 3D main text container with perspective effect */}
              <div 
                className="w-full relative overflow-hidden rounded"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Main text with enhanced 3D matrix effect */}
                <div className="flex items-center space-x-1 sm:space-x-2 relative px-1 sm:px-2 py-2 sm:py-3 transform">
                  {/* Enhanced left bracket with lighting effects */}
                  <motion.div
                    className="font-mono text-3xl lg:text-4xl text-[var(--color-button-bg)] font-bold relative"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    whileHover={{
                      textShadow: '0 0 15px var(--color-button-bg)',
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    [
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[var(--color-button-bg)]/30 to-transparent"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  {/* Enhanced main text with 3D reveal effect - MODIFIED for strikethrough effect */}
                  <div className="relative font-mono text-lg sm:text-xl lg:text-3xl font-bold text-foreground overflow-hidden flex-grow">
                    <div className="flex flex-wrap relative z-10">
                      {/* "Think out the" text */}
                      {Array.from("Think out the ").map((char, idx) => (
                        <motion.span
                          key={idx}
                          custom={idx}
                          variants={{
                            hidden: { 
                              opacity: 0, 
                              y: 30,
                              rotateX: 90,
                              filter: "blur(8px)"
                            },
                            visible: (i) => ({ 
                              opacity: 1, 
                              y: 0, 
                              rotateX: 0,
                              filter: "blur(0px)",
                              transition: { 
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: 0.8 + (i * 0.04), 
                              }
                            }),
                          }}
                          className="inline-block relative transform-gpu"
                          style={{ transformStyle: "preserve-3d", whiteSpace: "pre" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                      
                      {/* "box" with strikethrough animation */}
                      <div className="relative inline-block transform-gpu">
                        <motion.span
                          custom={10} // Continue sequence from previous letters
                          variants={{
                            hidden: { 
                              opacity: 0, 
                              y: 30,
                              rotateX: 90,
                              filter: "blur(8px)"
                            },
                            visible: { 
                              opacity: 1, 
                              y: 0, 
                              rotateX: 0,
                              filter: "blur(0px)",
                              transition: { 
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: 0.8 + (10 * 0.04), 
                              }
                            },
                          }}
                          className="inline-block relative font-mono transform-gpu text-[var(--color-foreground)]/60"
                          style={{ textDecoration: "line-through", textDecorationColor: "var(--color-button-bg)", textDecorationThickness: "2px" }}
                        >
                          box
                        </motion.span>
                        
                        {/* Line through effect */}
                        <motion.div 
                          className="absolute top-1/2 left-0 h-[2px] bg-[var(--color-button-bg)] transform-gpu"
                          style={{ y: "-50%" }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 2.3 }}
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced digital scan line */}
                    <motion.div
                      className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0], y: ["0%", "100%"] }}
                      transition={{ 
                        opacity: { duration: 1, repeat: Infinity, repeatDelay: 2 },
                        y: { duration: 1, repeat: Infinity, repeatDelay: 2 }
                      }}
                    />
                  </div>
                  
                  {/* Matrix part with enhanced styling */}
                  <div className="relative transform-gpu">
                    <motion.div
                      className="relative px-2 sm:px-3 py-1 rounded" 
                      initial={{ opacity: 0, scale: 0.9, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
                    >
                      {/* Matrix background with glowing effect */}
                      <motion.div 
                        className="absolute inset-0 rounded bg-[rgba(0,0,0,0.3)] border border-[var(--color-button-bg)]/40 z-0"
                        animate={{ 
                          boxShadow: [
                            'inset 0 0 5px var(--color-button-bg)',
                            'inset 0 0 15px var(--color-button-bg)',
                            'inset 0 0 5px var(--color-button-bg)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {/* Animated circuit pattern */}
                        <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 40">
                          {[
                            "M10,10 L30,10 L30,30 L70,30 L70,10 L90,10",
                            "M20,20 L80,20",
                            "M50,5 L50,35"
                          ].map((path, idx) => (
                            <motion.path 
                              key={idx}
                              d={path}
                              stroke="var(--color-button-bg)"
                              strokeWidth="0.5"
                              strokeDasharray="3,3"
                              fill="none"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ 
                                pathLength: 1, 
                                opacity: [0, 0.7, 0.7],
                                strokeDashoffset: [0, 50]
                              }}
                              transition={{ 
                                pathLength: { delay: 1.6 + idx * 0.2, duration: 1.5 },
                                opacity: { delay: 1.6 + idx * 0.2, duration: 1.5 },
                                strokeDashoffset: { 
                                  delay: 3, 
                                  duration: 20, 
                                  repeat: Infinity, 
                                  ease: "linear"
                                }
                              }}
                            />
                          ))}
                          {/* Circuit connection points */}
                          {[
                            { cx: 10, cy: 10 },
                            { cx: 30, cy: 10 },
                            { cx: 30, cy: 30 },
                            { cx: 70, cy: 30 },
                            { cx: 70, cy: 10 },
                            { cx: 90, cy: 10 },
                            { cx: 50, cy: 5 },
                            { cx: 50, cy: 35 }
                          ].map((circle, idx) => (
                            <motion.circle 
                              key={idx}
                              cx={circle.cx}
                              cy={circle.cy}
                              r="1.5"
                              fill="var(--color-button-bg)"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: 1, 
                                opacity: [0, 1, 0.7],
                                r: [1.5, 2, 1.5]
                              }}
                              transition={{ 
                                scale: { delay: 1.8 + (idx * 0.05), duration: 0.3 },
                                opacity: { delay: 1.8 + (idx * 0.05), duration: 0.3 },
                                r: { delay: 2, duration: 2, repeat: Infinity }
                              }}
                            />
                          ))}
                        </svg>
                      </motion.div>
                      
                      {/* Enhanced matrix text with reveal animation */}
                      <motion.span 
                        className="relative z-10 text-xl sm:text-2xl lg:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-button-bg)] via-[var(--color-button-bg-hover)] to-[var(--color-button-bg)] tracking-wide"
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          textShadow: [
                            '0 0 5px rgba(255,102,0,0.7)', 
                            '0 0 15px rgba(255,102,0,0.9)', 
                            '0 0 5px rgba(255,102,0,0.7)'
                          ]
                        }}
                        transition={{ 
                          backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
                          textShadow: { duration: 3, repeat: Infinity }
                        }}
                        style={{ backgroundSize: '200% auto' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 2.5, duration: 0.6, type: "spring" }
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 }
                        }}
                      >
                        matrix
                      </motion.span>
                      
                      {/* Animated binary indicators around matrix */}
                      <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-[var(--color-button-bg)]/70">
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          01
                        </motion.span>
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                        >
                          10
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced right bracket with lighting effects */}
                  <motion.div
                    className="font-mono text-3xl lg:text-4xl text-[var(--color-button-bg)] font-bold relative"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    whileHover={{
                      textShadow: '0 0 15px var(--color-button-bg)',
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    ]
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-l from-[var(--color-button-bg)]/30 to-transparent"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                
                {/* Enhanced bottom indicators with interactive elements */}
                <div className="w-full flex justify-between items-center mt-1 text-xs font-mono">
                  {/* Left status indicators with pulse effect */}
                  {!isMobile && (
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-[var(--color-button-bg)]"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                            boxShadow: [
                              '0 0 0px var(--color-button-bg)',
                              '0 0 10px var(--color-button-bg)',
                              '0 0 0px var(--color-button-bg)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[var(--color-foreground)]/70">ACTIVE</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-[var(--color-button-bg)]"
                          animate={{ 
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        />
                        <span className="text-[var(--color-foreground)]/70">SECURE</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Right counters with digital animation - simplified for mobile */}
                  <motion.div 
                    className={`flex space-x-2 sm:space-x-3 font-mono text-xs ${isMobile ? 'w-full justify-center' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.6 }}
                  >
                    <div className="text-[var(--color-foreground)]/60">SYS:</div>
                    <motion.div 
                      className="text-[var(--color-button-bg)]"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      OPTIMAL
                    </motion.div>
                    <div className="bg-[var(--color-button-bg)]/20 px-1 rounded text-[var(--color-button-bg)]">
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                      >
                        _
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Enhanced scanning lines and tech effects */}
            <motion.div
              className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent"
              animate={{ 
                y: [0, '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, repeatDelay: 5 },
                opacity: { duration: 2, repeat: Infinity, repeatDelay: 5, times: [0, 0.5, 1] }
              }}
            />
            
            {/* Digital noise overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-5">
              <motion.div 
                className="w-full h-full bg-noise"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>
      </h1>
    </>
  );
};

export default React.memo(HeroTitle);