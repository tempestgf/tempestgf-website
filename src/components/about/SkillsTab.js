import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SkillsTab() {
  const [hoverSkill, setHoverSkill] = useState(null);
  
  const skills = [
    { category: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript"] },
    { category: "Web", items: ["Node.js", "React", "Next.js", "TailwindCSS"] },
    { category: "Databases", items: ["MySQL", "MongoDB"] },
    { category: "Mobile", items: ["Android Studio"] },
    { category: "Security", items: ["Network Security", "Malware Analysis", "Penetration Testing"] },
  ];

  return (
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
          {/* Card decorations */}
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
          
          {/* Skill items */}
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
  );
}
