"use client";

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

// Simple TypewriterText component with maximum optimization
const TypewriterText = memo(({ text, delay = 30, showCursor = true, cursor = true, skipAnimation = false }) => {
  const [displayedText, setDisplayedText] = useState(skipAnimation ? text : '');
  const [isComplete, setIsComplete] = useState(skipAnimation);
  const timeoutRef = useRef(null);
  const currentIndexRef = useRef(skipAnimation ? text.length : 0);

  // Use optimized animation scheduling
  useEffect(() => {
    if (skipAnimation) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    const animateTyping = () => {
      if (currentIndexRef.current < text.length) {
        const nextChar = text[currentIndexRef.current];
        setDisplayedText(prev => prev + nextChar);
        currentIndexRef.current++;
        
        timeoutRef.current = setTimeout(animateTyping, delay);
      } else {
        setIsComplete(true);
      }
    };

    // Start initial typing after a brief delay
    timeoutRef.current = setTimeout(animateTyping, delay);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, delay, skipAnimation]);

  return (
    <span>
      {displayedText}
      {(showCursor && !isComplete) || (isComplete && showCursor && cursor) ? (
        <span className="text-[var(--color-button-bg)]">_</span>
      ) : null}
    </span>
  );
});

// Super optimized terminal with minimal rendering
const CyberTerminal = memo(({ 
  lines = [], 
  currentLine = 0,
  typingComplete = false,
  className = "",
  showHeader = true,
  skipInitialAnimations = false,
  isMobile = false
}) => {
  // Optimized state initialization
  const [consoleData, setConsoleData] = useState(() => 
    skipInitialAnimations ? lines.slice(0, currentLine) : []
  );
  
  const [cursor, setCursor] = useState(true);
  const terminalRef = useRef(null);
  const isMounted = useRef(true);
  const blinkIntervalRef = useRef(null);
  const initialRenderComplete = useRef(false);
  
  // Status data for header - computed once
  const statusData = useRef([
    { label: "CPU", value: `${Math.floor(Math.random() * 30) + 10}%`, color: "text-green-400" },
    { label: "MEM", value: `${Math.floor(Math.random() * 40) + 30}%`, color: "text-yellow-400" },
    { label: "NET", value: `${Math.floor(Math.random() * 10) + 2}Mb/s`, color: "text-blue-400" },
  ]).current;

  // Debug logger that only runs in dev
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("CyberTerminal rendered with:", {
        linesCount: lines.length, 
        currentLine, 
        typingComplete,
        consoleData: consoleData.length
      });
    }
    
    // Mark initialization as complete
    initialRenderComplete.current = true;
  }, [lines.length, currentLine, typingComplete, consoleData.length]);

  // Cursor blink effect with reduced frequency
  useEffect(() => {
    isMounted.current = true;
    
    // Slower blink for better performance
    blinkIntervalRef.current = setInterval(() => {
      if (isMounted.current) setCursor(c => !c);
    }, isMobile ? 800 : 600);
    
    return () => {
      isMounted.current = false;
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [isMobile]);

  // Update console data when current line changes
  useEffect(() => {
    if (!isMounted.current || skipInitialAnimations) return;
    
    // Only update if current line is ahead of existing data
    if (currentLine >= consoleData.length && currentLine < lines.length) {
      const newData = [...consoleData, lines[currentLine]];
      setConsoleData(newData);
      
      // Scroll to bottom after update
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      });
    }
  }, [currentLine, lines, consoleData, skipInitialAnimations]);

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    });
  }, []);

  // Main render for terminal
  return (
    <div 
      className={`backdrop-blur-sm rounded-lg overflow-hidden border border-[var(--color-border)] relative ${className} h-full`}
      style={{ 
        backgroundColor: 'rgba(var(--color-background-rgb), 0.3)',
        boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.3)',
        minHeight: '450px'
      }}
    >
      {/* Terminal header - simplified */}
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-background)]/80">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div className="flex-1 text-center text-xs text-[var(--color-primary)] font-mono">
            secure-terminal@tempestgf
          </div>
          
          {/* Status indicators - reduced for mobile */}
          <div className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-3`}>
            {statusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xs text-[var(--color-primary)]">{status.label}:</span>
                <span className={`ml-1 text-xs font-mono ${status.color}`}>
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Terminal content with hidden scrollbar */}
      <div 
        ref={terminalRef}
        className="terminal-content h-[380px] px-4 py-3 overflow-y-auto font-mono text-sm text-[var(--color-foreground)] bg-[var(--color-background)]/40 relative scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
        onScroll={e => e.stopPropagation()}
      >
        {/* Simple terminal decorations */}
        <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-[var(--color-button-bg)]/50"></div>
        <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-[var(--color-button-bg)]/50"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-[var(--color-button-bg)]/50"></div>
        <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-[var(--color-button-bg)]/50"></div>
        
        {/* Terminal header text */}
        <div className="mb-4">
          <div className="text-[var(--color-button-bg)] font-bold">
            TempestGF Terminal v3.1.4
          </div>
          <div className="text-xs flex flex-wrap gap-x-4 gap-y-1 mt-1">
            <div className="flex items-center">
              <span className="text-green-400 mr-1">●</span>
              <span>Connection: Encrypted</span>
            </div>
            {!isMobile && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">●</span>
                <span>Protocol: Quantum-SSH</span>
              </div>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/30 to-transparent my-2"></div>
        </div>
        
        {/* Console output - optimized */}
        <div className="space-y-1">
          {consoleData.map((line, idx) => (
            <div key={idx} className="flex">
              <span className="text-[var(--color-button-bg)]">&gt;</span>
              <span className="pl-1.5">{line}</span>
            </div>
          ))}
        </div>
        
        {/* Current line with cursor */}
        {currentLine < lines.length && currentLine >= consoleData.length && (
          <div className="flex mt-1">
            <span className="text-[var(--color-button-bg)]">&gt;</span>
            <span className="pl-1.5">
              {typingComplete ? (
                lines[currentLine]
              ) : (
                <TypewriterText 
                  text={lines[currentLine]} 
                  delay={isMobile ? 15 : 25} 
                  showCursor={true}
                  cursor={cursor}
                  skipAnimation={skipInitialAnimations || isMobile}
                />
              )}
            </span>
          </div>
        )}
        
        {/* Final success message - simplified */}
        {typingComplete && (
          <div className="mt-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/40 to-transparent my-3"></div>
            
            <div className="relative pl-5 text-green-400">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-500"></div>
              Conexión establecida. Sistemas operativos.
            </div>
            
            <div className="flex mt-2">
              <span className="text-[var(--color-button-bg)]">▶</span>
              <span className="pl-1.5">
                Bienvenido al sistema TempestGF. Acceso concedido.
              </span>
            </div>
            
            {/* Command prompt */}
            <div className="mt-3 flex items-center">
              <span className="text-[var(--color-button-bg)]">$</span>
              <div className="pl-1.5 h-5 flex items-center">
                <span className="inline-block h-4 w-1.5 bg-[var(--color-button-bg)] animate-pulse"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Terminal footer - simplified */}
      <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-background)]/80 text-xs text-[var(--color-primary)] flex justify-between items-center">
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
          <span>Terminal active</span>
        </div>
        {!isMobile && (
          <div>Session: <span className="text-[var(--color-button-bg)]">secure</span></div>
        )}
      </div>
      
      {/* Custom scrollbar hiding CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
});

// Assign display names for debugging
TypewriterText.displayName = 'TypewriterText';
CyberTerminal.displayName = 'CyberTerminal';

export default CyberTerminal;