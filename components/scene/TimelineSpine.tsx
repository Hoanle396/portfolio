"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Lightweight ambient torus knot that floats far in the background,
// visible primarily in the experience area as a subtle decorative element.
export function TimelineSpine() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.08;

    // Travel down as user scrolls; appear only past the projects fold
    if (typeof window !== "undefined") {
      const sy = window.scrollY;
      const h = window.innerHeight;
      const p = Math.min(1, Math.max(0, (sy - h * 1.5) / (h * 2.0)));
      ref.current.position.x = -3.5 + p * 1.0;
      ref.current.position.y = -2 - p * 4;
      const opacity = THREE.MathUtils.lerp(0, 0.45, Math.max(0, Math.min(1, p * 1.3)));
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity;
    }
  });

  return (
    <mesh ref={ref} position={[-4, -4, -2]}>
      <torusKnotGeometry args={[1.2, 0.06, 200, 16, 2, 5]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0} wireframe />
    </mesh>
  );
}
