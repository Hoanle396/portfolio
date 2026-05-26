"use client";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-8 font-mono text-[12px] text-zinc-500 lg:px-12">
        <span>
          © {new Date().getFullYear()} Hoan Le — Built with Next.js, Tailwind, Framer Motion & React Three Fiber
        </span>
        <span>v2.0 · hoanle.app</span>
      </div>
    </footer>
  );
}
