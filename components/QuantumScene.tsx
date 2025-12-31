/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Environment, Box, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';

// Manually declare intrinsic elements to satisfy TypeScript if automatic types are missing
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      extrudeGeometry: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      meshStandardMaterial: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      extrudeGeometry: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      meshStandardMaterial: any;
    }
  }
}

// A true 3D Heart shape
const Heart3D = ({ position, color, scale = 1, speed = 1, timeOffset = 0 }: { position: [number, number, number]; color: string; scale?: number, speed?: number, timeOffset?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create heart shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x + 0.5, y + 0.5);
    s.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    s.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    s.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    s.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    s.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    s.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() + timeOffset;
      // Heartbeat effect (scale pulse)
      const pulse = 1 + Math.sin(t * 4) * 0.05 * speed; 
      
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
      
      // Gentle rotation override if needed, but Float handles main rotation
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <group position={position}>
        {/* Rotate to face forward properly and center pivot */}
        <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} position={[-0.5, -1, 0]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshPhysicalMaterial 
                color={color}
                roughness={0.1}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                ior={1.5}
                thickness={2}
                transmission={0.1}
            />
        </mesh>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FB7185" />
        <pointLight position={[-10, -5, -5]} intensity={1} color="#FFE4E6" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#FFF" />

        {/* Soft clouds for romance */}
        <Cloud opacity={0.4} speed={0.2} bounds={[10, 2, 1.5]} segments={10} color="#F9A8D4" position={[0, -2, -5]} />
        <Cloud opacity={0.4} speed={0.2} bounds={[10, 2, 1.5]} segments={10} color="#FB7185" position={[0, 4, -8]} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
          <Heart3D position={[0, 0.5, 0]} color="#BE123C" scale={0.8} speed={1.2} />
          <Heart3D position={[-3, 2, -2]} color="#FB7185" scale={0.5} speed={0.8} timeOffset={1} />
          <Heart3D position={[3, -1.5, -1]} color="#FECDD3" scale={0.6} speed={1.5} timeOffset={2} />
          <Heart3D position={[-2, -2.5, 1]} color="#E11D48" scale={0.4} speed={0.9} timeOffset={3} />
          <Heart3D position={[3.5, 2.5, -3]} color="#FFF1F2" scale={0.3} speed={1.1} timeOffset={4} />
          <Heart3D position={[0, -3, -2]} color="#FDA4AF" scale={0.4} speed={1.3} timeOffset={5} />
        </Float>

        <Sparkles count={80} scale={12} size={3} speed={0.4} opacity={0.6} color="#FFF" />
        
        {/* Warm environment */}
        <Environment preset="sunset" blur={0.8} />
      </Canvas>
    </div>
  );
};

// Inner component to handle the animation logic
const GiftBox = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* The Box */}
      <Box args={[2, 2, 2]}>
          <meshStandardMaterial color="#BE123C" roughness={0.3} metalness={0.1} />
      </Box>
      
      {/* The Ribbon (Cross) */}
      <Box args={[2.1, 2.1, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FDE047" metalness={0.6} roughness={0.2} />
      </Box>
      <Box args={[0.3, 2.1, 2.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FDE047" metalness={0.6} roughness={0.2} />
      </Box>
      
      {/* 2025 Text floating near it */}
      <Text 
          position={[0, 1.8, 0]} 
          fontSize={0.5} 
          color="#FDE047"
          anchorX="center" 
          anchorY="middle"
          font="https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/thefuture.jpg"
      >
          2025
      </Text>
    </group>
  );
};

// A rotating gift box / memory cube
export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#FFF" />
        <Environment preset="lobby" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
          <GiftBox />
        </Float>
        <Sparkles count={30} scale={6} size={4} speed={0.4} opacity={0.8} color="#FDE047" />
      </Canvas>
    </div>
  );
}