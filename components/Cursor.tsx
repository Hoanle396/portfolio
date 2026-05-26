"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 700, damping: 32 });
  const dotY = useSpring(y, { stiffness: 700, damping: 32 });

  const [variant, setVariant] = useState<"default" | "hover" | "project">("default");
  const [visible, setVisible] = useState(false);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    setVisible(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (!t) {
        setVariant("default");
        return;
      }
      const v = t.dataset.cursor;
      if (v === "project") setVariant("project");
      else setVariant("hover");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80"
          animate={{
            width: variant === "default" ? 32 : variant === "project" ? 84 : 56,
            height: variant === "default" ? 32 : variant === "project" ? 84 : 56,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          {variant === "project" && (
            <span
              ref={labelRef}
              className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-white"
            >
              View →
            </span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: variant === "default" ? 6 : 4,
            height: variant === "default" ? 6 : 4,
            opacity: variant === "project" ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
