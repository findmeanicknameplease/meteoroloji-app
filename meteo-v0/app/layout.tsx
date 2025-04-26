import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Meteoroloji – Türkiye'nin Hava Durumu",
  description:
    "Türkiye'nin en güncel ve doğru hava durumu tahminleri. Şehrinizin hava durumunu öğrenin ve günlük aktivitelerinizi planlayın.",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${montserrat.variable} font-inter`}>{children}</body>
    </html>
  )
}
