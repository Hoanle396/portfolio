export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="text-white/50">Page not found.</p>
      <a className="text-brand-400 hover:underline" href="/">
        Return home
      </a>
    </main>
  );
}
