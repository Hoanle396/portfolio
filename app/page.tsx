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

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <div className="relative w-full h-auto">
      <section className="flex min-h-[70vh] flex-col justify-center gap-10 py-24">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-neutral-900/5 px-4 py-1 text-xs text-neutral-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Hoan Le</span> builds scalable web & blockchain
            products.
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="max-w-2xl text-lg text-neutral-600 dark:text-white/60">
            Full‑stack developer (2+ yrs) across Node.js / NestJS, Next.js, Go, Solidity &
            Kubernetes—shipping secure, performant applications.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex relative flex-wrap gap-4 z-[1000]">
            <GhostButton href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
              View CV
            </GhostButton>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-white/60">
              <SocialLink href={siteConfig.links.github} label="GitHub">
                <SocialIcons.Github size={18} />
              </SocialLink>
              <SocialLink href={siteConfig.links.npm} label="NPM">
                <SocialIcons.PackageOpen size={18} />
              </SocialLink>
              <SocialLink href={`mailto:${siteConfig.links.email}`} label="Email">
                <SocialIcons.Mail size={18} />
              </SocialLink>
            </div>
          </div>
        </FadeIn>
      </section>
      <Hero3D />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-20">
      <SectionTitle>About</SectionTitle>
      <div className="grid gap-10 md:grid-cols-2">
        <FadeIn>
          <p className="leading-relaxed text-neutral-600 dark:text-white/70">
            I&apos;m a software engineer passionate about creating delightful user experiences
            powered by maintainable, scalable architecture. I love working end-to-end: ideation,
            design collaboration, performance profiling, and shipping polished features.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid gap-4 text-sm text-neutral-500 dark:text-white/60">
            <p>Focus areas: Backend architecture, animations, performance, platform engineering.</p>
            <p>Values: Accessibility, craft, open source, knowledge sharing.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20">
      <SectionTitle>Selected Projects</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.05}>
            <Card className="h-full">
              <div className="flex h-full flex-col">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-semibold text-neutral-800 dark:text-white/90">{p.title}</h3>
                  {p.href && (
                    <Link
                      className="text-xs text-brand-400 hover:underline"
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </Link>
                  )}
                </div>
                <p className="mb-4 flex-1 text-sm text-neutral-500 dark:text-white/60">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-neutral-900/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-white/5 dark:text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
      <div className="mt-12">
        <PinnedRepos />
      </div>
    </section>
  );
}

function PinnedRepos() {
  return null; // temporarily disabled due to runtime issue
}

function Experience() {
  return (
    <section id="experience" className="py-20">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {experience.map((job, i) => (
          <FadeIn key={job.company} delay={i * 0.05}>
            <Card>
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-medium text-neutral-800 dark:text-white/90">
                    {job.role} · {job.company}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-neutral-400 dark:text-white/40">
                    {job.period}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-500 dark:text-white/60">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />{' '}
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20">
      <SectionTitle>Education</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item) => (
          <Card key={item.school} className="p-6">
            <h3 className="font-medium text-neutral-800 dark:text-white/90">{item.degree}</h3>
            <p className="text-xs uppercase tracking-wide text-neutral-400 dark:text-white/40">
              {item.school}
            </p>
            {item.details && (
              <ul className="mt-4 space-y-2 text-sm text-neutral-500 dark:text-white/60">
                {item.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.05}>
            <Card>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-white/70">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded bg-neutral-900/5 px-2 py-1 text-xs text-neutral-500 dark:bg-white/5 dark:text-white/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20">
      <SectionTitle>Get In Touch</SectionTitle>
      <FadeIn>
        <Card className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-white/90">
              Have an opportunity?
            </h3>
            <p className="max-w-xl text-sm text-neutral-500 dark:text-white/60">
              I&apos;m open to discussing new full-time roles, contracting, or collaboration for
              open source &amp; community initiatives.
            </p>
          </div>
          <PrimaryButton href={`mailto:${siteConfig.links.email}`}>Say Hello</PrimaryButton>
        </Card>
      </FadeIn>
    </section>
  );
}

function PrimaryButton({ href, children, ...rest }: any) {
  return (
    <Link
      href={href}
      {...rest}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-fuchsia-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-brand-500/20 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <span>{children}</span>
    </Link>
  );
}
function GhostButton({ href, children, ...rest }: any) {
  return (
    <Link
      href={href}
      {...rest}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <span>{children}</span>
    </Link>
  );
}
function SocialLink({ href, children, label }: any) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-white/50 transition hover:text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
