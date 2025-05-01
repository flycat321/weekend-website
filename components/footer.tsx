import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block font-bold text-2xl">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="WEEKEND Logo"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-[#00CED1]">WEEKEND</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-xs">
              全球首个以"零碳周末生活"为核心的未来生活方式平台，通过创新产品与生态服务重构城市郊区度假场景。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#00CED1]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00CED1]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00CED1]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00CED1]">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00CED1]">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">产品与服务</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/house" className="text-gray-400 hover:text-white">
                  零碳房屋
                </Link>
              </li>
              <li>
                <Link href="/stay" className="text-gray-400 hover:text-white">
                  Weekend Stay
                </Link>
              </li>
              <li>
                <Link href="/materials" className="text-gray-400 hover:text-white">
                  建材商城
                </Link>
              </li>
              <li>
                <Link href="/design" className="text-gray-400 hover:text-white">
                  家居设计
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">可持续社区</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white">
                  活动日历
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-gray-400 hover:text-white">
                  用户故事
                </Link>
              </li>
              <li>
                <Link href="/charity" className="text-gray-400 hover:text-white">
                  公益合作
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  可持续博客
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">关于我们</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  品牌故事
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 hover:text-white">
                  核心团队
                </Link>
              </li>
              <li>
                <Link href="/esg" className="text-gray-400 hover:text-white">
                  ESG报告
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">订阅零碳生活通讯</h3>
              <div className="flex gap-2">
                <Input type="email" placeholder="您的邮箱地址" className="bg-gray-800 border-gray-700 text-white" />
                <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                  <Mail className="mr-2 h-4 w-4" />
                  订阅
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                订阅即表示您同意接收WEEKEND的电子邮件，并且已阅读我们的
                <Link href="/privacy" className="underline hover:text-gray-400">
                  隐私政策
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
              <div className="text-gray-400">
                <span className="font-semibold text-white">客服热线：</span> 400-888-9999
              </div>
              <div className="text-gray-400">
                <span className="font-semibold text-white">邮箱：</span> info@weekend.com
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">© {new Date().getFullYear()} WEEKEND. 保留所有权利</div>
            <div className="flex gap-4 text-sm">
              <Link href="/terms" className="text-gray-500 hover:text-gray-400">
                使用条款
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-400">
                隐私政策
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-gray-400">
                Cookie政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
