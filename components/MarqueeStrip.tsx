"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

const WORDS = [
  "FULL-STACK",
  "BLOCKCHAIN",
  "WEB3",
  "DEVOPS",
  "REACT",
  "NEXT.JS",
  "SOLIDITY",
  "GO",
  "KUBERNETES",
];

export function MarqueeStrip() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothV = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velFactor = useTransform(smoothV, [0, 1000], [0, 4], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * 3 * (delta / 1000);
    if (velFactor.get() < 0) dir.current = -1;
    else if (velFactor.get() > 0) dir.current = 1;
    move += dir.current * move * velFactor.get();
    baseX.set(baseX.get() + move);
  });

  const row = [...WORDS, ...WORDS, ...WORDS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-7">
      <motion.div style={{ x }} className="flex w-max items-center gap-8">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-4xl font-semibold tracking-tight text-white/30 md:text-6xl">
              {w}
            </span>
            <span className="text-aurora text-2xl md:text-4xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
