"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";
import { OrbitRings } from "../scene/OrbitRings";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const spineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-12"
    >
      <OrbitRings className="pointer-events-none absolute right-0 top-24 hidden h-[460px] w-[300px] opacity-70 xl:block" />
      <SectionHeader
        num="03"
        eyebrow="EXPERIENCE"
        title="My professional journey."
        subtitle="Roles, companies, and what I shipped."
      />

      <div
        ref={containerRef}
        className="relative md:grid md:grid-cols-[170px_1fr] md:gap-6"
      >
        {/* Spine */}
        <div className="pointer-events-none absolute left-[170px] top-0 hidden h-full w-px md:block">
          <div className="h-full w-px bg-white/10" />
          <motion.div
            style={{ height: spineH }}
            className="absolute left-0 top-0 w-px"
          >
            <div className="h-full w-px bg-gradient-to-b from-violet-400 via-cyan-400 to-orange-400" />
            <div className="absolute -left-1 h-full w-[3px] bg-gradient-to-b from-violet-400/40 via-cyan-400/30 to-orange-400/30 blur-md" />
          </motion.div>
        </div>

        {experience.map((r) => (
          <Row key={r.company} r={r} />
        ))}
      </div>
    </section>
  );
}

function Row({ r }: { r: (typeof experience)[number] }) {
  return (
    <div className="contents">
      {/* Dates */}
      <Reveal className="hidden pt-8 md:block">
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-zinc-500">
          {r.dates}
        </span>
      </Reveal>

      <Reveal className="relative">
        {/* Dot */}
        <span
          aria-hidden
          className="absolute -left-[34px] top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full md:block"
          style={{
            background: r.accent,
            boxShadow: `0 0 22px ${r.accent}`,
          }}
        />

        <motion.article
          whileHover={{ y: -2 }}
          className="card-surface relative mb-10 rounded-2xl p-8 transition-colors hover:border-white/20"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                {r.title}
              </h3>
              <p className="mt-1 font-medium" style={{ color: r.accent }}>
                {r.company}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 md:hidden">
                {r.dates}
              </p>
            </div>
            {r.current && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Current
              </span>
            )}
          </div>

          <ul className="mt-6 space-y-2.5">
            {r.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                className="flex gap-3 text-[14px] leading-relaxed text-zinc-300"
              >
                <span aria-hidden style={{ color: r.accent }} className="font-mono select-none">
                  ›
                </span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.article>
      </Reveal>
    </div>
  );
}
