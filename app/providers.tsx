'use client';
import React from 'react';
import { ThemeProvider } from '../components/theme-provider';
import { Header } from './(components)/header';
import { Footer } from './(components)/footer';
import { ChatWidget } from './(components)/chat-widget';
import { ScrollProgress } from './(components)/scroll-progress';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
      <ChatWidget />
    </ThemeProvider>
  );
}
