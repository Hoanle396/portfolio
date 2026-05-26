"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Outer glowing ring
function Ring({ radius, tube, color, opacity }: { radius: number; tube: number; color: string; opacity: number }) {
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }),
    [color, opacity]
  );
  const geo = useMemo(() => new THREE.TorusGeometry(radius, tube, 16, 120), [radius, tube]);
  return <mesh geometry={geo} material={mat} />;
}

// Particles streaming along the ring perimeter
function StreamParticles({ radius, color, count, speed, spread }: {
  radius: number; color: string; count: number; speed: number; spread: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const { pos, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      offsets[i] = (i / count) * Math.PI * 2;
      const a = offsets[i];
      pos[i * 3]     = Math.cos(a) * radius;
      pos[i * 3 + 1] = Math.sin(a) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return { pos, offsets };
  }, [count, radius, spread]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uSpeed: { value: speed } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uSpeed;
          void main() {
            float a = atan(position.y, position.x) + uTime * uSpeed;
            float r = length(position.xy);
            vec3 p = vec3(cos(a)*r, sin(a)*r, position.z);
            float pulse = 0.4 + 0.6 * sin(uTime * 3.0 + a * 4.0);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (3.5 + 3.5 * pulse) * (1.0 / -mv.z) * 55.0;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(uColor, a * 0.85);
          }`,
      }),
    [color, speed]
  );

  useFrame((_, delta) => { mat.uniforms.uTime.value += delta; });

  return (
    <points ref={ref} material={mat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
    </points>
  );
}

// Inner energy disc — faint radial glow
function EnergyDisc() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vec2 c = vUv - 0.5;
            float d = length(c);
            float ring = smoothstep(0.48, 0.38, d) * smoothstep(0.0, 0.15, d);
            float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + d * 12.0);
            vec3 col = mix(vec3(0.67, 0.55, 0.98), vec3(0.13, 0.83, 0.94), d * 2.0);
            gl_FragColor = vec4(col, ring * pulse * 0.45);
          }`,
      }),
    []
  );
  useFrame((_, delta) => { mat.uniforms.uTime.value += delta; });
  return (
    <mesh material={mat} rotation={[0, 0, 0]}>
      <planeGeometry args={[5, 5, 1, 1]} />
    </mesh>
  );
}

function Scene() {
  const rootRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    rootRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
  });

  return (
    <group ref={rootRef}>
      <EnergyDisc />
      {/* rings at slightly different scales for depth */}
      <Ring radius={2.2} tube={0.012} color="#a78bfa" opacity={0.55} />
      <Ring radius={2.2} tube={0.035} color="#a78bfa" opacity={0.08} />
      <Ring radius={1.85} tube={0.008} color="#22d3ee" opacity={0.35} />
      <Ring radius={2.55} tube={0.006} color="#fb923c" opacity={0.25} />

      {/* streaming particles on the main ring */}
      <StreamParticles radius={2.2}  color="#a78bfa" count={90} speed={0.55}  spread={0.06} />
      <StreamParticles radius={1.85} color="#22d3ee" count={60} speed={-0.38} spread={0.05} />
      <StreamParticles radius={2.55} color="#fb923c" count={50} speed={0.28}  spread={0.04} />
    </group>
  );
}

export function PortalRing({ className }: { className?: string }) {
  const [show, setShow]     = useState(false);
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
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={reduce ? "never" : "always"}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
