import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import { forwardRef } from 'react';

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay }}
  >
    {children}
  </motion.div>
);

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm transition hover:border-brand-500/20 card-hover',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const SectionTitle = ({
  children,
  sub,
  index,
}: {
  children: React.ReactNode;
  sub?: string;
  index?: number;
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-3">
      {index !== undefined && (
        <span className="text-[11px] font-bold tabular-nums text-brand-500/60 font-mono">
          0{index}
        </span>
      )}
      <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-brand-500/40 to-transparent" />
    </div>
    <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
      {children}
    </h2>
    {sub && <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{sub}</p>}
  </div>
);
