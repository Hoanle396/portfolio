'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <div
          className={`pointer-events-auto mt-4 flex w-full max-w-4xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            scrolled
              ? 'border border-zinc-800/80 bg-zinc-950/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl'
              : 'border border-white/5 bg-zinc-950/60 backdrop-blur-xl'
          }`}
        >
          {/* Logo + name */}
          <Link href="/" className="group relative flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fdba74] opacity-0 blur-lg transition-all duration-300 group-hover:opacity-50" />
            <Image
              src="/logo.svg"
              alt="Logo"
              width={36}
              height={36}
              className="relative h-9 w-9 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
            />
            <span className="relative hidden text-sm font-semibold text-zinc-300 transition group-hover:text-white sm:block">
              Hoan<span className="text-brand-400">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-zinc-800/70" />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden rounded-lg bg-brand-500/10 px-4 py-2 text-[13px] font-semibold text-brand-400 ring-1 ring-brand-500/20 transition hover:bg-brand-500/20 hover:text-brand-300 md:inline-flex"
            >
              Hire me
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-zinc-700 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="pointer-events-auto fixed inset-x-0 top-[76px] z-40 mx-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col p-3">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800/60 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  )}
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 border-t border-zinc-800 pt-3 pb-1 px-4">
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Get in touch
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
