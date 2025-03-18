import { useState, useEffect } from 'react';

const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return headerHeight;
};

export default useHeaderHeight;
