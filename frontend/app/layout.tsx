import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ThemeProvider,
  ColorSchemeProvider,
} from "@/app/components/theme-provider";
import { ThemeTransition } from "@/app/components/theme-transition";
import { ParallaxBackground } from "./components/parallax-background";
import { ParallaxParticles } from "./components/parallax-particles";
import { ScrollProgress } from "./components/scroll-progress";
import { ColorSchemePicker } from "./components/color-scheme-picker";
import { EnhancedThemeSettings } from "./components/enhanced-theme-settings";
import { ScrollToTop } from "./components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Johnson - Frontend Developer Portfolio",
  description:
    "A personal portfolio showcasing the work and skills of Alex Johnson, a passionate frontend developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorSchemeProvider>
            <div className="min-h-screen bg-background">
              <ParallaxBackground />
              <ParallaxParticles />
              <ScrollProgress />
              <ThemeTransition />
              {/* <ReadingTime /> */}
              {children}
              <ScrollToTop />
              <EnhancedThemeSettings />
              <ColorSchemePicker />
            </div>
            <ThemeTransition />
          </ColorSchemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
