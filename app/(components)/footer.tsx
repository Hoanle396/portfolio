import Link from 'next/link';
import { siteConfig } from '../../config/site';
import { Github, PackageOpen, Mail, ArrowUpRight } from 'lucide-react';

const links = [
  { href: siteConfig.links.github, icon: <Github size={15} />, label: 'GitHub' },
  { href: siteConfig.links.npm, icon: <PackageOpen size={15} />, label: 'NPM' },
  { href: `mailto:${siteConfig.links.email}`, icon: <Mail size={15} />, label: 'Email' },
];

const footerNav = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: siteConfig.links.cv, label: 'Resume', external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-sm font-bold text-white">
              Hoan<span className="text-brand-400">.</span>
            </span>
            <p className="text-xs text-zinc-600 max-w-[200px] text-center sm:text-left">
              Software Engineer & Blockchain Developer
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 text-xs text-zinc-600 transition hover:text-zinc-300"
              >
                {item.label}
                {item.external && <ArrowUpRight size={10} />}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {links.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition hover:border-zinc-700 hover:text-zinc-300"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-800/40 pt-5 text-center">
          <p className="text-[11px] text-zinc-700">
            © {new Date().getFullYear()} Hoan Le — Built with Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
