'use client';
import Link from 'next/link';
import { SocialIcons } from '../components/icons/social';
import dynamic from 'next/dynamic';
const Hero3D = dynamic(() => import('./(components)/hero-3d').then((m) => m.Hero3D), {
  ssr: false,
});
import { Card, FadeIn, SectionTitle } from '../components/ui';
import { siteConfig } from '../config/site';
import { education } from '../data/education';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import {
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  GraduationCap,
  Code2,
  Server,
  Layout,
  Cloud,
  Database,
  TestTube,
  Terminal,
  Zap,
  Globe,
  Shield,
  Briefcase,
  CalendarDays,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
  animate,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-5xl px-6">
      <Hero />
      <WhatIDo />
      <Projects />
      <Experience />
      <TechStack />
      <Education />
      <Contact />
    </main>
  );
}

/* ═══════════════════════════════════════════
   COUNT-UP STAT
   ═══════════════════════════════════════════ */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.8,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════ */
const ROLES = ['Software Engineer', 'Blockchain Dev', 'Full-Stack Dev', 'Web3 Builder'];

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-amber-200 bg-clip-text text-transparent">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block ml-0.5 w-[3px] h-[0.85em] bg-brand-400 rounded-sm align-middle"
        style={{ display: 'inline-block' }}
      />
    </span>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <div className="relative w-full h-auto">
      {/* Decorative floating orbs */}
      <motion.div
        animate={{ y: [-12, 12, -12], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[-60px] top-[30%] h-48 w-48 rounded-full bg-brand-500/15 blur-3xl"
      />
      <motion.div
        animate={{ y: [10, -10, 10], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute left-[20%] top-[60%] h-32 w-32 rounded-full bg-brand-400/10 blur-3xl"
      />

      <section className="relative z-10 flex min-h-[88vh] flex-col justify-center py-32">
        <FadeIn>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <motion.div
              animate={{ boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 12px rgba(52,211,153,0.3)', '0 0 0px rgba(52,211,153,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new opportunities
            </motion.div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-3.5 py-1.5 text-xs font-medium text-zinc-500">
              <MapPin size={11} className="text-zinc-600" />
              Vietnam
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mb-2 text-sm font-medium uppercase tracking-widest text-zinc-600">
            Hi, I&apos;m
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="block bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
            >
              Hoan Le
            </motion.span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1 min-h-[1.1em]">
              <Typewriter />
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-[480px] text-base leading-relaxed text-zinc-400 md:text-lg">
            Full-stack developer building{' '}
            <span className="font-medium text-zinc-200">scalable web apps</span> and{' '}
            <span className="font-medium text-zinc-200">blockchain products</span> with modern tech
            stacks. I care about clean code, great UX, and shipping fast.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`mailto:${siteConfig.links.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.3)] transition hover:bg-brand-400 hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                Get in touch
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={siteConfig.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/40 px-7 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition hover:border-zinc-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                Resume <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-700">Socials</span>
            <div className="h-px w-6 bg-zinc-800" />
            <div className="flex items-center gap-2">
              {[
                { href: siteConfig.links.github, icon: <SocialIcons.Github size={17} />, label: 'GitHub' },
                { href: siteConfig.links.npm, icon: <SocialIcons.PackageOpen size={17} />, label: 'NPM' },
                { href: `mailto:${siteConfig.links.email}`, icon: <SocialIcons.Mail size={17} />, label: 'Email' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ y: -2, scale: 1.1 }}
                >
                  <Link
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-500 transition hover:border-brand-500/30 hover:bg-brand-500/5 hover:text-brand-400"
                  >
                    {s.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Stats row — count-up on enter */}
        <FadeIn delay={0.25}>
          <div className="mt-14 flex flex-wrap gap-8 border-t border-zinc-800/60 pt-8">
            {[
              { to: 3, suffix: '+', label: 'Years experience' },
              { to: 10, suffix: '+', label: 'Projects shipped' },
              { to: 5, suffix: '+', label: 'Tech stacks' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-extrabold text-white tabular-nums">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </span>
                <span className="text-xs text-zinc-600 mt-0.5">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>
      <Hero3D />
    </div>
  );
}

/* ═══════════════════════════════════════════
   WHAT I DO
   ═══════════════════════════════════════════ */
const services = [
  {
    icon: Globe,
    label: 'Web Development',
    desc: 'Full-stack apps with React, Next.js, NestJS & Go. Performant, accessible, production-ready.',
    tags: ['React', 'Next.js', 'NestJS', 'Go'],
    color: '#60a5fa',        // blue-400
    glow: 'rgba(96,165,250,0.15)',
    border: 'rgba(96,165,250,0.25)',
    bg: 'rgba(96,165,250,0.06)',
    num: '01',
  },
  {
    icon: Shield,
    label: 'Blockchain / Web3',
    desc: 'Smart contracts, DeFi protocols & NFT platforms. Gas-optimised, auditable Solidity code.',
    tags: ['Solidity', 'Hardhat', 'ethers.js', 'DeFi'],
    color: '#c084fc',        // purple-400
    glow: 'rgba(192,132,252,0.15)',
    border: 'rgba(192,132,252,0.25)',
    bg: 'rgba(192,132,252,0.06)',
    num: '02',
  },
  {
    icon: Terminal,
    label: 'Backend Systems',
    desc: 'Scalable REST & gRPC APIs, microservices, PostgreSQL, Redis, and message queues.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'gRPC'],
    color: '#34d399',        // emerald-400
    glow: 'rgba(52,211,153,0.15)',
    border: 'rgba(52,211,153,0.25)',
    bg: 'rgba(52,211,153,0.06)',
    num: '03',
  },
  {
    icon: Zap,
    label: 'DevOps & Cloud',
    desc: 'Kubernetes, Docker, CI/CD pipelines & AWS infrastructure. Zero-downtime deployments.',
    tags: ['Kubernetes', 'Docker', 'AWS', 'CI/CD'],
    color: '#fb923c',        // orange-400
    glow: 'rgba(251,146,60,0.15)',
    border: 'rgba(251,146,60,0.25)',
    bg: 'rgba(251,146,60,0.06)',
    num: '04',
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-80, 80], [6, -6]);
  const rotateY = useTransform(springX, [-80, 80], [-6, 6]);

  // Spotlight position as motion values — computed at hook level, not inside JSX
  const cx = useTransform(springX, (v) => `calc(50% + ${v}px)`);
  const cy = useTransform(springY, (v) => `calc(50% + ${v}px)`);
  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${cx} ${cy}, ${s.glow}, transparent 70%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const Icon = s.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 }}
      style={{ perspective: 800 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="group relative h-full cursor-default overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6"
      >
        {/* Spotlight glow that follows mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />

        {/* Animated border glow on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${s.border}` }}
        />

        {/* Number badge */}
        <span
          className="absolute right-5 top-5 font-mono text-[11px] font-bold tabular-nums"
          style={{ color: s.color, opacity: 0.4 }}
        >
          {s.num}
        </span>

        {/* Icon */}
        <motion.div
          className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: s.bg }}
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {/* Icon inner glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-md opacity-60"
            style={{ background: s.glow }}
          />
          <Icon size={22} className="relative" style={{ color: s.color }} />
        </motion.div>

        {/* Text */}
        <h3 className="mb-2 text-base font-bold text-white">{s.label}</h3>
        <p className="mb-5 text-sm leading-relaxed text-zinc-500">{s.desc}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {s.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + ti * 0.05 + 0.2 }}
              className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
              style={{
                background: s.bg,
                color: s.color,
                border: `1px solid ${s.border}`,
                opacity: 0.85,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function WhatIDo() {
  return (
    <section className="py-24">
      <SectionTitle index={1} sub="Areas of expertise and what I bring to the table">
        What I Do
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <ServiceCard key={s.label} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS — Bento grid
   ═══════════════════════════════════════════ */
function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24">
      <SectionTitle index={2} sub="A selection of things I've built and shipped">
        Projects
      </SectionTitle>

      {/* Featured — full width hero cards */}
      <div className="grid gap-5 md:grid-cols-2 mb-5">
        {featured.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.06}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="h-full">
            <Card className="relative h-full p-7 border-brand-500/10 hover:border-brand-500/25 bg-gradient-to-br from-brand-500/5 to-transparent">
              {/* Glow effect */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-500/8 blur-3xl" />

              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-400 ring-1 ring-brand-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Featured
              </span>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
              </div>
              {p.href && (
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition hover:text-brand-300 hover:gap-2"
                >
                  View project <ExternalLink size={13} />
                </Link>
              )}
            </Card>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      {/* Others — compact 3-col */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.04}>
            <Card className="group h-full p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-sm leading-snug pr-2">{p.title}</h3>
                {p.href && (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition hover:border-zinc-700 hover:text-brand-400"
                  >
                    <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 mb-4">{p.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <TechBadge key={t} small>{t}</TechBadge>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EXPERIENCE — Clean timeline
   ═══════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="py-24">
      <SectionTitle index={3} sub="My professional journey so far">Experience</SectionTitle>

      <div className="relative ml-3 pl-8">
        {/* Animated line that draws downward on scroll */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ originY: 0 }}
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-brand-500/60 via-zinc-700 to-transparent"
        />

        {experience.map((job, i) => (
          <FadeIn key={job.company} delay={i * 0.05}>
            <div className="relative pb-12 last:pb-0">
              {/* Dot on line */}
              <div className="absolute -left-[41px] top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 shadow-[0_0_0_4px_#09090b]">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              </div>

              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase size={14} className="text-brand-400 flex-shrink-0" />
                    {job.role}
                  </h3>
                  <p className="text-sm font-medium text-brand-400 mt-0.5 ml-5">{job.company}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  <CalendarDays size={10} />
                  {job.period}
                </span>
              </div>

              <ul className="space-y-2.5 ml-5">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-zinc-700" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TECH STACK — Horizontal rows
   ═══════════════════════════════════════════ */
const skillIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 size={15} />,
  Backend: <Server size={15} />,
  Frontend: <Layout size={15} />,
  DevOps: <Cloud size={15} />,
  Databases: <Database size={15} />,
  Testing: <TestTube size={15} />,
};

function TechStack() {
  return (
    <section id="skills" className="py-24">
      <SectionTitle index={4} sub="Technologies and tools I work with daily">
        Tech Stack
      </SectionTitle>

      <div className="space-y-3">
        {skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.04}>
            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-5 transition hover:bg-zinc-900/40 sm:flex-row sm:items-center">
              {/* Category label */}
              <div className="flex items-center gap-2.5 sm:w-36 sm:flex-shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/10">
                  {skillIcons[group.category] || <Code2 size={15} />}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  {group.category}
                </span>
              </div>

              {/* Divider */}
              <div className="hidden h-8 w-px bg-zinc-800 sm:block" />

              {/* Skill tags — staggered pop-in */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s, si) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.75 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.05 + si * 0.04,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="cursor-default rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-brand-500/25 hover:bg-brand-500/5 hover:text-brand-300"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EDUCATION
   ═══════════════════════════════════════════ */
function Education() {
  return (
    <section id="education" className="py-24">
      <SectionTitle index={5}>Education</SectionTitle>
      {education.map((item) => (
        <FadeIn key={item.school}>
          <div className="flex items-start gap-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6 transition hover:bg-zinc-900/40">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/15">
              <GraduationCap size={21} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-base">{item.degree}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                <MapPin size={11} className="text-zinc-600" />
                {item.school}
              </p>
              {item.details && (
                <ul className="mt-3 space-y-1.5">
                  {item.details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-zinc-400">
                      <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-zinc-700" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </FadeIn>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT CTA
   ═══════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-20 text-center">
          {/* Layered glows */}
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-brand-400/8 blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 h-48 w-48 rounded-full bg-brand-600/8 blur-3xl" />

          {/* Grid overlay */}
          <div className="bg-grid absolute inset-0" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-xs font-medium text-brand-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Open to opportunities
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              Let&apos;s build something
              <br />
              <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-amber-200 bg-clip-text text-transparent">
                together
              </span>
            </h2>
            <p className="relative mt-4 max-w-sm mx-auto text-sm text-zinc-500 leading-relaxed">
              Open to full-time roles, contracting, or open-source collaboration. Let&apos;s talk.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={`mailto:${siteConfig.links.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.3)] transition hover:bg-brand-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
              >
                Say hello
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
              >
                GitHub <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */
function TechBadge({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span
      className={`rounded-md border border-brand-500/10 bg-brand-500/5 font-medium text-brand-300/80 transition hover:border-brand-500/20 hover:text-brand-300 ${
        small ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
      } uppercase tracking-wide`}
    >
      {children}
    </span>
  );
}
