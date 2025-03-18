"use client";
import { useEffect, useRef, memo } from "react";

// Memoized cursor component for better performance
const CustomCursor = memo(function CustomCursor() {
  const cursorRef = useRef(null);
  const hoveredElementRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  
  // Performance optimization: Limit update rate
  const updateRate = useRef(10); // ms between updates
  const lastUpdateTime = useRef(0);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const onMouseMove = (e) => {
      // Store mouse position immediately
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    const onMouseDown = () => {
      cursor.classList.add('cursor-clicked');
      setTimeout(() => {
        if (cursor) cursor.classList.remove('cursor-clicked');
      }, 200);
    };
    
    // Handle hover state for elements
    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target && target.hasAttribute('data-hover')) {
        hoveredElementRef.current = target;
        cursor.classList.add('cursor-hover');
      }
    };
    
    const handleMouseLeave = () => {
      hoveredElementRef.current = null;
      cursor.classList.remove('cursor-hover');
    };
    
    // Use RAF for smoother animation
    const animateCursor = (time) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      
      const currentTime = Date.now();
      
      // Throttle updates for better performance (only update cursor position every updateRate ms)
      if (currentTime - lastUpdateTime.current > updateRate.current) {
        // Smooth cursor movement with lerp (linear interpolation)
        const deltaX = mousePosition.current.x - cursorPosition.current.x;
        const deltaY = mousePosition.current.y - cursorPosition.current.y;
        
        // Apply easing (adjust 0.12 for different smoothness)
        cursorPosition.current.x += deltaX * 0.12;
        cursorPosition.current.y += deltaY * 0.12;
        
        // Apply transform with hardware acceleration
        if (cursor) {
          cursor.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
        }
        
        lastUpdateTime.current = currentTime;
      }
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    // Initialize cursor position to avoid "jumping" on first load
    cursorPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Set up event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', () => cursor.classList.remove('cursor-clicked'));
    
    // Handle hover interactions
    document.querySelectorAll('[data-hover], a, button, input[type="button"], input[type="submit"], [role="button"]')
      .forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    
    // Start animation
    requestRef.current = requestAnimationFrame(animateCursor);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', () => cursor.classList.remove('cursor-clicked'));
      
      document.querySelectorAll('[data-hover], a, button, input[type="button"], input[type="submit"], [role="button"]')
        .forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cursorRef}
      className="cursor fixed top-0 left-0 w-6 h-6 rounded-full bg-white z-[10000] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform"
      style={{
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <style jsx>{`
        .cursor {
          transform: translate3d(0, 0, 0);
        }
        .cursor-hover {
          width: 24px;
          height: 24px;
        }
        .cursor-clicked {
          transform: translate3d(0, 0, 0) scale(0.8);
        }
      `}</style>
    </div>
  );
});

export default CustomCursor;
