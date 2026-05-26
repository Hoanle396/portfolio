import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { SceneCanvas } from "@/components/scene/SceneCanvas";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hoan Le — Software Engineer & Blockchain Developer",
  description:
    "Full-stack developer building scalable web apps and blockchain products with modern tech stacks. Clean code, great UX, ship fast.",
  metadataBase: new URL("https://hoanle.app"),
  openGraph: {
    title: "Hoan Le — Software Engineer & Blockchain Developer",
    description:
      "Full-stack developer building scalable web apps and blockchain products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbMono.variable} antialiased`}
    >
      <body className="grain has-custom-cursor relative min-h-screen overflow-x-hidden bg-[#07070a] text-zinc-100">
        <SceneCanvas />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
