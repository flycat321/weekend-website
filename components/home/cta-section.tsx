"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, Leaf, ArrowRight } from "lucide-react"
import Reveal from "@/components/motion/reveal"

const ctaCards = [
  {
    icon: Home,
    title: "房屋预订",
    description: "体验Weekend House的零碳度假生活",
    href: "/stay",
    gradient: "from-brand-earth to-brand-earth/80",
  },
  {
    icon: ShoppingBag,
    title: "定制设计",
    description: "打造专属于您的零碳生活空间",
    href: "/house/order",
    gradient: "from-primary to-primary/80",
  },
  {
    icon: Leaf,
    title: "了解更多",
    description: "探索我们的零碳使命与愿景",
    href: "/about",
    gradient: "from-brand-forest to-brand-forest/80",
  },
]

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container px-4 md:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              开启您的零碳周末
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              选择您感兴趣的服务，立即开始可持续生活方式的探索
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ctaCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <Link href={card.href}>
                <Card className={`bg-gradient-to-br ${card.gradient} text-white border-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer`}>
                  <CardContent className="p-8 flex flex-col items-center text-center min-h-[220px] justify-center">
                    <card.icon className="h-10 w-10 mb-4 opacity-90" />
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-white/80 mb-5 text-sm">{card.description}</p>
                    <Button variant="secondary" className="rounded-full group-hover:bg-white group-hover:text-foreground transition-colors">
                      立即探索 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
