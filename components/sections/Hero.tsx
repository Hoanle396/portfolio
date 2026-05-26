"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { profile } from "@/lib/data";
import { MagneticButton } from "../motion/MagneticButton";
import { RevealText } from "../motion/Reveal";

function StatCounter({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const id = setTimeout(() => mv.set(value), delay * 1000);
      return () => clearTimeout(id);
    }
  }, [inView, mv, value, delay]);

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={ref}
        className="text-aurora font-display text-5xl font-semibold tracking-[-0.03em] md:text-6xl"
      >
        <motion.span>{display}</motion.span>
        {suffix}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center pt-32 pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur"
            >
              <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[12px] text-zinc-300">
                {profile.status} — {profile.location}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-8 font-display font-semibold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,11vw,148px)]">
              <span className="block text-white">
                <RevealText text="Hi, I'm" staggerChildren={0.06} />
              </span>
              <span className="text-aurora block">
                <RevealText text={profile.name + "."} staggerChildren={0.07} delay={0.15} />
              </span>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl"
            >
              {profile.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.45 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href={`mailto:${profile.email}`} variant="primary">
                Get in touch
                <span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton href={profile.resume} variant="ghost">
                Resume
              </MagneticButton>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="ml-2 font-mono text-[13px] text-zinc-500 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                GitHub ↗
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="mt-16 grid max-w-md grid-cols-3 gap-8"
            >
              {profile.stats.map((s, i) => (
                <StatCounter key={s.label} {...s} delay={1.8 + i * 0.1} />
              ))}
            </motion.div>
          </div>

          {/* Right spacer for the 3D orb */}
          <div className="hidden lg:block">
            <div className="relative h-[560px] w-full">
              <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4, duration: 1 }}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600"
                >
                  // distorted icosahedron · aurora shader
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
