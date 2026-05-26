"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// progress: 0 when the canvas centre sits at the bottom of the viewport,
// 1 when it reaches the centre, ~2 when it exits the top.
function scrollProgress(dom: HTMLElement) {
  const rect = dom.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return THREE.MathUtils.clamp(1 - (rect.top + rect.height * 0.5) / vh + 0.5, 0, 2);
}

function Globe() {
  const group = useRef<THREE.Group>(null!);
  const { gl } = useThree();

  const wire = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 3);
    return new THREE.EdgesGeometry(geo);
  }, []);

  // points scattered on the sphere surface (fibonacci)
  const points = useMemo(() => {
    const N = 90;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const palette = [
      new THREE.Color("#a78bfa"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#fb923c"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.05;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { pos, col, N };
  }, []);

  const ptsMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uDpr: { value: 1.5 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute vec3 color; varying vec3 vColor; uniform float uTime;
          void main(){
            vColor = color;
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            float pulse = 0.6 + 0.4*sin(uTime*2.0 + position.x*3.0);
            gl_PointSize = (5.0 + 4.0*pulse) * (1.0/-mv.z) * 60.0;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord - vec2(0.5));
            float a = smoothstep(0.5,0.0,d);
            gl_FragColor = vec4(vColor, a);
          }`,
      }),
    []
  );

  useFrame((state, delta) => {
    if (group.current) {
      const p = scrollProgress(gl.domElement); // 0..2
      // base spin + scroll-driven extra spin (scrub)
      group.current.rotation.y += delta * 0.12 + delta * p * 0.6;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15 + (p - 1) * 0.25;
      // grow as it enters, drift up + parallax
      const s = THREE.MathUtils.lerp(0.55, 1.15, THREE.MathUtils.clamp(p, 0, 1));
      group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
      group.current.position.y = (p - 1) * 1.2;
    }
    ptsMat.uniforms.uTime.value += delta;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={wire}>
        <lineBasicMaterial color="#a78bfa" transparent opacity={0.18} />
      </lineSegments>
      <points material={ptsMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[points.col, 3]} />
        </bufferGeometry>
      </points>
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#0a0a12" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export function NetworkGlobe({ className }: { className?: string }) {
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
        <Globe />
      </Canvas>
    </div>
  );
}
