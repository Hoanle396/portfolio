'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef, useState, createRef } from 'react';
import * as THREE from 'three';

type PlanetDef = {
  name: string;
  color: string;
  baseRadius: number;
  baseDistance: number;
  orbitSpeed: number; // radians per second at timeScale=1
  rotationSpeed: number; // self-rotation speed
  tilt?: [number, number]; // x,z tilt in radians
  ring?: { inner: number; outer: number; color: string; opacity?: number };
};

const BASE_PLANETS: PlanetDef[] = [
  {
    name: 'Mercury',
    color: '#c9c5b1',
    baseRadius: 0.12,
    baseDistance: 1.1,
    orbitSpeed: 1.6,
    rotationSpeed: 1.0,
  },
  {
    name: 'Venus',
    color: '#e6d3a4',
    baseRadius: 0.18,
    baseDistance: 1.6,
    orbitSpeed: 1.17,
    rotationSpeed: 0.5,
  },
  {
    name: 'Earth',
    color: '#6ea8ff',
    baseRadius: 0.2,
    baseDistance: 2.2,
    orbitSpeed: 1.0,
    rotationSpeed: 2.0,
    tilt: [0.41, 0],
  },
  {
    name: 'Mars',
    color: '#d36c4e',
    baseRadius: 0.16,
    baseDistance: 2.8,
    orbitSpeed: 0.8,
    rotationSpeed: 1.8,
  },
  {
    name: 'Jupiter',
    color: '#d1b08f',
    baseRadius: 0.45,
    baseDistance: 3.8,
    orbitSpeed: 0.43,
    rotationSpeed: 3.0,
  },
  {
    name: 'Saturn',
    color: '#f0d3a2',
    baseRadius: 0.38,
    baseDistance: 4.8,
    orbitSpeed: 0.32,
    rotationSpeed: 2.5,
    ring: { inner: 0.55, outer: 0.85, color: '#e9d8b4', opacity: 0.7 },
  },
  {
    name: 'Uranus',
    color: '#a8e6ff',
    baseRadius: 0.26,
    baseDistance: 5.6,
    orbitSpeed: 0.23,
    rotationSpeed: 2.2,
  },
  {
    name: 'Neptune',
    color: '#6aa6ff',
    baseRadius: 0.25,
    baseDistance: 6.4,
    orbitSpeed: 0.18,
    rotationSpeed: 2.0,
  },
];

function Orbits({ distances }: { distances: number[] }) {
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#6b7280', transparent: true, opacity: 0.5 }),
    [],
  );
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {distances.map((r, idx) => {
        const segments = 64;
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array((segments + 1) * 3);
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          positions[i * 3] = Math.cos(a) * r;
          positions[i * 3 + 1] = Math.sin(a) * r;
          positions[i * 3 + 2] = 0;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return <lineLoop key={idx} geometry={geom} material={material} />;
      })}
    </group>
  );
}

function SolarSystem({
  planetCount,
  timeScale,
  sizeScale,
  distanceScale,
  showOrbits,
  selfRotationScale,
}: {
  planetCount: number;
  timeScale: number;
  sizeScale: number;
  distanceScale: number;
  showOrbits: boolean;
  selfRotationScale: number;
}) {
  const groups = useMemo(
    () => Array.from({ length: planetCount }, () => createRef<THREE.Group>()),
    [planetCount],
  );
  const planets = useMemo(() => BASE_PLANETS.slice(0, planetCount), [planetCount]);

  useFrame((_, delta) => {
    planets.forEach((p, i) => {
      const g = groups[i].current;
      if (!g) return;
      g.rotation.y += delta * p.orbitSpeed * timeScale;
      const planetMesh = g.children[0] as THREE.Mesh;
      if (planetMesh) planetMesh.rotation.y += delta * p.rotationSpeed * selfRotationScale;
    });
  });

  const orbitDistances = planets.map((p) => p.baseDistance * distanceScale);

  return (
    <group>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[0.6 * sizeScale, 32, 32]} />
        <meshStandardMaterial
          color="#ffd166"
          emissive="#ffb703"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={4} distance={20} color="#ffd166" />

      {/* Planets */}
      {planets.map((p, i) => {
        const distance = p.baseDistance * distanceScale;
        const radius = p.baseRadius * sizeScale;
        return (
          <group key={p.name} ref={groups[i]}>
            <mesh
              position={[distance, 0, 0]}
              rotation={[p.tilt?.[0] ?? 0, 0, p.tilt?.[1] ?? 0]}
              castShadow
              receiveShadow
            >
              <sphereGeometry args={[radius, 24, 24]} />
              <meshStandardMaterial color={p.color} roughness={0.8} metalness={0.1} />
            </mesh>
            {p.ring && (
              <mesh position={[distance, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[p.ring.inner * radius, p.ring.outer * radius, 64]} />
                <meshBasicMaterial
                  color={p.ring.color}
                  transparent
                  opacity={p.ring.opacity ?? 0.6}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {showOrbits && <Orbits distances={orbitDistances} />}
    </group>
  );
}

export function Hero3D() {
  const [ui, setUI] = useState({
    planetCount: 6,
    timeScale: 1.0,
    sizeScale: 0.5,
    distanceScale: 1.0,
    showOrbits: true,
    selfRotationScale: 1.0,
    showStars: true,
  });

  return (
    <Canvas
      style={{
        width: '100%',
        height: 'calc(51vh - 64px)',
        position: 'absolute',
        top: 132,
        left: 180,
      }}
      className="hidden md:block"
      camera={{ position: [0, 2.2, 7.5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true }}
    >
      {ui.showStars && <Stars radius={30} depth={40} count={800} factor={2} saturation={0} fade />}
      <SolarSystem
        planetCount={ui.planetCount}
        timeScale={ui.timeScale}
        sizeScale={ui.sizeScale}
        distanceScale={ui.distanceScale}
        showOrbits={ui.showOrbits}
        selfRotationScale={ui.selfRotationScale}
      />
      <Environment preset="night" />
      <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
    </Canvas>
  );
}
