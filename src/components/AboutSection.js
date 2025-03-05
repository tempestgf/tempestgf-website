"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaCodepen, FaDiscord } from 'react-icons/fa';
import { SiHackthebox } from 'react-icons/si';

export default function About() {
  const [activeTab, setActiveTab] = useState('skills');
  const [mounted, setMounted] = useState(false);
  const [hoverSkill, setHoverSkill] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = [
    { category: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript"] },
    { category: "Web", items: ["Node.js", "React", "Next.js", "TailwindCSS"] },
    { category: "Databases", items: ["MySQL", "MongoDB"] },
    { category: "Mobile", items: ["Android Studio"] },
    { category: "Security", items: ["Network Security", "Malware Analysis", "Penetration Testing"] },
  ];

  const projects = [
    {
      name: "Tor Network Server",
      description: "Developed and deployed a secure server through the Tor network, ensuring anonymity and security for sensitive communications."
    },
    {
      name: "Windows Malware Research",
      description: "Created undetectable Windows malware through Tor for ethical research and penetration testing purposes."
    },
    {
      name: "Receipt Data Extractor",
      description: "Developed a web application that automatically extracts and processes data from ticket photos into Excel spreadsheets."
    },
    {
      name: "Custom Arch Linux Setup",
      description: "Personalized Arch Linux environment with custom dotfiles for optimal development workflows."
    }
  ];

  if (!mounted) return null;

  return (
    <section className="py-16 px-4 bg-[var(--color-background)] relative">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[var(--color-button-bg)] opacity-20"></div>
      <div className="absolute top-40 left-10 w-20 h-20 border-t-2 border-l-2 border-[var(--color-button-bg)] opacity-20"></div>
      
      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-[var(--color-button-bg)]/5"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container-responsive relative">
        {/* Profile Section with Enhanced Background */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden mb-14 transition-theme backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-radial opacity-20 z-0"></div>
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[var(--color-button-bg)] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-[var(--color-button-bg)] to-transparent"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start p-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <motion.div 
                className="relative w-64 h-64 overflow-hidden rounded-full shadow-lg group"
                style={{ 
                  boxShadow: '0 10px 25px -5px rgba(255, 102, 0, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated border */}
                <motion.div 
                  className="absolute inset-0 rounded-full z-20 pointer-events-none"
                  style={{
                    border: '2px dashed var(--color-button-bg)',
                    borderRadius: '50%'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="absolute inset-0 border-4 border-[var(--color-button-bg)] rounded-full z-10 group-hover:border-[var(--color-button-bg-hover)] transition-colors"></div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-[var(--color-button-bg)]/20 to-transparent z-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Image overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-button-bg)]/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <Image
                  src="/logo.gif"
                  alt="Profile"
                  fill
                  className="object-cover z-0"
                  priority
                />
              </motion.div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-6">
              <div className="relative inline-block">
                <motion.h1 
                  className="text-5xl font-bold text-shadow text-[var(--color-foreground)]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  About <span className="text-[var(--color-button-bg)]">Me</span>
                </motion.h1>
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-[var(--color-button-bg)]"></div>
              </div>
              
              <motion.p 
                className="text-xl leading-relaxed text-[var(--color-primary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I'm a <span className="text-[var(--color-button-bg)] font-medium">cybersecurity specialist</span> and software engineer with a passion for <span className="text-[var(--color-button-bg)] font-medium">artificial intelligence</span>. My expertise spans secure application development, penetration testing, and building robust web and mobile solutions.
              </motion.p>
              
              {/* Social links with enhanced animations */}
              <div className="flex gap-5 py-4">
                {[
                  { Icon: FaTwitter, href: "https://twitter.com/yourusername", delay: 0 },
                  { Icon: FaGithub, href: "https://github.com/yourusername", delay: 0.1 },
                  { Icon: FaCodepen, href: "https://codepen.io/yourusername", delay: 0.2 },
                  { Icon: FaDiscord, href: "https://discord.com/users/yourusername", delay: 0.3 },
                  { Icon: SiHackthebox, href: "https://app.hackthebox.com/profile/yourusername", delay: 0.4 }
                ].map(({ Icon, href, delay }) => (
                  <motion.a 
                    key={href}
                    href={href} 
                    whileHover={{ 
                      scale: 1.2,
                      y: -5
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay }}
                    className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-button-bg)]/10 transition-all"
                  >
                    <Icon className="w-5 h-5 text-[var(--color-button-bg)] group-hover:text-[var(--color-button-bg-hover)] transition-colors" />
                    <span className="absolute -bottom-8 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-button-bg)]">{href.split('/').pop()}</span>
                    <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 border border-[var(--color-button-bg)]/50 group-hover:animate-ping-slow"></span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced Tabs Navigation with Indicator */}
        <div className="mb-10 relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/40 to-transparent"></div>
          <div className="relative border-b border-[var(--color-border)]">
            <nav className="flex space-x-8">
              {['skills', 'projects'].map((tab) => (
                <motion.button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 font-medium text-sm transition-colors relative ${
                    activeTab === tab 
                      ? 'text-[var(--color-button-bg)]' 
                      : 'text-[var(--color-primary)] hover:text-[var(--color-accent)]'
                  }`}
                  whileHover={{
                    backgroundColor: 'rgba(255,102,0,0.05)'
                  }}
                >
                  <span className="relative z-10">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  
                  {activeTab === tab && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-button-bg)]"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-[var(--color-button-bg)] blur-sm opacity-60"></div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </nav>
          </div>
          
          {/* Enhanced Content Area with Animation */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-8"
          >
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillGroup, index) => (
                  <motion.div 
                    key={skillGroup.category} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[var(--color-background)] rounded-lg p-6 shadow-md hover:shadow-[var(--color-button-bg)]/20 border border-[var(--color-border)] transition-all duration-300 hover:translate-y-[-5px] group relative"
                    onHoverStart={() => setHoverSkill(skillGroup.category)}
                    onHoverEnd={() => setHoverSkill(null)}
                  >
                    {/* Enhanced card decorations */}
                    <div className="absolute top-0 right-0 h-2 w-1/3 bg-[var(--color-button-bg)]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 h-2 w-1/3 bg-[var(--color-button-bg)]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Skill category with animated underline */}
                    <div className="relative mb-6">
                      <h3 className="text-xl font-semibold text-[var(--color-button-bg)]">{skillGroup.category}</h3>
                      <div className="h-px w-full bg-[var(--color-border)] mt-2">
                        <motion.div 
                          className="h-px bg-[var(--color-button-bg)]" 
                          initial={{ width: 0 }}
                          animate={{ width: hoverSkill === skillGroup.category ? '100%' : '30%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced skill items */}
                    <ul className="space-y-3">
                      {skillGroup.items.map((skill, i) => (
                        <motion.li 
                          key={skill} 
                          className="flex items-center p-1.5 rounded-md group/item transition-all hover:bg-[var(--color-button-bg)]/5"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="mr-2 text-[var(--color-button-bg)] opacity-70 group-hover/item:opacity-100 transition-opacity">▹</span>
                          <span className="text-[var(--color-foreground)]">{skill}</span>
                          <motion.span 
                            className="ml-auto text-xs text-[var(--color-button-bg)] opacity-0 group-hover/item:opacity-100 transition-opacity"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                          >
                            ●●●●●
                          </motion.span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div 
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[var(--color-background)] rounded-lg p-6 shadow-md border border-[var(--color-border)] hover:border-[var(--color-button-bg)] transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Enhanced project card with corner decorations */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-transparent group-hover:border-[var(--color-button-bg)]/30 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-transparent group-hover:border-[var(--color-button-bg)]/30 transition-colors duration-300"></div>
                    
                    {/* Enhanced project title */}
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-semibold text-[var(--color-button-bg)] pb-1">{project.name}</h3>
                      <div className="flex-grow h-px bg-gradient-to-r from-[var(--color-button-bg)]/20 to-transparent"></div>
                    </div>
                    
                    {/* Project description with subtle animation */}
                    <motion.p 
                      className="text-[var(--color-primary)] mt-3 group-hover:text-[var(--color-foreground)] transition-colors"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.description}
                    </motion.p>
                    
                    {/* View details button appears on hover */}
                    <motion.div 
                      className="mt-4 text-right"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        className="text-sm font-medium text-[var(--color-button-bg)] hover:text-[var(--color-button-bg-hover)] transition-colors flex items-center gap-1 ml-auto"
                        whileHover={{ x: 5 }}
                      >
                        View details
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Tech Environment with Enhanced Card Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 p-8 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] shadow-lg relative overflow-hidden group"
          whileHover={{
            boxShadow: '0 20px 25px -5px rgba(255, 102, 0, 0.1), 0 10px 10px -5px rgba(255, 102, 0, 0.04)'
          }}
        >
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-5">
              <circle cx="50" cy="50" r="40" stroke="var(--color-button-bg)" strokeWidth="2"/>
              <path d="M50 10 L50 90" stroke="var(--color-button-bg)" strokeWidth="2"/>
              <path d="M10 50 L90 50" stroke="var(--color-button-bg)" strokeWidth="2"/>
              <circle cx="50" cy="50" r="10" stroke="var(--color-button-bg)" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-button-bg)]/5 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--color-button-bg)] flex items-center">
              <span className="inline-block w-8 h-8 mr-3 rounded-full bg-[var(--color-button-bg)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-button-bg)]">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              </span>
              Tech Environment
            </h2>
            
            <ul className="space-y-4">
              {[
                "Custom <strong>Arch Linux</strong> environment with personalized dotfiles for maximum efficiency",
                "Experience with <strong>rooted Android devices</strong> for advanced customization",
                "Skilled in <strong>cybersecurity research</strong>, including anonymity networks and secure systems"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start p-3 rounded-md transition-colors hover:bg-[var(--color-button-bg)]/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.2) }}
                >
                  <span className="text-[var(--color-button-bg)] mr-3 text-xl leading-none">»</span>
                  <span className="text-[var(--color-foreground)]" dangerouslySetInnerHTML={{ __html: item }}></span>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.7 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}