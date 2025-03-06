import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaCodepen, FaDiscord } from 'react-icons/fa';
import { SiHackthebox } from 'react-icons/si';

export default function SocialLinks() {
  const socialLinks = [
    { Icon: FaTwitter, href: "https://twitter.com/yourusername", delay: 0 },
    { Icon: FaGithub, href: "https://github.com/yourusername", delay: 0.1 },
    { Icon: FaCodepen, href: "https://codepen.io/yourusername", delay: 0.2 },
    { Icon: FaDiscord, href: "https://discord.com/users/yourusername", delay: 0.3 },
    { Icon: SiHackthebox, href: "https://app.hackthebox.com/profile/yourusername", delay: 0.4 }
  ];

  return (
    <div className="flex gap-5 py-4">
      {socialLinks.map(({ Icon, href, delay }) => (
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
  );
}
