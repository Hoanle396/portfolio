"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function scrollProgress(dom: HTMLElement) {
  const rect = dom.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return THREE.MathUtils.clamp(1 - (rect.top + rect.height * 0.5) / vh + 0.5, 0, 2);
}

const RINGS = [
  { radius: 0.65, tilt: 0.25, speed: 0.5,   color: "#a78bfa", nodes: 4 },
  { radius: 1.05, tilt: 1.05, speed: -0.32,  color: "#22d3ee", nodes: 6 },
  { radius: 1.45, tilt: 0.6,  speed: 0.22,  color: "#fb923c", nodes: 8 },
];

function Ring({ radius, tilt, speed, color, nodes }: (typeof RINGS)[number]) {
  const groupRef = useRef<THREE.Group>(null!);
  const angle = useRef(Math.random() * Math.PI * 2);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(radius, 0.007, 8, 80), [radius]);
  const ringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 }),
    [color]
  );

  const { pos, sizes } = useMemo(() => {
    const pos = new Float32Array(nodes * 3);
    const sizes = new Float32Array(nodes);
    for (let i = 0; i < nodes; i++) {
      const a = (i / nodes) * Math.PI * 2;
      pos[i * 3]     = Math.cos(a) * radius;
      pos[i * 3 + 1] = Math.sin(a) * radius;
      pos[i * 3 + 2] = 0;
      sizes[i] = 5 + Math.random() * 6;
    }
    return { pos, sizes };
  }, [nodes, radius]);

  const nodeMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime:  { value: 0 },
          uColor: { value: new THREE.Color(color) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float size;
          uniform float uTime;
          void main() {
            float pulse = 0.5 + 0.5 * sin(uTime * 2.2 + position.x * 5.0);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * pulse * (1.0 / -mv.z) * 55.0;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(uColor, a);
          }`,
      }),
    [color]
  );

  useFrame((_, delta) => {
    angle.current += delta * speed;
    if (groupRef.current) groupRef.current.rotation.z = angle.current;
    nodeMat.uniforms.uTime.value += delta;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        <mesh geometry={ringGeo} material={ringMat} />
        <points material={nodeMat}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pos, 3]} />
            <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
          </bufferGeometry>
        </points>
      </group>
    </group>
  );
}

function Scene() {
  const rootRef = useRef<THREE.Group>(null!);
  const { gl } = useThree();

  useFrame((state, delta) => {
    if (!rootRef.current) return;
    const p = scrollProgress(gl.domElement);
    rootRef.current.rotation.y += delta * 0.09;
    rootRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    const s = THREE.MathUtils.lerp(0.7, 1.05, THREE.MathUtils.clamp(p, 0, 1));
    rootRef.current.scale.setScalar(
      THREE.MathUtils.lerp(rootRef.current.scale.x, s, 0.06)
    );
    rootRef.current.position.y = THREE.MathUtils.lerp(
      rootRef.current.position.y,
      (p - 1) * 0.6,
      0.06
    );
  });

  return (
    <group ref={rootRef}>
      {/* core */}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.12} />
      </mesh>
      {RINGS.map((r) => (
        <Ring key={r.radius} {...r} />
      ))}
    </group>
  );
}

export function OrbitRings({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={reduce ? "never" : "always"}
      >
        <ambientLight intensity={0.3} />
        <Scene />
      </Canvas>
    </div>
  );
}
