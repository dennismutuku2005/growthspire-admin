import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "GrowthSpire | Startup Accelerator",
  description: "Accelerating the next generation of innovative startups. Join GrowthSpire to scale your vision.",
  generator: "Dennis Mutuku and Ann Muoki",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [
      {
        url: "/growthspire-og.png",
        width: 1200,
        height: 630,
        alt: "GrowthSpire | Startup Accelerator",
      },
    ],
  },
}

import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.variable} ${rubik.className} font-sans antialiased text-foreground bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
          <Toaster position="top-center" theme="dark" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
