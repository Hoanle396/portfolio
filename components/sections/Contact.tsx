"use client";

import { profile } from "@/lib/data";
import { MagneticButton } from "../motion/MagneticButton";
import { Reveal, RevealText } from "../motion/Reveal";
import { PortalRing } from "../scene/PortalRing";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-40 text-center lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[720px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.45), rgba(34,211,238,0.22) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* 3D network globe behind the headline */}
      <PortalRing className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-60" />

      <Reveal>
        <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-zinc-400">
          06 — CONTACT
        </span>
      </Reveal>

      <h2 className="mt-6 flex max-w-5xl flex-col gap-1 font-display text-[clamp(44px,8vw,112px)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
        <span className="block">
          <RevealText text="Let's build" />
        </span>
        <span className="text-aurora-2 block pb-[0.12em]">
          <RevealText text="something together." delay={0.18} />
        </span>
      </h2>

      <Reveal delay={0.3}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-300">
          Open to full-time roles, contracting, or open-source collaboration. Let's talk.
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={`mailto:${profile.email}`} variant="primary">
            Say hello
            <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href={profile.github} variant="ghost">
            GitHub
            <span aria-hidden>↗</span>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
