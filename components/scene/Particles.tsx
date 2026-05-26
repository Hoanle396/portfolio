"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const { positions, scales, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7c5cff"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#ff7a59"),
      new THREE.Color("#f5f5f7"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
      scales[i] = Math.random() * 0.6 + 0.2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, scales, colors };
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30 },
        uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      },
      vertexShader: /* glsl */ `
        attribute float scale;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uSize;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec3 p = position;
          p.y += sin(uTime * 0.3 + position.x * 0.5) * 0.25;
          p.x += cos(uTime * 0.4 + position.y * 0.3) * 0.15;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = scale * uSize * uPixelRatio * (1.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, a * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  if (count === 0) return null;

  return (
    <points ref={ref} material={material} position={[0, 0, 0]} scale={[viewport.width / 8, viewport.height / 8, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
    </points>
  );
}
