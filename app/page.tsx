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
} from 'lucide-react';

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
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <div className="relative w-full h-auto">
      <section className="flex min-h-[85vh] flex-col justify-center py-32">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium text-zinc-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Software Engineer
            <br />
            <span className="text-brand-500">&amp; Blockchain Dev</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg">
            I&apos;m <span className="text-white font-medium">Hoan Le</span> — I build scalable
            web applications and blockchain products with modern tech stacks.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
            <Link
              href={siteConfig.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-7 py-3 text-sm font-semibold text-zinc-300 transition hover:border-brand-500/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              Resume <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex items-center gap-5">
            <span className="text-[11px] uppercase tracking-widest text-zinc-600">Find me on</span>
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-4">
              {[
                { href: siteConfig.links.github, icon: <SocialIcons.Github size={18} />, label: 'GitHub' },
                { href: siteConfig.links.npm, icon: <SocialIcons.PackageOpen size={18} />, label: 'NPM' },
                { href: `mailto:${siteConfig.links.email}`, icon: <SocialIcons.Mail size={18} />, label: 'Email' },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-500 transition hover:border-brand-500/30 hover:text-brand-400"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
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
function WhatIDo() {
  const services = [
    {
      icon: <Globe size={22} />,
      title: 'Web Development',
      desc: 'Full-stack applications with React, Next.js, NestJS and Go',
    },
    {
      icon: <Shield size={22} />,
      title: 'Blockchain / Web3',
      desc: 'Smart contracts, DeFi protocols, NFT platforms with Solidity',
    },
    {
      icon: <Terminal size={22} />,
      title: 'Backend Systems',
      desc: 'Scalable APIs, microservices, databases and message queues',
    },
    {
      icon: <Zap size={22} />,
      title: 'DevOps & Cloud',
      desc: 'Kubernetes, Docker, CI/CD pipelines and AWS infrastructure',
    },
  ];

  return (
    <section className="py-24">
      <SectionTitle sub="Areas of expertise and what I bring to the table">
        What I Do
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.06}>
            <div className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition hover:border-brand-500/20">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                {s.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{s.desc}</p>
              </div>
            </div>
          </FadeIn>
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
      <SectionTitle sub="A selection of things I've built and shipped">
        Projects
      </SectionTitle>

      {/* Featured — full width hero cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        {featured.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.06}>
            <Card className="relative h-full p-7 border-brand-500/15 hover:border-brand-500/30">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Featured
              </span>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>
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
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition hover:text-brand-300"
                >
                  View project <ExternalLink size={13} />
                </Link>
              )}
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Others — compact 3-col */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.04}>
            <Card className="h-full p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">{p.title}</h3>
                {p.href && (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-zinc-600 transition hover:text-brand-400"
                  >
                    <ArrowUpRight size={14} />
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
      <SectionTitle sub="My professional journey so far">Experience</SectionTitle>

      <div className="relative ml-4 border-l border-zinc-800 pl-8">
        {experience.map((job, i) => (
          <FadeIn key={job.company} delay={i * 0.05}>
            <div className="relative pb-12 last:pb-0">
              {/* Dot on line */}
              <div className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-800 bg-[#09090b]">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
              </div>

              {/* Period badge */}
              <span className="mb-3 inline-flex rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                {job.period}
              </span>

              <h3 className="text-base font-bold text-white">{job.role}</h3>
              <p className="text-sm font-medium text-brand-400">{job.company}</p>

              <ul className="mt-3 space-y-2">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
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
  Languages: <Code2 size={16} />,
  Backend: <Server size={16} />,
  Frontend: <Layout size={16} />,
  DevOps: <Cloud size={16} />,
  Databases: <Database size={16} />,
  Testing: <TestTube size={16} />,
};

function TechStack() {
  return (
    <section id="skills" className="py-24">
      <SectionTitle sub="Technologies and tools I work with daily">
        Tech Stack
      </SectionTitle>

      <div className="space-y-4">
        {skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.04}>
            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5 sm:flex-row sm:items-center">
              {/* Category label */}
              <div className="flex items-center gap-2.5 sm:w-36 sm:flex-shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                  {skillIcons[group.category] || <Code2 size={16} />}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {group.category}
                </span>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-brand-500/30 hover:text-brand-400"
                  >
                    {s}
                  </span>
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
      <SectionTitle>Education</SectionTitle>
      {education.map((item) => (
        <FadeIn key={item.school}>
          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white">{item.degree}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                <MapPin size={12} /> {item.school}
              </p>
              {item.details && (
                <ul className="mt-3 space-y-1.5">
                  {item.details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-zinc-400">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
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
    <section id="contact" className="py-24">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 px-8 py-20 text-center">
          {/* Decorative purple glow */}
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

          <h2 className="relative text-3xl font-bold tracking-tight text-white md:text-4xl">
            Let&apos;s build something
            <br />
            <span className="text-brand-500">together</span>
          </h2>
          <p className="relative mt-4 text-sm text-zinc-400">
            Open for full-time, contracting, or open source collaboration.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Say hello <ArrowRight size={16} />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 transition hover:border-brand-500/40 hover:text-white"
            >
              GitHub <ArrowUpRight size={14} />
            </Link>
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
      className={`rounded-md border border-brand-500/10 bg-brand-500/5 font-medium text-brand-300 ${
        small ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
      } uppercase tracking-wide`}
    >
      {children}
    </span>
  );
}
