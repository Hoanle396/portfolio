"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function scrollProgress(dom: HTMLElement) {
  const rect = dom.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return THREE.MathUtils.clamp(1 - (rect.top + rect.height * 0.5) / vh + 0.5, 0, 2);
}

function Helix() {
  const group = useRef<THREE.Group>(null!);
  const { gl } = useThree();

  const nodes = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string; strand: number }[] = [];
    const turns = 3;
    const count = 26;
    const palette = ["#a78bfa", "#22d3ee", "#fb923c", "#34d399"];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2 * turns;
      const y = (i / count) * 6 - 3;
      const r = 1.1;
      arr.push({ pos: [Math.cos(t) * r, y, Math.sin(t) * r], color: palette[i % palette.length], strand: 0 });
      arr.push({ pos: [Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r], color: palette[(i + 2) % palette.length], strand: 1 });
    }
    return arr;
  }, []);

  // rungs connecting the two strands
  const rungs = useMemo(() => {
    const turns = 3;
    const count = 26;
    const r = 1.1;
    const lines: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < count; i += 1) {
      const t = (i / count) * Math.PI * 2 * turns;
      const y = (i / count) * 6 - 3;
      lines.push({
        a: new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r),
        b: new THREE.Vector3(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r),
      });
    }
    return lines;
  }, []);

  const rungGeo = useMemo(() => {
    const pts: number[] = [];
    rungs.forEach((l) => {
      pts.push(l.a.x, l.a.y, l.a.z, l.b.x, l.b.y, l.b.z);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [rungs]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = scrollProgress(gl.domElement); // 0..2
    // scroll scrubs the helix rotation (unwinds as you scroll) + idle spin
    group.current.rotation.y += delta * 0.35 + delta * p * 0.9;
    // parallax travel + gentle bob
    group.current.position.y = (p - 1) * 1.6 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    // tilt with scroll
    group.current.rotation.z = 0.15 + (p - 1) * 0.18;
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0.15]}>
      <lineSegments geometry={rungGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={0.6}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export function DnaHelix({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={reduce ? "never" : "always"}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={2} color="#a78bfa" />
        <pointLight position={[-4, -2, 3]} intensity={1.4} color="#22d3ee" />
        <Helix />
      </Canvas>
    </div>
  );
}
