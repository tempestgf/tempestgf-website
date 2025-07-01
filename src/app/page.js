"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PortfolioSection from "../components/PortfolioSection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Establecer que la página está cargada
    setIsLoaded(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Utilizamos IDs que coinciden con las claves de nuestras traducciones
  const navLinks = [
    { id: "home", href: "#home", active: true },
    { id: "about", href: "#about", active: false },
    { id: "services", href: "https://geneon.es", active: false, external: true },
    { id: "blog", href: "/blog", active: false },
    { id: "contact", href: "#contact", active: false },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#1a1a1a] transition-colors duration-300 relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{transition: 'opacity 0.3s ease-in-out'}}>
      <Header
        isScrolled={isScrolled}
        navLinks={navLinks}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-grow z-10 relative">
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </main>
      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  );
}