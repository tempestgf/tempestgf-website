import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from 'next-themes';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [showFlare, setShowFlare] = useState(false);
  const { theme } = useTheme();
  
  // Using refs instead of state to avoid re-renders
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Motion values for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse movement to subtle motion
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);
  
  // Additional state for enhanced visual effects
  const [activeAttention, setActiveAttention] = useState(null);
  const [showDataStream, setShowDataStream] = useState(false);
  const [hoverEffects, setHoverEffects] = useState({});
  const [hexGrid, setHexGrid] = useState([]);
  
  // Animation controls for sequenced animations
  const controls = useAnimation();
  
  // Enhanced 3D effect parameters
  const perspective = 2000;
  const tiltAmount = 10;

  // More dramatic transform for decorative elements
  const decorX = useTransform(x, [-300, 300], [-50, 50]);
  const decorY = useTransform(y, [-300, 300], [-50, 50]);
  
  // Background elements transform for parallax layers
  const bgLayer1X = useTransform(x, [-300, 300], [-10, 10]);
  const bgLayer1Y = useTransform(y, [-300, 300], [-10, 10]);
  
  const bgLayer2X = useTransform(x, [-300, 300], [-20, 20]);
  const bgLayer2Y = useTransform(y, [-300, 300], [-20, 20]);
  
  const bgLayer3X = useTransform(x, [-300, 300], [-30, 30]);
  const bgLayer3Y = useTransform(y, [-300, 300], [-30, 30]);

  // Mouse movement for parallax effect - updated to use ref
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Get relative mouse position
    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    
    mousePositionRef.current = { x: relX, y: relY };
  };
  
  // Mouse leave handler to reset position
  const handleMouseLeave = () => {
    mousePositionRef.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    // Generate consistent patterns only on the client side
    const seedRandom = Array(10).fill(0).map(() => Math.random());
    
    // Generate hex grid only on client side
    const generatedHexGrid = Array.from({ length: 12 }).map((_, i) => {
      const x = (i % 4) * 25 + seedRandom[i % seedRandom.length] * 10;
      const y = Math.floor(i / 4) * 30 + seedRandom[(i + 3) % seedRandom.length] * 10;
      const delay = i * 0.1;
      const size = 70 + seedRandom[i % seedRandom.length] * 30;
      
      return { 
        x: `${x}%`, 
        y: `${y}%`, 
        delay: delay, 
        size: size,
        duration: 7 + seedRandom[i % seedRandom.length] * 5 // Ensure positive duration
      };
    });
    
    setHexGrid(generatedHexGrid);
    setMounted(true);
    
    // Periodically show flare effect
    const flareInterval = setInterval(() => {
      setShowFlare(true);
      setTimeout(() => setShowFlare(false), 1000);
    }, 5000);
    
    // Animate the mouse-driven parallax
    const updateMousePosition = () => {
      // Add smooth easing
      const easeX = (mousePositionRef.current.x - x.get()) * 0.1;
      const easeY = (mousePositionRef.current.y - y.get()) * 0.1;
      
      x.set(x.get() + easeX);
      y.set(y.get() + easeY);
    };

    const animateInterval = setInterval(updateMousePosition, 16.67); // ~60fps
    
    // Animate terminal typing effect
    let lineInterval;
    if (mounted) {
      const codeLines = Object.keys(codeSnippets).length;
      lineInterval = setInterval(() => {
        setCurrentCodeLine((prev) => {
          if (prev < codeLines - 1) return prev + 1;
          clearInterval(lineInterval);
          setTypingComplete(true);
          return prev;
        });
      }, 800); // Slightly faster typing for better engagement
    }
    
    // Initialize sequence animations
    if (mounted) {
      controls.start("visible");
      
      // Data stream effect that appears occasionally
      const dataStreamInterval = setInterval(() => {
        setShowDataStream(true);
        setTimeout(() => setShowDataStream(false), 2000);
      }, 8000);
      
      // Attention grabber effect that cycles through important UI elements
      const attentionInterval = setInterval(() => {
        const elements = ["title", "cta", "terminal"];
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        setActiveAttention(randomElement);
        setTimeout(() => setActiveAttention(null), 2000);
      }, 10000);
      
      // Cleanup intervals
      return () => {
        clearInterval(dataStreamInterval);
        clearInterval(attentionInterval);
      };
    }
    
    return () => {
      clearInterval(animateInterval);
      clearInterval(flareInterval);
      if (lineInterval) clearInterval(lineInterval);
    };
  }, [mounted, controls]);

  // Code snippets for the typing animation effect with enhanced stylings
  const codeSnippets = {
    0: "$ initializing secure quantum connection...",
    1: "$ establishing encrypted network protocols...",
    2: "$ generating adaptive neural patterns...",
    3: "$ decrypting blockchain access tokens...",
    4: "$ verifying multi-factor authentication...",
    5: "$ neural handshake complete - connection established [OK]"
  };
  
  // Background grid items count
  const gridItems = Array.from({ length: 30 }); // More particles for richer effect
  
  // Additional decorative elements
  const decorativeElements = [
    { shape: "circle", size: 180, opacity: 0.05, x: "15%", y: "20%", delay: 0 },
    { shape: "circle", size: 250, opacity: 0.03, x: "75%", y: "60%", delay: 0.2 },
    { shape: "square", size: 150, opacity: 0.04, x: "55%", y: "15%", delay: 0.5 },
    { shape: "triangle", size: 200, opacity: 0.03, x: "10%", y: "70%", delay: 0.8 }
  ];

  // Additional decorative elements
  const cyberElements = [
    { type: "circuit", x: "5%", y: "15%", size: 120, rotation: 0 },
    { type: "circuit", x: "85%", y: "75%", size: 180, rotation: 45 },
    { type: "nodes", x: "70%", y: "20%", size: 150, rotation: 0 },
    { type: "nodes", x: "15%", y: "80%", size: 100, rotation: 0 },
    { type: "dataPoints", x: "40%", y: "90%", size: 200, rotation: 0 },
  ];

  // Additional animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }),
    attention: {
      textShadow: [
        '0 0 5px rgba(255, 102, 0, 0.3)',
        '0 0 15px rgba(255, 102, 0, 0.7)',
        '0 0 5px rgba(255, 102, 0, 0.3)'
      ],
      scale: [1, 1.03, 1],
      transition: { duration: 2, times: [0, 0.5, 1], repeat: 1 }
    }
  };

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Sección principal"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)] transition-theme"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ultra-enhanced background with multiple depth layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Advanced animated gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(255,102,0,0.2) 0%, transparent 70%)",
            x: bgLayer1X, 
            y: bgLayer1Y 
          }}
        />
        
        {/* Hexagonal grid pattern */}
        <div className="absolute inset-0">
          {mounted && hexGrid.map((hex, i) => (
            <motion.div
              key={`hex-${i}`}
              className="absolute"
              style={{
                left: hex.x,
                top: hex.y,
                width: hex.size,
                height: hex.size,
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
              animate={{ 
                opacity: [0.03, 0.06, 0.03], 
                scale: [1, 1.1, 1],
                rotate: [30, 32, 30]
              }}
              transition={{
                duration: hex.duration || 7, // Ensure positive duration with fallback
                delay: hex.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                <polygon 
                  points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
                  stroke="var(--color-button-bg)" 
                  strokeWidth="1" 
                  strokeOpacity="0.5"
                  fill="none"
                />
                <circle cx="50" cy="50" r="3" fill="var(--color-button-bg)" fillOpacity="0.5" />
              </svg>
            </motion.div>
          ))}
        </div>
        
        {/* Advanced particles with glow and motion effects */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ x: bgLayer2X, y: bgLayer2Y }}
        >
          {mounted && gridItems.slice(0, 15).map((_, i) => {
            // Use consistent pseudo-random values instead of random inline
            const width = 200 + ((i * 53) % 150);
            const height = 200 + ((i * 37) % 150);
            const left = ((i * 17) % 100);
            const top = ((i * 23) % 100);
            const opacity = 0.07 + ((i * 3) % 5) / 100;
            const animX = ((i * 11) % 60) - 30;
            const animY = ((i * 13) % 60) - 30;
            const duration = 8 + (i % 15);
            const blur = i % 3 === 0 ? "30px" : "10px";
            
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  background: `radial-gradient(circle at center, var(--color-button-bg) 0%, rgba(255,102,0,0.1) 30%, transparent 70%)`,
                  filter: `blur(${blur})`,
                  opacity: opacity
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [opacity, opacity * 1.5, opacity],
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
          style={{ x: bgLayer3X, y: bgLayer3Y }}
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

      {/* Enhanced Main Content with 3D depth effects */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl px-8 py-10 sm:px-16 flex flex-col lg:flex-row items-center gap-12"
        style={{ 
          perspective,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Left content - Enhanced text and buttons with 3D transformations */}
        <motion.div 
          className="flex-1 space-y-8 backdrop-blur-lg rounded-2xl bg-[var(--color-background)]/5 p-8 border border-[var(--color-border)]/30 relative overflow-hidden"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          animate={activeAttention === "title" ? "attention" : "visible"}
          variants={{
            attention: {
              boxShadow: [
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                "0 25px 50px -12px rgba(255, 102, 0, 0.3)",
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              ],
              scale: [1, 1.02, 1],
              transition: { duration: 2 }
            }
          }}
        >
          {/* Glass morphism effect enhancement */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/0 dark:from-white/5 dark:to-black/20 z-0"></div>
          
          {/* Dynamic color glow effect */}
          <AnimatePresence>
            {(activeAttention === "title" || hoverEffects.card) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0"
                style={{
                  background: `
                    radial-gradient(circle at 30% 20%, var(--color-button-bg)/10 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, var(--color-button-bg)/10 0%, transparent 50%)
                  `,
                  filter: "blur(20px)"
                }}
              />
            )}
          </AnimatePresence>
          
          <div className="space-y-6 relative z-10">
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
            
            {/* Enhanced futuristic description */}
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

            {/* Rest of the component remains unchanged */}
            {/* ...existing code... */}
          </div>
        </motion.div>
        
        {/* Right content - Terminal/Code Visualization */}
        {/* ...existing code... */}
      </motion.div>
      
      {/* Decorative cyber element - bottom corner */}
      {/* ...existing code... */}
      
      {/* Scroll indicator */}
      {/* ...existing code... */}
    </section>
  );
};

// Terminal typing effect component
// ...existing code...

export default HeroSection;
