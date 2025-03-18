"use client";
import { useEffect, useState, memo } from "react";

// Highly optimized layout component
const ClientLayout = memo(function ClientLayout({ children }) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Critical setup effect - with minimal operations
  useEffect(() => {
    // Mark as hydrated immediately to prevent mismatch
    setHydrated(true);
    
    // Check for critical load events
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      window.addEventListener('load', () => setPageLoaded(true), { once: true });
    }
    
    // Remove loading class once content is visible
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('loading');
      document.body.classList.remove('loading');
      setPageLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={pageLoaded ? 'opacity-100' : 'opacity-0'} 
      style={{ 
        transition: 'opacity 0.2s',
        contain: 'content',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  );
});

export default memo(ClientLayout);
