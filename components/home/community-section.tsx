import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Globe } from "lucide-react"
import Reveal from "@/components/motion/reveal"

const communityCards = [
  {
    icon: Calendar,
    title: "活动日历",
    description: "参与线上碳中和讲座与线下房屋体验日，与专家和同好交流互动。",
    image: "/house4.avif",
  },
  {
    icon: Users,
    title: "用户故事",
    description: "分享您的零碳周末故事，展示个人减碳成果，激励更多人加入可持续生活。",
    image: "/house6.avif",
  },
  {
    icon: Globe,
    title: "公益合作",
    description: "每笔订单对应种植一棵树，在实时地图上追踪您的环保贡献。",
    image: "/house8.avif",
  },
]

export default function CommunitySection() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="container px-4 md:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">可持续社区</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              加入WEEKEND社区，与志同道合的环保先锋一起探索可持续生活方式
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {communityCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.15}>
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <card.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">{card.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
