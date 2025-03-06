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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: 1, name: "Home", href: "#home" },
    { id: 2, name: "About", href: "#about" },
    { id: 3, name: "Contacto", href: "#contact" },
    { id: 4, name: "Blog", href: "#blog" },

  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#1a1a1a] transition-colors duration-300">
      <Header
        isScrolled={isScrolled}
        navLinks={navLinks}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
