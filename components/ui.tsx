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
}: {
  children: React.ReactNode;
  sub?: string;
}) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
      {children}
    </h2>
    {sub && <p className="mt-2 text-sm text-zinc-500">{sub}</p>}
  </div>
);
