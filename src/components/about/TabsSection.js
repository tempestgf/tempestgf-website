import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsTab from './SkillsTab';
import ProjectsTab from './ProjectsTab';

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
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
      
      {/* Content Area with Animation */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-8"
      >
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'projects' && <ProjectsTab />}
      </motion.div>
    </div>
  );
}
