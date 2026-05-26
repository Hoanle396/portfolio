"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";
import { CrystalCluster } from "../scene/CrystalCluster";

function MarqueeRow({
  items,
  color,
  reverse,
}: {
  items: string[];
  color: string;
  reverse?: boolean;
}) {
  const arr = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#07070a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#07070a] to-transparent" />
      <div
        className={`flex w-max gap-3 ${reverse ? "marquee-track-right" : "marquee-track-left"}`}
      >
        {arr.map((item, i) => (
          <span
            key={i}
            className="rounded-full border bg-white/[0.04] px-5 py-2.5 font-mono text-[13px] text-white"
            style={{ borderColor: `${color}55` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-12"
    >
      <CrystalCluster className="pointer-events-none absolute right-0 top-10 hidden h-[420px] w-[480px] opacity-90 lg:block" />
      <SectionHeader
        num="04"
        eyebrow="TECH STACK"
        title="Tools of the trade."
        subtitle="Technologies and tools I work with daily."
      />
      <div className="flex flex-col gap-4">
        {skills.map((cat, i) => (
          <Reveal key={cat.name}>
            <motion.div
              whileHover={{ y: -2 }}
              className="card-surface grid grid-cols-1 items-center gap-6 rounded-2xl p-6 md:grid-cols-[220px_1fr]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 18px ${cat.color}` }}
                />
                <h3 className="font-display text-lg font-semibold text-white">
                  {cat.name}
                </h3>
                <span className="font-mono text-[11px] text-zinc-500">
                  {cat.items.length.toString().padStart(2, "0")}
                </span>
              </div>
              <MarqueeRow items={cat.items} color={cat.color} reverse={i % 2 === 1} />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
