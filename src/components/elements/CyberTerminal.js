"use client";

import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

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
  isMobile = false,
  height = "450px"
}) => {
  const { t } = useTranslation();
  
  // Comandos disponibles para la terminal interactiva utilizando traducciones
  const AVAILABLE_COMMANDS = useMemo(() => ({
    help: t('terminal.commands.help'),
    about: t('terminal.commands.about'),
    skills: t('terminal.commands.skills'),
    projects: t('terminal.commands.projects'),
    contact: t('terminal.commands.contact'),
    clear: t('terminal.commands.clear'),
    echo: t('terminal.commands.echo'),
    date: t('terminal.commands.date'),
    whoami: t('terminal.commands.whoami'),
  }), [t]);

  // Respuestas para cada comando utilizando traducciones
  const COMMAND_RESPONSES = useMemo(() => ({
    about: t('terminal.responses.about'),
    skills: t('terminal.responses.skills'),
    projects: t('terminal.responses.projects'),
    contact: t('terminal.responses.contact'),
    whoami: t('terminal.responses.whoami'),
    unknown: t('terminal.responses.unknown')
  }), [t]);

  // Optimized state initialization
  const [consoleData, setConsoleData] = useState(() => 
    skipInitialAnimations ? lines.slice(0, currentLine) : []
  );
  
  // Estado para la terminal interactiva
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  
  const [cursor, setCursor] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const isMounted = useRef(true);
  const blinkIntervalRef = useRef(null);
  const initialRenderComplete = useRef(false);
  
  // Status data for header - computed once and memoized
  const statusData = useMemo(() => [
    { label: "CPU", value: `${Math.floor(Math.random() * 30) + 10}%`, color: "text-green-400" },
    { label: "MEM", value: `${Math.floor(Math.random() * 40) + 30}%`, color: "text-yellow-400" },
    { label: "NET", value: `${Math.floor(Math.random() * 10) + 2}Mb/s`, color: "text-blue-400" },
  ], []);

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

  // Cursor blink effect with reduced frequency - further optimized for mobile
  useEffect(() => {
    isMounted.current = true;
    
    // Slower blink for better performance, even slower on mobile
    blinkIntervalRef.current = setInterval(() => {
      if (isMounted.current) setCursor(c => !c);
    }, isMobile ? 1000 : 600);
    
    return () => {
      isMounted.current = false;
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [isMobile]);

  // Terminal output processing
  const processConsoleData = useCallback(() => {
    if (!isMounted.current || skipInitialAnimations) return;
    
    // Only update if current line is ahead of existing data
    if (currentLine >= consoleData.length && currentLine < lines.length) {
      setConsoleData(prev => [...prev, lines[currentLine]]);
    }
    
    // Comprobamos si hemos completado la animación inicial
    if (typingComplete && currentLine >= lines.length - 1) {
      setIsInitialAnimationComplete(true);
    }
  }, [currentLine, lines, consoleData, skipInitialAnimations, typingComplete]);

  // Update console data when current line changes
  useEffect(() => {
    processConsoleData();
    
    // Optimized scrolling using requestAnimationFrame for better performance
    if (terminalRef.current) {
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      });
    }
  }, [currentLine, processConsoleData]);

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    });
  }, []);

  // Effect to scroll to bottom when terminal history changes
  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory, scrollToBottom, consoleData.length]);
  
  // Procesar comando ingresado
  const processCommand = useCallback((cmd) => {
    const commandParts = cmd.trim().split(' ');
    const command = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);
    
    let response = [];
    
    switch (command) {
      case 'help':
        response = [
          t('terminal.responses.available')
        ];
        Object.entries(AVAILABLE_COMMANDS).forEach(([cmd, desc]) => {
          response.push(`${cmd.padEnd(10)} - ${desc}`);
        });
        break;
        
      case 'clear':
        setTerminalHistory([]);
        return;
        
      case 'echo':
        response = [args.join(' ') || ''];
        break;
        
      case 'date':
        response = [new Date().toLocaleString()];
        break;
        
      case 'about':
      case 'skills':
      case 'projects':
      case 'contact':
      case 'whoami':
        response = COMMAND_RESPONSES[command];
        break;
        
      default:
        response = COMMAND_RESPONSES.unknown;
    }
    
    // Limitar el historial mucho más para mantener una altura fija
    const newHistory = [
      ...terminalHistory, 
      { type: 'command', text: cmd },
      { type: 'response', lines: response }
    ].slice(-10); // Reducido a 10 elementos para mantener mejor el tamaño
    
    setTerminalHistory(newHistory);
    
    // Scroll después de la actualización
    setTimeout(scrollToBottom, 50);
  }, [terminalHistory, scrollToBottom, t, AVAILABLE_COMMANDS, COMMAND_RESPONSES]);
  
  // Manejar el envío del comando
  const handleCommandSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      processCommand(inputValue);
      setInputValue('');
      
      // Enfocar en el input después del comando
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus();
        }, 10);
      }
    }
  }, [inputValue, processCommand]);
  
  // Hacer click en terminal enfoca el input
  const handleTerminalClick = useCallback(() => {
    if (inputRef.current && isInitialAnimationComplete) {
      inputRef.current.focus();
    }
  }, [isInitialAnimationComplete]);

  // Main render for terminal
  return (
    <div 
      className={`backdrop-blur-sm rounded-lg overflow-hidden border border-[var(--color-border)] relative ${className}`}
      style={{ 
        backgroundColor: 'rgba(var(--color-background-rgb), 0.3)',
        boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.25)',
        height: height,
        minHeight: height,
        maxHeight: height,
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleTerminalClick}
    >
      {/* Terminal header - simplified and optimized for mobile */}
      {showHeader && (
        <div className="flex items-center justify-between px-3 sm:px-4 py-1 sm:py-2 border-b border-[var(--color-border)] bg-[var(--color-background)]/80">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div className="text-[10px] sm:text-xs font-medium flex space-x-3 sm:space-x-4">
            {/* Reduced status indicators for mobile */}
            {statusData.slice(0, isMobile ? 2 : 3).map((status, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span>{status.label}</span>
                <span className={status.color}>{status.value}</span>
              </div>
            ))}
          </div>
          
          {!isMobile && (
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-button-bg)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-button-bg)]/70"></div>
            </div>
          )}
        </div>
      )}
      
      {/* Terminal content - optimized for mobile */}
      <div 
        ref={terminalRef}
        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 overflow-y-auto font-mono text-[var(--color-foreground)] bg-[var(--color-background)]/40 relative terminal-content custom-scrollbar"
        style={{ 
          fontSize: isMobile ? '0.65rem' : '0.8rem',
          lineHeight: 1.5,
          overflowY: 'auto',
        }}
        onScroll={e => e.stopPropagation()}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Estilos de scrollbar ahora están en globals.css con la clase .custom-scrollbar */
          `
        }} />
        
        {/* Corner decorations */}
        {!isMobile && (
          <>
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-[var(--color-button-bg)]/50"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-[var(--color-button-bg)]/50"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-[var(--color-button-bg)]/50"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-[var(--color-button-bg)]/50"></div>
          </>
        )}
        
        {/* Terminal header text */}
        <div className="mb-2">
          <div className="text-[var(--color-button-bg)] font-bold text-sm">
            {t('terminal.title')}
          </div>
          <div className="text-[10px] sm:text-xs flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 mt-1">
            <div className="flex items-center">
              <span className="text-green-400 mr-1">●</span>
              <span>{t('terminal.connection')}</span>
            </div>
            {!isMobile && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">●</span>
                <span>{t('terminal.protocol')}</span>
              </div>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/30 to-transparent my-2"></div>
        </div>
        
        {/* Console output */}
        <div className="space-y-0.5">
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
                  delay={isMobile ? 10 : 25} 
                  showCursor={true}
                  cursor={cursor}
                  skipAnimation={skipInitialAnimations || isMobile}
                />
              )}
            </span>
          </div>
        )}
        
        {/* Final success message */}
        {typingComplete && (
          <div className="mt-3">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/40 to-transparent my-2"></div>
            
            <div className="relative pl-5 text-green-400 text-xs">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
              {t('terminal.success')}
            </div>
            
            <div className="flex mt-1">
              <span className="text-[var(--color-button-bg)]">▶</span>
              <span className="pl-1.5 text-xs">
                {t('terminal.welcome')}
              </span>
            </div>
            
            {/* Historial de comandos - limitado */}
            {terminalHistory.length > 0 && (
              <div className="mt-1 space-y-1">
                {/* Mostrar solo los últimos 5 comandos para evitar crecimiento */}
                {terminalHistory.slice(-5).map((item, index) => (
                  <div key={index}>
                    {item.type === 'command' && (
                      <div className="flex">
                        <span className="text-[var(--color-button-bg)]">$</span>
                        <span className="pl-1.5 text-xs">{item.text}</span>
                      </div>
                    )}
                    {item.type === 'response' && (
                      <div className="pl-2 space-y-0.5">
                        {item.lines.map((line, lineIdx) => (
                          <div key={lineIdx} className="text-gray-300 text-xs">
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Input de comando interactivo */}
            <form onSubmit={handleCommandSubmit} className="mt-2 flex items-center">
              <span className="text-[var(--color-button-bg)]">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-1.5 bg-transparent border-none outline-none text-[var(--color-foreground)] w-full font-mono text-xs"
                placeholder={isInitialAnimationComplete ? t('terminal.inputPlaceholder') : t('terminal.loading')}
                disabled={!isInitialAnimationComplete}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </form>
          </div>
        )}
      </div>
      
      {/* Terminal footer */}
      <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-[var(--color-border)] bg-[var(--color-background)]/80 text-[10px] sm:text-xs text-[var(--color-primary)] flex justify-between items-center">
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-1 sm:mr-2"></span>
          <span>{t('terminal.active')}</span>
        </div>
        {!isMobile && (
          <div>{t('terminal.session')}</div>
        )}
      </div>
    </div>
  );
});

// Assign display names for debugging
TypewriterText.displayName = 'TypewriterText';
CyberTerminal.displayName = 'CyberTerminal';

export default CyberTerminal;