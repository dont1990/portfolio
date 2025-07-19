import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider, ColorSchemeProvider } from "@/components/theme-provider"
import { ThemeTransition } from "@/components/theme-transition"
// Removed: import { Preloader } from "@/components/preloader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alex Johnson - Frontend Developer Portfolio",
  description: "A personal portfolio showcasing the work and skills of Alex Johnson, a passionate frontend developer.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ColorSchemeProvider>
            {children}
            <ThemeTransition />
          </ColorSchemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
