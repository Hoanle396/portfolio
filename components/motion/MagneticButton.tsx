"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import {
  type ReactNode,
  type MouseEvent,
  forwardRef,
  useRef,
} from "react";
import { clsx } from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  variant?: "primary" | "ghost" | "aurora";
  cursor?: string;
};

export const MagneticButton = forwardRef<HTMLAnchorElement, Props>(function MagneticButton(
  { children, className, href, onClick, strength = 0.35, variant = "primary", cursor },
  _ref
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const wrap = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[15px] transition-colors";
  const styles = {
    primary:
      "bg-violet-500 text-white shadow-[0_18px_60px_-14px_rgba(139,92,246,0.65)] hover:bg-violet-400",
    ghost:
      "border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]",
    aurora:
      "text-zinc-950 bg-[linear-gradient(110deg,#a78bfa,#22d3ee_55%,#fb923c)] hover:brightness-110 shadow-[0_18px_60px_-14px_rgba(139,92,246,0.55)]",
  }[variant];

  return (
    <motion.a
      ref={wrap}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={clsx(base, styles, className)}
      data-cursor={cursor ?? "hover"}
    >
      {children}
    </motion.a>
  );
});
