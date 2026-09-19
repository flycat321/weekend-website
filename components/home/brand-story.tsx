import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Reveal from "@/components/motion/reveal"

export default function BrandStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl">关于 WEEKEND</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                WEEKEND源于一群科学家与设计师的共同愿景——将可持续理念融入日常生活。从北极科考到产品研发，我们致力于通过创新设计和技术，让零碳生活方式成为可能。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                我们相信，每一个周末的选择都可以成为改变世界的力量。选择Weekend House，不仅是选择一种度假方式，更是选择一种对地球负责的生活态度。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/about">
                  <Button className="bg-brand-earth hover:bg-brand-earth/90 rounded-full px-6">
                    了解品牌故事
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.2}>
            <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/house7.avif"
                alt="品牌故事"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white text-sm font-medium tracking-wide">
                  从自然中来，到自然中去
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
