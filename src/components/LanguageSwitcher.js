import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useState, useRef, useEffect } from 'react';

// Componentes SVG de banderas redondas
const FlagIcons = {
  es: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="50" fill="#c60b1e" />
      <rect x="0" y="25" width="100" height="50" fill="#ffc400" />
    </svg>
  ),
  ca: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="50" fill="#fcdd09" />
      <path d="M0,18 H100 M0,38 H100 M0,58 H100 M0,78 H100" stroke="#da121a" strokeWidth="10" />
    </svg>
  ),
  en: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="50" fill="#012169" />
      <path fill="#FFF" d="M50,15 L85,50 L50,85 L15,50 Z" />
      <path fill="#C8102E" d="M50,25 L75,50 L50,75 L25,50 Z" />
    </svg>
  )
};

// Datos de idiomas con nombres
const languageData = {
  es: {
    name: "Español",
    Icon: FlagIcons.es
  },
  ca: {
    name: "Català",
    Icon: FlagIcons.ca
  },
  en: {
    name: "English",
    Icon: FlagIcons.en
  }
};

const LanguageSwitcher = () => {
  const { language, changeLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es vista móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Comprobar inicialmente
    checkIfMobile();
    
    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  const CurrentFlagIcon = languageData[language].Icon;

  return (
    <div className={`relative ${isMobile ? 'static' : ''}`} ref={dropdownRef}>
      <motion.button
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-button-bg)]/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label={`Cambiar idioma: ${languageData[language].name}`}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden border border-[var(--color-border)] shadow-sm">
          <CurrentFlagIcon />
        </div>
        <span className="text-sm font-medium">{languageData[language].name}</span>
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          className="w-4 h-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path 
            fillRule="evenodd" 
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
            clipRule="evenodd" 
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown menú adaptado para móvil y escritorio */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`
              z-50 py-2 bg-[var(--color-background)] shadow-lg rounded-md border border-[var(--color-border)] backdrop-blur-lg
              ${isMobile 
                ? 'fixed left-4 right-4 bottom-20 mx-auto max-w-xs' 
                : 'absolute right-0 mt-1 w-44'}
            `}
            initial={{ opacity: 0, y: isMobile ? 20 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 20 : -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Decorativo superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/50 to-transparent"></div>
            
            {/* Título móvil */}
            {isMobile && (
              <div className="px-4 py-2 mb-1 text-center border-b border-[var(--color-border)]">
                <span className="text-sm font-bold text-[var(--color-foreground)]">Selecciona un idioma</span>
              </div>
            )}
            
            {availableLanguages.map((lang) => {
              const LangFlagIcon = languageData[lang].Icon;
              return (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center w-full text-left px-4 py-3 space-x-3 ${
                    lang === language 
                      ? 'text-[var(--color-button-bg)] bg-[var(--color-button-bg)]/10' 
                      : 'text-[var(--color-foreground)] hover:bg-[var(--color-button-bg)]/5'
                  } transition-colors`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden border border-[var(--color-border)] shadow-sm">
                    <LangFlagIcon />
                  </div>
                  <span className="text-sm">{languageData[lang].name}</span>
                  {lang === language && (
                    <motion.div 
                      className="ml-auto flex items-center space-x-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--color-button-bg)]"></div>
                      <span className="text-xs text-[var(--color-button-bg)]/70">activo</span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
            
            {/* Botón de cerrar para móvil */}
            {isMobile && (
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 mt-1 text-center border-t border-[var(--color-border)] text-sm font-medium text-[var(--color-foreground)]"
                whileHover={{ backgroundColor: 'rgba(255, 102, 0, 0.05)' }}
              >
                Cerrar
              </motion.button>
            )}
            
            {/* Decorativo inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/50 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher; 