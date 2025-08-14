'use client';
import React from 'react';
import { ThemeProvider } from '../components/theme-provider';
import { Header } from './(components)/header';
import { Footer } from './(components)/footer';
import { ChatWidget } from './(components)/chat-widget';
import { ScrollProgress } from './(components)/scroll-progress';
import dynamic from 'next/dynamic';
const Background3D = dynamic(
  () => import('./(components)/background-3d').then((m) => m.Background3D),
  { ssr: false },
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* Background at base of stacking context */}
      <Background3D />
      {/* Foreground UI wrapper to sit above z-0 */}
      <div className="relative z-10">
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}
