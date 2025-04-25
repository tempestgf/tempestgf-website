import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const underlineVariants = {
  rest: { width: 0 },
  hover: { width: "100%" },
};

const Header = ({ isScrolled, navLinks, isMobileMenuOpen, setMobileMenuOpen }) => {
  const [hoverLink, setHoverLink] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t, language } = useTranslation();
  
  // Track scroll progress for animations
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Traducir enlaces de navegación
  const translatedNavLinks = navLinks.map(link => ({
    ...link,
    name: t(`navigation.${link.id}`)
  }));

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[var(--color-background)]/90 shadow-lg backdrop-blur-md" 
          : "bg-transparent"
      }`}
      style={{ height: isScrolled ? 'auto' : '80px' }} // Set explicit height
    >
      {/* Decorative top border with gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent opacity-80"></div>
      
      {/* Scroll progress indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-button-bg)]"
        style={{ width: `${scrollProgress * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
      />
      
      {/* Glow effect behind the header */}
      <div className="absolute inset-0 bg-[var(--color-button-bg)]/5 backdrop-blur-md opacity-0 transition-opacity duration-500" 
           style={{ opacity: isScrolled ? 0.8 : 0 }}></div>
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Enhanced Logo with animated elements */}
        <Link href="/" className="flex items-center group relative">
          {/* Fondo simple con hover estático */}
          <div 
            className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[var(--color-button-bg)]/10 to-[var(--color-button-bg)]/5 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            {/* Líneas decorativas horizontales estáticas */}
            <div className="absolute top-[20%] left-0 h-[1px] w-full bg-[var(--color-button-bg)]/20"></div>
            <div className="absolute top-[40%] left-0 h-[1px] w-full bg-[var(--color-button-bg)]/20"></div>
            <div className="absolute top-[60%] left-0 h-[1px] w-full bg-[var(--color-button-bg)]/20"></div>
            <div className="absolute top-[80%] left-0 h-[1px] w-full bg-[var(--color-button-bg)]/20"></div>
            
            {/* Líneas decorativas verticales estáticas */}
            <div className="absolute left-[20%] top-0 w-[1px] h-full bg-[var(--color-button-bg)]/20"></div>
            <div className="absolute left-[40%] top-0 w-[1px] h-full bg-[var(--color-button-bg)]/20"></div>
            <div className="absolute left-[60%] top-0 w-[1px] h-full bg-[var(--color-button-bg)]/20"></div>
            <div className="absolute left-[80%] top-0 w-[1px] h-full bg-[var(--color-button-bg)]/20"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col relative"
          >
            <div className="flex items-center">
              {/* Icono simplificado */}
              <div className="w-10 h-10 mr-3 relative flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-button-bg)]/20 to-transparent rounded-lg transition-all duration-300 group-hover:from-[var(--color-button-bg)]/40"></div>
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 relative z-10 transition-all duration-300 group-hover:text-[var(--color-button-bg)]">
                  <path 
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {/* Texto de marca simplificado */}
              <h1 className="text-2xl font-bold text-[var(--color-foreground)] tracking-wide">
                {Array.from("tempest").map((letter, i) => (
                  <span 
                    key={i}
                    className="inline-block transition-all duration-200 hover:text-[var(--color-button-bg)] hover:-translate-y-[2px]"
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>
            
            {/* Subtexto traducido */}
            <div className="text-sm font-medium text-[var(--color-primary)] ml-10 overflow-hidden">
              <span className="inline-block overflow-hidden whitespace-nowrap">
                {t('header.subtitle')}
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Enhanced Navigation for desktop with translated links */}
        <nav className="hidden md:flex items-center space-x-6">
          {translatedNavLinks.map((link, index) => (
            <motion.div
              key={link.id}
              custom={index}
              variants={navLinkVariants}
              initial="hidden"
              animate="visible"
              onHoverStart={() => setHoverLink(link.id)}
              onHoverEnd={() => setHoverLink(null)}
              className="relative"
            >
              <Link href={link.href}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative px-3 py-2 rounded-md transition-colors"
                >
                  {/* Hover background */}
                  <motion.div 
                    className="absolute inset-0 rounded-md bg-[var(--color-button-bg)]/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoverLink === link.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <span className="relative z-10 text-lg font-medium text-[var(--color-foreground)]">
                    {link.name}
                  </span>
                  
                  {/* Animated underline */}
                  <motion.span
                    variants={underlineVariants}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 bottom-0 h-0.5 bg-[var(--color-button-bg)]"
                  />
                  
                  {/* Decorative dot indicator for active state */}
                  {link.active && (
                    <motion.div 
                      className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-[var(--color-button-bg)]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          ))}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="#contact" className="group">
              <motion.button 
                className="relative px-5 py-2 rounded-md bg-[var(--color-button-bg)] text-white font-medium overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{t('header.ctaButton')}</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)]"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </nav>

        {/* Enhanced Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t('header.mobileMenu')}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded-md focus:outline-none border border-transparent transition-colors"
          whileHover={{ backgroundColor: 'rgba(255, 102, 0, 0.1)', borderColor: 'var(--color-button-bg)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={`block h-0.5 w-6 bg-[var(--color-foreground)] transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <motion.span
            className={`block h-0.5 w-6 bg-[var(--color-foreground)] transition-all duration-300 mt-1.5 ${
              isMobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"
            }`}
          />
          <motion.span
            className={`block h-0.5 w-6 bg-[var(--color-foreground)] transition-all duration-300 mt-1.5 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
          
          {/* Ripple effect on click */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.span
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-md border border-[var(--color-button-bg)]"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Enhanced Mobile Menu with better transitions */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[var(--color-background)]/95 backdrop-blur-lg overflow-hidden border-t border-[var(--color-border)]"
          >
            {/* Decorative side element */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-button-bg)]/30 via-transparent to-[var(--color-button-bg)]/30"></div>
            
            <ul className="flex flex-col items-center space-y-4 py-6">
              {translatedNavLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="w-full max-w-xs"
                >
                  <Link href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: 'rgba(255, 102, 0, 0.1)' }}
                      className="relative flex items-center px-8 py-3 rounded-md"
                    >
                      {/* Icon placeholder - you can add actual icons */}
                      <div className="w-6 h-6 mr-3 flex items-center justify-center rounded-full bg-[var(--color-button-bg)]/20">
                        <span className="text-[var(--color-button-bg)] text-xs">{index + 1}</span>
                      </div>
                      
                      <span className="text-lg font-medium text-[var(--color-foreground)]">
                        {link.name}
                      </span>
                      
                      <motion.div 
                        className="ml-auto transform rotate-45"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1, x: -5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </motion.div>
                      
                      {/* Active indicator */}
                      {link.active && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-button-bg)]"></div>
                      )}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
              
              {/* Mobile Language Switcher */}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { delay: translatedNavLinks.length * 0.1 } }
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full max-w-xs"
              >
                <div className="px-8 py-3">
                  <LanguageSwitcher />
                </div>
              </motion.li>
              
              {/* Mobile CTA Button */}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { delay: (translatedNavLinks.length + 1) * 0.1 } }
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full max-w-xs pt-4"
              >
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button 
                    className="w-full py-3 rounded-md bg-[var(--color-button-bg)] text-white font-medium"
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('header.ctaButton')}
                  </motion.button>
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;