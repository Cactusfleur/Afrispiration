import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script" // 🟢 ADDED

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Designer Directory - Discover African Fashion",
  description:
    "A curated platform showcasing emerging and established African fashion designers from around the world. Discover sustainable, innovative, and culturally rich fashion.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
         {/* 🟢 GOOGLE ANALYTICS TAG - ADDED */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WZ3PVDDRKT"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WZ3PVDDRKT');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          {children}
          <SpeedInsights />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
