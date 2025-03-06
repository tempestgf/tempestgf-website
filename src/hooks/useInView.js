"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that tracks whether an element is in the viewport
 * @param {React.RefObject} elementRef - React ref object for the target element
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visibility needed to trigger (0-1)
 * @param {string} options.rootMargin - Margin around the root element, e.g. "10px 20px 30px 40px"
 * @returns {boolean} - Whether the element is in view
 */
export function useInView(elementRef, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const observerRef = useRef(null);
  
  const defaultOptions = {
    threshold: 0.1, // Default 10% visibility is enough
    rootMargin: '0px',
    triggerOnce: false
  };
  
  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    // Skip on server or if no element ref
    if (typeof window === 'undefined' || !elementRef?.current) {
      return;
    }
    
    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Skip creating a new observer if we've already seen the element and triggerOnce is true
    if (mergedOptions.triggerOnce && hasBeenInView) {
      return;
    }
    
    // Create new IntersectionObserver instance with the specified options
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      // Update state based on intersection
      setIsIntersecting(entry.isIntersecting);
      
      // If it's ever been in view, mark that state
      if (entry.isIntersecting) {
        setHasBeenInView(true);
        // If triggerOnce is true and the element has been viewed, disconnect the observer
        if (mergedOptions.triggerOnce) {
          observer.disconnect();
        }
      }
    }, {
      threshold: mergedOptions.threshold,
      rootMargin: mergedOptions.rootMargin,
    });
    
    // Store the observer instance
    observerRef.current = observer;
    
    // Start observing the target element
    observer.observe(elementRef.current);
    
    // Clean up function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, mergedOptions.threshold, mergedOptions.rootMargin, mergedOptions.triggerOnce, hasBeenInView]);
  
  // Fall back to true if IntersectionObserver isn't supported (prevents content from not showing)
  if (typeof IntersectionObserver === 'undefined') {
    return true;
  }
  
  return isIntersecting;
}
