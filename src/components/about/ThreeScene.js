"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// HackerModel component - using a placeholder cube until you have an actual model
function HackerModel(props) {
  const meshRef = useRef();
  // Digital lines emanating from the model
  const linesRef = useRef([]);
  const [lines, setLines] = useState([]);
  
  // Create digital lines
  useEffect(() => {
    const newLines = [];
    for (let i = 0; i < 20; i++) {
      newLines.push({
        start: new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ),
        end: new THREE.Vector3(
          (Math.random() * 2 - 1) * 3,
          (Math.random() * 2 - 1) * 3,
          (Math.random() * 2 - 1) * 3
        ),
        speed: Math.random() * 0.02 + 0.01,
        progress: Math.random()
      });
    }
    setLines(newLines);
  }, []);
  
  // Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      // Pulse effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
      
      // Update digital lines
      linesRef.current.forEach((line, i) => {
        if (lines[i]) {
          lines[i].progress += lines[i].speed;
          if (lines[i].progress > 1) {
            lines[i].progress = 0;
            lines[i].start = new THREE.Vector3(
              Math.random() * 2 - 1,
              Math.random() * 2 - 1,
              Math.random() * 2 - 1
            );
            lines[i].end = new THREE.Vector3(
              (Math.random() * 2 - 1) * 3,
              (Math.random() * 2 - 1) * 3,
              (Math.random() * 2 - 1) * 3
            );
          }
          
          // Calculate current position of the line
          const currentPos = new THREE.Vector3().lerpVectors(
            lines[i].start,
            lines[i].end,
            lines[i].progress
          );
          
          if (line && line.geometry) {
            line.geometry.setFromPoints([lines[i].start, currentPos]);
            line.geometry.verticesNeedUpdate = true;
          }
        }
      });
    }
  });

  return (
    <>
      {/* Placeholder hacker model (a stylized cube) */}
      <mesh ref={meshRef} {...props}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe={true}
        />
      </mesh>
      
      {/* Digital lines */}
      {lines.map((line, i) => (
        <line key={i} ref={el => linesRef.current[i] = el}>
          <bufferGeometry />
          <lineBasicMaterial color="#ff6600" opacity={0.7} transparent={true} />
        </line>
      ))}
      
      {/* Atmospheric elements */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial 
          color="#ff6600" 
          transparent={true} 
          opacity={0.05} 
          side={THREE.BackSide} 
        />
      </mesh>
    </>
  );
}

export default function ThreeScene() {
  return (
    <Canvas 
      className="digital-pulse"
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff8800" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6600" />
      
      <HackerModel position={[0, 0, 0]} />
      
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <Environment preset="night" />
    </Canvas>
  );
}
