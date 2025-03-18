/**
 * Performance utilities to optimize rendering and animations
 */

// Check device capabilities
export function getDeviceCapabilities() {
  if (typeof window === 'undefined') {
    return { tier: 'low', memory: 'low', cpu: 'low', network: 'slow' };
  }

  // Network detection
  const connection = navigator.connection || 
                    navigator.mozConnection || 
                    navigator.webkitConnection || 
                    { effectiveType: '4g', saveData: false };
                    
  const networkTier = connection.effectiveType === '4g' ? 'high' : 
                     (connection.effectiveType === '3g' ? 'medium' : 'low');
  
  // CPU/Memory detection (basic heuristic)
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const cpuTier = hardwareConcurrency > 4 ? 'high' : 
                 (hardwareConcurrency > 2 ? 'medium' : 'low');
  
  // Device memory API
  const deviceMemory = navigator.deviceMemory || 1;
  const memoryTier = deviceMemory > 4 ? 'high' : 
                    (deviceMemory > 2 ? 'medium' : 'low');
  
  // Overall performance tier
  const tier = cpuTier === 'high' && memoryTier === 'high' ? 'high' :
              (cpuTier === 'low' || memoryTier === 'low' ? 'low' : 'medium');
  
  return { 
    tier,
    memory: memoryTier,
    cpu: cpuTier,
    network: networkTier,
    saveData: !!connection.saveData,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    reducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches || connection.saveData,
    isLowEndDevice: tier === 'low',
    hardwareConcurrency,
    deviceMemory,
    effectiveConnectionType: connection.effectiveType
  };
}

// Dynamically adjust quality settings based on device capabilities
export function getQualitySettings(isMobile, isTablet, isLowPowerDevice, prefersReducedData) {
  const capabilities = getDeviceCapabilities();
  
  // Default optimizations
  let settings = {
    particleCount: 100,
    enableBlur: true,
    enableShadows: true,
    animationLevel: 'full',
    imageQuality: 'high',
    tiltFactor: 10,
    enableParallax: true,
    enablePostProcessing: true,
    throttleRAF: false,
    minFrameMS: 0, // No throttling by default
    batchDOMOperations: false
  };
  
  // Low-tier device optimizations
  if (isMobile || capabilities.tier === 'low' || isLowPowerDevice) {
    settings = {
      ...settings,
      particleCount: 20,
      enableBlur: false,
      enableShadows: false,
      animationLevel: 'minimal',
      imageQuality: 'low',
      tiltFactor: 5,
      enableParallax: false,
      enablePostProcessing: false,
      throttleRAF: true,
      minFrameMS: 33.33, // Cap at 30fps
      batchDOMOperations: true
    };
  }
  
  // Medium-tier device optimizations
  else if (isTablet || capabilities.tier === 'medium') {
    settings = {
      ...settings,
      particleCount: 50,
      enableBlur: true,
      enableShadows: false,
      animationLevel: 'reduced', 
      imageQuality: 'medium',
      tiltFactor: 7,
      enableParallax: true,
      enablePostProcessing: false,
      throttleRAF: true,
      minFrameMS: 16.67, // Cap at 60fps
      batchDOMOperations: true
    };
  }
  
  // Data saving mode
  if (prefersReducedData || capabilities.saveData) {
    settings.imageQuality = 'low';
    settings.enablePostProcessing = false;
    settings.particleCount = Math.max(10, Math.floor(settings.particleCount / 2));
  }
  
  return settings;
}

// Create a throttled requestAnimationFrame for performance
export function createThrottledRAF(minFrameMS = 16.67) {
  let lastFrameTime = 0;
  
  return (callback) => {
    return requestAnimationFrame((timestamp) => {
      const elapsed = timestamp - lastFrameTime;
      if (elapsed >= minFrameMS) {
        lastFrameTime = timestamp;
        callback(timestamp);
      }
    });
  };
}

// Batch DOM operations to reduce reflows
export function batchDOMOperations(operations, timeout = 16) {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => operations(), { timeout });
  } else {
    setTimeout(operations, timeout);
  }
}

// Debounce function to limit execution
export function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Fast way to check if element is in viewport
export function isInViewport(element, offset = 200) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight + offset) &&
    rect.bottom >= -offset &&
    rect.left <= (window.innerWidth + offset) &&
    rect.right >= -offset
  );
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
