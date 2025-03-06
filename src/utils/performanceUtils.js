/**
 * Utility to get optimized quality settings based on device capabilities
 */
export function getQualitySettings(isMobile, isTablet, isLowPowerDevice, prefersReducedData) {
  // Base values for high-end devices
  const base = {
    tiltFactor: 7,
    hexagons: 18,
    particles: 15,
    backgroundElements: 20,
    updateFrequency: 33,
    animationDuration: 1,
    effectsEnabled: true
  };
  
  // Mobile settings - reduce complexity significantly
  if (isMobile) {
    return {
      tiltFactor: 3,
      hexagons: 6,
      particles: 5,
      backgroundElements: 10,
      updateFrequency: 50,
      animationDuration: 0.7,
      effectsEnabled: false
    };
  }
  
  // Tablet settings - medium complexity
  if (isTablet) {
    return {
      tiltFactor: 5,
      hexagons: 10,
      particles: 8,
      backgroundElements: 15,
      updateFrequency: 40,
      animationDuration: 0.8,
      effectsEnabled: true
    };
  }
  
  // Low power devices - prioritize performance over visuals
  if (isLowPowerDevice || prefersReducedData) {
    return {
      tiltFactor: 4,
      hexagons: 8,
      particles: 0, // No particles for low power
      backgroundElements: 8,
      updateFrequency: 60,
      animationDuration: 0.5,
      effectsEnabled: false
    };
  }
  
  return base;
}

/**
 * Detect if the current device is likely a low-end device based on performance metrics
 */
export function detectLowEndDevice() {
  if (typeof window === 'undefined') return false;
  
  // Check memory if available (Chrome only)
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return true;
  }

  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  return false;
}

/**
 * Measures rendering performance during runtime
 */
export function measurePerformance(callback) {
  if (typeof window === 'undefined' || !window.performance) return;

  const now = performance.now();
  
  // Execute the measured function
  callback();
  
  const duration = performance.now() - now;
  return duration;
}

/**
 * Adaptively reduces visual effects if frame rates drop
 */
export function adaptivePerformanceScaling(fps, targetFps = 50) {
  const performanceFactor = Math.max(0.5, Math.min(1, fps / targetFps));
  
  return {
    particleDensity: performanceFactor,
    animationComplexity: performanceFactor,
    effectsIntensity: performanceFactor * performanceFactor
  };
}
