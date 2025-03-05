// components/ui/CyberButton.jsx
'use client';

import Link from 'next/link';

export const CyberButton = ({ href, children, className, icon }) => (
  <Link
    href={href}
    className={`${className} group relative inline-flex items-center px-8 py-4 font-mono 
      bg-green-400/10 border-2 border-green-400 text-green-400 hover:bg-green-400/20 
      transition-all duration-300`}
  >
    <span className="absolute inset-0 bg-green-400/5 group-hover:bg-green-400/10 transition-all" />
    {icon && <span className="mr-3">{icon}</span>}
    <span className="relative">{children}</span>
  </Link>
);