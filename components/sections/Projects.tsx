"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type MouseEvent } from "react";
import { featuredProjects, standardProjects } from "@/lib/data";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";

/* ---------------- animated cover ---------------- */
function CoverArt({
  hue,
  name,
  tags,
  y,
}: {
  hue: string;
  name: string;
  tags: string[];
  y: MotionValue<string>;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* animated mesh gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, ${hue}, #07070a 40%, ${hue} 70%, #07070a)`,
          opacity: 0.5,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -inset-1/4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
        style={{
          background: `radial-gradient(circle at 35% 35%, ${hue}cc, transparent 55%), radial-gradient(circle at 70% 65%, #ffffff55, transparent 45%)`,
          filter: "blur(20px)",
        }}
      />
      {/* grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* ghost letter parallax */}
      <motion.span
        style={{ y }}
        className="absolute -bottom-10 -left-2 select-none font-display text-[220px] font-bold leading-none text-white/10"
      >
        {name.charAt(0)}
      </motion.span>

      {/* floating glass tech chips */}
      <div className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-2.5 p-10">
        {tags.slice(0, 5).map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              y: [16, i % 2 ? -7 : 7, 0],
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15 + i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              y: { delay: 0.15 + i * 0.08, duration: 3.4 + i * 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            }}
            className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 font-mono text-[12px] text-white shadow-lg backdrop-blur-md"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- featured card with 3D tilt ---------------- */
function FeaturedCard({ p, i }: { p: (typeof featuredProjects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const transform = useTransform(
    [srx, sry],
    ([a, b]) => `perspective(1200px) rotateX(${a}deg) rotateY(${b}deg)`
  );

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const hue = i === 0 ? "#7c5cff" : "#fb923c";
  const reverse = i % 2 === 1;

  return (
    <Reveal>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transform, transformStyle: "preserve-3d" }}
        className="group relative grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] lg:grid-cols-2"
        data-cursor="project"
      >
        {/* glow border on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${hue}, 0 30px 90px -30px ${hue}` }}
        />

        <div className={`relative aspect-[16/11] lg:aspect-auto ${reverse ? "lg:order-2" : ""}`}>
          <CoverArt hue={hue} name={p.name} tags={p.tags} y={ghostY} />
        </div>

        <div className="flex flex-col justify-between gap-6 p-9 lg:p-14">
          <div>
            <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-zinc-500">
              <span style={{ color: hue }}>0{i + 1}</span>
              <span className="h-px w-8 bg-white/15" />
              <span>Featured</span>
            </div>
            <h3 className="mt-4 font-display text-[40px] font-semibold leading-[1] tracking-[-0.03em] text-white md:text-[52px]">
              {p.name}
            </h3>
            <p className="mt-3 font-mono text-[13px] text-zinc-400">{p.tagline}</p>
            <p className="mt-6 text-[17px] leading-relaxed text-zinc-300">{p.desc}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[12px] text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <a
            href={p.href}
            className="group/cta inline-flex items-center gap-3 self-start"
          >
            <span className="font-semibold text-white">View project</span>
            <span
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover/cta:translate-x-1"
              style={{ background: `${hue}22`, borderColor: `${hue}66` }}
            >
              <span aria-hidden style={{ color: hue }}>→</span>
            </span>
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}

/* ---------------- standard card ---------------- */
function StandardCard({ p, i }: { p: (typeof standardProjects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 16 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16 });
  const transform = useTransform(
    [srx, sry],
    ([a, b]) => `perspective(900px) rotateX(${a}deg) rotateY(${b}deg)`
  );
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal delay={(i % 3) * 0.08}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transform, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
        data-cursor="project"
      >
        <div
          className="relative aspect-[16/9] overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${p.color} 0%, #0a0a0d 92%)` }}
        >
          <motion.div
            aria-hidden
            className="absolute -inset-1/3"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18 + i * 2, ease: "linear" }}
            style={{
              background: `radial-gradient(circle at 40% 40%, ${p.color}aa, transparent 50%)`,
              filter: "blur(14px)",
            }}
          />
          {/* grid lines */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <span className="absolute -bottom-4 left-1 select-none font-display text-[120px] font-bold leading-none text-white/15">
            {p.name.charAt(0)}
          </span>
          <span
            className="absolute right-4 top-4 rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur"
          >
            0{i + 3}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6" style={{ transform: "translateZ(30px)" }}>
          <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-violet-300">
            {p.name}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">{p.desc}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-12"
    >
      <SectionHeader
        num="02"
        eyebrow="PROJECTS"
        title="Selected work."
        subtitle="A selection of things I've built and shipped."
      />

      <div className="flex flex-col gap-7">
        {featuredProjects.map((p, i) => (
          <FeaturedCard key={p.name} p={p} i={i} />
        ))}
      </div>

      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {standardProjects.map((p, i) => (
          <StandardCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
