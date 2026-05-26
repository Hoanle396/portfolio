"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { expertise } from "@/lib/data";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";

function TiltCard({
  num,
  title,
  desc,
  tags,
  accent,
}: (typeof expertise)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });
  const t = useTransform(
    [srx, sry],
    ([x, y]) => `perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`
  );

  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 8);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  const gloss = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(260px circle at ${x}% ${y}%, ${accent}33, transparent 60%)`
  );

  return (
    <Reveal>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ transform: t, transformStyle: "preserve-3d" }}
        className="card-surface group relative overflow-hidden rounded-3xl p-8 transition-colors hover:border-white/20"
        data-cursor="hover"
      >
        <motion.div
          aria-hidden
          style={{ background: gloss }}
          className="pointer-events-none absolute inset-0"
        />
        <div className="relative flex items-start justify-between">
          <span className="font-mono text-[13px] text-zinc-500">{num}</span>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 18px ${accent}` }}
          />
        </div>
        <h3 className="relative mt-8 font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-[34px]">
          {title}
        </h3>
        <p className="relative mt-3 text-[15px] leading-relaxed text-zinc-400">
          {desc}
        </p>
        <div className="relative mt-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[12px] text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Expertise() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-12">
      <SectionHeader
        num="01"
        eyebrow="WHAT I DO"
        title="Areas of expertise."
        subtitle="What I bring to the table."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {expertise.map((e) => (
          <TiltCard key={e.num} {...e} />
        ))}
      </div>
    </section>
  );
}
