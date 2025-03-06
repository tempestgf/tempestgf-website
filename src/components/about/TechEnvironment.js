import { motion } from 'framer-motion';

export default function TechEnvironment() {
  const techItems = [
    "Custom <strong>Arch Linux</strong> environment with personalized dotfiles for maximum efficiency",
    "Experience with <strong>rooted Android devices</strong> for advanced customization",
    "Skilled in <strong>cybersecurity research</strong>, including anonymity networks and secure systems"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-16 p-8 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] shadow-lg relative overflow-hidden group"
      whileHover={{
        boxShadow: '0 20px 25px -5px rgba(255, 102, 0, 0.1), 0 10px 10px -5px rgba(255, 102, 0, 0.04)'
      }}
    >
      {/* Decorative elements */}
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
          {techItems.map((item, index) => (
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
  );
}
