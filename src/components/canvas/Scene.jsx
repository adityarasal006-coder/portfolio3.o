import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import DNAHelix from './DNAHelix';

const Scene = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* Cosmic Background Gradient representation (Three.js standard color, 
            the real gradient is handled by a background plane or CSS on the canvas, 
            here we will let CSS background show through by setting alpha to true, 
            but for intense stars we use a deep space color) */}
        <color attach="background" args={['#0B0B15']} />
        
        {/* Fog to create depth, fading into the cosmic deep blue/black */}
        <fog attach="fog" args={['#0B0B15', 10, 30]} />

        <ambientLight intensity={0.2} />
        
        <Suspense fallback={null}>
          {/* 
            The interactive DNA positioned to the right to fit the Hero Layout 
          */}
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <group position={[4, 0, 0]}>
               <DNAHelix />
            </group>
          </Float>
          
          <Stars radius={100} depth={50} count={6000} factor={4} saturation={1} fade speed={1.5} />
          
          {/* Post Processing for Neon Glow */}
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={2.5} 
              radius={0.8} 
            />
            <Noise opacity={0.03} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
