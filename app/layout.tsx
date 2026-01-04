import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
