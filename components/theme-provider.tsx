'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggle = () => {};

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="min-h-screen bg-[#09090b] text-zinc-100">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
