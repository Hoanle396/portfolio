import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import { forwardRef } from 'react';

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay }}
  >
    {children}
  </motion.div>
);

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-neutral-900/10 bg-neutral-900/5 p-5 backdrop-blur transition-colors hover:border-brand-500/40 dark:border-white/10 dark:bg-white/[0.02]',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight text-neutral-800 dark:text-white/90">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    <span className="gradient-text bg-clip-text text-transparent">{children}</span>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
  </h2>
);
