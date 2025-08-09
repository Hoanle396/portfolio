'use client';
import { ThemeProvider } from '../components/theme-provider';
import { Header } from './(components)/header';
import { Footer } from './(components)/footer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
 
