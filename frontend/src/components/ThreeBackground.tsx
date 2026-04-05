"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const generatePositions = (count: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 5 + Math.random() * 5; // Outer shell of particles
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

function Particles({ count = 2000, color = "#2563eb", speed = 0.05 }) {
  const points = useRef<THREE.Points>(null!);

  const particles = useMemo(() => generatePositions(count), [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * speed;
    points.current.rotation.z = time * speed * 0.5;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function Globe() {
    const globeRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        globeRef.current.rotation.y = time * 0.1;
    });

    return (
        <group>
            <mesh ref={globeRef}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshPhongMaterial 
                    color="#1e3a8a" 
                    wireframe 
                    transparent 
                    opacity={0.15} 
                    emissive="#2563eb"
                    emissiveIntensity={0.5}
                />
            </mesh>
            {/* Inner solid glow */}
            <mesh>
                <sphereGeometry args={[1.98, 32, 32]} />
                <meshBasicMaterial color="#000" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        <Particles count={1500} color="#2563eb" speed={0.05} />
        <Particles count={1000} color="#818cf8" speed={0.03} />
        <Globe />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/0 via-[#020617]/20 to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-60" />
    </div>
  );
}

