"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// classic 3D simplex noise (inlined to avoid deps)
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0,0.5,1.0,2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)) );
}
`;

/* ---------- shaders ---------- */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  uniform float uHover;
  varying vec3 vNormal;
  varying float vNoise;
  varying vec3 vPos;
  ${noise}
  void main() {
    float t = uTime * 0.4;
    float n = snoise(position * 1.6 + vec3(t, t * 0.7, -t));
    float amp = uDistort * (0.05 + uHover * 0.14);
    vec3 displaced = position + normal * n * amp;
    vNoise = n;
    vNormal = normalize(normalMatrix * normal);
    vPos = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;
  varying vec3 vNormal;
  varying float vNoise;
  varying vec3 vPos;
  void main() {
    float fres = pow(1.0 - clamp(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 1.8);
    float mixA = clamp(vNoise * 0.5 + 0.5, 0.0, 1.0);
    vec3 base = mix(uColorA, uColorB, mixA);
    vec3 col = mix(base, uColorC, fres);
    float shimmer = 0.5 + 0.5 * sin(vPos.x * 7.0 + uTime * 1.5) * sin(vPos.y * 7.0 - uTime * 1.2);
    col += vec3(0.10, 0.07, 0.14) * shimmer * fres;
    // dark center, bright edges (more impactful look)
    col *= mix(0.55, 1.4, fres);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ---------- core knot ---------- */
function CoreKnot({ group }: { group: React.MutableRefObject<THREE.Group | null> }) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 1.0 },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color("#a78bfa") },
      uColorB: { value: new THREE.Color("#22d3ee") },
      uColorC: { value: new THREE.Color("#fb923c") },
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x += delta * 0.08;
    }
    uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, 0, 0.05);
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={() => (uniforms.uHover.value = 1)}
      onPointerOut={() => (uniforms.uHover.value = 0)}
    >
      <torusKnotGeometry args={[0.78, 0.26, 240, 36, 2, 3]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

/* ---------- wireframe outer shell ---------- */
function WireShell() {
  const ref = useRef<THREE.LineSegments>(null!);
  const geom = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.45, 1);
    return new THREE.EdgesGeometry(ico);
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.12;
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.z += delta * 0.03;
  });
  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial color="#a78bfa" transparent opacity={0.35} />
    </lineSegments>
  );
}

/* ---------- inner pulsing core ---------- */
function InnerCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = 0.25 + Math.sin(t * 2) * 0.04;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </mesh>
  );
}

/* ---------- orbital rings (3 thin tori) ---------- */
function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.5;
    if (r2.current) {
      r2.current.rotation.x += delta * 0.4;
      r2.current.rotation.y += delta * 0.2;
    }
    if (r3.current) r3.current.rotation.y -= delta * 0.55;
  });
  return (
    <group>
      <mesh ref={r1} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.7, 0.006, 8, 200]} />
        <meshBasicMaterial color="#a78bfa" toneMapped={false} transparent opacity={0.55} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.85, 0.005, 8, 200]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} transparent opacity={0.45} />
      </mesh>
      <mesh ref={r3} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[2.0, 0.005, 8, 200]} />
        <meshBasicMaterial color="#fb923c" toneMapped={false} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* ---------- orbiting dots representing "tech satellites" ---------- */
function OrbitDots() {
  const ref = useRef<THREE.Group>(null!);
  const dots = useMemo(
    () => [
      { r: 1.7, speed: 0.7, phase: 0, color: "#a78bfa" },
      { r: 1.85, speed: -0.5, phase: 1.2, color: "#22d3ee" },
      { r: 2.0, speed: 0.4, phase: 2.4, color: "#fb923c" },
      { r: 1.7, speed: -0.6, phase: 3.4, color: "#ffffff" },
      { r: 1.85, speed: 0.55, phase: 4.7, color: "#a78bfa" },
    ],
    []
  );
  return (
    <group ref={ref}>
      {dots.map((d, i) => (
        <Dot key={i} {...d} />
      ))}
    </group>
  );
}

function Dot({ r, speed, phase, color }: { r: number; speed: number; phase: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const tilt = useMemo(
    () => new THREE.Euler((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4),
    []
  );
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    const x = Math.cos(t) * r;
    const z = Math.sin(t) * r;
    ref.current.position.set(x, 0, z);
    ref.current.rotation.copy(tilt);
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- main scene root ---------- */
export function HeroOrb() {
  const group = useRef<THREE.Group | null>(null);
  const { viewport, pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;

    // Scroll-linked transform
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const heroH = typeof window !== "undefined" ? window.innerHeight : 800;
    const p = Math.min(1, Math.max(0, scrollY / heroH));

    // Hide on mobile (viewport width < ~5 world units corresponds to ~640px screen)
    const isMobile = viewport.width < 6;

    const baseScale = isMobile ? 0 : 1 - p * 0.7;
    group.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.08);

    const rightX = isMobile ? 0 : viewport.width * 0.3;
    const x = rightX + p * viewport.width * 0.2;
    const y = 0.2 + p * viewport.height * 0.55;
    group.current.position.x += (x - group.current.position.x) * 0.08;
    group.current.position.y += (y - group.current.position.y) * 0.08;

    // gentle full-group tilt from pointer (parallax)
    const px = pointer.x * 0.3;
    const py = pointer.y * 0.3;
    group.current.rotation.y += (px - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-py - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <CoreKnot group={group} />
      <WireShell />
      <InnerCore />
      <OrbitalRings />
      <OrbitDots />
    </group>
  );
}
