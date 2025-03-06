import { motion } from 'framer-motion';

export default function ProjectsTab() {
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

  return (
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
          {/* Project card decorations */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-transparent group-hover:border-[var(--color-button-bg)]/30 transition-colors duration-300"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-transparent group-hover:border-[var(--color-button-bg)]/30 transition-colors duration-300"></div>
          
          {/* Project title */}
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-semibold text-[var(--color-button-bg)] pb-1">{project.name}</h3>
            <div className="flex-grow h-px bg-gradient-to-r from-[var(--color-button-bg)]/20 to-transparent"></div>
          </div>
          
          {/* Project description */}
          <motion.p 
            className="text-[var(--color-primary)] mt-3 group-hover:text-[var(--color-foreground)] transition-colors"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {project.description}
          </motion.p>
          
          {/* View details button */}
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
  );
}
