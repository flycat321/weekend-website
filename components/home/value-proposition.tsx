import Image from "next/image"
import { Leaf, Home } from "lucide-react"
import Reveal from "@/components/motion/reveal"

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gradient-to-b from-brand-cream to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight">
                重新定义
                <br />
                <span className="text-primary">零碳周末生活方式</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                WEEKEND是全球首个以"零碳周末生活"为核心的未来生活方式平台，通过创新产品与生态服务重构城市郊区度假场景。
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">每年减少12吨CO₂</div>
                    <div className="text-sm text-muted-foreground">每间房屋</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-brand-earth/10 p-3 rounded-full">
                    <Home className="h-5 w-5 text-brand-earth" />
                  </div>
                  <div>
                    <div className="font-semibold">100%可再生能源</div>
                    <div className="text-sm text-muted-foreground">全面供应</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.2}>
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/house2.avif"
                alt="零碳生活场景"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg text-sm font-medium">
                Weekend House · 零碳生活体验
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
