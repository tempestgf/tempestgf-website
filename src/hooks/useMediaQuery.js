"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design - returns true if the media query matches
 * @param {string} query - The media query to check against (e.g. '(max-width: 768px)')
 * @returns {boolean} - True if the media query matches
 */
const useMediaQuery = (query) => {
  // Initialize with a default value - assume false if window is not available (SSR)
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Skip execution if window is not available (SSR)
    if (typeof window !== 'undefined') {
      // Check if the media query initially matches
      const media = window.matchMedia(query);
      setMatches(media.matches);
      
      // Create a handler function to update state when match status changes
      const listener = (event) => {
        setMatches(event.matches);
      };
      
      // Add listener for modern browsers
      if (media.addEventListener) {
        media.addEventListener('change', listener);
      } else {
        // Fallback for older browsers
        media.addListener(listener);
      }
      
      // Cleanup function
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener('change', listener);
        } else {
          // Fallback cleanup for older browsers
          media.removeListener(listener);
        }
      };
    }
  }, [query]); // Re-run if query changes
  
  return matches;
};

export default useMediaQuery;
