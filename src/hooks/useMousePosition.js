"use client";

import { useState, useEffect, useRef } from "react";

/**
 * A custom hook to track mouse position and movement with performance optimizations
 * @returns {Object} Mouse position data and movement status
 */
const useMousePosition = () => {
  // State for current mouse position
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    prevX: 0,
    prevY: 0,
    timestamp: 0,
  });

  // Use ref for mouse moving status to avoid infinite update loops
  const mouseMovingRef = useRef(false);
  // Expose mouse moving status as a state but control updates carefully
  const [mouseMoving, setMouseMoving] = useState(false);
  
  // Refs to avoid recreating functions and store internal values
  const movementTimeout = useRef(null);
  const lastPositionRef = useRef({
    x: 0,
    y: 0,
    timestamp: Date.now(),
  });
  const updateScheduled = useRef(false);

  useEffect(() => {
    // Skip if running in SSR
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const currentTime = Date.now();
      
      // Save current values to ref
      const lastX = lastPositionRef.current.x;
      const lastY = lastPositionRef.current.y;
      const lastTimestamp = lastPositionRef.current.timestamp;
      
      // Update ref with new values
      lastPositionRef.current = {
        x: clientX,
        y: clientY,
        timestamp: currentTime
      };
      
      // Set mouse as moving via ref first (avoids re-renders inside the event handler)
      mouseMovingRef.current = true;
      
      // Calculate speed only if enough time has passed
      const deltaTime = currentTime - lastTimestamp;
      if (deltaTime > 16) { // Approximately 60fps
        const speedX = Math.abs(clientX - lastX) / deltaTime * 100;
        const speedY = Math.abs(clientY - lastY) / deltaTime * 100;
        
        // Throttle state updates for better performance
        if (!updateScheduled.current) {
          updateScheduled.current = true;
          requestAnimationFrame(() => {
            // Update both position and moving status in a single batch
            setMousePosition({
              x: clientX,
              y: clientY,
              prevX: lastX,
              prevY: lastY,
              speedX,
              speedY,
              timestamp: currentTime,
            });
            
            // Only update mouseMoving state if it's changed to avoid unnecessary renders
            if (!mouseMoving && mouseMovingRef.current) {
              setMouseMoving(true);
            }
            
            updateScheduled.current = false;
          });
        }
      }
      
      // Clear any existing timeout
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
      
      // Set a timeout to detect when mouse stops moving
      movementTimeout.current = setTimeout(() => {
        mouseMovingRef.current = false;
        setMouseMoving(false);
      }, 100);
    };

    // Add event listener
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
    };
  }, [mouseMoving]); // Add mouseMoving as dependency since we reference it in the effect

  return { mousePosition, mouseMoving };
};

export default useMousePosition;
