import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ isMobileMenuOpen, navLinks, setMobileMenuOpen }) => (
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-[#0a0a0a] p-6 shadow-xl z-40"
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-[var(--accent)] transition-colors py-2 border-b border-gray-100 dark:border-gray-800"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.nav>
    )}
  </AnimatePresence>
);

export default MobileMenu;
