"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberpunkModel = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Configuración básica de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Iluminación cyberpunk
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
    
    const purpleLight = new THREE.PointLight(0x9900ff, 1, 10);
    purpleLight.position.set(2, 1, 2);
    scene.add(purpleLight);
    
    const cyanLight = new THREE.PointLight(0x00ffff, 1, 10);
    cyanLight.position.set(-2, 1, -2);
    scene.add(cyanLight);
    
    // Grupo de objetos que representarán una "ciudad digital"
    const cityGroup = new THREE.Group();
    
    // Crear edificios digitales (cubos)
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BoxGeometry(
        Math.random() * 0.5 + 0.1,
        Math.random() + 0.5,
        Math.random() * 0.5 + 0.1
      );
      
      // Material con wireframe para efecto digital
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() < 0.5 ? 0x00ffff : 0xff00ff,
        wireframe: Math.random() > 0.7,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5,
        emissive: Math.random() < 0.5 ? 0x00ffff : 0xff00ff,
        emissiveIntensity: 0.3,
      });
      
      const building = new THREE.Mesh(geometry, material);
      
      // Distribución aleatoria
      building.position.x = (Math.random() - 0.5) * 5;
      building.position.y = -0.5 + geometry.parameters.height / 2;
      building.position.z = (Math.random() - 0.5) * 5;
      
      cityGroup.add(building);
    }
    
    // Crear "grid" cyberpunk en el suelo
    const gridGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -0.5;
    
    cityGroup.add(grid);
    scene.add(cityGroup);
    
    // Esfera central (representa un "núcleo" de datos)
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 1;
    scene.add(sphere);
    
    // Posicionamiento de la cámara
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Animación
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotación lenta de la escena
      cityGroup.rotation.y += 0.003;
      
      // La esfera pulsa
      sphere.scale.x = 1 + Math.sin(Date.now() * 0.002) * 0.1;
      sphere.scale.y = 1 + Math.sin(Date.now() * 0.002) * 0.1;
      sphere.scale.z = 1 + Math.sin(Date.now() * 0.002) * 0.1;
      
      purpleLight.intensity = 1 + Math.sin(Date.now() * 0.001) * 0.3;
      cyanLight.intensity = 1 + Math.cos(Date.now() * 0.001) * 0.3;
      
      renderer.render(scene, camera);
    }
    
    // Responsive
    function handleResize() {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full threejs-canvas"
    />
  );
};

export default CyberpunkModel;
