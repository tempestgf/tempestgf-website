import { motion } from 'framer-motion';
import Image from 'next/image';
import SocialLinks from './SocialLinks';

export default function ProfileSection() {
  return (
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
          <SocialLinks />
        </div>
      </div>
    </motion.div>
  );
}
