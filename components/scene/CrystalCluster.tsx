"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function scrollProgress(dom: HTMLElement) {
  const rect = dom.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return THREE.MathUtils.clamp(1 - (rect.top + rect.height * 0.5) / vh + 0.5, 0, 2);
}

function Crystal({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const offset = useMemo(() => Math.random() * 10, []);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.7;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + offset) * 0.25;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.OctahedronGeometry(1.02, 0)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

function Cluster() {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const { gl } = useThree();
  useFrame((state, delta) => {
    const p = scrollProgress(gl.domElement); // 0..2
    if (group.current) {
      // scroll-driven spin + pointer parallax
      group.current.rotation.y += delta * 0.15 + delta * (p - 1) * 0.7;
      group.current.position.x = state.pointer.x * 0.6;
      group.current.position.y = state.pointer.y * 0.4 + (p - 1) * 0.8;
    }
    if (inner.current) {
      // crystals spread apart (explode) as the section scrolls through
      const spread = THREE.MathUtils.lerp(0.7, 1.5, THREE.MathUtils.clamp(p, 0, 1.6) / 1.6);
      inner.current.scale.lerp(new THREE.Vector3(spread, spread, spread), 0.08);
    }
  });
  const crystals = useMemo(
    () => [
      { position: [0, 0, 0] as [number, number, number], color: "#a78bfa", scale: 1.1, speed: 0.4 },
      { position: [-2.2, 0.6, -1] as [number, number, number], color: "#22d3ee", scale: 0.7, speed: 0.5 },
      { position: [2.1, -0.4, -0.6] as [number, number, number], color: "#fb923c", scale: 0.8, speed: 0.35 },
      { position: [1.3, 1.3, -1.5] as [number, number, number], color: "#34d399", scale: 0.5, speed: 0.6 },
      { position: [-1.5, -1.1, -1.2] as [number, number, number], color: "#f472b6", scale: 0.55, speed: 0.45 },
    ],
    []
  );
  return (
    <group ref={group}>
      <group ref={inner}>
        {crystals.map((c, i) => (
          <Crystal key={i} {...c} />
        ))}
      </group>
    </group>
  );
}

export function CrystalCluster({ className }: { className?: string }) {
  const [show, setShow] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setShow(true);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (!show) return null;
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={reduce ? "never" : "always"}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={2} color="#a78bfa" />
        <pointLight position={[-4, -2, 3]} intensity={1.5} color="#22d3ee" />
        <Cluster />
      </Canvas>
    </div>
  );
}
