"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* 背景图片 - 注意：这里使用的是公共URL，实际部署时需替换为本地路径 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          transform: `scale(${1 + scrollY * 0.0005})`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>

      {/* 暗色渐变叠加层，增强文字可读性 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      ></div>

      {/* 动态地球效果 - 这里用简单的圆形代替，实际项目中可以用Three.js实现 */}
      <div
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-[#00CED1] to-[#8B7355] opacity-20 blur-xl"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`,
        }}
      ></div>

      {/* 内容 */}
      <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6 pt-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-[#00CED1]">WEEKEND HOUSE</span> <br />
          开启一段理想的可持续生活
        </h1>
        <p className="mb-8 max-w-[700px] text-lg text-gray-200 md:text-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          全球首个以"零碳周末生活"为核心的未来生活方式平台
        </p>
        <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            className="bg-[#00CED1] hover:bg-[#00CED1]/90 text-white" 
            size="lg"
            onClick={() => router.push('/search')}
          >
            预订体验 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-white bg-white/10 text-white hover:bg-white hover:text-black"
            size="lg"
          >
            了解更多
          </Button>
        </div>

        {/* 数据化呈现 */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div>
            <div className="text-3xl font-bold text-[#00CED1]">12吨</div>
            <div className="text-sm text-gray-300">每年减少CO₂排放</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#00CED1]">100%</div>
            <div className="text-sm text-gray-300">可再生能源供应</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#00CED1]">50+</div>
            <div className="text-sm text-gray-300">全球度假地点</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#00CED1]">10000+</div>
            <div className="text-sm text-gray-300">社区成员</div>
          </div>
        </div>
      </div>

      {/* 向下滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
