'use client';
import Link from 'next/link';
import Image from 'next/image';

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="pointer-events-auto mt-4 flex w-full max-w-4xl items-center justify-between rounded-2xl border border-[#667eea]/30 bg-zinc-950/80 px-6 py-3 backdrop-blur-xl">
        <Link href="/" className="group relative flex items-center gap-2">
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#4facfe] opacity-40 blur-lg transition-all group-hover:opacity-70 group-hover:blur-xl" />
          <Image
            src="/logo.svg"
            alt="Logo"
            width={44}
            height={44}
            className="relative h-11 w-11 drop-shadow-[0_0_10px_rgba(79,172,254,0.5)]"
          />
        </Link>
        <nav className="hidden gap-6 text-[13px] font-medium text-zinc-500 md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="transition hover:text-brand-400"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
