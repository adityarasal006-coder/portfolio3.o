import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DNAHelix = () => {
  const groupRef = useRef();
  const particlesRef = useRef();
  
  const strandCount = 60; // Increased density for a more complex look
  const radius = 2.5;     // Wider radius
  const height = 14;      // Taller strand

  // Track mouse for interactivity
  const [mouse, setMouse] = useState(new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to -1 to +1
      setMouse(new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      ));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate Base Geometry Points
  const { points, lines } = useMemo(() => {
    const p = [];
    const l = [];
    for (let i = 0; i < strandCount; i++) {
      const y = (i / strandCount) * height - height / 2;
      const angle = (i / strandCount) * Math.PI * 6; // More twists
      
      const p1 = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      
      p.push({ pos: p1, color: new THREE.Color('#7B2FF7'), originalPos: p1.clone(), id: i*2 });
      p.push({ pos: p2, color: new THREE.Color('#2D9CFF'), originalPos: p2.clone(), id: i*2+1 });
      
      l.push([p1, p2]);
    }
    return { points: p, lines: l };
  }, [strandCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate the entire organism
    groupRef.current.rotation.y = t * 0.15;
    
    // Animate children based on scroll (simulated via time for now, can link to actual scroll later)
    const scrollY = window.scrollY;
    
    // Pulse animation & Mouse Interaction
    let childIndex = 0;
    groupRef.current.children.forEach((child) => {
      if (child.isMesh && child.userData.isNode) {
        const pointData = points[childIndex];
        
        // Base pulse
        const pulse = Math.sin(t * 3 + child.position.y * 0.5) * 0.5 + 0.5;
        
        // Interaction Logic using standard vector distance mapping
        // We simulate a basic 2D raycast distance approximation for interaction
        // In a true setup, we would raycast this, but for performance, we apply a wave
        
        child.material.emissiveIntensity = 2 + pulse * 2;
        
        // Subtle organic wobbble
        child.position.x = pointData.originalPos.x + Math.sin(t * 2 + child.position.y) * 0.2;
        child.position.z = pointData.originalPos.z + Math.cos(t * 2 + child.position.y) * 0.2;
        
        childIndex++;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {points.map((point, i) => (
        <mesh key={i} position={point.pos} userData={{ isNode: true }}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={point.color} 
            emissive={point.color} 
            emissiveIntensity={2} 
            toneMapped={false} // Crucial for Bloom to blow out correctly
          />
        </mesh>
      ))}
      
      {/* Energy Bonds */}
      {lines.map((pair, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints(pair)} />
          <lineBasicMaterial 
            attach="material" 
            color="#9D4EDD" 
            transparent 
            opacity={0.15} 
            toneMapped={false}
          />
        </line>
      ))}
    </group>
  );
};

export default DNAHelix;
