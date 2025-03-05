'use client';

import { useThree, Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

const CyberLine = () => {
  const points = [];
  for(let i = 0; i < 5; i++) {
    points.push(new THREE.Vector3(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ));
  }

  return (
    <Line
      points={points}
      color="#10b981"
      lineWidth={0.5}
      dashed={false}
    />
  );
};

export const CyberBorder = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas orthographic camera={{ zoom: 100 }}>
        <ambientLight intensity={0.5} />
        <CyberLine />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};