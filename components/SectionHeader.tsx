"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, RevealText } from "./motion/Reveal";

export function SectionHeader({
  num,
  eyebrow,
  title,
  subtitle,
}: {
  num: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <header ref={ref} className="mb-20 max-w-4xl">
      <Reveal>
        <div className="mb-5 flex items-center gap-4 font-mono text-[13px]">
          <span className="text-aurora font-semibold">{num}</span>
          <span className="h-px w-14 bg-white/15" />
          <span className="uppercase tracking-[0.18em] text-zinc-400">{eyebrow}</span>
        </div>
      </Reveal>
      <motion.h2
        style={{ x, opacity }}
        className="font-display text-[clamp(40px,7vw,84px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
      >
        <RevealText text={title} />
      </motion.h2>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {subtitle}
          </p>
        </Reveal>
      )}
    </header>
  );
}
