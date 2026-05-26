"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX: w, transformOrigin: "left" }}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee_50%,#ff7a59)]"
    />
  );
}
