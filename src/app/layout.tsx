import type { Metadata } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Verlekar — Minecraft Developer Portfolio",
  description:
    "Portfolio of Aditya Verlekar, B.E. Information Technology student focused on software development, AI/ML, full-stack applications and data-driven solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${display.variable} ${jetbrains.variable} ${pressStart.variable} ${vt323.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#161814] text-[#e2dfd5] selection:bg-[#ffaa00] selection:text-[#111]">{children}</body>
    </html>
  );
}
