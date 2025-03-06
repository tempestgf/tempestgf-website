import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import CyberTerminal from '../components/elements/CyberTerminal';

// Terminal code snippets - defined outside to prevent recreation
const TERMINAL_CODE_SNIPPETS = [
  "$ initializing secure quantum connection...",
  "$ establishing encrypted network protocols...",
  "$ generating adaptive neural patterns...",
  "$ decrypting blockchain access tokens...",
  "$ verifying multi-factor authentication...",
  "$ neural handshake complete - connection established [OK]"
];

/**
 * Ultra-optimized hook to manage all hero section effects
 */
const useHeroEffects = ({
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
}) => {
  // Core states - minimized to essential ones
  const [glitchActive, setGlitchActive] = useState(false);
  const [showFlare, setShowFlare] = useState(false);
  const [scanLineActive, setScanLineActive] = useState(false);
  const [showDataStream, setShowDataStream] = useState(false);
  const [activeAttention, setActiveAttention] = useState(null);
  const [visibleParticles, setVisibleParticles] = useState([]);
  const [terminalMounted, setTerminalMounted] = useState(false);
  const [typingComplete, setLocalTypingComplete] = useState(false);
  
  // References for cleanup and optimization
  const isMounted = useRef(true);
  const mouseThrottleRef = useRef(null);
  const timersRef = useRef([]);
  const intervalsRef = useRef([]);
  const batteryOptimizeRef = useRef(false);

  // Use memoized turbulence value for consistent reference
  const turbulence = useRef(0).current;
  const pulseFrequency = useRef(isMobile ? 0.8 : 1).current;

  // Generate hexGrid once - optimized for performance
  const hexGrid = useMemo(() => {
    // Skip for low resource mode
    if (isLowResourceMode) return Array(3).fill().map((_, i) => ({
      x: `${30 * i}%`,
      y: `${30 * i}%`,
      size: 40,
      opacity: 0.1,
      rotate: 0,
      scale: 1,
      duration: 10,
      delay: i * 0.5
    }));
    
    // Generate optimized hex grid
    const count = isMobile ? 5 : (isTablet ? 8 : 15);
    return Array.from({ length: count }).map((_, i) => {
      const size = 60 + (i * 5) % 40;
      // Pre-compute values to avoid calculations in render
      return {
        x: `${(i * 17) % 90}%`,
        y: `${(i * 23) % 90}%`,
        size: size,
        scale: 0.7 + (i % 5) * 0.1,
        opacity: 0.1 + (i % 3) * 0.05,
        rotate: (i * 30) % 360,
        duration: 7 + i % 5,
        delay: i * 0.2
      };
    });
  }, [isMobile, isTablet, isLowResourceMode]);

  // Create static particle system reference
  const particleSystem = useMemo(() => ({ 
    active: !isLowResourceMode,
    particles: [] 
  }), [isLowResourceMode]);

  // Mouse movement handler with optimization
  const handleMouseMove = useCallback((e) => {
    if (isLowResourceMode || mouseThrottleRef.current) return;
    
    mouseThrottleRef.current = requestAnimationFrame(() => {
      if (!isMounted.current) return;
      
      // Center-based mouse position for parallax effect
      const rect = containerRef?.current?.getBoundingClientRect();
      if (!rect) {
        mouseThrottleRef.current = null;
        return;
      }
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;
      
      // Update motion values with damping for smoother effect
      x.set(mouseX * 0.5); // Reduced intensity
      y.set(mouseY * 0.5);
      
      // Update cursor position directly from mouse position
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Handle particle creation - reduced frequency
      if (Math.random() > 0.7 && !isLowResourceMode && !batteryOptimizeRef.current) {
        const speedFactor = 0.05;
        const newParticle = {
          id: Date.now().toString() + Math.random().toString().slice(2, 8),
          x: e.clientX,
          y: e.clientY,
          size: 5 + Math.random() * 15,
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: (Math.random() - 0.5) * speedFactor,
          life: 80 + Math.random() * 20,
          color: `hsl(${20 + Math.random() * 20}, 100%, ${50 + Math.random() * 20}%)`
        };
        
        setVisibleParticles(prev => [...prev.slice(-19), newParticle]);
      }
      
      mouseThrottleRef.current = null;
    });
  }, [isLowResourceMode, containerRef, x, y, cursorX, cursorY]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    // Smoothly return to center
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Glitch effect trigger
  const triggerGlitch = useCallback(() => {
    if (isLowResourceMode) return;
    
    setGlitchActive(true);
    const timerId = setTimeout(() => {
      if (isMounted.current) setGlitchActive(false);
    }, 250);
    
    timersRef.current.push(timerId);
  }, [isLowResourceMode]);

  // Main initialization with effects
  useEffect(() => {
    isMounted.current = true;
    
    // Skip when not in view
    if (!isInView || !mounted) return;
    
    // Check for battery status to optimize
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        batteryOptimizeRef.current = battery.level < 0.2 && !battery.charging;
      }).catch(() => {});
    }
    
    // Immediately mount terminal for better UX
    if (!terminalMounted) {
      setTerminalMounted(true);
    }
    
    // Skip heavy effects in low resource mode
    if (isLowResourceMode) {
      // Only advance terminal text
      const lineInterval = setInterval(() => {
        if (currentCodeLine < TERMINAL_CODE_SNIPPETS.length - 1) {
          setCurrentCodeLine(prev => prev + 1);
        } else if (!typingComplete) {
          clearInterval(lineInterval);
          setLocalTypingComplete(true);
          setTypingComplete(true);
        }
      }, isMobile ? 600 : 800);
      
      intervalsRef.current.push(lineInterval);
      return () => {
        isMounted.current = false;
        intervalsRef.current.forEach(clearInterval);
      };
    }
    
    // Reduced animation timings based on device
    const mobileFactorInterval = isMobile ? 2.5 : (isTablet ? 1.5 : 1);
    
    // Initial glitch with delayed execution
    timersRef.current.push(setTimeout(triggerGlitch, 800));
    
    // Flare effect - skip for lower-end devices
    if (!isTablet && !isMobile) {
      intervalsRef.current.push(setInterval(() => {
        if (isMounted.current && isInView && Math.random() > 0.6) {
          setShowFlare(true);
          timersRef.current.push(setTimeout(() => setShowFlare(false), 800));
        }
      }, 9000 * mobileFactorInterval));
    }
    
    // Scan line animation (reduced frequency)
    intervalsRef.current.push(setInterval(() => {
      if (isMounted.current && isInView && Math.random() > 0.5) {
        setScanLineActive(true);
        timersRef.current.push(setTimeout(() => setScanLineActive(false), 500));
      }
    }, 6000 * mobileFactorInterval));
    
    // Typing animation - critical for UX
    const lineInterval = setInterval(() => {
      if (currentCodeLine < TERMINAL_CODE_SNIPPETS.length - 1) {
        setCurrentCodeLine(prev => prev + 1);
      } else if (!typingComplete) {
        clearInterval(lineInterval);
        setLocalTypingComplete(true);
        setTypingComplete(true);
      }
    }, isMobile ? 500 : (isTablet ? 650 : 800));
    
    intervalsRef.current.push(lineInterval);
    
    // Optional animations based on device capability
    if (qualitySettings.effectsEnabled) {
      // Data stream animation (reduced frequency)
      intervalsRef.current.push(setInterval(() => {
        if (isMounted.current && isInView && Math.random() > 0.7) {
          setShowDataStream(true);
          timersRef.current.push(setTimeout(() => setShowDataStream(false), 1500));
        }
      }, 12000 * mobileFactorInterval));
      
      // Attention grabbing for desktops only
      if (!isMobile && !isTablet) {
        intervalsRef.current.push(setInterval(() => {
          if (!isMounted.current) return;
          const elements = ["title", "terminal"];
          const randomElement = elements[Math.floor(Math.random() * elements.length)];
          setActiveAttention(randomElement);
          timersRef.current.push(setTimeout(() => setActiveAttention(null), 1500));
        }, 15000));
      }
      
      // Rare glitch effects
      intervalsRef.current.push(setInterval(() => {
        if (isMounted.current && isInView && Math.random() > 0.7) {
          triggerGlitch();
        }
      }, 5000 * mobileFactorInterval));
    }
    
    // Cleanup function
    return () => {
      isMounted.current = false;
      
      // Clear all intervals
      intervalsRef.current.forEach(clearInterval);
      
      // Clear all timeouts
      timersRef.current.forEach(clearTimeout);
    };
  }, [
    mounted, 
    isInView,
    isMobile, 
    isTablet, 
    isLowResourceMode,
    qualitySettings, 
    triggerGlitch,
    currentCodeLine,
    typingComplete,
    terminalMounted,
    setTypingComplete,
    setCurrentCodeLine
  ]);

  // Particle update effect - separate for performance
  useEffect(() => {
    if (isLowResourceMode || !isInView || !mouseMoving) return;
    
    // Update existing particles
    setVisibleParticles(prev => 
      prev.map(p => ({
        ...p,
        x: p.x + p.speedX * 2,
        y: p.y + p.speedY * 2,
        life: p.life - 1,
        size: p.size * 0.99
      }))
      .filter(p => p.life > 0 && p.size > 0.5)
    );
    
    return () => {};
  }, [mouseMoving, isInView, isLowResourceMode]);

  // Memoized terminal component - only update when necessary
  const terminalComponent = useMemo(() => {
    if (!terminalMounted) {
      return (
        <div className="h-full w-full bg-[var(--color-background)]/60 rounded-xl border border-[var(--color-button-bg)]/20 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="inline-block w-6 h-6 border-2 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm text-[var(--color-button-bg)]">Initializing terminal...</div>
          </div>
        </div>
      );
    }
    
    // Console log for debugging
    console.log("Rendering CyberTerminal component with", { 
      currentLine: currentCodeLine, 
      typingComplete, 
      snippetsLength: TERMINAL_CODE_SNIPPETS.length 
    });
    
    return (
      <CyberTerminal 
        lines={TERMINAL_CODE_SNIPPETS}
        currentLine={currentCodeLine}
        typingComplete={typingComplete}
        isMobile={isMobile}
        skipInitialAnimations={isLowResourceMode}
        className="w-full h-full"
      />
    );
  }, [
    currentCodeLine, 
    typingComplete, 
    isMobile, 
    terminalMounted, 
    isLowResourceMode
  ]);

  return {
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
    visibleParticles,
    triggerGlitch,
  };
};

export default useHeroEffects;
