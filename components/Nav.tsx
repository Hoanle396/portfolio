"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "./motion/MagneticButton";
import { nav, profile } from "@/lib/data";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(15,15,20,0)", "rgba(15,15,20,0.55)"]);
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(20px)"]);
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  return (
    <motion.nav
      className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.div
        style={{ background: bg, backdropFilter: blur, borderColor: border }}
        className="flex items-center gap-7 rounded-full border px-6 py-2.5"
      >
        <a
          href="#home"
          className="font-semibold tracking-tight text-white"
          aria-label={profile.name}
        >
          {profile.initials}
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </div>
        <MagneticButton
          href={`mailto:${profile.email}`}
          variant="aurora"
          className="!px-5 !py-2 !text-[13px]"
          strength={0.25}
        >
          Hire me
        </MagneticButton>
      </motion.div>
    </motion.nav>
  );
}
