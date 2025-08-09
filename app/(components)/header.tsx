'use client';
import Link from 'next/link';
import { useTheme } from '../../components/theme-provider';
import { motion } from 'framer-motion';

const nav = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' }
];

export function Header() {
  const { toggle, theme } = useTheme();
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="pointer-events-auto mt-4 flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-neutral-900/70 px-6 py-3 backdrop-blur-lg">
        <Link href="/" className="font-semibold tracking-tight text-white">HL</Link>
        <nav className="hidden gap-6 text-sm font-medium text-white/70 md:flex">
          {nav.map(i => <Link key={i.href} href={i.href} className="transition hover:text-white">{i.label}</Link>)}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={toggle} aria-label="Toggle theme" className="group relative h-8 w-8 overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs text-white/70 ring-offset-neutral-900 transition hover:text-white hover:ring-2 hover:ring-brand-500/40">
            <motion.span
              key={theme}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex h-full w-full items-center justify-center"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
}
