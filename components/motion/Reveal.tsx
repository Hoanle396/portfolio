"use client";

import { motion, useInView, type Variants } from "motion/react";
import { ReactNode, useRef } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.96, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const MotionTag = motion[As as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealText({
  text,
  className,
  staggerChildren = 0.04,
  delay = 0,
}: {
  text: string;
  className?: string;
  staggerChildren?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = text.split(" ");
  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren, delayChildren: delay } },
        hidden: {},
      }}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            // breathing room so descenders (g, y, p) aren't clipped by the mask
            paddingBottom: "0.18em",
            marginBottom: "-0.18em",
            paddingRight: "0.04em",
            marginRight: "-0.04em",
          }}
        >
          <motion.span
            style={{ display: "inline-block", transformOrigin: "bottom" }}
            variants={{
              hidden: { y: "118%", rotateX: 55, opacity: 0 },
              visible: {
                y: "0%",
                rotateX: 0,
                opacity: 1,
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
