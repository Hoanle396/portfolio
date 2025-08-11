'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.2 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <motion.div
      className="scroll-progress-bar bg-gradient-to-r from-brand-500 via-indigo-500 to-fuchsia-500 origin-left"
      style={{ scaleX }}
    />
  );
}
