"use client";

import { education } from "@/lib/data";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";

export function Education() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
      <SectionHeader num="05" eyebrow="EDUCATION" title="Where it started." />
      <Reveal>
        <div className="card-surface flex flex-col items-start gap-8 rounded-3xl p-10 md:flex-row md:items-center">
          <div className="shrink-0 drop-shadow-[0_0_28px_rgba(139,92,246,0.6)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="edu-stroke" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="edu-fill" x1="2" y1="3" x2="22" y2="14" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              {/* cap top */}
              <path d="M12 3L2 8.5l10 5.5 10-5.5L12 3z" fill="url(#edu-fill)" stroke="url(#edu-stroke)" strokeWidth="1.3" strokeLinejoin="round" />
              {/* pole */}
              <path d="M2 8.5v5" stroke="url(#edu-stroke)" strokeWidth="1.3" strokeLinecap="round" />
              {/* gown body */}
              <path d="M6.5 11.8v4.7C6.5 18.5 9 20 12 20s5.5-1.5 5.5-3.5v-4.7" stroke="url(#edu-stroke)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              {/* tassel */}
              <line x1="2" y1="13.5" x2="2" y2="17" stroke="url(#edu-stroke)" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="2" cy="17.8" r="0.85" fill="#fb923c" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white">
              {education.degree}
            </h3>
            <p className="mt-2 font-medium text-violet-300">{education.school}</p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Coursework
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[12px] text-zinc-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
