'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

function Particles({ count = 1500 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const spread = 12;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 2;
    }
    return { positions };
  }, [count]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.02;
    group.current.rotation.x += delta * 0.01;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#93c5fd"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Glow({ color = '#7c3aed', position = [0, 0, 0], scale = 6 }) {
  return (
    <mesh position={position as any} scale={scale} renderOrder={-1}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function Background3D() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 60 }}
      >
        {/* faint ambient lighting so glows feel soft */}
        <ambientLight intensity={0.15} />
        <Particles count={1400} />
      </Canvas>
    </div>
  );
}

export default Background3D;
