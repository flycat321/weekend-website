import type React from "react"
import "@/app/globals.css"
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
})

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
})

export const metadata = {
  title: "WEEKEND - 零碳周末生活方式平台",
  description:
    "全球首个以零碳周末生活为核心的未来生活方式平台，通过创新产品与生态服务重构城市郊区度假场景。",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSans.variable} ${notoSerif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
