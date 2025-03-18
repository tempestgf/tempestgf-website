"use client";
import { useEffect, useRef, memo } from "react";

// Extremely optimized loading screen
const LoadingScreen = memo(function LoadingScreen() {
  const progressRef = useRef(0);
  const progressElementRef = useRef(null);
  const progressTextRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Fast loading experience
    progressRef.current = 5;
    
    // Fast and efficient animation
    const startTime = Date.now();
    const duration = 800; // Even shorter loading for better UX
    
    // Direct DOM manipulation without React state
    const updateProgress = (progress) => {
      if (progressElementRef.current) {
        progressElementRef.current.style.strokeDashoffset = 62.83 - (62.83 * progress / 100);
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(progress)}%`;
      }
    };
    
    // Optimized animation with fewer frames
    const keyPoints = [0, 25, 50, 75, 100];
    let currentIndex = 0;
    
    const advanceProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(elapsed / duration * 100, 100);
      
      // Find current keypoint
      while (currentIndex < keyPoints.length && 
             calculatedProgress >= keyPoints[currentIndex]) {
        progressRef.current = keyPoints[currentIndex];
        updateProgress(keyPoints[currentIndex]);
        currentIndex++;
      }
      
      // Continue animation if not complete
      if (calculatedProgress < 100) {
        setTimeout(advanceProgress, 100);
      } else {
        // Finish immediately after reaching 100%
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.opacity = 0;
          }
          
          // Dispatch completion event after fade out
          setTimeout(() => {
            window.dispatchEvent(new Event('loadingComplete'));
          }, 200);
        }, 100);
      }
    };
    
    // Start animation
    setTimeout(advanceProgress, 50);
    
    // Ensure loading always completes within reasonable time
    const failsafeTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = 0;
      }
      window.dispatchEvent(new Event('loadingComplete'));
    }, 1500); // Shorter failsafe timer
    
    return () => clearTimeout(failsafeTimer);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-200"
    >
      <svg className="w-10 h-10 mb-2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" fill="none" />
        <circle 
          ref={progressElementRef}
          cx="12" cy="12" r="10" 
          stroke="#0cf" strokeWidth="2" 
          fill="none" 
          strokeDasharray="62.83" 
          strokeDashoffset="62.83" 
          transform="rotate(-90 12 12)" 
        />
      </svg>
      <div className="text-white text-base font-medium">TempestGF</div>
      <div ref={progressTextRef} className="text-gray-400 text-xs">0%</div>
    </div>
  );
});

export default LoadingScreen;
