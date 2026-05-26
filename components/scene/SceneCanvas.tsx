"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useState, Suspense } from "react";
import { HeroOrb } from "./HeroOrb";
import { Particles } from "./Particles";

export function SceneCanvas() {
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReady(true);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(110% 70% at 50% 0%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(70% 50% at 90% 20%, rgba(34,211,238,0.08), transparent 60%), radial-gradient(60% 60% at 10% 80%, rgba(251,146,60,0.06), transparent 60%), #07070a",
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop={reduce ? "never" : "always"}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 5, 5]} intensity={2.4} color="#a78bfa" />
        <pointLight position={[-5, -3, 4]} intensity={1.4} color="#22d3ee" />
        <pointLight position={[0, -5, 3]} intensity={1.1} color="#fb923c" />

        <Suspense fallback={null}>
          <HeroOrb />
          <Particles count={reduce ? 0 : 180} />
        </Suspense>

        {!reduce && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.25}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0006, 0.0009]}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
