"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration
const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Acerca de' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
];

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/tempestgf', icon: FaTwitter, label: 'Twitter', color: 'hover:text-blue-400', hoverGlow: '#1DA1F2' },
  { href: 'https://github.com/tempestgf', icon: FaGithub, label: 'GitHub', color: 'hover:text-purple-400', hoverGlow: '#6e5494' },
  { href: 'https://linkedin.com/in/tempestgf', icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-500', hoverGlow: '#0A66C2' },
  { href: 'https://discord.com/users/tempestgf', icon: FaDiscord, label: 'Discord', color: 'hover:text-indigo-400', hoverGlow: '#5865F2' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [hoverLink, setHoverLink] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for GSAP animations
  const footerRef = useRef(null);
  const footerContentRef = useRef(null);
  const footerBgPatternRef = useRef(null);
  const circuitLayerRef = useRef(null);
  const glowRef = useRef(null);
  const dividerRef = useRef(null);
  
  // Handle mouse move for dynamic effects
  const handleMouseMove = (event) => {
    if (!footerRef.current) return;
    
    const rect = footerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
    
    // Move glow effect to follow mouse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        duration: 0.5,
        x: x,
        y: y,
        ease: "power2.out"
      });
    }
  };

  useEffect(() => {
    // Initialize animations after component mounts
    const footerElement = footerRef.current;
    const contentElements = footerContentRef.current ? footerContentRef.current.children : null;
    const bgPattern = footerBgPatternRef.current;
    const circuitLayer = circuitLayerRef.current;
    const divider = dividerRef.current;
    
    if (!footerElement || !contentElements || !bgPattern) return;
    
    // Create parallax scrolling effect
    const parallaxElements = footerElement.querySelectorAll('.parallax-element');
    parallaxElements.forEach((element, i) => {
      const depth = (i % 3) + 1; // 1, 2, or 3
      const direction = i % 2 === 0 ? 1 : -1; // alternate direction
      
      gsap.fromTo(
        element, 
        { y: -30 * depth * direction, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1 * i,
          scrollTrigger: {
            trigger: footerElement,
            start: "top bottom",
            end: "center bottom",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Main footer entrance animation
    gsap.fromTo(
      footerElement,
      { backgroundPosition: "0 100px" },
      {
        backgroundPosition: "0 0",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerElement,
          start: "top bottom",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Stagger animation for all footer content
    gsap.fromTo(
      contentElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerElement,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animated circuit layer
    if (circuitLayer) {
      gsap.fromTo(
        circuitLayer,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.15,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: footerElement,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Animated divider
    if (divider) {
      gsap.fromTo(
        divider,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
          trigger: divider,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Add scroll listener
    footerElement.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      footerElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Scroll to top function with enhanced animation
  const scrollToTop = () => {
    // Create a smooth scrolling effect
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <footer 
      ref={footerRef}
      role="contentinfo"
      className="relative bg-gradient-to-b from-[var(--color-background)] to-[color-mix(in_srgb,var(--color-background),var(--color-button-bg)_15%)] text-[var(--color-foreground)] pt-24 pb-12 overflow-hidden"
    >
      {/* Animated glow effect that follows the mouse */}
      <div 
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 hidden md:block"
        style={{
          background: 'radial-gradient(circle, var(--color-button-bg) 0%, rgba(255,102,0,0) 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Background pattern */}
      <div ref={footerBgPatternRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/70 to-transparent"></div>
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="40" height="40" fill="none" stroke="var(--color-button-bg)" strokeOpacity="0.1" />
            <circle cx="20" cy="20" r="1" fill="var(--color-button-bg)" fillOpacity="0.15" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      {/* Cyberpunk circuit layer */}
      <div ref={circuitLayerRef} className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
          <path d="M200,50 L800,50 L800,500 L200,500 Z" fill="none" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="10,10" />
          <path d="M100,100 L300,100 L300,200 L500,200 L500,400 L700,400 L700,300 L900,300" fill="none" stroke="var(--color-button-bg)" strokeWidth="1" />
          <path d="M150,200 L150,500 L600,500 L600,300" fill="none" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="300" cy="100" r="5" fill="var(--color-button-bg)" />
          <circle cx="500" cy="200" r="5" fill="var(--color-button-bg)" />
          <circle cx="700" cy="400" r="5" fill="var(--color-button-bg)" />
          <circle cx="600" cy="300" r="5" fill="var(--color-button-bg)" />
          <circle cx="150" cy="200" r="5" fill="var(--color-button-bg)" />
        </svg>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[var(--color-button-bg)]"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${10 + (i * 8)}%`,
              opacity: 0.2 + (i * 0.05),
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={footerContentRef} className="relative">
          {/* Logo decorative element */}
          <motion.div 
            className="absolute w-40 h-40 -top-24 left-1/2 transform -translate-x-1/2 opacity-5 pointer-events-none parallax-element hidden md:block"
            animate={{ 
              rotate: 360,
              opacity: [0.05, 0.08, 0.05]
            }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="var(--color-button-bg)" strokeWidth="2" strokeDasharray="5,3" />
              <circle cx="50" cy="50" r="35" stroke="var(--color-button-bg)" strokeWidth="1" />
              <path d="M50 5 L50 95 M5 50 L95 50" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="50" cy="50" r="8" fill="var(--color-button-bg)" />
            </svg>
          </motion.div>

          {/* Main Footer Content with enhanced grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Company Info - 4 columns on larger screens */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center">
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-[var(--color-button-bg)]/90 flex items-center justify-center mr-3 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)]"></div>
                  
                  {/* Animated lines around the logo */}
                  <motion.div 
                    className="absolute inset-0 border border-white/30"
                    animate={{ 
                      opacity: [0.2, 0.5, 0.2],
                      boxShadow: [
                        '0 0 0px rgba(255, 255, 255, 0)',
                        '0 0 8px rgba(255, 255, 255, 0.3)',
                        '0 0 0px rgba(255, 255, 255, 0)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.span 
                    className="relative text-white font-bold text-2xl"
                    animate={{ y: [-1, 1, -1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    T
                  </motion.span>
                </motion.div>
                
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-foreground)] to-[var(--color-button-bg)]">
                    Tempestgf
                  </h2>
                  <motion.div 
                    className="h-px w-full bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <p className="text-[var(--color-primary)] text-lg max-w-sm leading-relaxed parallax-element">
                Soluciones de ciberseguridad y desarrollo web avanzadas con enfoque en innovación y rendimiento.
              </p>
              
              {/* Enhanced Social Links */}
              <div className="flex space-x-5 pt-2">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label, color, hoverGlow }) => (
                  <motion.a
                    key={href}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] ${color} transition-all duration-300 relative group overflow-hidden backdrop-blur-sm border border-[var(--color-border)]`}
                    whileHover={{ 
                      y: -5,
                      boxShadow: `0 5px 15px -5px ${hoverGlow}80`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background highlight effect on hover */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20"
                      style={{ backgroundColor: hoverGlow }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Icon */}
                    <Icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Border glow effect */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 rounded-lg"
                      style={{ borderColor: hoverGlow }}
                      initial={{ opacity: 0 }}
                      whileHover={{ 
                        opacity: 1,
                        boxShadow: `0 0 10px ${hoverGlow}50`
                      }}
                    />
                    
                    {/* Circle ping effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{
                        scale: [0, 1.2],
                        opacity: [0.7, 0],
                        transition: { duration: 1, repeat: Infinity }
                      }}
                      style={{ border: `2px solid ${hoverGlow}` }}
                    />
                  </motion.a>
                ))}
              </div>
              
              {/* Additional information like address */}
              <div 
                className="mt-8 p-5 backdrop-blur-sm rounded-lg bg-[var(--color-background)]/20 border border-[var(--color-border)] relative overflow-hidden parallax-element"
                onMouseEnter={() => setActiveSection('contact')}
                onMouseLeave={() => setActiveSection(null)}
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-button-bg)]"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-button-bg)]"></div>
                
                {/* Extra glow effect when active */}
                <AnimatePresence>
                  {activeSection === 'contact' && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-[var(--color-button-bg)]/5 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                
                <h3 className="font-medium mb-3 flex items-center relative">
                  <span className="w-5 h-5 flex items-center justify-center bg-[var(--color-button-bg)]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-button-bg)]">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </span>
                  Ubicación central
                </h3>
                <p className="text-[var(--color-primary)] text-sm">
                  Oficina principal en Madrid, España<br />
                  Servicio disponible en toda Europa
                </p>
              </div>
            </div>
            
            {/* Site Navigation - 2 columns */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-bold text-lg text-[var(--color-foreground)] relative inline-block">
                Navegación
                <motion.span 
                  className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              
              <nav className="grid grid-cols-1 gap-2.5 parallax-element">
                {NAV_LINKS.map(({ href, label }, idx) => (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    className="text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors duration-200 flex items-center group relative pl-3"
                    onMouseEnter={() => setHoverLink(label)}
                    onMouseLeave={() => setHoverLink(null)}
                  >
                    {/* Animated indicator on hover */}
                    <motion.div 
                      className="absolute left-0 w-0 h-full flex items-center"
                      animate={{ width: hoverLink === label ? '12px' : '0px' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-button-bg)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoverLink === label ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                      />
                    </motion.div>
                    
                    {/* Text with underline animation */}
                    <span className="relative">
                      {label}
                      <motion.span 
                        className="absolute left-0 right-0 bottom-0 h-px bg-[var(--color-button-bg)]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoverLink === label ? 1 : 0 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                    
                    {/* Number indicator */}
                    <span className="ml-auto text-xs text-[var(--color-button-bg)]/50 group-hover:text-[var(--color-button-bg)] transition-colors">
                      0{idx + 1}
                    </span>
                  </Link>
                ))}
              </nav>
              
              {/* Utility links */}
              <div className="pt-5 mt-5 border-t border-[var(--color-border)]/20">
                <h4 className="text-sm font-medium mb-2 text-[var(--color-primary)]">Utilidades</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <Link href="/faq" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                    FAQ
                  </Link>
                  <Link href="/support" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                    Soporte
                  </Link>
                  <Link href="/privacy" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                    Privacidad
                  </Link>
                  <Link href="/terms" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                    Términos
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Info - 2 columns */}
            <div className="md:col-span-2 space-y-5">
              <h3 className="font-bold text-lg relative inline-block">
                Contacto
                <motion.span 
                  className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              
              <ul className="space-y-4 text-[var(--color-primary)] parallax-element">
                <li className="flex items-start group hover:translate-x-1 transition-transform duration-300 cursor-pointer">
                  <div className="w-8 h-8 rounded-md bg-[var(--color-button-bg)]/10 flex items-center justify-center mr-3 group-hover:bg-[var(--color-button-bg)]/20 transition-colors">
                    <svg className="w-4 h-4 text-[var(--color-button-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-primary)]/70">Email:</p>
                    <p className="group-hover:text-[var(--color-button-bg)] transition-colors duration-300">contact@tempestgf.com</p>
                  </div>
                </li>
                
                <li className="flex items-start group hover:translate-x-1 transition-transform duration-300 cursor-pointer">
                  <div className="w-8 h-8 rounded-md bg-[var(--color-button-bg)]/10 flex items-center justify-center mr-3 group-hover:bg-[var(--color-button-bg)]/20 transition-colors">
                    <svg className="w-4 h-4 text-[var(--color-button-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-primary)]/70">Dirección:</p>
                    <p className="group-hover:text-[var(--color-button-bg)] transition-colors duration-300">Madrid, España</p>
                  </div>
                </li>
                
                <li className="flex items-start group hover:translate-x-1 transition-transform duration-300 cursor-pointer">
                  <div className="w-8 h-8 rounded-md bg-[var(--color-button-bg)]/10 flex items-center justify-center mr-3 group-hover:bg-[var(--color-button-bg)]/20 transition-colors">
                    <svg className="w-4 h-4 text-[var(--color-button-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-primary)]/70">Horario:</p>
                    <p className="group-hover:text-[var(--color-button-bg)] transition-colors duration-300">Lun-Vie: 9:00-18:00</p>
                  </div>
                </li>
              </ul>
              
              {/* QR Code for contact */}
              <div className="relative h-32 w-32 mt-4 mx-auto md:ml-0 bg-white rounded-md p-2 parallax-element">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 font-mono">
                  {/* Animated scan line effect */}
                  <motion.div 
                    className="absolute top-0 w-full h-1 bg-[var(--color-button-bg)]/30 z-10"
                    animate={{ y: [0, 120, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <rect x="5" y="5" width="90" height="90" fill="none" stroke="var(--color-button-bg)" strokeWidth="1" strokeDasharray="3,2" />
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="8">
                      SCAN FOR
                    </text>
                    <text x="50" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="8">
                      CONTACT
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Newsletter Section - 4 columns */}
            <div className="md:col-span-4 space-y-5">
              <h3 className="font-bold text-lg relative inline-block">
                Newsletter
                <motion.span 
                  className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              
              <p className="text-[var(--color-primary)] parallax-element">
                Suscríbete para recibir actualizaciones sobre nuevos proyectos y tecnologías.
              </p>
              
              <div className="relative parallax-element">
                {subscribed ? (
                  <motion.div 
                    className="flex items-center space-x-2 text-green-500 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>¡Gracias por suscribirte!</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative flex-grow">
                      <input 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tu@email.com" 
                        className="w-full px-4 py-2 bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-lg placeholder-[var(--color-primary)]/50 focus:outline-none focus:border-[var(--color-button-bg)]"
                        required
                      />
                      <div className="absolute top-0 right-0 bottom-0 flex items-center mr-1">
                        <motion.div 
                          className="w-1 h-2 bg-[var(--color-button-bg)]" 
                          animate={{ 
                            height: [2, 10, 2],
                            opacity: [0.5, 1, 0.5] 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            repeatType: "loop" 
                          }}
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      className="bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white px-4 py-2 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>Suscribir</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </form>
                )}
              </div>
              
              {/* Enhanced Accordion FAQ Section */}
              <div className="mt-8 parallax-element">
                <h4 className="font-medium text-base mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-button-bg)]/10 flex items-center justify-center text-[var(--color-button-bg)] mr-2">?</span>
                  Preguntas Frecuentes
                </h4>
                
                <div className="space-y-2">
                  {[
                    { q: "¿Qué servicios ofrecen?", a: "Desarrollo web, ciberseguridad y consultoría tecnológica." },
                    { q: "¿Cómo puedo solicitar un presupuesto?", a: "Contáctanos a través del formulario o email para una cotización personalizada." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="border border-[var(--color-border)] rounded-lg overflow-hidden"
                      initial={{ height: 'auto' }}
                      animate={activeSection === `faq-${idx}` ? 
                        { backgroundColor: 'rgba(255,102,0,0.03)' } : 
                        { backgroundColor: 'transparent' }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <button 
                        onClick={() => activeSection === `faq-${idx}` ? 
                          setActiveSection(null) : setActiveSection(`faq-${idx}`)
                        }
                        className="w-full px-4 py-3 text-left flex justify-between items-center"
                      >
                        <span className="font-medium text-sm">{item.q}</span>
                        <motion.span 
                          animate={{ rotate: activeSection === `faq-${idx}` ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 4l5 4 5-4"
                            />
                          </svg>
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {activeSection === `faq-${idx}` && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pt-0 text-sm text-[var(--color-primary)]">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Divider */}
          <div className="relative py-8">
            <div ref={dividerRef} className="absolute left-0 w-full h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/50 to-transparent"></div>
              <motion.div 
                className="absolute top-0 left-0 h-full w-20 bg-[var(--color-button-bg)]/20"
                animate={{ 
                  x: ['-100%', '1000%'] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 0.5
                }}
              />
            </div>
          </div>
          
          {/* Footer Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[var(--color-primary)] text-sm">
              © {currentYear} TempestGF. Todos los derechos reservados.
            </div>
            
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/cookies" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
                Cookies
              </Link>
            </div>
            
            {/* Back To Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="group w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] text-[var(--color-primary)] hover:text-[var(--color-button-bg)] hover:border-[var(--color-button-bg)] transition-all"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}