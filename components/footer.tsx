"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Youtube, Mail } from "lucide-react"
import Logo from "@/components/brand/logo"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-5 md:col-span-2">
            <Link href="/">
              <Logo variant="light" />
            </Link>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
              全球首个以"零碳周末生活"为核心的未来生活方式平台，通过创新产品与生态服务重构城市郊区度假场景。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-gray-300">住宿体验</h3>
            <ul className="space-y-3">
              <li><Link href="/stay" className="text-gray-500 hover:text-white transition-colors text-sm">预订房源</Link></li>
              <li><Link href="/experience" className="text-gray-500 hover:text-white transition-colors text-sm">体验活动</Link></li>
              <li><Link href="/guide" className="text-gray-500 hover:text-white transition-colors text-sm">住宿指南</Link></li>
              <li><Link href="/gift" className="text-gray-500 hover:text-white transition-colors text-sm">礼品卡</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-gray-300">了解更多</h3>
            <ul className="space-y-3">
              <li><Link href="/house" className="text-gray-500 hover:text-white transition-colors text-sm">零碳房屋</Link></li>
              <li><Link href="/journal" className="text-gray-500 hover:text-white transition-colors text-sm">Journal</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-white transition-colors text-sm">关于我们</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-white transition-colors text-sm">联系我们</Link></li>
            </ul>
          </div>

          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-gray-300">订阅通讯</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="您的邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 flex-shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
            {subscribed && (
              <p className="text-primary text-sm">订阅成功！感谢您的关注。</p>
            )}
            <p className="text-xs text-gray-600">
              订阅即表示您同意接收WEEKEND的电子邮件
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} WEEKEND. 保留所有权利
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-600 hover:text-gray-400 transition-colors">使用条款</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-400 transition-colors">隐私政策</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-400 transition-colors">联系我们</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
