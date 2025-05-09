// src/components/HeroSection.js

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";
import useMediaQuery from "../hooks/useMediaQuery";
import { useInView } from '../hooks/useInView';
import useHeroEffects from "../hooks/useHeroEffects";
import { getQualitySettings } from "../utils/performanceUtils";
import useHeaderHeight from "../hooks/useHeaderHeight";

// Componentes extraídos
import HeroBackground from "./elements/HeroBackground";
import HeroTitle from "./elements/HeroTitle";
import HeroDescription from "./elements/HeroDescription";
import CursorEffect from "./elements/CursorEffect";
import HeroTerminalWrapper from "./elements/HeroTerminalWrapper";
import ScrollIndicator from "./elements/ScrollIndicator";
import DecorativeElement from "./elements/DecorativeElement";

// Main component with extreme optimization
const HeroSection = () => {
  // Performance tracking
  const renderCountRef = useRef(0);
  const lastRenderTime = useRef(Date.now());
  
  // Added performance monitoring in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      renderCountRef.current++;
      const now = Date.now();
      const timeSinceLastRender = now - lastRenderTime.current;
      lastRenderTime.current = now;
      
      console.log(`HeroSection rendered: #${renderCountRef.current}, Time since last render: ${timeSinceLastRender}ms`);
    }
  });

  // Device and preference detection - critical for performance
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isLowPowerDevice = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersReducedData = useMediaQuery('(prefers-reduced-data: reduce)');
  
  // Combine all low-resource conditions
  const isLowResourceMode = useMemo(() => 
    isMobile || isLowPowerDevice || prefersReducedData, 
    [isMobile, isLowPowerDevice, prefersReducedData]
  );

  // Visibility optimization
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 }) || true;
  
  // Core states with optimized defaults
  const [mounted, setMounted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  
  // Get mouse position - Fixed: Don't call hook inside useMemo
  const mousePositionData = useMousePosition();
  // Only use mouse position data if not in low resource mode
  const mousePosition = !isLowResourceMode ? mousePositionData.mousePosition : { x: 0, y: 0, speedX: 0, speedY: 0 };
  const mouseMoving = !isLowResourceMode ? mousePositionData.mouseMoving : false;
  
  // Core refs
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Motion values - optimized to minimize reflows
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSizeValue = useMotionValue(20);
  const cursorScale = useTransform(cursorSizeValue, [20, 60], [1, 1.5]);
  
  // Enhanced dynamic performance scaling
  const qualitySettings = useMemo(() => 
    getQualitySettings(isMobile, isTablet, isLowPowerDevice, prefersReducedData),
    [isMobile, isTablet, isLowPowerDevice, prefersReducedData]
  );

  // Apply quality settings pero con valores fijos (0) para eliminar inclinación
  const rotateX = useTransform(y, [-300, 300], [0, 0]);
  const rotateY = useTransform(x, [-300, 300], [0, 0]);
  
  // Setup hero effects with memoized dependencies
  const { 
    glitchActive,
    showFlare,
    scanLineActive,
    turbulence,
    showDataStream,
    activeAttention,
    hexGrid,
    particleSystem,
    pulseFrequency,
    handleMouseMove,
    handleMouseLeave,
    terminalComponent,
    visibleParticles
  } = useHeroEffects({
    isMobile, 
    isTablet, 
    isLowResourceMode, 
    isInView, 
    mounted,
    containerRef,
    x, y, 
    cursorX, cursorY,
    mousePosition, 
    mouseMoving,
    qualitySettings,
    setTypingComplete,
    currentCodeLine,
    setCurrentCodeLine
  });

  // Eliminar transformaciones del fondo basadas en el movimiento del mouse
  const bgFactorM = 0;
  const bgLayer1X = useTransform(x, [-300, 300], [0, 0]);
  const bgLayer1Y = useTransform(y, [-300, 300], [0, 0]);
  const bgLayer2X = useTransform(x, [-300, 300], [0, 0]);
  const bgLayer2Y = useTransform(y, [-300, 300], [0, 0]);
  const bgLayer3X = useTransform(x, [-300, 300], [0, 0]);
  const bgLayer3Y = useTransform(y, [-300, 300], [0, 0]);

  // Estado para almacenar la altura de la ventana
  const [windowHeight, setWindowHeight] = useState(0);
  
  // Actualizar altura de la ventana al montar y cuando cambie el tamaño
  useEffect(() => {
    const updateWindowHeight = () => {
      if (typeof window !== 'undefined') {
        setWindowHeight(window.innerHeight);
      }
    };
    
    // Actualizar altura inicial
    updateWindowHeight();
    
    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', updateWindowHeight);
    
    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // Main initialization
  useEffect(() => {
    setMounted(true);
    
    // Only force repaint if there are rendering issues
    if (typeof window !== 'undefined' && window.performance?.measure) {
      window.requestAnimationFrame(() => {
        // Mark performance for debugging
        try {
          performance.mark('hero-loaded');
        } catch (e) {}
      });
    }
  }, []);

  // Scroll to About section function - simplificada para usar scroll-margin-top
  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: isLowResourceMode ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }, [isLowResourceMode]);

  const headerHeight = useHeaderHeight();

  // Optimize initial loading by returning null until mounted
  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Sección principal"
      className="relative flex items-center justify-center overflow-hidden bg-[var(--color-background)] transition-theme touch-manipulation pt-20 sm:pt-24"
      style={{ 
        paddingTop: `${headerHeight}px`,
        minHeight: isMobile && windowHeight > 0 ? `${windowHeight}px` : '100vh',
        height: isMobile && windowHeight > 0 ? `${windowHeight}px` : 'auto'
      }}
    >
      {/* Custom cursor effect - solo en desktop */}
      {!isMobile && !isLowResourceMode && (
        <CursorEffect 
          isMobile={isMobile}
          isLowPowerDevice={isLowPowerDevice}
          cursorX={cursorX}
          cursorY={cursorY}
          cursorScale={cursorScale}
          mouseMoving={mouseMoving}
          visibleParticles={visibleParticles}
        />
      )}
      
      {/* Background elements - solo en desktop */}
      {!isMobile && (
        <HeroBackground 
          isMobile={isMobile}
          isLowPowerDevice={isLowPowerDevice}
          particleSystem={particleSystem}
          scanLineActive={scanLineActive}
          showFlare={showFlare}
          glitchActive={glitchActive}
          showDataStream={showDataStream}
          hexGrid={hexGrid}
          pulseFrequency={pulseFrequency}
          bgLayer1X={bgLayer1X}
          bgLayer1Y={bgLayer1Y}
          bgLayer2X={bgLayer2X}
          bgLayer2Y={bgLayer2Y}
          bgLayer3X={bgLayer3X}
          bgLayer3Y={bgLayer3Y}
          turbulence={turbulence}
        />
      )}

      {/* Main Content con efecto 3D desactivado */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 flex flex-col lg:flex-row items-center gap-5 md:gap-8 lg:gap-12"
        style={{ 
          perspective: isMobile ? 1500 : 2500,
          marginTop: isMobile ? '20px' : '32px',
          marginBottom: isMobile ? '60px' : '40px'
        }}
      >
        {/* Left content - sin efecto de movimiento con el mouse */}
        <motion.div 
          className="flex-1 w-full space-y-4 sm:space-y-6 backdrop-blur-lg rounded-xl sm:rounded-2xl bg-[var(--color-background)]/5 p-3 sm:p-4 lg:p-8 border border-[var(--color-border)]/30 relative overflow-hidden"
          style={{
            // Sin valores de rotación
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
          
          {/* Dynamic color glow effect - Solo en desktop */}
          {activeAttention === "title" && !isLowResourceMode && !isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0"
              style={{
                background: `radial-gradient(circle at 30% 20%, var(--color-button-bg)/10 0%, transparent 50%),
                  radial-gradient(circle at 70% 60%, var(--color-button-bg)/10 0%, transparent 50%)`,
                filter: "blur(20px)"
              }}
            />
          )}
          
          <div className="space-y-3 sm:space-y-4 md:space-y-6 relative z-10">
            {/* Title section - siempre visible */}
            <HeroTitle isMobile={isMobile} />
            
            {/* Description section - siempre visible */}
            <HeroDescription isMobile={isMobile} />
          </div>
        </motion.div>
        
        {/* Right content - Terminal/Code Visualization - Solo en desktop */}
        {!isMobile && (
          <HeroTerminalWrapper
            rotateX={rotateX.get()}
            rotateY={rotateY.get()}
            activeAttention={activeAttention}
            terminalRef={terminalRef}
            terminalComponent={terminalComponent}
            isMobile={isMobile}
            isLowResourceMode={isLowResourceMode}
          />
        )}
      </div>
      
      {/* Decorative cyber element - bottom corner - only on desktop */}
      {!isMobile && !isLowResourceMode && <DecorativeElement />}
      
      {/* Scroll indicator - simplified - move up on mobile */}
      <div className={`${isMobile ? "absolute bottom-8 left-0 right-0" : "absolute bottom-10 left-0 right-0"}`}>
        <ScrollIndicator scrollToAbout={scrollToAbout} isLowResourceMode={isLowResourceMode} />
      </div>
    </section>
  );
};

export default React.memo(HeroSection);